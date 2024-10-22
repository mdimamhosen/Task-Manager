import React from "react";

const TaskFilters = ({ filters, setFilters, tags }) => {
  return (
    <div
      className="filter-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        gap: "1rem",
        marginBottom: "1rem",
      }}
    >
      {/* Status Filter */}
      <div className="form-group" style={{ width: "100%" }}>
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
      <div className="form-group" style={{ width: "100%" }}>
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
      <div className="form-group" style={{ width: "100%" }}>
        <label className="label-style">Tags:</label>
        <select
          className="form-style"
          value={filters.tags}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              tags: e.target.value, // Keep as a string
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
      <div className="form-group" style={{ width: "100%" }}>
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
