import React from "react";
import { Container, Typography } from "@mui/material";

const TodoList: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Todo List
      </Typography>
    </Container>
  );
};

export default TodoList;
