import { Hono } from "@hono/hono"
import * as uuid from "@std/uuid"

interface Todo {
  uuid: string
  title: string
  description: string
  completed: boolean
}

const res: Todo[] = [
  {
    uuid: uuid.v1.generate(),
    title: "Create Enterprise To-do App",
    description: `
      Create an enterprise-grade To-do app that leverages cutting-edge cloud technology like AWS, while
      also using a blazingly fast yet modern front-end framework like Next.js. 
    `,
    completed: false,
  },
]

const app = new Hono()

app.get("/todos", (c) => {
  return c.json({
    data: res,
  })
})

Deno.serve(app.fetch)
