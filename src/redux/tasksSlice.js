import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

// Fetch tasks
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

// Fetch tags
export const fetchTags = createAsyncThunk(
  "tasks/fetchTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/get-tags");
      return response.data.data;
    } catch (error) {
      toast.error("Failed to fetch tags.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a task and re-fetch tasks and tags
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/api/tasks", task);
      toast.success("Task created successfully!");
      dispatch(fetchTasks());
      dispatch(fetchTags());
      return response.data;
    } catch (error) {
      toast.error("Failed to create task.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update a task and re-fetch tasks and tags
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, updates);
      toast.success("Task updated successfully!");
      dispatch(fetchTasks());
      dispatch(fetchTags());
      return response.data;
    } catch (error) {
      toast.error("Failed to update task.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a task and re-fetch tasks and tags
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted successfully!");
      dispatch(fetchTasks());
      dispatch(fetchTags());
      return id;
    } catch (error) {
      toast.error("Failed to delete task.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTasksWithFilterValues = createAsyncThunk(
  "tasks/fetchTasksWithFilterValues",
  async (filters, { rejectWithValue }) => {
    try {
      console.log("Filters from api calling:", filters);
      const queryObject = {};

      if (filters.status && filters.status !== "all") {
        queryObject.status = filters.status;
      } else {
        console.log("Status filter is not set or is 'all'.");
      }

      if (filters.priority) {
        queryObject.priority = filters.priority;
      } else {
        console.log("Priority filter is not set.");
      }

      if (filters.tags) {
        queryObject.tags = filters.tags;
      } else {
        console.log("Tags filter is not set or is empty.");
      }

      if (filters.search) {
        queryObject.search = filters.search;
      } else {
        console.log("Search filter is not set.");
      }

      const query = new URLSearchParams(queryObject).toString();

      const response = await axios.get(`/api/filtered-task?${query}`);
      return response.data.data;
    } catch (error) {
      toast.error("Failed to fetch tasks with filters.");
      console.error("Error fetching tasks:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create the slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
    tags: [],
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
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchTasksWithFilterValues.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasksWithFilterValues.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload; // Update tasks with filtered results
      })
      .addCase(fetchTasksWithFilterValues.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default tasksSlice.reducer;
