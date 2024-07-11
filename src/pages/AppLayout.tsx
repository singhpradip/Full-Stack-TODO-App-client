import React, { useState, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  CssBaseline,
  Divider,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AllInbox,
  HourglassEmpty,
  PlayCircleFilled,
  CheckCircle,
  Edit as EditIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext";

const AppLayout: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    removeCookie("accessToken");
    navigate("/login");
  };

  const drawerWidth = 240;

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ zIndex: 1400 }}>
        <Toolbar>
          <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
            Todo Application
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleMenu}>
            <Avatar alt={user?.firstName} src={user?.profilePicture || ""} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            keepMounted
          >
            <MenuItem>
              <Typography variant="subtitle1">
                {user?.firstName} {user?.lastName}
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="body2">{user?.email}</Typography>
            </MenuItem>
            <Divider />
            <MenuItem>
              <EditIcon fontSize="small" />
              <Typography variant="body2" style={{ marginLeft: 10 }}>
                Edit Profile
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon fontSize="small" />
              <Typography variant="body2" style={{ marginLeft: 10 }}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        style={{
          width: drawerWidth,
          flexShrink: 0,
        }}
        PaperProps={{ style: { width: drawerWidth } }}
      >
        <Toolbar />
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
      <main style={{ flexGrow: 1, padding: "24px", marginLeft: drawerWidth }}>
        <Toolbar />
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
