import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  AllInbox,
  HourglassEmpty,
  PlayCircleFilled,
  CheckCircle,
} from "@mui/icons-material";

const Sidebar = () => {
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      style={{
        width: drawerWidth,
        flexShrink: 0,
      }}
      PaperProps={{ style: { width: drawerWidth } }}
    >
      <Toolbar /> {/* Optional: To maintain consistent spacing */}
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <AllInbox />
          </ListItemIcon>
          <ListItemText primary="All Tasks" />
        </ListItem>
        <ListItem button component={Link} to="/pending">
          <ListItemIcon>
            <HourglassEmpty />
          </ListItemIcon>
          <ListItemText primary="Pending Tasks" />
        </ListItem>
        <ListItem button component={Link} to="/in-progress">
          <ListItemIcon>
            <PlayCircleFilled />
          </ListItemIcon>
          <ListItemText primary="In Progress Tasks" />
        </ListItem>
        <ListItem button component={Link} to="/completed">
          <ListItemIcon>
            <CheckCircle />
          </ListItemIcon>
          <ListItemText primary="Completed Tasks" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
