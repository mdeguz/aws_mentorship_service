import { z } from "zod"
import { Context } from "@hono/hono"

import { todo } from "schemas/todo.ts"

import { todos } from "../../../mock/todos.ts"

const querySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  page: z.string(),
})

const responseSchema = z.object({
  data: z.array(todo),
  page: z.string(),
})

export const list = (c: Context) => {
  const { title, description, completed, page } = querySchema.parse(
    c.req.query()
  )

  const stubbed = responseSchema.parse({
    data: todos,
    page: page,
  })

  return c.json(stubbed)
}
