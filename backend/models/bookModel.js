import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    authors: {
      type: Array,
    },
    publishedDate: {
      type: String,
    },
    quotes: {
      type: Array,
    },
    rating: {
      type: Number,
    },
    review: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
