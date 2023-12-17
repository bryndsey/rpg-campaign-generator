import type { APIRoute } from "astro";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-pro";
const API_KEY = import.meta.env.GOOGLE_GEN_AI_KEY;

async function run(input: string) {
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
      text: " You are a creative writer. Given a tone, describe in a few words a compelling theme or topic for a story that would fit the tone",
    },
    { text: "tone: Tragic" },
    { text: "output: Forbidden love that leads to death." },
    { text: "tone: Serious" },
    { text: "output: The struggle between technology and nature." },
    { text: "tone: Humorous" },
    { text: "output: Mistaken identity leads to unexpected consequences." },
    { text: "tone: Uplifting" },
    { text: "output: Hope in the face of adversity." },
    { text: `tone: ${input}` },
    { text: "output: " },
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });

  const response = result.response;
  // console.log(response.text());
  return response.text();
}

export const GET: APIRoute = async ({ params, request }) => {
  if (params.tone === undefined) {
    return new Response(
      JSON.stringify({
        result: "Missing parameter",
        params,
        request,
      })
    );
  }
  const result = await run(params.tone);
  return new Response(
    JSON.stringify({
      result,
      params,
      request,
    })
  );
};
