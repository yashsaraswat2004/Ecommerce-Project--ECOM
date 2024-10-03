import React from "react";
import { Grid } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCart = ({
  imageUrl,
  brand,
  title,
  size,
  totalPrice,
  delivered,
  quantity,
  deliveryDate,
  orderStatus,
  orderId,
}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/account/order/${orderId}`)}
      className="p-5 shadow-lg hover:shadow-2xl cursor-pointer"
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <div className="flex items-center">
            <img
              className="w-[5rem] sm:w-[7rem] h-[5rem] sm:h-[7rem] object-cover"
              src={imageUrl || "https://via.placeholder.com/150"}
              alt={title || "Product Image"}
            />
            <div className="ml-5 space-y-2">
              <p>
                {brand || "Brand"} - {title || "Product Title"}
              </p>
              <p className="opacity-50 text-xs font-semibold">
                Size: {size || "N/A"}
              </p>
              <p className="opacity-50 text-xs font-semibold">
                Quantity: {quantity || 1}
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={2}>
          <p className="font-semibold text-center sm:text-left">
            ₹{totalPrice || 0}
          </p>
        </Grid>

        <Grid item xs={12} sm={4}>
          {delivered ? (
            <div className="flex items-center space-x-2 justify-center sm:justify-start">
              <AdjustIcon
                sx={{ width: "30px", height: "30px" }}
                className="text-green-600"
              />
              <span className="text-sm">
                Delivered on {deliveryDate || "N/A"}
              </span>
            </div>
          ) : (
            <p className="text-sm text-center sm:text-left">
              Expected Delivery within 7 Days
            </p>
          )}
          <p className="text-sm text-center sm:text-left">
            Order Status: {orderStatus || "Pending"}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCart;
