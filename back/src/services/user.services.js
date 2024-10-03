import jwtProvider from "../config/jwtProvider.js";
import Order from "../models/order.js";
import User from "../models/user.models.js";
import bcrypt from "bcrypt";

// Function to create a new user
const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;

        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new Error(`User already exists with email ${email}`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        return user;

    } catch (error) {
        throw new Error(error.message);
    }
};

// Function to find a user by ID
const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate("address");
        if (!user) {
            throw new Error(`User not found with userID: ${userId}`);
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to find a user by email
const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(`User not found with email: ${email}`);
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token)

        const user = await findUserById(userId);

        if (!user) {
            throw new Error(`User not found with userID: ${userId}`);
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

const getAllUser = async () => {
    try {
        // Fetch orders and populate user details
        const orders = await Order.find().populate('user');

        // Create a map to store aggregated data for each user
        const userOrderMap = new Map();

        orders.forEach(order => {
            if (order.user) {
                const userId = order.user._id.toString();

                // If the user already exists in the map, update their totalPrice and order count
                if (userOrderMap.has(userId)) {
                    const existingUserOrder = userOrderMap.get(userId);
                    existingUserOrder.totalPrice += order.totalPrice;
                    existingUserOrder.orderCount += 1;
                } else {
                    // Otherwise, add a new entry for the user
                    userOrderMap.set(userId, {
                        userId: userId,
                        name: `${order.user.firstName} ${order.user.lastName}`,
                        email: order.user.email,
                        totalPrice: order.totalPrice,
                        orderCount: 1,
                    });
                }
            }
        });

        // Convert the map values into an array for returning
        const aggregatedOrders = Array.from(userOrderMap.values());

        return aggregatedOrders;
    } catch (error) {
        console.error("Error fetching orders with user details:", error.message);
        throw new Error(error.message);
    }
};




export default { createUser, findUserById, getUserByEmail, getUserProfileByToken, getAllUser };
