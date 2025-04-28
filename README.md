# Task Manager API

Description
This is a simple RESTful API for managing tasks. It allows you to create, retrieve, update, and delete tasks.  The API includes authentication to secure the task management endpoints.

Base URL
http://localhost:3000

Endpoints
## 1. Create a New Task
Method: POST

URL: /tasks

Headers:

Content-Type: application/json

Authorization: Bearer <API_KEY>  (Replace <API_KEY> with your actual API key, which is  mysecretkey123)

```Body:

{
    "title": "Task Title",
    "description": "Task Description"
}
```

Response:

201 Created:  Returns the newly created task object, including its ID and creation timestamp.

400 Bad Request:  If title or description is missing.

401 Unauthorized:  If the Authorization header is missing or invalid.

## 2. Get All Tasks
Method: GET

URL: /tasks

Headers: None

Query Parameters:

page:  Page number (default: 1)

limit:  Maximum number of tasks per page (default: 5)

sortBy:  Field to sort by (default: createdAt)

order:  Sorting order (asc or desc, default: asc)

title: Filter tasks by title

Response:

200 OK: Returns a paginated and optionally sorted/filtered list of tasks.

## 3. Get a Single Task
Method: GET

URL: /tasks/:id  (Replace :id with the task's ID)

Headers: None

Response:

200 OK: Returns the task object.

404 Not Found:  If the task with the given ID does not exist.

## 4. Update a Task
Method: PUT

URL: /tasks/:id  (Replace :id with the task's ID)

Headers:

Content-Type: application/json

Authorization: Bearer <API_KEY> (Replace <API_KEY> with your actual API key)
```
Body:

{
    "title": "Updated Task Title",
    "description": "Updated Task Description"
}
```

Response:

200 OK: Returns the updated task object.

400 Bad Request:  If title or description is missing.

401 Unauthorized:  If the Authorization header is missing or invalid.

404 Not Found:  If the task with the given ID does not exist.

## 5. Delete a Task
Method: DELETE

URL: /tasks/:id  (Replace :id with the task's ID)

Headers:

Authorization: Bearer <API_KEY> (Replace <API_KEY> with your actual API key)

Body: None

Response:

200 OK:  Returns {"message": "Task deleted successfully"}.

404 Not Found:  If the task with the given ID does not exist.

Authentication
The API uses Bearer token authentication for the following endpoints:

POST /tasks

PUT /tasks/:id

DELETE /tasks/:id

Include the Authorization header in your requests:

Authorization: Bearer <API_KEY>

Replace <API_KEY> with your secret key.

## Error Handling
The API returns the following HTTP status codes for errors:

400 Bad Request:  For invalid request bodies (e.g., missing required fields).

401 Unauthorized:  For missing or invalid authentication credentials.

404 Not Found:  For requests to non-existent resources (e.g., a task with a given ID).

500 Internal Server Error:  For unexpected server errors.  The error response will be in JSON format: {"error": "Something went wrong!"}.  Check the server console for detailed error messages.

## Setup
Install Node.js: Ensure you have Node.js installed (version 12 or later).

Clone the repository: (If you have the code in a git repository)

git clone <repository_url>
cd <repository_directory>

Install dependencies: Run npm install to install the required packages (Express.js, uuid).

Start the server: Run node server.js to start the server.  It will listen on http://localhost:3000.

Use Postman (or a similar tool): Use Postman or another API client to send requests to the endpoints described above.  Make sure to include the necessary headers and body for each request.
