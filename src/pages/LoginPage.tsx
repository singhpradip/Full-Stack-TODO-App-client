import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          localStorage.setItem("authToken", response.data.token);
          navigate("/todos");
        },
        onError: (error) => {
          console.error("Login failed:", error);
          setError("Login failed. Please try again.");
        },
      }
    );
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
