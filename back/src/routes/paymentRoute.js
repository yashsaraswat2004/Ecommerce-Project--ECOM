import express from "express";
import authenticate from "../middleware/auth.middleware.js";
import { createPaymentLink, updatePaymentInfo } from "../controller/paymentController.js";

const router = express.Router();

// Existing routes for payment link and update
router.post("/:id", authenticate, createPaymentLink);
router.get("/", authenticate, updatePaymentInfo);


export default router;
