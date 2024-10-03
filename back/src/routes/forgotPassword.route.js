import express from "express";
import authmiddlware from "../middleware/auth.middleware.js"
import forgotPassword from "../controller/forgotPassword.controller.js";

const router = express.Router();

router.post("/recoverPassword", forgotPassword.recoverPassword);
router.post("/resetPassword", forgotPassword.resetPassword);

export default router;