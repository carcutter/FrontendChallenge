import { z } from "zod";

export function getResponseSchema<T>(schema: z.ZodType<T>) {
  return z.object({
    data: schema,
  });
}
