import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography, Paper, Container } from "@mui/material";
import AddressCart from "../AddressCart/AddressCart";
import { useDispatch } from "react-redux";
import { createNewOrder } from "../../state/Order/Action";
import { useNavigate } from "react-router-dom";

const DeliveryAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validation = (formData) => {
    let newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pinCode) newErrors.pinCode = "Pin Code is required";
    else if (formData.pinCode.length < 6 || formData.pinCode.length > 6) {
      newErrors.pinCode = "Pin Code must be exactly of 6 digits";
    }
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (formData.phone.length < 10 || formData.phone.length > 10) {
      newErrors.phone = "Phone Number must be exactly of 10 digit";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validation(formData)) return;
    const address = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      streetAddress: formData.streetAddress,
      city: formData.city,
      state: formData.state,
      pinCode: formData.pinCode,
      mobile: formData.phone,
    };

    const orderData = { address, navigate };
    dispatch(createNewOrder(orderData));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Delivery Address
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Address Preview
            </Typography>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
              <AddressCart address={formData} />
            </Box>
            <Button
              onClick={handleSubmit}
              sx={{ mt: 'auto', bgcolor: "primary.main", color: "white", '&:hover': { bgcolor: "primary.dark" } }}
              size="large"
              variant="contained"
              fullWidth
            >
              Deliver Here
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Enter Delivery Details
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="streetAddress"
                    name="streetAddress"
                    label="Address"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.streetAddress}
                    onChange={handleChange}
                    error={!!errors.streetAddress}
                    helperText={errors.streetAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    value={formData.city}
                    onChange={handleChange}
                    error={!!errors.city}
                    helperText={errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State"
                    fullWidth
                    value={formData.state}
                    onChange={handleChange}
                    error={!!errors.state}
                    helperText={errors.state}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="pinCode"
                    name="pinCode"
                    label="Pincode"
                    fullWidth
                    value={formData.pinCode}
                    onChange={handleChange}
                    error={!!errors.pinCode}
                    helperText={errors.pinCode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phone"
                    name="phone"
                    label="Phone"
                    fullWidth
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DeliveryAddress;
