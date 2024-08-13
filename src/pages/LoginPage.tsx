import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "react-query";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { notifySuccess, notifyError } from "../utils/notification";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<{
    email?: string;
    password?: string;
  }>({});

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      setUser(data.data);
      notifySuccess("You are successfully logged in");
      navigate("/");
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
      notifyError(error.message);
    },
  });

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      mutation.mutate({ email, password });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!formError.email}
                  helperText={formError.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!formError.password}
                  helperText={formError.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? <CircularProgress size={24} /> : "Login"}
            </Button>
            <Typography variant="body2" align="center">
              Don't have an account?{" "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Sign Up here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
