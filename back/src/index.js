import express, { Router } from "express";
import cors from "cors";
const router = Router();
const app = express();

app.use(express.json());
app.use(cors());

// ROUTERS
import authRouter from "./routes/auth.route.js";
import userRouters from "./routes/user.route.js";
import adminProductRouter from "./routes/admin.product.route.js";
import productRouter from "./routes/user.product.route.js";
import cartRouter from "./routes/cart.route.js";
import cartItemRouter from "./routes/cartItem.route.js";
import orderRouter from "./routes/order.route.js";
import reviewRouter from "./routes/review.route.js";
import forgotPasswordRoute from "./routes/forgotPassword.route.js"
import paymentRouter from "./routes/paymentRoute.js"
import adminOrderRouter from "./routes/adminOrder.route.js"

app.use("/auth", authRouter);   
app.use("/api/users", userRouters); 
app.use("/api/admin/products", adminProductRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/cart_Items", cartItemRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/forgotPassword", forgotPasswordRoute);
app.use("/api/admin/orders",adminOrderRouter)
app.use("/api/payments", paymentRouter)




export { app };
