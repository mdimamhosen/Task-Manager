import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

// Fetch tasks from the API
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/tasks");
      console.log("response from fetch tasks:", response.data.data);
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
      return response.data;
    } catch (error) {
      toast.error("Failed to update task.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice definition
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      toast.success("Task deleted successfully!");
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
      });

    builder
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
      });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    });
  },
});

export const { deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
