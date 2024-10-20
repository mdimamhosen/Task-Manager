import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask, fetchTasks } from "../redux/tasksSlice";
import "./TaskItem.css";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  const handleToggleComplete = () => {
    dispatch(
      updateTask({ id: task._id, updates: { completed: !task.completed } })
    ).then(() => {
      dispatch(fetchTasks());
    });
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
        <button
          className={task.completed ? "not-allowed complete" : "complete"}
          disabled={task.completed}
          onClick={handleToggleComplete}
        >
          {task.completed ? "Completed" : "Complete"}
        </button>
        <button
          className={task.completed ? "not-allowed delete" : "delete"}
          disabled={task.completed}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className={task.completed ? "not-allowed edit" : "edit"}
          disabled={task.completed}
          onClick={() => console.log("Edit task")}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
