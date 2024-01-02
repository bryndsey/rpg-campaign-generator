import { z } from "zod";
import { zodResponseContent } from "./ResponseContent";

const zodResponseBody = z.discriminatedUnion("result", [
  z.object({
    result: z.literal("success"),
    content: zodResponseContent,
    tone: z.string().optional(),
    topic: z.string().optional(),
  }),
  z.object({
    result: z.literal("error"),
    errorMessage: z.string(),
    errorCause: z.string().optional(),
    tone: z.string().optional(),
    topic: z.string().optional(),
  }),
]);

export type ResponseBody = z.infer<typeof zodResponseBody>;

export const validateResponseBody = (object: unknown) =>
  zodResponseBody.parse(object);
