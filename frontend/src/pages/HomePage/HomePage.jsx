import { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./HomePage.scss";

function HomePage() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <main className="home">
      <div className="hero">
        <h1 className="hero__text">
          “If you want to know someone, <br /> look at their bookshelves.”
        </h1>
      </div>

      {isRegistering ? (
        <RegisterForm setIsRegistering={setIsRegistering} />
      ) : (
        <LoginForm setIsRegistering={setIsRegistering} />
      )}
    </main>
  );
}

export default HomePage;
