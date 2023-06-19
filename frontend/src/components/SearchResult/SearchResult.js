import { useParams, useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSnackbar } from "notistack";
import Loader from "../Loader/Loader";
import placeholder from "../../assets/images/book-placeholder.jpeg";
import { useAddBookMutation } from "../../features/bookApiSlice";
import "./SearchResult.scss";

function SearchResult({ result }) {
  const { category } = useParams();

  const [addBook, { isLoading }] = useAddBookMutation();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  let statusVal;
  if (category === "addCurrent") {
    statusVal = "currently-reading";
  } else if (category === "addToRead") {
    statusVal = "want-to-read";
  } else {
    statusVal = "finished-reading";
  }

  const { id } = result;
  const { title, authors, publishedDate, imageLinks, description } =
    result.volumeInfo;

  const handlePlus = async () => {
    const bookData = {
      user: "642c5c92e1c7e191d428e869",
      title,
      authors,
      publishedDate,
      image: imageLinks.thumbnail,
      description,
      status: statusVal,
      rating: 0,
      quotes: [],
      review: "N/A",
      googleId: id,
    };

    await addBook(bookData);
    enqueueSnackbar("Book added!", { variant: "success" });
    navigate("/books");
  };

  return (
    <article className="result">
      <a href={result.volumeInfo.infoLink} target="_blank" rel="noreferrer">
        <img
          className="book__book"
          src={
            result?.volumeInfo?.imageLinks?.thumbnail
              ? result.volumeInfo.imageLinks.thumbnail
              : placeholder
          }
          alt={result.name}
        />
      </a>

      <div className="result__info">
        <h4 className="result__title">Title: {title}</h4>
        <h4>
          Author:{" "}
          {result.volumeInfo.authors &&
            result.volumeInfo.authors.map((author, index) => {
              return <span key={index}>{author}, </span>;
            })}
        </h4>
        <h4>Description:</h4>
        <p className="result__description">
          {description ? description.slice(0, 200) + "..." : "N/A"}
        </p>
        <div className="plus-icon">
          {isLoading ? (
            <Loader />
          ) : (
            <AiOutlinePlusCircle size={25} onClick={handlePlus} />
          )}
        </div>
      </div>
    </article>
  );
}

export default SearchResult;
