import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillBookmarksFill, BsFillBookmarkPlusFill } from "react-icons/bs";
import { Alert, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  useGetBooksQuery,
  useUpdateBookMutation,
} from "../../features/bookApiSlice";
import Book from "../../components/Book/Book";
import Loader from "../../components/Loader/Loader";
import FinishedBooks from "../../components/FinishedBooks/FinishedBooks";
import Droppable from "../../components/Droppable/Droppable";
import "./BooksPage.scss";

function BooksPage() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { data: books, isLoading, error } = useGetBooksQuery();

  const [updateBook] = useUpdateBookMutation();

  const handleClick = (e) => {
    const category = e.target.name;
    navigate(`/books/add/${category}`);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    const bookId = active.id;

    const bookInfo = books.find((book) => book._id === bookId);

    const res = await updateBook({ ...bookInfo, bookId, status: over.id });

    if (res.error) {
      console.log(res.error);
      enqueueSnackbar("Error updating the book", { variant: "error" });
    } else {
      enqueueSnackbar("Book udated!", { variant: "success" });
    }
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <main className="books">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert severity="error">
          Please{" "}
          <Link to="/" style={{ textDecoration: "underline" }}>
            log in
          </Link>{" "}
          first
        </Alert>
      ) : (
        <>
          {books.length === 0 && (
            <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Start adding your books!
            </p>
          )}

          <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <Droppable id="currently-reading">
              <section className="section">
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
            </Droppable>

            <Droppable id="want-to-read">
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
            </Droppable>

            <Droppable id="finished-reading">
              <section className="section">
                <FinishedBooks books={books} handleClick={handleClick} />
              </section>
            </Droppable>
          </DndContext>
        </>
      )}
    </main>
  );
}

export default BooksPage;
