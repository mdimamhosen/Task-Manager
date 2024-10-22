import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTask, fetchTasks, deleteTask } from "../redux/tasksSlice";
import Modal from "./Modal";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import "./TaskItem.css";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState(task);
  const [isDeleted, setIsDeleted] = useState(false);
  const [undoTimeout, setUndoTimeout] = useState(null);
  const [reminderActive, setReminderActive] = useState(task.reminder || false);

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

  const handleDelete = async (id) => {
    setIsDeleted(true);
    const timeout = setTimeout(async () => {
      await dispatch(deleteTask(id));
      await dispatch(fetchTasks());
      setIsDeleted(false);
    }, 5000);
    setUndoTimeout(timeout);
  };

  const handleUndoDelete = () => {
    if (undoTimeout) {
      clearTimeout(undoTimeout);
      setIsDeleted(false);
    }
  };

  const handleToggleComplete = () => {
    dispatch(
      updateTask({ id: task._id, updates: { completed: !task.completed } })
    )
      .then(() => dispatch(fetchTasks()))
      .catch((error) => console.error("Error completing task:", error));
  };

  const handleEdit = async (editedTask) => {
    const updates = {
      name: editedTask.name,
      description: editedTask.description,
      dueDate: editedTask.dueDate,
      priority: editedTask.priority,
      tags: editedTask.tags,
      reminder: reminderActive,
    };
    try {
      await dispatch(updateTask({ id: task._id, updates }));
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
  const handleToggleReminder = async () => {
    const newReminderStatus = !reminderActive; // Get the new status before updating the state
    setReminderActive(newReminderStatus); // Update state

    const updates = {
      reminder: newReminderStatus, // Use the new status here
    };

    try {
      await dispatch(updateTask({ id: task._id, updates }));
      await dispatch(fetchTasks());
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const isDueSoon = () => {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    return reminderActive && dueDate - now < 24 * 60 * 60 * 1000;
  };
  const formattedDueDate = new Date(task.dueDate).toLocaleDateString();

  useEffect(() => {
    return () => {
      if (undoTimeout) {
        clearTimeout(undoTimeout);
      }
    };
  }, [undoTimeout]);

  return (
    <>
      {!isDeleted ? (
        <div
          className={`task-item ${task.completed ? "completed" : ""} ${
            isDueSoon() ? "due-soon" : ""
          }`}
        >
          <div className="tgBTN">
            <h2 className="task-name">{task.name}</h2>
            <div className="reminder-toggle">
              <button onClick={handleToggleReminder} className="toggle-button">
                {reminderActive ? (
                  <FaToggleOn size={24} color="green" />
                ) : (
                  <FaToggleOff size={24} color="red" />
                )}
              </button>
            </div>
          </div>
          <p className="task-description">{task.description}</p>
          <p className="task-due-date">Due: {formattedDueDate}</p>
          <p>
            Priority:{" "}
            <span
              className={`task-priority ${getPriorityClass(task.priority)}`}
            >
              {task.priority}
            </span>
          </p>
          <div className="task-tags-container">
            <p>Tags:</p>
            {task.tags && task.tags.length > 0 ? (
              task.tags.map((label) => (
                <span key={label} className="task-tag">
                  #{label}
                </span>
              ))
            ) : (
              <span>No tags available</span>
            )}
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
              onClick={() => handleDelete(task._id)}
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
      ) : (
        <div className="undo-notification">
          <p>
            Task deleted. <button onClick={handleUndoDelete}>Undo</button>
          </p>
        </div>
      )}

      <Modal
        isOpen={confirmationModal}
        onClose={() => {
          setConfirmationModal(false);
          setTaskDetails(task);
        }}
        onSave={handleEdit}
        taskDetails={taskDetails}
      />
    </>
  );
};

export default TaskItem;
