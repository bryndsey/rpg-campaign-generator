import type { ResponseContent } from "./ResponseContent";

export type ResponseBody =
  | {
      result: "success";
      content: ResponseContent;
      tone?: string;
      topic?: string;
    }
  | { result: "error"; error: unknown; tone?: string; topic?: string };
