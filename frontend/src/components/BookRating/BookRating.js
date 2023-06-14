import React, { useState } from "react";
import Rating from "@mui/material/Rating";

function BookRating({ rating: bookRating, isEditing }) {
  const [rating, setRating] = useState(bookRating);

  const handleChangeRating = (event, newValue) => {
    setRating(newValue);
    // axios
    //   .put(`https://bookself-server.herokuapp.com/books/${bookId}`, {
    //     rating: newValue,
    //   })
    //   // .then((res) => {
    //   //   console.log(res);
    //   // })
    //   .catch((err) => console.log(err));
  };

  return (
    <div>
      <Rating
        name="rating"
        value={rating}
        onChange={handleChangeRating}
        readOnly={!isEditing}
      />
    </div>
  );
}

export default BookRating;
