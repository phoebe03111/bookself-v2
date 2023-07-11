import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiUpload } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useAddBookMutation } from "../../features/bookApiSlice";
import "./AddBookForm.scss";

function AddBookForm() {
  const [file, setFile] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");
  const [publishedValue, setPublishedValue] = useState("");
  const [reviewValue, setReviewValue] = useState("");
  const [quotesValue, setQuotesValue] = useState("");

  const { category } = useParams();
  const navigate = useNavigate();

  const [addBook, { isLoading }] = useAddBookMutation();

  const { userInfo } = useSelector((state) => state.user);

  const { enqueueSnackbar } = useSnackbar();

  let statusVal;
  if (category === "addCurrent") {
    statusVal = "currently-reading";
  } else if (category === "addToRead") {
    statusVal = "want-to-read";
  } else {
    statusVal = "finished-reading";
  }

  const handleChange = (e) => {
    if (e.target.files.length) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      user: userInfo._id,
      title: titleValue,
      authors: [authorValue],
      publishedDate: publishedValue,
      image: file,
      status: statusVal,
      rating: 0,
      quotes: [quotesValue],
      review: "N/A",
    };

    await addBook(bookData);
    enqueueSnackbar("Book added!", { variant: "success" });
    navigate("/books");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="add-book__upload">
        <label htmlFor="upload-button">
          {file ? (
            <img src={file} alt="book" style={{ maxWidth: '200px', maxHeight: '300px'}} />
          ) : (
            <p className="upload-button">
              <BiUpload size={20} />
              <span>Upload book image</span>
            </p>
          )}
        </label>
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleChange}
          id="upload-button"
        />
      </div>

      <TextField
        id="filled-basic"
        label="Title"
        variant="filled"
        size="small"
        fullWidth
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="Author"
        variant="filled"
        size="small"
        fullWidth
        value={authorValue}
        onChange={(e) => setAuthorValue(e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="Published date"
        variant="filled"
        size="small"
        fullWidth
        value={publishedValue}
        onChange={(e) => setPublishedValue(e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="My review"
        variant="filled"
        size="small"
        fullWidth
        multiline
        rows={4}
        value={reviewValue}
        onChange={(e) => setReviewValue(e.target.value)}
      />
      <TextField
        id="filled-basic"
        label="Favorite quotes"
        variant="filled"
        size="small"
        fullWidth
        multiline
        rows={4}
        value={quotesValue}
        onChange={(e) => setQuotesValue(e.target.value)}
      />
      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
}

export default AddBookForm;
