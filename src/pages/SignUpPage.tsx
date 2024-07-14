import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "react-query";
import {
  TextField,
  Button,
  Container,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { signup, verifyAccount } from "../services/authService";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    otp?: string;
  }>({});

  const signupMutation = useMutation(
    (signUpData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }) => signup(signUpData),
    {
      onSuccess: () => {
        setShowVerification(true);
        setError("");
      },
      onError: (error: any) => {
        console.error("Sign-up failed:", error);
        setError(error.message);
      },
    }
  );

  const verifyOtpMutation = useMutation((otp: string) => verifyAccount(otp), {
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: any) => {
      console.error("OTP verification failed:", error);
      setError(error.message);
    },
  });

  const validateForm = (): boolean => {
    const errors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!firstName.trim()) {
      errors.firstName = "First Name is required";
    }

    if (!lastName.trim()) {
      errors.lastName = "Last Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setError("");
      signupMutation.mutate({ firstName, lastName, email, password });
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpRegex = /^\d{6}$/;
    if (!otp.match(otpRegex)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        otp: "OTP must be a 6-digit number",
      }));
      return;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      otp: "",
    }));

    verifyOtpMutation.mutate(otp);
  };

  const handleGoBack = () => {
    setShowVerification(false);
    setOtp(""); // Clear OTP field when going back
    setError(""); // Clear any existing error messages
    setFormErrors({}); // Clear form errors
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        {!showVerification ? (
          <>
            <Typography component="h1" variant="h5" align="center" gutterBottom>
              Sign Up
            </Typography>
            {error && (
              <Typography
                color="error"
                variant="body1"
                align="center"
                gutterBottom
              >
                {error}
              </Typography>
            )}
            <Box
              component="form"
              onSubmit={handleSignUp}
              noValidate
              sx={{ mt: 2 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    fullWidth
                    autoFocus
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
                    required
                  />
                </Grid>
              </Grid>
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                error={!!formErrors.email}
                helperText={formErrors.email}
                required
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                error={!!formErrors.password}
                helperText={formErrors.password}
                required
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={signupMutation.isLoading}
              >
                {signupMutation.isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Sign Up"
                )}
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography variant="body2">
                    Already have an account?{" "}
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      Login here
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={handleGoBack}
                sx={{ position: "absolute", left: 0, top: 0 }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h5"
                align="center"
                gutterBottom
              >
                Verify OTP
              </Typography>
            </Box>
            {error && (
              <Typography
                color="error"
                variant="body1"
                align="center"
                gutterBottom
              >
                {error}
              </Typography>
            )}
            <Box
              component="form"
              onSubmit={handleVerifyOtp}
              noValidate
              sx={{ mt: 2 }}
            >
              <TextField
                label="Enter OTP"
                type="text"
                fullWidth
                autoFocus
                margin="normal"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                error={!!formErrors.otp}
                helperText={formErrors.otp}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={verifyOtpMutation.isLoading}
              >
                {verifyOtpMutation.isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Verify OTP"
                )}
              </Button>

              <Typography variant="body2" align="center">
                {/* Didn't receive OTP? <Link>Resend OTP</Link> */}
              </Typography>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default SignUp;
