import { z } from "zod";

export const zodResponseContent = z.object({
  story: z.string(),
  theme: z.string(),
});

export type ResponseContent = z.infer<typeof zodResponseContent>;

export const validateResponseContent = (object: unknown) =>
  zodResponseContent.parse(object);
