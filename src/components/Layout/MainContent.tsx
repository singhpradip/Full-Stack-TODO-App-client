import { Outlet } from "react-router-dom";
import { Toolbar } from "@mui/material";

const MainContent = () => {

  return (
    <main
      style={{
        flexGrow: 1,
        padding: "0 10px",
        marginLeft: "180px",
        marginTop: "10px",
      }}
    >
      <Toolbar />
      <Outlet />
    </main>
  );
};

export default MainContent;
