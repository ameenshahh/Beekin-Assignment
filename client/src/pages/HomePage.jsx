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

const HomePage = () => {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    userId: userId || "",
    phone: "",
    email: "",
    name: "",
    dob: "",
  });

  const [formErrors, setFormErrors] = useState({
    phone: "",
    email: "",
    name: "",
    dob: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/form/${userId}`)
      .then((response) => {
        if (response.data.status) {
          let existingData = response.data.userDetails;
          setFormData({
            userId: existingData.user || "",
            phone: existingData.phone || "",
            email: existingData.email || "",
            name: existingData.name || "",
            dob: existingData.dob || "",
          });
        }
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      userId: userId || "",
    }));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.phone) {
      errors.phone = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone Number must be a 10-digit number";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.dob) {
      errors.dob = "Date of Birth is required";
    }

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      setLoading(true);
      axios
        .post("http://localhost:4000/form/addUserDetails", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data) {
            setError(false);
            navigate(`/result`);
          } else {
            setError(true);
          }
        });
    }
  };

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
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
          Fill this form to continue
        </Typography>

        <form noValidate onSubmit={formSubmitHandler}>
          <TextField
            margin="normal"
            fullWidth
            id="phone"
            label="Phone Number"
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            autoComplete="number"
            autoFocus
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />

          {formErrors.phone && (
            <Typography variant="body2" color="error">
              {formErrors.phone}
            </Typography>)
          }

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
            </Typography>)
          }

          <TextField
            margin="normal"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            label="Name"
            type="text"
            id="name"
          />

          {formErrors.name && (
            <Typography variant="body2" color="error">
              {formErrors.name}
            </Typography>)
          }

          <TextField
            margin="normal"
            fullWidth
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            label="Date of Birth"
            type="date"
            id="dob"
            InputLabelProps={{
              shrink: true,
            }}
          />

          {formErrors.dob && (
            <Typography variant="body2" color="error">
              {formErrors.dob}
            </Typography>)
          }
          <input type="hidden" name="userId" value={formData.userId} />

          <Grid container spacing={8} style={{ justifyContent: "space-between" }}>
            <Grid item>
              <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2, mr: 3 }} onClick={cancelHandler}>
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
                </Box>)
              }
              {error && (
                <Box sx={{ display: "flex", marginTop: 2 }}>
                  An Error occurred
                </Box>)
              }
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default HomePage;
