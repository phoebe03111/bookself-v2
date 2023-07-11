import { useNavigate } from "react-router-dom";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import placeholder from "../../assets/images/book-placeholder.jpeg";
import "./Book.scss";

function Book({ book }) {
  const navigate = useNavigate();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: book._id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const handleClick = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={handleClick}
    >
      <div className="book__container">
        <img
          className="book__book"
          src={book.image ? book.image : placeholder}
          alt={book.name}
        />
      </div>
    </button>
  );
}

export default Book;
