import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import bookImg from "../../assets/images/logo-book.png";
import Loader from "../../components/Loader/Loader";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import FinishedBooks from "../../components/FinishedBooks/FinishedBooks";
import { useGetBooksQuery } from "../../features/bookApiSlice";
import "./TrackerPage.scss";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

function TrackerPage() {
  const [goal, setGoal] = useState(1);

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);

  const { data: books, isLoading, error } = useGetBooksQuery();

  const handleClick = (e) => {
    const category = e.target.name;
    navigate(`/books/add/${category}`);
  };

  // Setup progress bar percantage
  let finishedAmount = books && books.filter((book) => book.status === 'finished-reading').length;
  let percentage = Math.floor((finishedAmount / goal) * 100);

  return (
    <main className="tracker">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert severity="error">
          {" "}
          Please{" "}
          <Link to="/" style={{ textDecoration: "underline" }}>
            log in
          </Link>{" "}
          first
        </Alert>
      ) : (
        <>
          <div className="tracker__goal">
            <div className="tracker__text">
              <img src={bookImg} alt="book" className="tracker__img" />
              <h1 className="tracker__font">
                {userInfo.name}'s reading goal in {new Date().getFullYear()}:{" "}
                <TextField
                  type="number"
                  InputProps={{ inputProps: { min: finishedAmount, max: 100 } }}
                  id="goal"
                  label="number"
                  variant="outlined"
                  size="small"
                  value={goal}
                  onChange={(e) => {
                    setGoal(e.target.value);

                    // const token = sessionStorage.getItem("token");
                    // axios.put(
                    //   `https://bookself-server.herokuapp.com/users`,
                    //   {
                    //     goal: e.target.value,
                    //   },
                    //   {
                    //     headers: { Authorization: `Bearer ${token}` },
                    //   }
                    // );
                  }}
                />{" "}
                books
              </h1>
              <img src={bookImg} alt="book" className="tracker__img" />
            </div>

            <div className="tracker__progress-bar">
              <ProgressBar percentage={percentage} />
            </div>
          </div>

          <section className="section">
            <FinishedBooks books={books} handleClick={handleClick} />
          </section>
        </>
      )}
    </main>
  );
}

export default TrackerPage;
