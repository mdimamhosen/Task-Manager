import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import "./TagInput.css";

const TagInput = ({ name, setTask, task, placeholder }) => {
  const [chips, setChips] = useState(task.tags || []);

  useEffect(() => {
    setChips(task.tags || []);
  }, [task.tags]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        setChips((prevChips) => [...prevChips, chipValue]);
        event.target.value = "";
      }
    }
  };

  const handleDeleteChip = (chipIndex) => {
    setChips((prevChips) =>
      prevChips.filter((_, index) => index !== chipIndex)
    );
  };

  useEffect(() => {
    setTask((prev) => ({ ...prev, tags: chips }));
  }, [chips, setTask]);

  return (
    <div className="tag-input">
      <div className="chips-container">
        {chips.map((chip, index) => (
          <div key={index} className="chip">
            {chip}
            <button
              type="button"
              className="delete-chip"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="icon" />
            </button>
          </div>
        ))}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style"
        />
      </div>
    </div>
  );
};

{
  /*

 The TagInput component allows users to add and manage tags for a task by maintaining an array of chips in its state. It initializes the chips state with the task's existing tags and updates it whenever task.tags changes. Users can add tags by pressing "Enter" or "," after typing, provided the tag is not empty or already included. Each tag can be removed via a delete button, which updates the chips state accordingly. The component also ensures that the updated tags are reflected in the parent task state through the setTask function. The tags are displayed as chips above the input field, which remains available for new tag entries.
 */
}
export default TagInput;
