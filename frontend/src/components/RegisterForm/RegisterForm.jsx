import { TextField, Button } from "@mui/material";

const handleRegister = (e) => {
  e.preventDefault();
};

const RegisterForm = () => {
  return (
    <div className="auth">
      <h1 className="auth__title">Sign up</h1>
      <form className="form" onSubmit={handleRegister}>
        <div className="form-group">
          <TextField
            id="name"
            label="Username"
            variant="outlined"
            fullWidth
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <TextField
            id="password2"
            label="Confirm password"
            type="password"
            variant="outlined"
            fullWidth
            autoComplete="off"
          />
        </div>

        <Button type="submit" color="primary" variant="contained">
          Signup
        </Button>
      </form>
      <p className="redirect">
        Already have an account?{" "}
        <Button color="primary" variant="contained" onClick={() => {}}>
          Login
        </Button>
      </p>
    </div>
  );
};

export default RegisterForm;
