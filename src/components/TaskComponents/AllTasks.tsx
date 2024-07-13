import { useTaskContext } from "../../context/TaskContext";
import { Box, Container, Typography } from "@mui/material";
import TaskContainer from "./AllTasksTaskContainer";

export default function AllTasks() {
  const { tasks } = useTaskContext();

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        All Tasks
      </Typography>
      <Box display="flex" justifyContent="space-around">
        {["pending", "in-progress", "completed"].map((status) => (
          <TaskContainer
            key={status}
            status={status}
            tasks={getTasksByStatus(status)}
          />
        ))}
      </Box>
    </Container>
  );
}
