import { Outlet } from "react-router-dom";
import { Toolbar } from "@mui/material";

const MainContent = () => {

  const drawerWidth = 200;

  return (
    <main style={{ flexGrow: 1, padding: "0 10px", marginLeft: drawerWidth }}>
      <Toolbar />
      <Outlet />
    </main>
  );
};

export default MainContent;
