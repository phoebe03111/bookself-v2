import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  updateGoal,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/:id").put(updateGoal);

export default router;
