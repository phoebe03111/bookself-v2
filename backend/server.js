import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 5050;

connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
