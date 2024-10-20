"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../redux/tasksSlice";
import "./TaskItem.css";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  const handleToggleComplete = () => {
    dispatch(
      updateTask({ id: task._id, updates: { completed: !task.completed } })
    );
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "";
    }
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <h2 className="task-name">{task.name}</h2>
      <p className="task-description">{task.description}</p>
      <p className="task-due-date">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <p>
        Priority:{" "}
        <span className={`task-priority ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
      </p>
      <div>
        <button className="complete" onClick={handleToggleComplete}>
          Complete
        </button>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
        <button className="edit" onClick={() => console.log("Edit task")}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
