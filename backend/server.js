import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const port = process.env.PORT || 5050;

connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie parser middleware
app.use(cookieParser());

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve(); // Set __dirname to current directory

if (process.env.NODE_ENV === "production") {
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
