import React, { useState } from "react";
import TagInput from "./TagInput";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ modalData }) => {
  const [task, setTask] = useState({
    name: modalData.name,
    description: modalData.description,
    dueDate: modalData.dueDate,
    priority: modalData.priority,
    tags: modalData.tags,
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    modalData?.btn1Handler(); // This will call the edit handler
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <section className="task-form">
          <h2 className="subsection_heading">Edit Task</h2>
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
              />
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
            <div className="modal-footer">
              <button className="yellowButton" onClick={modalData?.btn1Handler}>
                {modalData?.btn1Text}
              </button>
              <button className="blackButton" onClick={modalData?.btn2Handler}>
                {modalData?.btn2Text}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ConfirmationModal;
