import express from "express";
import dotenv from "dotenv";
dotenv.config();
import {
  addBook,
  getBookById,
  getBooks,
  updateBook,
  deleteBook,
} from "../controllers/bookControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getBooks).post(protect, addBook);
router
  .route("/:id")
  .get(protect, getBookById)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

export default router;
