import React from "react";
import { CssBaseline } from "@mui/material";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";
import MainContent from "../components/Layout/MainContent";
import AddTaskButton from "../components/TaskComponents/AddTaskButton";

const AppLayout: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <MainContent />
      <AddTaskButton />
    </div>
  );
};

export default AppLayout;
