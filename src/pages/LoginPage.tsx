import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      setUser(data.data); // Set user information in AuthContext
      navigate("/"); // Redirect to the main page
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
      setError(error.message || "Login failed. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    mutation.mutate({ email, password });
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
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
            fullWidth
            sx={{ mt: 2, mb: 2 }}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
