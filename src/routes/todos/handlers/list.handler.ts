import { z } from "zod"
import { Context } from "@hono/hono"

import { todo } from "schemas/todo.ts"

import { todos } from "mock/todos.ts"

const querySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  page: z.string().optional().default("1"),
})

const responseSchema = z.object({
  data: z.array(todo),
  page: z.string(),
})

export const list = async (c: Context) => {
  try {
    const query = c.req.query()
    const { title, description, completed, page } = querySchema.parse(query)

    const stubbed = responseSchema.parse({
      data: todos,
      page: page || "1",
    })

    return c.json(stubbed, 200, {
      "Content-Type": "application/json",
    })
  } catch (error) {
    console.error("Error in list handler:", error)
    return c.json({ error: "Bad Request" }, 400)
  }
}
