import React, { useEffect } from "react";
import AddressCart from "../AddressCart/AddressCart";
import { Button, Paper, Typography, Divider, Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { findOrderById } from "../../state/Order/Action";
import { useLocation } from "react-router-dom";
import { createPayment } from "../../state/payment/Action";
import OrderSummeryProduct from "./OrderSummeryProduct";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { order } = useSelector((store) => store);
  const { auth } = useSelector((store) => store);
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  const { payment, loading, error } = useSelector((store) => store.payment);

  useEffect(() => {
    dispatch(findOrderById(orderId));
  }, [orderId, dispatch]);

  useEffect(() => {
    if (error) {
      alert(`Payment Error: ${error}`);
    }
  }, [error]);

  const user = auth.user;  // Pass the full user object, not just firstName
  console.log("user", user)
  const handleCheckout = () => {
    dispatch(createPayment(orderId, user));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Summary
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>
        <AddressCart address={order.order?.shippingAddress} />
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Paper elevation={3} sx={{ flex: 2, padding: 3, marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>
          {/* Correct field for accessing orderItems */}
          {order.order?.orderItems?.map((item) => (
            <OrderSummeryProduct key={item._id} item={item} />
          ))}
        </Paper>

        <Paper elevation={3} sx={{ flex: 1.5, padding: 3, position: 'sticky', top: 20, alignSelf: 'flex-start' }}>
          <Typography variant="h6" gutterBottom>
            Price Details
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1">₹ {order.order?.totalPrice}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Delivery & Handling</Typography>
            <Typography variant="body1" color="success.main">
              FREE
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">₹ {order.order?.totalPrice}</Typography>
          </Box>
          <Button
            onClick={handleCheckout}
            variant="contained"
            fullWidth
            size="large"
            sx={{ bgcolor: 'black', '&:hover': { bgcolor: 'grey.900' } }}
          >
            Proceed to Checkout
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default OrderSummary;
