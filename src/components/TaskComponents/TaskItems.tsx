import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import React, { useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { Task, TaskItemProps } from "../../types";

// --------------------------------------------

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTaskContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const open = Boolean(anchorEl);

  const handleUpdateStatus = (taskId: string, status: Task["status"]) => {
    updateTask(taskId, { status });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setAnchorEl(null); // Close menu on edit mode
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSubmitEdit = () => {
    // Perform update only if there are changes
    if (editedTitle !== task.title || editedDescription !== task.description) {
      updateTask(task._id, {
        title: editedTitle,
        description: editedDescription,
      });
    }
    setEditMode(false);
  };

  return (
    <Box
      sx={{
        userSelect: "none",
        padding: 1,
        margin: "0 0 8px 0",
        backgroundColor: "#fff",
        borderRadius: 1,
        boxShadow: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ flex: 1 }}>
        {!editMode ? (
          <>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {task.title}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "small" }}>
              {task.description}
            </Typography>
          </>
        ) : (
          <>
            <TextField
              fullWidth
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <Box mt={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitEdit}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </Box>
          </>
        )}
      </Box>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {task.status !== "completed" && (
          <MenuItem
            onClick={() => {
              handleUpdateStatus(task._id, "completed");
              handleClose();
            }}
          >
            Mark as Completed
          </MenuItem>
        )}
        {task.status !== "pending" && (
          <MenuItem
            onClick={() => {
              handleUpdateStatus(task._id, "pending");
              handleClose();
            }}
          >
            Move to Todo
          </MenuItem>
        )}
        {task.status !== "in-progress" && (
          <MenuItem
            onClick={() => {
              handleUpdateStatus(task._id, "in-progress");
              handleClose();
            }}
          >
            Move to In-Progress
          </MenuItem>
        )}
        {!editMode ? (
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        ) : (
          <MenuItem onClick={handleCancelEdit}>Cancel</MenuItem>
        )}
        <MenuItem
          onClick={() => {
            deleteTask(task._id);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TaskItem;
