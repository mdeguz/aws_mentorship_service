import { Hono } from "@hono/hono"
import { todos } from "./routes/index.ts"

const app = new Hono()

app.route("/todos", todos)

Deno.serve(app.fetch)
