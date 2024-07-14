import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  InputBase,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

import React, { useState, useRef, useEffect } from "react";
import { useTaskContext } from "../../context/TaskContext";
import { Task, TaskItemProps } from "../../types";

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTaskContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const open = Boolean(anchorEl);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleUpdateStatus = (taskId: string, status: Task["status"]) => {
    updateTask(taskId, { status });
  };

  const handleOptionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setEditMode(true);
    setAnchorEl(null);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const handleSubmitEdit = () => {
    if (editedTitle !== task.title || editedDescription !== task.description) {
      updateTask(task._id, {
        title: editedTitle,
        description: editedDescription,
      });
    }
    setEditMode(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      handleSubmitEdit();
    }
  };

  useEffect(() => {
    if (editMode) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editMode]);

  return (
    <Box
      ref={containerRef}
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
      {/* show task info or edit boxes */}
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
            <InputBase
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              fullWidth
              sx={{
                fontWeight: "bold",
                typography: "subtitle1",
                marginBottom: 1,
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                paddingBottom: "4px",
              }}
            />
            <InputBase
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              fullWidth
              multiline
              rows={3}
              sx={{
                typography: "body2",
                fontSize: "small",
                borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                paddingBottom: "4px",
              }}
            />
          </>
        )}
      </Box>

      {/* show icons like options, save and calcel */}
      {!editMode ? (
        <IconButton onClick={handleOptionsClick}>
          <MoreVertIcon />
        </IconButton>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Button
            startIcon={<CancelIcon />}
            color="secondary"
            onClick={handleCancelEdit}
            sx={{ marginBottom: 1 }}
          />
          <Button
            startIcon={<CheckIcon />}
            color="primary"
            onClick={handleSubmitEdit}
          />
        </Box>
      )}

      {/* shwo task options model */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleOptionsClose}>
        {task.status !== "completed" && (
          <MenuItem
            onClick={() => {
              handleUpdateStatus(task._id, "completed");
              handleOptionsClose();
            }}
          >
            Mark as Completed
          </MenuItem>
        )}
        {task.status !== "pending" && (
          <MenuItem
            onClick={() => {
              handleUpdateStatus(task._id, "pending");
              handleOptionsClose();
            }}
          >
            Move to Todo
          </MenuItem>
        )}
        {task.status !== "in-progress" && (
          <MenuItem
            onClick={() => {
              handleUpdateStatus(task._id, "in-progress");
              handleOptionsClose();
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
            handleOptionsClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TaskItem;
