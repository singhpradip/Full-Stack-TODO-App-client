import { useTaskContext } from "../../context/TaskContext";
import { Box, Container, Typography, Grid } from "@mui/material";
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
      <Grid container spacing={3}>
        {["pending", "in-progress", "completed"].map((status) => (
          <Grid item xs={12} md={4} key={status}>
            <TaskContainer status={status} tasks={getTasksByStatus(status)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
