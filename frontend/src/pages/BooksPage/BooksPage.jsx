import axios from "axios";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  BsFillBookmarksFill,
  BsFillBookmarkPlusFill,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { Button } from "@mui/material";
import "./BooksPage.scss";
import { useEffect, useState } from "react";
import Book from "../../components/Book/Book";

function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get("/api/books");
      setBooks(res.data);
    };
    fetchBooks();
  }, []);

  const handleClick = (e) => {};

  return (
    <main className="books">
      <section className="section currently-reading">
        {books.length <= 0 && <p>You have not added any books</p>}
        <div className="section__topic">
          <h2 className="section__title">
            <BsFillBookmarksFill size={30} /> Currently Reading
          </h2>
          <Button
            type="button"
            color="primary"
            variant="contained"
            endIcon={<AiOutlinePlusCircle />}
            name="addCurrent"
            onClick={handleClick}
          >
            Add
          </Button>
        </div>
        <div className="books__group">
          {books &&
            books
              .filter((book) => book.status === "currently-reading")
              .map((book) => {
                return <Book key={book._id} book={book} />;
              })}
        </div>
      </section>

      <section className="section currently-reading">
        <div className="section__topic">
          <h2 className="section__title">
            <BsFillBookmarkPlusFill size={27} /> Want to read
          </h2>

          <Button
            type="button"
            color="primary"
            variant="contained"
            endIcon={<AiOutlinePlusCircle />}
            name="addToRead"
            onClick={handleClick}
          >
            Add
          </Button>
        </div>
        <div className="books__group">
          {books &&
            books
              .filter((book) => book.status === "want-to-read")
              .map((book) => {
                return <Book key={book._id} book={book} />;
              })}
        </div>
      </section>

      <section className="section currently-reading">
        <div className="section__topic">
          <h2 className="section__title">
            <BsFillBookmarkCheckFill size={30} />
            Finished Reading
          </h2>
          <Button
            type="button"
            color="primary"
            variant="contained"
            endIcon={<AiOutlinePlusCircle />}
            name="addFinished"
            onClick={handleClick}
          >
            Add
          </Button>
        </div>
        <div className="books__group">
          {books &&
            books
              .filter((book) => book.status === "finished-reading")
              .map((book) => {
                return <Book key={book._id} book={book} />;
              })}
        </div>
      </section>
    </main>
  );
}

export default BooksPage;
