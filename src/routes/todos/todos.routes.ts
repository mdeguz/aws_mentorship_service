import { Hono } from "@hono/hono"
import { list } from "./todos.handlers.ts"

const todos = new Hono()

todos.get("/", list)

export { todos }
