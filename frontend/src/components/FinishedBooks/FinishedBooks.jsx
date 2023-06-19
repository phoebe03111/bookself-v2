import { Button } from "@mui/material";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Book from "../Book/Book";

const FinishedBooks = ({ books, handleClick }) => {
  return (
    <>
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
        {books
          .filter((book) => book.status === "finished-reading")
          .map((book) => {
            return <Book key={book._id} book={book} />;
          })}
      </div>
    </>
  );
};

export default FinishedBooks;
