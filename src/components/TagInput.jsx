import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import "./TagInput.css";

const TagInput = ({ name, setTask, task }) => {
  const [selectedTag, setSelectedTag] = useState(task.tags ? task.tags[0] : "");
  const availableTags = ["Work", "Personal", "Urgent", "Home", "Shopping"];

  useEffect(() => {
    setSelectedTag(task.tags ? task.tags[0] : "");
  }, [task.tags]);

  const handleAddTag = (event) => {
    const tagValue = event.target.value;
    if (tagValue) {
      setSelectedTag(tagValue);
    }
  };

  useEffect(() => {
    setTask((prev) => ({ ...prev, tags: selectedTag ? [selectedTag] : [] }));
  }, [selectedTag, setTask]);

  return (
    <div className="tag-input">
      <div className="chips-container">
        {selectedTag && (
          <div className="chip">
            {selectedTag}
            <button
              type="button"
              className="delete-chip"
              onClick={() => setSelectedTag("")}
            >
              <MdClose className="icon" />
            </button>
          </div>
        )}
        <select onChange={handleAddTag} className="form-style" defaultValue="">
          <option value="" disabled>
            Select a tag
          </option>
          {availableTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TagInput;
