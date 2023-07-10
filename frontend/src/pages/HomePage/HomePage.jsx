import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./HomePage.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function HomePage() {
  const [isRegistering, setIsRegistering] = useState(false);

  const { userInfo } = useSelector((state) => state.user);

  return (
    <main className="home">
      <div className="hero">
        <h1 className="hero__text">
          “If you want to know someone, <br /> look at their bookshelves.”
        </h1>
      </div>

      {userInfo ? (
        <div className="auth">
          <p style={{ fontSize: "1.5rem" }}>
            <b>Welcome {userInfo.name}</b>
          </p>
          <p>
            Go to your{" "}
            <Link to="/books" style={{ textDecoration: "underline" }}>
              bookshelf
            </Link>
          </p>
        </div>
      ) : isRegistering ? (
        <RegisterForm setIsRegistering={setIsRegistering} />
      ) : (
        <LoginForm setIsRegistering={setIsRegistering} />
      )}
    </main>
  );
}

export default HomePage;
