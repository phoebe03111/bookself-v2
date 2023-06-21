import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";
import menuIcon from "../../assets/images/icons/menu-bars.svg";
import menuCloseIcon from "../../assets/images/icons/menu-close.svg";
import NavModal from "../NavModal/NavModal";
import { Button } from "@mui/material";
import "./Header.scss";

function Header() {
  const [showMenu, setshowMenu] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    setshowMenu(!showMenu);
  };

  const handleLogout = async () => {
    try {
      // await logoutApiCall().unwrap();
      // dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo-container">
        <Link to="/">
          <img src={logoImg} alt="logo" className="header__logo" />
        </Link>
      </div>

      {/* Navbar */}
      <nav className="header__nav--mobile">
        {showMenu && <NavModal onToggle={handleToggle} />}

        <div>
          <img
            src={showMenu ? menuCloseIcon : menuIcon}
            alt="menu"
            className="menu-icon"
            onClick={handleToggle}
          />
        </div>
      </nav>

      <nav className="header__nav">
        <ul className="header__nav-list">
          <Link to="/books">
            <li className="header__nav-item">Books</li>
          </Link>
          <Link to="/tracker">
            <li className="header__nav-item">Tracker</li>
          </Link>
          <Button
            type="submit"
            color="success"
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
