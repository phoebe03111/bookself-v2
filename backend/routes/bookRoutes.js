import express from "express";
import dotenv from 'dotenv'
dotenv.config();
const router = express.Router();
import { getBooks } from "../controllers/bookControllers.js";

router.route("/").get(getBooks);

export default router;
