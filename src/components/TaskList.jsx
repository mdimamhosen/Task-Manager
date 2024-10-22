"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  fetchTags,
  fetchTasksWithFilterValues,
} from "../redux/tasksSlice";
import TaskItem from "./TaskItem";
import TaskFilters from "./TaskFilters";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const tags = useSelector((state) => state.tasks.tags);
  const status = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  // Fetch tasks and tags when the component mounts
  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchTags());
  }, [dispatch]);

  // Filters state
  const [filters, setFilters] = useState({
    status: "all",
    priority: "",
    tags: "",
    search: "",
  });

  // Fetch filtered tasks
  useEffect(() => {
    if (filters) {
      dispatch(fetchTasksWithFilterValues(filters));
    }
  }, [filters, dispatch]);

  // Collapsible state for each tag
  const [collapsedSections, setCollapsedSections] = useState({});

  // Function to toggle collapsible sections
  const toggleSection = (tag) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [tag]: !prev[tag],
    }));
  };

  // Group tasks by tags
  const groupedTasks = tasks.reduce((groups, task) => {
    const tag = task.tags || "Others"; // If no tag, assign "Others"
    if (!groups[tag]) {
      groups[tag] = [];
    }
    groups[tag].push(task);
    return groups;
  }, {});

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          marginTop: "1rem",
          position: "sticky",
          top: "0",
          backgroundColor: "#000c22",
          padding: "1rem",
          zIndex: "100",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ color: "#fff", marginBottom: "1rem" }}>Your Tasks</h2>
        <TaskFilters filters={filters} setFilters={setFilters} tags={tags} />
      </div>

      <section>
        {status === "loading" && (
          <p style={{ color: "#888" }}>Loading tasks...</p>
        )}
        {status === "failed" && <p style={{ color: "#f00" }}>{error}</p>}
        {tasks.length === 0 && (
          <p style={{ textAlign: "center", color: "#888" }}>
            No tasks to display
          </p>
        )}

        {/* Loop through each tag group */}
        <div
          style={{
            // margin: " 0 20px",
            padding: "1rem",
          }}
        >
          {Object.keys(groupedTasks).map((tag) => (
            <div
              key={tag}
              style={{
                marginBottom: "1rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              {/* Section header */}
              <div
                onClick={() => toggleSection(tag)}
                style={{
                  cursor: "pointer",
                  color: "black",
                  padding: "0.5rem",
                  backgroundColor: "grey",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <h3 style={{ margin: "0", fontSize: "1.2rem" }}>
                  {tag} ({groupedTasks[tag].length})
                </h3>
              </div>

              {/* Task items (shown or hidden based on collapsible state) */}
              {!collapsedSections[tag] && (
                <div
                  style={{
                    padding: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    backgroundColor: "black",
                  }}
                >
                  {groupedTasks[tag].map((task) => (
                    <TaskItem key={task._id} task={task} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TaskList;
