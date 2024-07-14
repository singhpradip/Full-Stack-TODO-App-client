import { useTaskContext } from "../../context/TaskContext";
import TaskItem from "./TaskItems";
import { Box, Paper, Grid, Container, Typography } from "@mui/material";

export default function PendingTasks() {
  const { tasks } = useTaskContext();
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  console.log("pendingTasks", pendingTasks);
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pending Tasks
      </Typography>
      <Box
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 2,
          width: "full",
          minHeight: "450px",
          padding: 1,
          backgroundColor: "#fafafa",
        }}
      >
        <Grid container rowSpacing={1} columnSpacing={2}>
          {pendingTasks.map((task) => (
            <Grid item xs={12} sm={6} key={task._id}>
              <TaskItem task={task} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}