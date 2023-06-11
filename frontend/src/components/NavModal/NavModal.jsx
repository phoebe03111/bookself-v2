import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./NavModal.scss";

function NavModal({ onToggle }) {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <Link to="/books" onClick={onToggle}>
        <div className="nav__item">Books</div>
      </Link>

      <Link to="/tracker" onClick={onToggle}>
        <div className="nav__item">Tracker</div>
      </Link>

      <Button
        type="submit"
        color="success"
        variant="contained"
        onClick={() => {
        //   sessionStorage.removeItem("token");
          navigate("/");
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default NavModal;
