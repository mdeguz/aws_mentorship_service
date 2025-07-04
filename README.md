# What
A to-do service that runs on the Deno run-time using Hono as the Web framework.
# Quick Start
1. Clone the repo then [Install Deno ](https://docs.deno.com/runtime/getting_started/installation/).
2. Run `deno install` to install dependencies.
3. Run `deno run dev`.
4. Navigate to `http://localhost:8000/todos?page=1` which should return
```json
{
  "data": [
    {
      "uuid": "f30aa3e0-3808-11f0-b8a6-cd022729cef0",
      "title": "Create Enterprise To-do App",
      "description": "\n        Create an enterprise-grade To-do app that leverages cutting-edge cloud technology like AWS, while\n        also using a blazingly fast yet modern front-end framework like Next.js. \n      ",
      "completed": false
    }
  ],
  "page": "1"
}
```

## Packaging and Deployment
1. Configure your AWS CLI with your credentials for the environment
  - ```sh
    aws configure
    ```
2. Log into AWS ECR
  - ```sh
    aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 351881026653.dkr.ecr.us-east-2.amazonaws.com
    ```
3. Build & Tag the Docker Image
  - ```sh
    docker build . -t todo-api:latest -t 351881026653.dkr.ecr.us-east-2.amazonaws.com/todo-api:latest
    ```
4. Push the Docker Image to ECR
  - ```sh
    docker push 351881026653.dkr.ecr.us-east-2.amazonaws.com/todo-api:latest
    ```
5. In AWS Lambda, deploy the new image
6. ???
7. Profit

## Project Details

This project was started to experiment with Serverless technology. Specifically AWS Lambda.
To upload this code to Lambda, please follow:
- https://docs.deno.com/examples/aws_lambda_tutorial/

# OpenAPI Spec
At the moment, data is mocked. No data is being persisted, written, or read.
Only the GET /todos endpoint has been implemented so far.
```
openapi: 3.0.4
info:
  title: Todos API
  description: An API for retrieving, and editing todo items.
  version: 0.1.9

servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing
    
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  responses:
    UnauthorizedError:
      description: Missing or invalid credentials
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    ForbiddenError:
      description: Authenticated but unauthorized for this action
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
  schemas:
    Todo:
      type: object
      required:
        - uuid
        - title
        - completed
      properties:
        uuid:
          type: string
        title:
          type: string
        description:
          type: string
        completed:
          type: boolean
    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: integer
        message:
          type: string
          
security:
  - bearerAuth: []

paths:
  /auth/token:
    post:
      summary: Obtain a JWT access token
      description: >
        Exchange user credentials for a short-lived JWT.  
        No auth required here.
      security: []        # override global security
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - username
                - password
              properties:
                username:
                  type: string
                password:
                  type: string
      responses:
        '200':
          description: Token response
          content:
            application/json:
              schema:
                type: object
                properties:
                  access_token:
                    type: string
                  token_type:
                    type: string
                    example: Bearer
        '401':
          $ref: '#/components/responses/UnauthorizedError'
    
  /todos:
    get:
      summary: Retrieve todos
      description: Retrieves a list of todos that satisfy a list of parameter queries. Returns all todos if no parameter queries are provided.
      parameters:
        - in: query
          name: title
          schema:
            type: string
          required: false
          description: Title of the todo item
        - in: query
          name: description
          schema:
            type: string
          required: false
          description: Description of the todo item
        - in: query
          name: completed
          schema:
            type: boolean
          required: false
          description: Completion state of the todo item
        - in: query
          name: page
          schema:
            type: integer
          required: true
          description: Page of the result
      responses:
        '200':
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    description: The list of todos for this page
                    items:
                      $ref: '#/components/schemas/Todo'
                  page:
                    type: integer
                    description: The current page number
        '401':
          $ref: '#/components/responses/UnauthorizedError'
        '403':
          $ref: '#/components/responses/ForbiddenError'
      security:
        - bearerAuth: []
```
