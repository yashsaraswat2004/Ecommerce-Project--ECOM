import Address from "../models/address.js";
import cartServices from "./cart.services.js";
import Order from "../models/order.js";
import OrderItem from "../models/orderItems.js";
import User from "../models/user.models.js";

const createOrder = async (user, shippingAddress) => {
  try {
    let address;
    if (shippingAddress._id) {
      address = await Address.findById(shippingAddress._id);
    } else {
      address = new Address(shippingAddress);
      address.user = user._id;
      await address.save();

      user.address.push(address._id);
      await user.save();
    }

    const cart = await cartServices.findUserCart(user._id);
    const orderItems = [];

    for (const item of cart.cartItem) {
      const orderItem = new OrderItem({
        price: item.price,
        product: item.product,
        quantity: item.quantity,
        size: item.size,
        userId: user._id,
      });
      const createdOrderItem = await orderItem.save();
      orderItems.push(createdOrderItem);
    }

    const createdOrder = new Order({
      user: user._id,
      orderItems,
      shippingAddress: address._id,
      totalPrice: cart.totalPrice,
      totalItem: cart.totalItem,
    });

    const savedOrder = await createdOrder.save();

    // Update user's totalSpent
    user.totalSpent += cart.totalPrice;
    await user.save(); // Save the updated user object

    return savedOrder;
  } catch (error) {
    console.error("Error in createOrder:", error.message);
    throw new Error(error.message);
  }
};

const placedOrder = async (orderId) => {
  try {
    const order = await findOrderById(order);

    if (order) {
      order.status = "PLACED";
      order.paymentDetails.status = "COMPLETED";
    }
    return await order.save();
  } catch (error) {
    throw new Error({
      error: error.messsage("order is not placed something gone wrong"),
    });
  }
};

const confirmOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    if (order) {
      order.orderStatus = "CONFIRMED"; // Change this to orderStatus
      order.paymentDetails.paymentStatus = "COMPLETED"; // Assuming you want to update this as well
      return await order.save();
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    throw new Error(
      "Order is not confirmed; something went wrong: " + error.message
    );
  }
};

const shiftOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    if (order) {
      order.orderStatus = "SHIPPED";
      order.paymentDetails.paymentStatus = "COMPLETED";
      return await order.save();
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    throw new Error(
      "Order is not SHIPPED; something went wrong: " + error.message
    );
  }
};

const deliveredOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);

    if (order) {
      order.orderStatus = "DELIVERED";
      order.paymentDetails.paymentStatus = "COMPLETED";
      return await order.save();
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    throw new Error(
      "Order is not DELIVERED; something went wrong: " + error.message
    );
  }
};

const cancelledOrder = async (orderId) => {
  try {
    const order = await findOrderById(orderId);
    if (order) {
      order.orderStatus = "CANCELLED";
      order.paymentDetails.paymentStatus = "CANCELLED";
      return await order.save();
    } else {
      throw new Error("Order not found");
    }
  } catch (error) {
    throw new Error(
      "Order is not CANCELLED; something went wrong: " + error.message
    );
  }
};

const findOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId)
      .populate("user")
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
        },
      })
      .populate("shippingAddress");

    return order;
  } catch (error) {
    console.error("subhrajit:", error.message); // Log error
    throw new Error(error.message);
  }
};

async function userOrderHistory(userId) {
  try {
    const orderStatuses = ["CONFIRMED", "SHIPPED", "DELIVERED"]; // Add the statuses you want to include

    const orders = await Order.find({
      user: userId,
      orderStatus: { $in: orderStatuses }, // Use $in to match multiple statuses
    })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();

    return orders;
  } catch (error) {
    console.error("Error fetching user order history:", error.message);
    throw new Error({ error: error.message });
  }
}

async function userOrderHistoryS(userId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "SHIPPED" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (error) {
    console.error("Error fetching user order history:", error.message);
    throw new Error({ error: error.message });
  }
}

async function getAllOrders() {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
}

async function deleteOrder(orderId) {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  await Order.findByIdAndDelete(orderId);
  return order; // Return the deleted order or a success message
}

async function deleteCustomer(orderId) {
  const order = await User.findById(orderId);
  if (!order) {
    throw new Error("user not found");
  }
  await Order.findByIdAndDelete(orderId);
  return order; // Return the deleted order or a success message
}

export default {
  createOrder,
  userOrderHistoryS,
  deleteCustomer,
  findOrderById,
  deleteOrder,
  getAllOrders,
  placedOrder,
  confirmOrder,
  shiftOrder,
  userOrderHistory,
  deliveredOrder,
  cancelledOrder,
};
