import express from "express";
import authmiddlware from "../middleware/auth.middleware.js"
import adminControlers from "../controller/admin.controlers.js";

const router = express.Router();

router.get("/", authmiddlware, adminControlers.getAllOrders);
router.put("/:id/confirmed", authmiddlware, adminControlers.confirmOrder);
router.put("/:id/cancel", authmiddlware, adminControlers.cancelOrder);
router.delete("/:id/delete", authmiddlware, adminControlers.deleteOrder);
router.put("/:id/deliver", authmiddlware, adminControlers.deliverOrder);
router.get("/:id/ship", authmiddlware, adminControlers.shipOder);
router.get("/customer/:id/delete", authmiddlware, adminControlers.deleteCustomer);

export default router;