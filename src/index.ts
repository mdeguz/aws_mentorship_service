import { Hono } from "@hono/hono"
import { todos } from "./routes/index.ts"

import { Client } from "pg"

const client = new Client({
  user: "<SCRUBBED>",
  password: "<SCRUBBED>",
  host: "todos-db-instance-1.cjw40c4scek7.us-east-2.rds.amazonaws.com",
  port: "5432",
  database: "todos",
})

await client.connect()
const res = await client.query("SELECT NOW()")

const allRes = await client.query("SELECT * FROM todos")

console.log(`allRes ${JSON.stringify(allRes)}`)

await client.end()

// // AWS RDS
// import { RDSClient, ListTagsForResourceCommand } from "@aws-sdk/client-rds";

// // a client can be shared by different commands.
// const client = new RDSClient({ region: "REGION" });

// // end

// const app = new Hono()

// app.route("/todos", todos)

// Deno.serve(app.fetch)
