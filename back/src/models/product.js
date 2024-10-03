import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    brand: {
        type: String,
    },
    color: {
        type: String,
    },
    size: [{
        name: { type: String },
        quantity: { type: String }
    }],
    imageUrl: {
        type: String,
    },
    ratings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ratings"
        },
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "reviews"
        }
    ],
    numRatings: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

const Product = mongoose.model("products", ProductSchema)
export default Product;