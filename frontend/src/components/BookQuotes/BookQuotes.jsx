import { FaTrash } from "react-icons/fa";
import { BsQuote } from "react-icons/bs";
import "./BookQuotes.scss";

const BookQuotes = ({ quotes, setQuotes, isEditing }) => {
  const handleUpdate = (index, event) => {
    const newQuoteValues = [...quotes];
    newQuoteValues[index] = event.target.value;
    setQuotes(newQuoteValues);
  };

  const handleRemoveQuote = (index) => {
    const newQuoteValues = [...quotes];
    newQuoteValues.splice(index, 1);
    setQuotes(newQuoteValues);
  };

  return isEditing ? (
    <div style={{ marginTop: "0.5rem" }}>
      {quotes.map((quote, index) => (
        <div className="book__quotes" key={index}>
          <input
            value={quote}
            onChange={(e) => handleUpdate(index, e)}
            className="book__input"
          />
          <FaTrash
            size={20}
            className="remove-icon"
            onClick={() => handleRemoveQuote(index)}
          />
        </div>
      ))}
    </div>
  ) : (
    <ul style={{ marginTop: "0.5rem" }}>
      {quotes.map((quote, index) => (
        <li key={index} style={{ marginTop: "0.5rem" }}>
          <BsQuote /> <span style={{ lineHeight: 1.5 }}>{quote}</span>
        </li>
      ))}
    </ul>
  );
};

export default BookQuotes;
