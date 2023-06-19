import { useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import SearchResult from "../../components/SearchResult/SearchResult";
import "./AddBookPage.scss";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function AddBookPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const searchTerm = e.target.book.value;

    axios
      .get(`${API_URL}/volumes?q=${searchTerm}&key=${API_KEY}`)
      .then((res) => {
        setResults(res.data.items);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="add-book">
      <div className="add-book__container">
        <form className="add-book__search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="search book title or author..."
            className="add-book__input"
            name="book"
          />
        </form>

        <div className="add-book__results">
          {loading && <Loader />}

          {results.length !== 0 &&
            results.map((result) => {
              return <SearchResult key={result.id} result={result} />;
            })}
        </div>
      </div>

      {/* <div className="add-book__form">
        <h2 className="add-book__heading">
          Cannot find your book? Add it here.
        </h2>

        <AddBookForm /> 
      </div> */}
    </main>
  );
}

export default AddBookPage;
