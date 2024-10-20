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

  return (
    <div className="TaskList">
      <h2 className="subsection_heading your-task-heading">Your Tasks</h2>

      <section className=" ">
        {status === "loading" && <p>Loading tasks...</p>}
        {status === "failed" && <p>{error}</p>}
        <div className="task-list-container">
          {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TaskList;
