import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

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

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, updates);
      toast.success("Task updated successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to update task.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted successfully!");
      return id;
    } catch (error) {
      toast.error("Failed to delete task.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    deletedTasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
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
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task._id === action.payload._id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const id = action.payload;
        const taskToDelete = state.tasks.find((task) => task._id === id);
        if (taskToDelete) {
          state.deletedTasks.push(taskToDelete);
          state.tasks = state.tasks.filter((task) => task._id !== id);
        }
      });
  },
});

export default tasksSlice.reducer;
