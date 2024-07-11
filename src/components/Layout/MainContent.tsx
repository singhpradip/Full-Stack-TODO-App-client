import React from "react";
import { Outlet } from "react-router-dom";
import { Toolbar } from "@mui/material";

const MainContent = () => {
  const drawerWidth = 240;

  return (
    <main style={{ flexGrow: 1, padding: "24px", marginLeft: drawerWidth }}>
      <Toolbar />
      <Outlet />
    </main>
  );
};

export default MainContent;
