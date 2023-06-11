import { Link } from "react-router-dom";
import placeholder from "../../assets/images/book-placeholder.jpeg";
import "./Book.scss";

function Book({ book }) {
  return (
    <div className="book__container">
      <Link to={`/books/${book._id}`}>
        <img
          className="book__book"
          src={book.image ? book.image : placeholder}
          alt={book.name}
        />
      </Link>
      {/* <a href={book.volumeInfo.infoLink} target="_blank" rel="noreferrer">
        <img
          className="book__book"
          src={
            book?.volumeInfo?.imageLinks?.thumbnail
              ? book.volumeInfo.imageLinks.thumbnail
              : placeholder
          }
          alt={book.name}
        />
      </a> */}
    </div>
  );
}

export default Book;
