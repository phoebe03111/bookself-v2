import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillBookmarksFill, BsFillBookmarkPlusFill } from "react-icons/bs";
import { Alert, Button } from "@mui/material";
import { useGetBooksQuery } from "../../features/bookApiSlice";
import Book from "../../components/Book/Book";
import Loader from "../../components/Loader/Loader";
import FinishedBooks from "../../components/FinishedBooks/FinishedBooks";
import "./BooksPage.scss";

function BooksPage() {
  const { data: books, isLoading, error } = useGetBooksQuery();

  const navigate = useNavigate();

  const handleClick = (e) => {
    const category = e.target.name;
    navigate(`/books/add/${category}`);
  };

  return (
    <main className="books">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert severity="danger">{error}</Alert>
      ) : (
        <>
          <section className="section">
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
              {books
                .filter((book) => book.status === "currently-reading")
                .map((book) => {
                  return <Book key={book._id} book={book} />;
                })}
            </div>
          </section>

          <section className="section">
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
              {books
                .filter((book) => book.status === "want-to-read")
                .map((book) => {
                  return <Book key={book._id} book={book} />;
                })}
            </div>
          </section>

          <section className="section">
            <FinishedBooks books={books} handleClick={handleClick} />
          </section>
        </>
      )}
    </main>
  );
}

export default BooksPage;
