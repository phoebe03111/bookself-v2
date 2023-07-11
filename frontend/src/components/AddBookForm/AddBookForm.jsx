import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiUpload } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  useAddBookMutation,
  useUploadImageMutation,
} from "../../features/bookApiSlice";
import Loader from "../../components/Loader/Loader";
import "./AddBookForm.scss";

function AddBookForm() {
  const [file, setFile] = useState("");
  const [filePreview, setFilePreview] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");
  const [publishedValue, setPublishedValue] = useState("");
  const [reviewValue, setReviewValue] = useState("");
  const [quotesValue, setQuotesValue] = useState("");
  const [loading, setLoading] = useState(false);

  const { category } = useParams();
  const navigate = useNavigate();

  const [addBook] = useAddBookMutation();

  const [uploadImage] = useUploadImageMutation();

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
    setLoading(true);

    if (e.target.files.length) {
      setFile(e.target.files[0]);
      setFilePreview(URL.createObjectURL(e.target.files[0]));
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // upload image
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadImage(formData).unwrap();

      const bookData = {
        user: userInfo._id,
        title: titleValue,
        authors: [authorValue],
        publishedDate: publishedValue,
        image: res.image,
        status: statusVal,
        rating: 0,
        quotes: [quotesValue],
        review: "N/A",
      };

      await addBook(bookData);
      enqueueSnackbar("Book added!", { variant: "success" });
      navigate("/books");
    } catch (error) {
      enqueueSnackbar("Error adding a book", { variant: "error" });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="add-book__upload">
        <label htmlFor="upload-button">
          {loading && <Loader />}
          {filePreview ? (
            <img
              src={filePreview}
              alt="book"
              style={{ maxWidth: "200px", maxHeight: "300px" }}
            />
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
