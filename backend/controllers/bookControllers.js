import Book from "../models/bookModel.js";

// @desc    Fetch all books
// @route   GET /api/books
// @access  Private
const getBooks = async (req, res) => {
  const books = await Book.find({});
  res.status(200).json(books);
};

export { getBooks };
