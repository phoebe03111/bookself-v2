import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash3, BsArrowLeftCircleFill } from "react-icons/bs";
// import ConfirmDeleteModal from "../../components/ConfirmDeleteModal/ConfirmDeleteModal";
// import Quote from "../../components/Quote/Quote";
// import BookStatus from "../../components/BookStatus/BookStatus";
// import BookRating from "../../components/BookRating/BookRating";
import "./BookDetailPage.scss";
import { useGetBookByIdQuery } from "../../features/bookApiSlice";

function BookDetailPage() {
  const { bookId } = useParams();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [statusValue, setStatusValue] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewInput, setReviewInput] = useState("N/A");
  const [quotesInput, setQuotesInput] = useState("N/A");

  const { data: book, isLoading } = useGetBookByIdQuery(bookId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const {
    image,
    title,
    authors,
    publishedDate,
    quotes,
    rating,
    review,
    status,
  } = book && book;

  return (
    <main className="book-detail">
      <Link to="/books" className="go-back-button">
        <BsArrowLeftCircleFill size={23} /> Back
      </Link>

      <div className="book-detail__container">
        <div className="book__top">
          <div>
            <img className="book__image" src={image} alt={title} />
            <div className="book__image-bg"></div>
          </div>

          <div className="book__info">
            <p className="book__info-item">
              <span className="book__info-title">Title</span>: {title}
            </p>
            <p className="book__info-item">
              <span className="book__info-title">Authors</span>:{" "}
              {authors && authors.join(",")}
            </p>
            <p className="book__info-item">
              <span className="book__info-title">Published</span>:{" "}
              {publishedDate}
            </p>
            {/* <BookStatus
              statusValue={statusValue}
              setStatusValue={setStatusValue}
              isEditing={isEditing}
            /> */}
            <div>
              <p className="book__info-item">
                <span className="book__info-title">Rating</span>:
              </p>
              {/* <BookRating rating={ratingValue} /> */}
            </div>
          </div>
        </div>

        <div className="book__bottom">
          <div>
            <p className="book__info-title">My Review</p>
            {isEditing ? (
              <textarea
                value={reviewInput}
                onChange={(e) => setReviewInput(e.target.value)}
                className="book__textarea"
              />
            ) : (
              <p className="book__review">{review}</p>
            )}
          </div>

          <div>
            <p className="book__info-title">Favorite quotes</p>
            {isEditing ? (
              <textarea
                value={quotesInput}
                onChange={(e) => setQuotesInput(e.target.value)}
                className="book__textarea--quotes"
              />
            ) : (
              <ul>{/* <Quote quotes={quotes} /> */}</ul>
            )}
          </div>

          <div className="button-group">
            {isEditing ? (
              <ButtonGroup variant="contained">
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<AiFillEdit />}
                  onClick={() => {}}
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
                  // onClick={() => navigate(`/books/${bookId}/edit`)}
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

      {/* {openDeleteModal && (
        <ConfirmDeleteModal
          bookId={bookId}
          onDelete={(open) => setOpenDeleteModal(open)}
        />
      )} */}
    </main>
  );
}

export default BookDetailPage;
