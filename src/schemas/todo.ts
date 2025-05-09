import { z } from "zod"

export const todo = z.object({
  uuid: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
})
