import Rating from "@mui/material/Rating";

function BookRating({ rating, setRating, isEditing }) {
  return (
    <div>
      <Rating
        name="rating"
        value={rating}
        onChange={(e) => {
          setRating(+e.target.value);
        }}
        readOnly={!isEditing}
      />
    </div>
  );
}

export default BookRating;
