import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation();
  // (signUpData: {
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  //   password: string;
  // }) => axios.post("/api/signup", signUpData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    mutation.mutate(
      { firstName, lastName, email, password },
      {
        onSuccess: () => {
          navigate("/login");
        },
        onError: (error) => {
          console.error("Sign-up failed:", error);
          setError("Sign-up failed. Please try again.");
        },
      }
    );
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default SignUp;
