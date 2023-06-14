import express from "express";
import dotenv from "dotenv";
dotenv.config();
import {
    addBook,
    getBookById,
    getBooks,
} from "../controllers/bookControllers.js";

const router = express.Router();

router.route("/").get(getBooks).post(addBook);
router.route("/:id").get(getBookById);

export default router;
