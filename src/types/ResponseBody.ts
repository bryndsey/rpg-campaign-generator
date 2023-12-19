import type { ResponseContent } from "./ResponseContent";

export type ResponseBody =
  | {
      result: "success";
      content: ResponseContent;
      tone: string;
    }
  | { result: "error"; message: string };
