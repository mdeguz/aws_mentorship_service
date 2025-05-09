import * as uuid from "@std/uuid"

export const todos = [
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
