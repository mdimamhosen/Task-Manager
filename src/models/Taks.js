import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String, enum: ["low", "medium", "high"] },
    tags: { type: [String], default: [] },
    completed: { type: Boolean, default: false },
    reminder: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);
export default Task;
