import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask, fetchTasks } from "../redux/tasksSlice";
import Modal from "./Modal"; // Import the modal component
import "./TaskItem.css";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState(task);

  // Get priority class based on task priority
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

  // Handle task deletion
  const handleDelete = () => {
    dispatch(deleteTask(task._id));
  };

  // Handle toggling task completion status
  const handleToggleComplete = () => {
    dispatch(
      updateTask({ id: task._id, updates: { completed: !task.completed } })
    ).then(() => {
      dispatch(fetchTasks());
    });
  };

  const handleEdit = async (editedTask) => {
    const update = {
      name: editedTask.name,
      description: editedTask.description,
      dueDate: editedTask.dueDate,
      priority: editedTask.priority,
      tags: editedTask.tags,
    };
    console.log("Task to be updated:", JSON.stringify(update));
    try {
      await dispatch(updateTask({ id: task._id, updates: update }));
      setConfirmationModal(false);
      await dispatch(fetchTasks());
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const openEditModal = () => {
    setTaskDetails(task);
    setConfirmationModal(true);
  };

  return (
    <>
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
        <div className="task-tags-container">
          <p>Tags:</p>
          {task.tags.map((label) => (
            <span key={label} className="task-tag">
              #{label}
            </span>
          ))}
        </div>
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
            onClick={openEditModal}
          >
            Edit
          </button>
        </div>
      </div>

      <Modal
        isOpen={confirmationModal}
        onClose={() => {
          setConfirmationModal(false);
          setTaskDetails(task); // Reset to original task when closed
        }}
        onSave={handleEdit}
        taskDetails={taskDetails}
      />
    </>
  );
};

export default TaskItem;
