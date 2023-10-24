import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // useEffect(async () => {
  //   // Get the token from the cookie
  //   const storedToken = localStorage.getItem("token");
  //   if(storedToken === null){
  //     localStorage.setItem("token", "");
  //   }

  //   try {
  //     const tokenResponse = await axios.post('http://localhost:5000/isloggedin', null, {headers: {"x-auth-token": storedToken}});
  //     if (tokenResponse.data) {
        
  //     }

  //   } catch (error) {
  //     error.response.data.message &&
  //       setErrorMessage(error.response.data.message);
  //   }
  //   setToken(storedToken);
  //   if(storedToken){
  //     navigate('/')
  //   }
  // }, []);

  // custom form validator
  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.name = "Password is required";
    }

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const isFormValid = validateForm();
      if (isFormValid) {
        setLoading(true);
        const signupResponse = await axios.post(
          "http://localhost:5000/signup",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
          console.log(`signupResponse is ${JSON.stringify(signupResponse)}`)
          console.log(signupResponse.data.token)
        setToken(signupResponse.data.token);
        localStorage.setItem("token", signupResponse.data.token);
        navigate("/");
      }
    } catch (error) {
      error.response.data.message &&
        setErrorMessage(error.response.data.message);
    }
  };

  const cancelHandler = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        style={{
          padding: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Sign up
        </Typography>

        <form noValidate onSubmit={formSubmitHandler}>
          <TextField
            margin="normal"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
          />

          {formErrors.email && (
            <Typography variant="body2" color="error">
              {formErrors.email}
            </Typography>
          )}

          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            margin="normal"
            fullWidth
            onChange={handleInputChange}
          />

          {formErrors.name && (
            <Typography variant="body2" color="error">
              {formErrors.name}
            </Typography>
          )}

          <Grid
            container
            spacing={8}
            style={{ justifyContent: "space-between" }}
          >
            <Grid item>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2, mr: 3 }}
                onClick={cancelHandler}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              {!loading && (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              )}
              {loading && (
                <Box sx={{ display: "flex", marginTop: 2 }}>
                  <CircularProgress />
                </Box>
              )}
              {error && (
                <Box sx={{ display: "flex", marginTop: 2 }}>
                  An Error occurred
                </Box>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
