# Task Manager API

## Overview
This project is a simple Task Manager API built with Express.js. It provides endpoints to create, read, update, and delete tasks. The API also includes features like task filtering by completion status and priority level.

## Setup Instructions

1. Clone the repository
2. Install dependencies:
    npm install
3. Start the server:
    node app.js

The server will start running on `http://localhost:3000`

## API Endpoints

### GET /tasks
- Retrieves all tasks
- Query Parameters:
  - `completed`: Filter tasks by completion status (true/false)

### GET /tasks/priority/:level
- Retrieves tasks by priority level
- Path Parameters:
  - `level`: Priority level (low/medium/high)

### GET /tasks/:id
- Retrieves a specific task by ID
- Path Parameters:
  - `id`: Task ID

### POST /tasks
- Creates a new task
- Request Body:

```json
{
 "title": "Task Title",
 "description": "Task Description",
 "completed": false,
 "priority": "low"
}
```

### PUT /tasks/:id
- Updates an existing task
- Path Parameters: 
    - id: Task ID
- Request Body:

```json
{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "completed": true,
  "priority": "high"
}
```

### DELETE /tasks/:id
- Deletes a task
- Path Parameters:
    - id: Task ID

## Testing the API
The project includes a test suite using tap and supertest. To run the tests:

Ensure all dependencies are installed
Run the test command:
    ```npm run test```
    
For manual testing, you can use tools like Postman or cURL to send requests to the API endpoints.