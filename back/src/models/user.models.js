import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true },
    roles: { type: String, required: true, default: "CUSTOMER" },
    mobile: { type: String },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "addresses"
    }],
    orders: [{ // Add orders reference here
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders"
    }],
    paymentInformation: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "payment_information"
        }
    ],
    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "rating"
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "reviews"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    totalSpent: { type: Number, default: 0 }
})

const User = mongoose.model("users", userSchema)
export default User;