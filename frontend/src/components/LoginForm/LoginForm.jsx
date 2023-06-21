import { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./LoginForm.scss";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useLoginMutation } from "../../features/userApiSlice";

const LoginForm = ({ setIsRegistering }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [login] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password }).unwrap(); // unwrap/extract the resolved value from a promise
      navigate("/books");
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Incorrect email or password", { variant: "error" });
    }
  };

  return (
    <div className="auth">
      <h1 className="auth__title">Login</h1>

      <form className="form" onSubmit={handleLogin}>
        <div className="form-group">
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" color="primary" variant="contained">
          Login
        </Button>
      </form>
      <p className="redirect">
        Don't have an account yet?{" "}
        <Button
          color="primary"
          variant="contained"
          onClick={() => setIsRegistering(true)}
        >
          Signup
        </Button>
      </p>
    </div>
  );
};

export default LoginForm;
