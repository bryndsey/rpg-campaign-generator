import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import type { APIRoute } from "astro";
import { safeGetError } from "../safeGetError";
import type { ResponseBody } from "../types/ResponseBody";
import type { ResponseContent } from "../types/ResponseContent";

export const MAX_INPUT_CHARACTERS = 40;

const MODEL_NAME = "gemini-pro";
const API_KEY = import.meta.env.GOOGLE_GEN_AI_KEY;

async function run(tone?: string, topic?: string): Promise<ResponseContent> {
  if (tone && tone.length > MAX_INPUT_CHARACTERS) {
    throw new Error(
      `Your tone is too long. Please limit input to ${MAX_INPUT_CHARACTERS} characters`,
      { cause: "INVALID INPUT" },
    );
  }
  if (topic && topic.length > MAX_INPUT_CHARACTERS) {
    throw new Error(
      `Your topic is too long. Please limit input to ${MAX_INPUT_CHARACTERS} characters`,
      { cause: "INVALID INPUT" },
    );
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];

  // const themePromptParts = [
  //   {
  //     text: "You are a creative writer. Given an optional input of tone and topic, describe in a few words a compelling theme or topic for a story that would fit the tone and topic.",
  //   },
  //   { text: "tone: Tragic" },
  //   { text: "topic: " },
  //   { text: "out: Forbidden love that leads to death." },
  //   { text: "tone: " },
  //   { text: "topic: Technology" },
  //   { text: "out: The struggle between technology and nature." },
  //   { text: "tone: " },
  //   { text: "topic: Green" },
  //   { text: "out: Discovering the unexpected beauty of nature." },
  //   { text: "tone: Uplifting" },
  //   { text: "topic: Platypus" },
  //   { text: "out: Overcoming differences to find one's place in the world." },
  //   { text: "tone: " },
  //   { text: "topic: " },
  //   { text: "out: A hero's journey for justice." },
  //   { text: "tone: Serious" },
  //   { text: "topic: Green, politics" },
  //   { text: "out: The staggering cost of capitalism on the individual." },
  //   { text: `tone: ${tone}` },
  //   { text: `topic: ${topic}` },
  //   { text: "output: " },
  // ];

  // const themeResult = await model.generateContent({
  //   contents: [{ role: "user", parts: themePromptParts }],
  //   generationConfig,
  //   safetySettings,
  // });

  // const themeResponse = themeResult.response;
  // const themePromptFeedback = themeResponse.promptFeedback;
  // if (
  //   themePromptFeedback !== undefined &&
  //   themePromptFeedback.blockReason !== undefined
  // ) {
  //   throw new Error(
  //     `The prompt was blocked due to ${themePromptFeedback.blockReason.toLocaleLowerCase()}. You may need to modify your prompt to reduce the chances of blocked content.${
  //       themePromptFeedback.blockReasonMessage
  //         ? ` Message: ${themePromptFeedback.blockReasonMessage}`
  //         : ""
  //     }`,
  //     { cause: "SAFETY" },
  //   );
  // }
  // const themeText = themeResponse.text();

  const tonePromptText = tone ? ` The tone of the campaign is "${tone}".` : "";
  const topicPromptText = topic
    ? ` The campaign story includes the topic "${topic}".`
    : "";

  const storyPromptText = `You are a creative game master planning a role-playing game campaign.${topicPromptText}${tonePromptText} Describe the plot of this campaign story in plain text.`;

  // console.log(storyPromptText);
  const storyPromptParts = [
    {
      text: storyPromptText,
    },
  ];

  const storyResult = await model.generateContent({
    contents: [{ role: "user", parts: storyPromptParts }],
    generationConfig,
    safetySettings,
  });

  const storyResponse = storyResult.response;
  const storyPromptFeedback = storyResponse.promptFeedback;
  if (
    storyPromptFeedback !== undefined &&
    storyPromptFeedback.blockReasonMessage !== undefined
  ) {
    throw new Error(
      `The prompt was blocked due to ${storyPromptFeedback.blockReason.toLocaleLowerCase()}. You may need to modify your prompt to reduce the chances of blocked content.${
        storyPromptFeedback.blockReasonMessage
          ? ` Message: ${storyPromptFeedback.blockReasonMessage}`
          : ""
      }`,
      { cause: "SAFETY" },
    );
  }

  // console.log(response.text());
  return {
    story: storyResponse.text(),
    theme: "",
  };
}

export const GET: APIRoute = async ({ request }) => {
  const urlObj = new URL(request.url);
  let body: ResponseBody;
  const tone = urlObj.searchParams.get("tone") ?? undefined;
  const topic = urlObj.searchParams.get("topic") ?? undefined;
  try {
    const content = await run(tone, topic);
    body = {
      result: "success",
      content,
      tone,
      topic,
    };
    return new Response(JSON.stringify(body));
  } catch (error) {
    const errorObj = safeGetError(error);
    let errorCause: string | undefined = undefined;
    if (errorObj.cause !== undefined && typeof errorObj.cause === "string") {
      errorCause = errorObj.cause;
    }
    body = {
      result: "error",
      errorMessage: errorObj.message,
      errorCause,
      tone,
      topic,
    };
    return new Response(JSON.stringify(body));
  }
};
