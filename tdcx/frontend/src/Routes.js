import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginModule/LoginPage";
import AddNewTask from "./components/TaskModule";
import TaskList from "./components/TaskListModule";

export const Screens = () => {
  return (
    <>
        <Routes>
          <Route path="/addnewtask" element={<AddNewTask />} />
          <Route path="/tasklist" element={<TaskList />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
    </>
  );
};

export default Screens;
