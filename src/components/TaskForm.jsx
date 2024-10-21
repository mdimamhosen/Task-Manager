"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, fetchTasks } from "../redux/tasksSlice";
import "./TaskForm.css";
import TagInput from "./TagInput";
import toast from "react-hot-toast";

const TaskForm = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.tasks.status);

  const [task, setTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    priority: "low",
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(task);

    if (!task.name) {
      toast.error("Task name is required.");
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(task.dueDate);
    // if (selectedDate <= currentDate) {
    //   toast.error("Due date should be in the future.");
    //   return;
    // }
    if (task.tags.length === 0) {
      toast.error("Tags are required.");
      return;
    }
    await dispatch(createTask(task));
    dispatch(fetchTasks());
    setTask({
      name: "",
      description: "",
      dueDate: "",
      priority: "low",
      tags: [],
    });
  };
  return (
    <section className="task-form">
      <h2 className="subsection_heading">Add a New Task</h2>
      <form id="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="label-style">
            Task Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={task.name}
            onChange={handleChange}
            placeholder="Enter task name"
            className="form-style"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="label-style">
            Description
          </label>
          <input
            id="description"
            name="description"
            className="form-style"
            value={task.description}
            onChange={handleChange}
            placeholder="Enter task description"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate" className="label-style">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className="form-style"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority" className="label-style">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            className="form-style"
            onChange={handleChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tags" className="label-style">
            Tags (e.g., Work, Personal)
          </label>
          <TagInput
            name="tags"
            setTask={setTask}
            task={task}
            placeholder="Click enter to add tags"
          />
        </div>
        <button type="submit" className="yellowButton">
          {status === "loading" ? "Adding Task..." : "Add Task"}
        </button>
      </form>
    </section>
  );
};

export default TaskForm;
