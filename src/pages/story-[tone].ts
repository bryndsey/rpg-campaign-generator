import type { APIContext, APIRoute } from "astro";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import type { ResponseBody } from "../types/ResponseBody";
import type { ResponseContent } from "../types/ResponseContent";

const MODEL_NAME = "gemini-pro";
const API_KEY = import.meta.env.GOOGLE_GEN_AI_KEY;

async function run(input: string): Promise<ResponseContent> {
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
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    {
      text: "You are a creative writer. Given a brief tone, topic, or genre as input, briefly describe a compelling theme for a story that would fit the input. The theme may be directly related to the input, or it could abstract and tangentially related.",
    },
    { text: "tone: Tragedy" },
    { text: "output: Forbidden love that leads to death." },
    { text: "tone: Humorous" },
    { text: "output: Mistaken identity leads to unexpected consequences." },
    { text: "tone: Uplifting" },
    { text: "output: Hope in the face of adversity." },
    { text: "tone: Platypus" },
    {
      text: "output: The challenges of being in a misfit in a world of conformity.",
    },
    { text: "tone: Technology, serious" },
    { text: "output: Advancing technology threatens the natural world." },
    { text: "tone: Technology, comedy" },
    { text: "output: The absurdity of modern technology." },
    { text: "tone: Green" },
    { text: "output: Discovering the unexpected beauty of nature." },
    { text: "tone: Green, politics" },
    { text: "output: The staggering cost of capitalism on the individual." },
    { text: `tone: ${input}` },
    { text: "output: " },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  const themeText = response.text();

  const parts2 = [
    {
      text: `You are a creative dungeon master planning out a role-playing game campaign. Given a theme of "${themeText}" and a tone/topic/genre of "${input}", describe the plot of the campaign story.`,
    },
  ];

  const result2 = await model.generateContent({
    contents: [{ role: "user", parts: parts2 }],
    generationConfig,
    safetySettings,
  });

  // console.log(response.text());
  return {
    story: result2.response.text(),
    theme: themeText,
  };
}

export const GET: APIRoute = async ({ params, request }) => {
  let body: ResponseBody;
  const tone = params["tone"];
  if (tone === undefined) {
    body = {
      result: "error",
      error: "Missing parameter.",
    };
    return new Response(JSON.stringify(body));
  }
  try {
    const content = await run(tone);
    body = {
      result: "success",
      content,
      tone,
    };
    return new Response(JSON.stringify(body));
  } catch (error) {
    body = {
      result: "error",
      error,
    };
    return new Response(JSON.stringify(body));
  }
};
