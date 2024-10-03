import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    orderItems: [{ // This should reference the correct model
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems", // Fixed typo from "oderItems" to "orderItems"
    }],
    orderDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    deliveryDate: {
        type: Date
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses",
    },
    paymentDetails: {
        paymentMethod: {
            type: String,
        },
        transactionId: {
            type: String,
        },
        paymentId: {
            type: String,
        },
        paymentStatus: {
            type: String,
            default: "PENDING"
        }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: "PENDING"
    },
    totalItem: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Order = mongoose.model("orders", orderSchema)
export default Order;
