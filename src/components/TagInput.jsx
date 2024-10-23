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
// Changes i made to the code are:
// 1. I imported the useState and useEffect hooks from react.
// 2. I created a TagInput component that takes three props: name, setTask, and task.
// 3. I created a state variable selectedTag to store the selected tag.
// 4. I created a list of available tags.
// 5. I used the useEffect hook to set the selected tag when the task tags change.
// 6. I created a handleAddTag function to add a tag to the selected tag state.
// 7. I used the useEffect hook to update the task tags when the selected tag changes.
// 8. I returned a div with a select element to add tags to the task.
// 9. I mapped over the available tags to create options in the select element.
// 10. I returned the TagInput component in the TaskForm component.

export default TagInput;
