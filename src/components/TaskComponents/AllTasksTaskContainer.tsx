import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { TaskContainerProps } from "../../types";
import TaskItem from "./TaskItems";

const TaskContainer: React.FC<TaskContainerProps> = ({ status, tasks }) => {
  const getStatusHeader = (status: string) => {
    switch (status) {
      case "pending":
        return "TODO";
      case "in-progress":
        return "IN-PROGRESS";
      case "completed":
        return "COMPLETED";
      default:
        return status.toUpperCase();
    }
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        borderRadius: 2,
        width: "30%",
        minHeight: "400px",
        padding: 1,
        backgroundColor: "#f0f0f0",
      }}
    >
      <Typography variant="h6" gutterBottom>
        {getStatusHeader(status)}
      </Typography>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </Box>
  );
};

export default TaskContainer;
