import { Outlet } from "react-router-dom";
import { Toolbar, useMediaQuery, Theme } from "@mui/material";
const MainContent = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const drawerWidth = isSmallScreen ? 40 : 200;

  return (
    <main
      style={{
        flexGrow: 1,
        marginTop: "10px",
        marginLeft: `${drawerWidth}px`,
        paddingRight: "10px",
      }}
    >
      <Toolbar />
      <Outlet />
    </main>
  );
};

export default MainContent;
