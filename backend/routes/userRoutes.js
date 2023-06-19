import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/userControllers.js";
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;
