import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { TextField, Button } from "@mui/material";
import { useRegisterMutation } from "../../features/userApiSlice";

const RegisterForm = ({ setIsRegistering }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [register] = useRegisterMutation();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "warning" });
      return;
    } else {
      try {
        await register({ name, email, password }).unwrap(); // unwrap/extract the resolved value from a promise
        navigate("/books");
      } catch (error) {
        console.log(error);
        enqueueSnackbar("Error registering user", { variant: "error" });
      }
    }
  };

  return (
    <div className="auth">
      <h1 className="auth__title">Sign up</h1>

      <form className="form" onSubmit={handleRegister}>
        <div className="form-group">
          <TextField
            id="name"
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
        </div>

        <div className="form-group">
          <TextField
            id="password2"
            label="Confirm password"
            type="password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </form>
      <p className="redirect">
        Already have an account?{" "}
        <Button
          color="primary"
          variant="contained"
          onClick={() => setIsRegistering(false)}
        >
          Login
        </Button>
      </p>
    </div>
  );
};

export default RegisterForm;
