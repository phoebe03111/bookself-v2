import express from "express";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
import { getBookById, getBooks } from "../controllers/bookControllers.js";

router.route("/").get(getBooks);

router.route("/:id").get(getBookById);

export default router;
