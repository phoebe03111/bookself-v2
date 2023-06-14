import asyncHandler from "../middleware/asyncHandler.js";
import Book from "../models/bookModel.js";

// @desc    Fetch all books
// @route   GET /api/books
// @access  Private
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.status(200).json(books);
});

// @desc    Fetch a book
// @route   GET /api/books/:id
// @access  Private
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    return res.json(book);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

// @desc    Add a book
// @route   POST /api/books
// @access  Private
const addBook = asyncHandler(async (req, res) => {
  const createdBook = await Book.create(req.body)

  res.status(201).json(createdBook);
});

export { getBooks, getBookById, addBook };
