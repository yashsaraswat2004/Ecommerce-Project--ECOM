import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import OrderCart from "./OrderCart";
import { useDispatch, useSelector } from "react-redux";
import { orderHistory, orderHistoryS } from "../../state/Order/Action";

const orderStatus = [
  { label: "Shipping", value: "shipping" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((store) => store.order);
  const userId = useSelector((state) => state.auth.user?._id);

  useEffect(() => {
    if (userId) {
      dispatch(orderHistory(userId));
      // dispatch(orderHistoryS(userId));
    }
  }, [userId, dispatch]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error fetching orders: {error}</div>;
  }

  const ordersArray = Array.isArray(orders) ? orders : [];
  return (
    <div className="px-5 lg:px-20">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filter</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>
              {orderStatus.map((option) => (
                <div className="flex items-center" key={option.value}>
                  <input
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 text-gray-900 focus:ring-gray-800"
                    defaultValue={option.value}
                  />
                  <label
                    className="ml-3 text-sm text-gray-600"
                    htmlFor={option.value}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          sm={8.5}
          sx={{ marginLeft: { sm: "3rem", xs: "0" } }}
        >
          <div className="space-y-5">
            {ordersArray.length > 0 ? (
              ordersArray.map((orderItem) =>
                orderItem.orderItems?.map((item) => (
                  <OrderCart
                    key={item._id} // Use item._id instead of index._id
                    imageUrl={item.product?.[0]?.imageUrl}
                    brand={item.product?.[0]?.brand}
                    title={item.product?.[0]?.title}
                    size={item.size}
                    totalPrice={orderItem.totalPrice}
                    orderStatus={orderItem.orderStatus}
                    delivered={orderItem.orderStatus === "delivered"}
                    deliveryDate={orderItem.deliveryDate}
                    quantity={orderItem.totalItem}
                    orderId={orderItem._id}
                  />
                ))
              )
            ) : (
              <div>No orders found</div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
