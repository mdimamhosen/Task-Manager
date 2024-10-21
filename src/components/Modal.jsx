import React, { useState, useEffect } from "react";
import "./Modal.css";
import TagInput from "./TagInput";

const Modal = ({ isOpen, onClose, onSave, taskDetails }) => {
  const [task, setTask] = useState({});

  useEffect(() => {
    if (taskDetails) {
      setTask({
        name: taskDetails.name,
        description: taskDetails.description,
        dueDate: taskDetails.dueDate ? taskDetails.dueDate.split("T")[0] : "",
        priority: taskDetails.priority,
        tags: taskDetails.tags || [],
      });
    }
  }, [taskDetails]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Task to be saved:", JSON.stringify(task));
    await onSave(task);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="subsection_heading">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="label-style">
              Task Name
            </label>
            <input
              id="name"
              name="name"
              onChange={handleChange}
              value={task.name || ""}
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
              onChange={handleChange}
              type="text"
              name="description"
              className="form-style"
              value={task.description || ""}
              placeholder="Enter task description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate" className="label-style">
              Due Date
            </label>
            <input
              type="date"
              onChange={handleChange}
              id="dueDate"
              name="dueDate"
              className="form-style"
              value={task.dueDate || ""}
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
              onChange={handleChange}
              value={task.priority || "low"}
              className="form-style"
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

          <div className="modal-buttons form-group">
            <button className="blackButton" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="yellowButton" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
