import React, { useState, useEffect } from "react";

const TaskFilters = ({ filters, setFilters, tags }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on load and on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="filter-container"
      // Change flex direction based on screen size
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        width: "100%",
        gap: "1rem",
        marginBottom: "1rem",
      }}
    >
      {/* Status Filter */}
      <div className="form-group" style={{ width: isMobile ? "100%" : "100%" }}>
        <label className="label-style">Status:</label>
        <select
          value={filters.status}
          className="form-style"
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Priority Filter */}
      <div className="form-group" style={{ width: isMobile ? "100%" : "100%" }}>
        <label className="label-style">Priority:</label>
        <select
          className="form-style"
          value={filters.priority}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, priority: e.target.value }))
          }
        >
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Tags Filter */}
      <div className="form-group" style={{ width: isMobile ? "100%" : "100%" }}>
        <label className="label-style">Tags:</label>
        <select
          className="form-style"
          value={filters.tags}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              tags: e.target.value,
            }))
          }
        >
          <option value="">All</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Search Filter */}
      <div className="form-group" style={{ width: isMobile ? "100%" : "100%" }}>
        <label className="label-style">Search:</label>
        <input
          className="form-style"
          type="text"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
          placeholder="Name/Description"
        />
      </div>
    </div>
  );
};

export default TaskFilters;
