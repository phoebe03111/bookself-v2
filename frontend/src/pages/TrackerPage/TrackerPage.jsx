import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import bookImg from "../../assets/images/logo-book.png";
import Loader from "../../components/Loader/Loader";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import FinishedBooks from "../../components/FinishedBooks/FinishedBooks";
import { useGetBooksQuery } from "../../features/bookApiSlice";
import "./TrackerPage.scss";
import { Alert } from "@mui/material";

function TrackerPage() {
  const [goal, setGoal] = useState(10);
  const navigate = useNavigate();

  const { data: books, isLoading, error } = useGetBooksQuery();

  // Get user's initial goal from database
  useEffect(() => {
    // const token = sessionStorage.getItem("token");
    // axios
    //   .get(`https://bookself-server.herokuapp.com/goal`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     setGoal(res.data[0].goal);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

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
        <Alert severity="danger">{error}</Alert>
      ) : (
        <>
          <div className="tracker__goal">
            <div className="tracker__text">
              <img src={bookImg} alt="book" className="tracker__img" />
              <h1 className="tracker__font">
                {new Date().getFullYear()} Reading Goal: I will read{" "}
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
