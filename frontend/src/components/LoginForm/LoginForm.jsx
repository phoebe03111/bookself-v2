import { TextField, Button } from "@mui/material";
import "./LoginForm.scss";

const LoginForm = () => {
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth">
      <h1 className="auth__title">Login</h1>

      <form className="form" onSubmit={handleLogin}>
        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            fullWidth
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            autoComplete="off"
          />
        </div>

        <Button type="submit" color="primary" variant="contained">
          Login
        </Button>
      </form>
      <p className="redirect">
        Don't have an account yet?{" "}
        <Button color="primary" variant="contained">
          Signup
        </Button>
      </p>
    </div>
  );
};

export default LoginForm;
