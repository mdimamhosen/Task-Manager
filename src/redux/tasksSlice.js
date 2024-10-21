import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

// Fetch tasks from the API
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/tasks");
      return response.data.data;
    } catch (error) {
      toast.error("Failed to fetch tasks.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a new task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/tasks", task);
      toast.success("Task created successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to create task.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update an existing task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/update-tasks`, {
        id,
        updates,
      });
      toast.success("Task updated successfully!");
      return response.data; // Return the updated task data
    } catch (error) {
      toast.error("Failed to update task.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Mark task as completed
export const completeTask = createAsyncThunk(
  "tasks/completeTask",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/complete-task`, { id });
      toast.success("Task marked as completed!");
      return response.data;
    } catch (error) {
      toast.error("Failed to complete task.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a task with Undo option
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/delete-tasks`, { id });
      toast.success("Task deleted successfully!");

      // Temporarily remove the task from the list for 5 seconds
      dispatch(addDeletedTask(id));
      setTimeout(() => {
        dispatch(removeDeletedTask(id)); // Permanently delete if not undone
      }, 5000);

      return id;
    } catch (error) {
      toast.error("Failed to delete task.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice definition
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    deletedTasks: [],
    status: "idle",
    error: null,
  },
  reducers: {
    restoreDeletedTask: (state, action) => {
      const deletedTaskId = action.payload;
      const taskToRestore = state.deletedTasks.find(
        (task) => task._id === deletedTaskId
      );
      if (taskToRestore) {
        state.tasks.push(taskToRestore);
        state.deletedTasks = state.deletedTasks.filter(
          (task) => task._id !== deletedTaskId
        );
        toast.success("Task restored!");
      } else {
        toast.error("Task not found for restoration.");
      }
    },
    addDeletedTask: (state, action) => {
      const deletedTaskId = action.payload;
      const taskToDelete = state.tasks.find(
        (task) => task._id === deletedTaskId
      );
      if (taskToDelete) {
        state.deletedTasks.push(taskToDelete);
      }
      state.tasks = state.tasks.filter((task) => task._id !== deletedTaskId);
    },
    removeDeletedTask: (state, action) => {
      const deletedTaskId = action.payload;
      state.deletedTasks = state.deletedTasks.filter(
        (task) => task._id !== deletedTaskId
      );
      toast.success("Task permanently deleted.");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index].completed = true;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {

      });
  },
});

export const { restoreDeletedTask, addDeletedTask, removeDeletedTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
