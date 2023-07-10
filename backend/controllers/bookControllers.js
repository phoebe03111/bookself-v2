import asyncHandler from "../middleware/asyncHandler.js";
import Book from "../models/bookModel.js";

// @desc    Fetch all books of a user
// @route   GET /api/books
// @access  Private
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({ user: req.user._id });
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
  const createdBook = await Book.create(req.body);

  res.status(201).json(createdBook);
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private
const updateBook = asyncHandler(async (req, res) => {
  const {
    image,
    title,
    authors,
    publishedDate,
    status,
    rating,
    review,
    quotes,
  } = req.body;
  const book = await Book.findById(req.params.id);

  if (book) {
    book.image = image;
    book.title = title;
    book.authors = authors;
    book.publishedDate = publishedDate;
    book.status = status;
    book.rating = rating;
    book.review = review;
    book.quotes = quotes;

    const updatedBook = await book.save();
    res.status(201).json(updatedBook);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await Book.deleteOne({ _id: book._id });
    res.status(201).json({ message: "Book deleted" });
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

export { getBooks, getBookById, addBook, updateBook, deleteBook };
