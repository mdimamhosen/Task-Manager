"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  fetchTags,
  fetchTasksWithFilterValues,
} from "../redux/tasksSlice";
import TaskItem from "./TaskItem";
import "./TaskList.css";
import TaskFilters from "./TaskFilters";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const tags = useSelector((state) => state.tasks.tags);
  const status = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchTags());
  }, [dispatch]);

  const [filters, setFilters] = useState({
    status: "all",
    priority: "",
    tags: "",
    search: "",
  });

  useEffect(() => {
    if (filters) {
      dispatch(fetchTasksWithFilterValues(filters));
    }
  }, [filters, dispatch]);

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="TaskList">
      <div
        className=""
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
        <h2 className="subsection_heading your-task-heading">Your Tasks</h2>

        <div>
          <TaskFilters filters={filters} setFilters={setFilters} tags={tags} />
        </div>
      </div>
      <section>
        {status === "loading" && <p className="loading">Loading tasks...</p>}
        {status === "failed" && <p>{error}</p>}
        {tasks.length === 0 && <p className="noTask">No tasks to display</p>}
        <div className="task-list-container">
          {pendingTasks.map((task) => (
            <TaskItem key={`pending-${task._id}`} task={task} />
          ))}
          {completedTasks.map((task) => (
            <TaskItem key={`completed-${task._id}`} task={task} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TaskList;
