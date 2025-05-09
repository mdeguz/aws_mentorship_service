import { Hono } from "@hono/hono"

const app = new Hono()

app.get("/", (c) => {
  return c.text("Hello!")
})

Deno.serve(app.fetch)
