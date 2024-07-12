import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  // Menu as MenuIcon,
  Edit as EditIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
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
      <Toolbar />
    </>
  );
};

export default Header;
