"use client";

import "./page.module.css";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <div className="main-container">
      <header className="section_heading">
        <h1>Task Manager</h1>
      </header>
      <div className="task-container">
        <div className="taskForm">
          {" "}
          <TaskForm />
        </div>
        <div className="taskList">
          <TaskList />
        </div>
      </div>
    </div>
  );
}
