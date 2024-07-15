import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
  AllInbox,
  HourglassEmpty,
  PlayCircleFilled,
  CheckCircle,
} from "@mui/icons-material";

const Sidebar = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const drawerWidth = isSmallScreen ? 60 : 240;
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Drawer variant="permanent" PaperProps={{ style: { width: drawerWidth } }}>
      <Toolbar />
      <List>
        <ListItem button component={Link} to="/" selected={isActive("/")}>
          <ListItemIcon>
            <AllInbox color={isActive("/") ? "primary" : "inherit"} />
          </ListItemIcon>
          
          {!isSmallScreen && <ListItemText primary="All Tasks" />}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/pending"
          selected={isActive("/pending")}
        >
          <ListItemIcon>
            <HourglassEmpty
              color={isActive("/pending") ? "primary" : "inherit"}
            />
          </ListItemIcon>
          {!isSmallScreen && <ListItemText primary="Pending Tasks" />}
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/in-progress"
          selected={isActive("/in-progress")}
        >
          <ListItemIcon>
            <PlayCircleFilled
              color={isActive("/in-progress") ? "primary" : "inherit"}
            />
          </ListItemIcon>
          {!isSmallScreen && <ListItemText primary="In Progress Tasks" />}
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/completed"
          selected={isActive("/completed")}
        >
          <ListItemIcon>
            <CheckCircle
              color={isActive("/completed") ? "primary" : "inherit"}
            />
          </ListItemIcon>
          {!isSmallScreen && <ListItemText primary="Completed Tasks" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
