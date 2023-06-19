import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Alert, Button, ButtonGroup } from "@mui/material";
import { AiFillEdit, AiOutlinePlusCircle } from "react-icons/ai";
import { BsTrash3, BsArrowLeftCircleFill } from "react-icons/bs";
import { useSnackbar } from "notistack";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../../features/bookApiSlice";
import Loader from "../../components/Loader/Loader";
import BookRating from "../../components/BookRating/BookRating";
import BookStatus from "../../components/BookStatus/BookStatus";
import BookQuotes from "../../components/BookQuotes/BookQuotes";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal/ConfirmDeleteModal";
import "./BookDetailPage.scss";

function BookDetailPage() {
  const { bookId } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("N/A");
  const [quotes, setQuotes] = useState([]);
  const [message, setMessage] = useState({
    open: false,
    text: "",
    severity: "info",
  });

  const {
    data: book,
    isLoading,
    error: errorLoading,
    refetch,
  } = useGetBookByIdQuery(bookId);
  const [updateBook] = useUpdateBookMutation();

  useEffect(() => {
    if (book) {
      setStatus(book.status);
      setRating(book.rating);
      setReview(book.review);
      setQuotes(book.quotes);
    }
  }, [book]);

  const { image, title, authors, publishedDate } = !isLoading && book;

  const handleSave = async () => {
    const updatedBookInfo = {
      bookId,
      image,
      title,
      authors,
      publishedDate,
      status,
      rating,
      review,
      quotes,
    };
    const result = await updateBook(updatedBookInfo);

    if (result.error) {
      console.log(result.error.error);
      enqueueSnackbar("Error updating the book", { variant: "error" });
    } else {
      enqueueSnackbar("Book udated!", { variant: "success" });
      setIsEditing(false);
      refetch();
    }
  };

  const handleAddQuote = () => {
    const newQuoteValues = [...quotes, ""];
    setQuotes(newQuoteValues);
  };

  return (
    <main className="book-detail">
      <Link to="/books" className="go-back-button">
        <BsArrowLeftCircleFill size={23} /> Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : errorLoading ? (
        <Alert severity="error">{errorLoading}</Alert>
      ) : (
        <div className="book-detail__container">
          <div className="book__top">
            <div>
              <img className="book__image" src={image} alt={title} />
              <div className="book__image-bg"></div>
            </div>

            <div className="book__info">
              <div className="book__info-item">
                <span className="book__info-title">Title</span>: {title}
              </div>
              <div className="book__info-item">
                <span className="book__info-title">Authors</span>:{" "}
                {authors && authors.join(",")}
              </div>
              <div className="book__info-item">
                <span className="book__info-title">Published</span>:{" "}
                {publishedDate}
              </div>
              <div className="book__info-item">
                <span className="book__info-title">Status</span>:
                <BookStatus
                  status={status}
                  setStatus={setStatus}
                  isEditing={isEditing}
                />
              </div>
              <div className="book__info-item">
                <span className="book__info-title">Rating</span>:
                <BookRating
                  rating={rating}
                  setRating={setRating}
                  isEditing={isEditing}
                />
              </div>
            </div>
          </div>

          <div className="book__bottom">
            <div>
              <p className="book__info-title">My Review</p>
              {isEditing ? (
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="book__textarea"
                />
              ) : (
                <p className="book__review">{review}</p>
              )}
            </div>

            <div>
              <div className="book__quotes-section">
                <p className="book__info-title">Favorite quotes</p>
                {isEditing && (
                  <AiOutlinePlusCircle
                    size={25}
                    className="add-icon"
                    onClick={handleAddQuote}
                  />
                )}
              </div>
              <BookQuotes
                quotes={quotes}
                setQuotes={setQuotes}
                isEditing={isEditing}
              />
            </div>

            <div className="button-group">
              {isEditing ? (
                <ButtonGroup variant="contained">
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<AiFillEdit />}
                    onClick={handleSave}
                  >
                    save
                  </Button>
                  <Button color="secondary" onClick={() => setIsEditing(false)}>
                    cancel
                  </Button>
                </ButtonGroup>
              ) : (
                <ButtonGroup variant="contained">
                  <Button
                    color="primary"
                    endIcon={<AiFillEdit />}
                    onClick={() => setIsEditing(true)}
                  >
                    edit
                  </Button>
                  <Button
                    color="secondary"
                    endIcon={<BsTrash3 size={20} />}
                    onClick={() => setOpenDeleteModal(true)}
                  >
                    remove
                  </Button>
                </ButtonGroup>
              )}
            </div>
          </div>
        </div>
      )}

      {openDeleteModal && (
        <ConfirmDeleteModal
          bookId={bookId}
          onDelete={(open) => setOpenDeleteModal(open)}
          setMessage={setMessage}
        />
      )}
    </main>
  );
}

export default BookDetailPage;
