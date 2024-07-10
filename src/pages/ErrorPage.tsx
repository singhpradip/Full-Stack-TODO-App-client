import React from "react";
import { Container, Typography } from "@mui/material";

const ErrorPage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
    </Container>
  );
};

export default ErrorPage;
