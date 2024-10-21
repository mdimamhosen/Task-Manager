"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/tasksSlice";
import TaskItem from "./TaskItem";
import "./TaskList.css";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const status = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="TaskList">
      <h2 className="subsection_heading your-task-heading">Your Tasks</h2>

      <section>
        {status === "loading" && <p className="loading">Loading tasks...</p>}
        {status === "failed" && <p>{error}</p>}
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
