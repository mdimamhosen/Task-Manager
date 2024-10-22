# Task Manager

A simple task management application built with NextJS This application allows users to create, retrieve, update, and delete tasks, as well as manage tags for those tasks.

## Live Demo

You can access the live application at: [Task Manager Live](https://task-manager-rouge-three.vercel.app/)

## Git Repository

The source code is available at: [GitHub Repository](https://github.com/mdimamhosen/Task-Manager)

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mdimamhosen/Task-Manager.git
   ```

2. **Navigate into the project directory:**

   ```bash
   cd Task-Manager
   ```

3. **Create a `.env` file:**

   - Create a new file named `.env` in the root directory of the project.
   - Add your MongoDB URI to the `.env` file:
     ```
     MONGO_URI=<Your_MONGO_URI>
     ```

4. **Install the required dependencies:**

   ```bash
   npm install
   ```

5. **Run the application:**

   ```bash
   npm start
   ```

6. **Open your browser and go to** `http://localhost:3000` to access the application.

## API Endpoints

### Task Management Endpoints

1. **Fetch Tasks**

   - **Method**: `GET`
   - **Endpoint**: `/api/tasks`
   - **Description**: Retrieves all tasks from the database.
   - **Response**:
     ```json
     {
       "data": [
         {
           "id": "1",
           "title": "Sample Task",
           "description": "This is a sample task.",
           "completed": false,
           "tags": ["work"]
         },
         ...
       ]
     }
     ```

2. **Fetch Tags**

   - **Method**: `GET`
   - **Endpoint**: `/api/get-tags`
   - **Description**: Retrieves all available tags that can be used for tasks.
   - **Response**:
     ```json
     {
       "data": ["work", "personal", "urgent", ...]
     }
     ```

3. **Create a Task**

   - **Method**: `POST`
   - **Endpoint**: `/api/tasks`
   - **Description**: Creates a new task. Requires a request body with task details.
   - **Request Body**:
     ```json
     {
       "title": "New Task",
       "description": "Description of the new task.",
       "completed": false,
       "tags": ["tag1", "tag2"]
     }
     ```
   - **Response**:
     ```json
     {
       "data": {
         "id": "2",
         "title": "New Task",
         "description": "Description of the new task.",
         "completed": false,
         "tags": ["tag1", "tag2"]
       }
     }
     ```

4. **Update a Task**

   - **Method**: `PUT`
   - **Endpoint**: `/api/tasks/:id`
   - **Description**: Updates an existing task identified by its ID. Requires a request body with the updated task details.
   - **Request Body**:
     ```json
     {
       "title": "Updated Task",
       "description": "Updated description of the task.",
       "completed": true,
       "tags": ["tag1"]
     }
     ```
   - **Response**:
     ```json
     {
       "data": {
         "id": "2",
         "title": "Updated Task",
         "description": "Updated description of the task.",
         "completed": true,
         "tags": ["tag1"]
       }
     }
     ```

5. **Delete a Task**
   - **Method**: `DELETE`
   - **Endpoint**: `/api/tasks/:id`
   - **Description**: Deletes a task identified by its ID.
   - **Response**:
     ```json
     {
       "message": "Task deleted successfully."
     }
     ```

## Running the Application

To run the application with your own MongoDB URI, use the following command:

```bash
MONGO_URI=<Your_Mongo_URI> npm start
```

## Contact

For any inquiries, please contact me at: [mdimam.cse9.bu@gmail.com](mailto:mdimam.cse9.bu@gmail.com)

## Known Issues and Limitations

- Currently, the application does not handle authentication and user management.
- The filtering functionality may have limitations based on the provided data structure.
