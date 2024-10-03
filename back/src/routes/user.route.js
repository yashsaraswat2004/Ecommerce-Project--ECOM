import express from "express";
import userController from "../controller/user.controller.js";
import authmiddlware from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/profile", authmiddlware, userController.getUserProfile);
router.get("/", authmiddlware, userController.getAllUsers);

export default router;