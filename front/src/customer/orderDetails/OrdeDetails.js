import React, { useEffect } from "react";
import AddressCart from "../AddressCart/AddressCart";
import OrderTracking from "./OrderTracking";
import { Box, Grid } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findOrderById } from "../../state/Order/Action";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(findOrderById(orderId));
    }
  }, [dispatch, orderId]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error fetching products: {error}</div>;
  }

  const shippingAddress = order?.shippingAddress;

  // Determine active step based on order status
  const stepMapping = {
    PLACED: 0,
    CONFIRMED: 1,
    SHIPPED: 2,
    "OUT FOR DELIVERY": 3,
    DELIVERED: 4,
  };
  const activeStep = stepMapping[order?.orderStatus] || 0;

  return (
    <div className="px-5 lg:px-20">
      <div>
        <h1 className="font-bold text-xl py-7">Delivery Address</h1>
        <AddressCart address={shippingAddress} />
      </div>

      <div className="py-20">
        <OrderTracking activeStep={activeStep} />
      </div>

      {order && (
        <Grid className="space-y-5" container>
          <Grid
            key={order._id}
            item
            container
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center space-x-4">
                <img
                  className="w-[10rem] h-[10rem] object-cover object-top"
                  src={
                    order.orderItems[0].product[0].imageUrl ||
                    "https://via.placeholder.com/150"
                  }
                  alt={order.title || "Product Image"}
                />
                <div className="ml-2 mt-2">
                  <p className="font-semibold">
                    {order.orderItems[0].product[0].title}
                  </p>
                  <p className="opacity-60 text-sm space-x-5">
                    <span>Brand: {order.orderItems[0].product[0].brand}</span>
                  </p>
                  <p>₹{order.orderItems[0].price}</p>
                  <p>{order.orderItems[0].description}</p>
                </div>
              </div>
            </Grid>

            <Grid item>
              <Box sx={{ color: "gray" }}>
                <StarBorderIcon />
                <span>Rate & Review Product</span>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default OrderDetails;
