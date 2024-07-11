import React from "react";
import { CssBaseline } from "@mui/material";
import Header from "../components/Layout/Header.tsx";
import Sidebar from "../components/Layout/Sidebar.tsx";
import MainContent from "../components/Layout/MainContent.tsx";

const AppLayout: React.FC = () => {
  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default AppLayout;
