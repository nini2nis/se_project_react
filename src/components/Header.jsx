import "../styles/Header.css";
import { useContext } from "react";
import { Link } from "react-router-dom";

import CurrentUserContext from "../contexts/CurrentUserContext";

import ToggleSwitch from "./ToggleSwitch";
import logo from "../assets/logo.png";
import menuIcon from "../assets/menu-icon.png";
import closeIcon from "../assets/CloseButtonBlack.png";

function Header({
  handleAddClick,
  weatherData,
  toggleMobileMenu,
  isMobileMenuOpened,
  handleSignupClick,
  handleLoginClick,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const fallbackAvatar = (currentUser) => {
    return currentUser?.name?.slice(0, 1).toUpperCase() || "?";
  };

  return (
    <header className="header">
      <button
        type="button"
        onClick={toggleMobileMenu}
        className="header__mobile-menu-btn"
      >
        {isMobileMenuOpened ? (
          <img
            src={closeIcon}
            alt="close"
            className="header__mobile-menu-close-btn"
          />
        ) : (
          <img
            src={menuIcon}
            alt="open"
            className="header__mobile-menu-open-btn"
          />
        )}
      </button>
      <div
        className={`header__container-date-location ${
          isMobileMenuOpened ? "header__container-date-location_closed" : ""
        }`}
      >
        <Link to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      {isLoggedIn ? (
        <div
          className={`header__container-menu ${
            isMobileMenuOpened ? "header__container-menu_opened" : ""
          }`}
        >
          <ToggleSwitch
            handleToggleSwitchChange={() =>
              setCurrentTemperatureUnit(currentTemperatureUnit)
            }
          />

          <button
            onClick={handleAddClick}
            type="button"
            className={`header__add-btn ${
              isMobileMenuOpened ? "header__add-btn_opened" : ""
            }`}
          >
            + Add Clothes
          </button>
          <Link
            to="/profile"
            className={`header__user-container ${
              isMobileMenuOpened ? "header__user-container_opened" : ""
            }`}
          >
            <p className="header__username">{currentUser?.name || "User"}</p>
            {currentUser?.avatar ? (
              <img
                className="header__avatar"
                src={currentUser.avatar}
                alt="avatar"
              />
            ) : (
              <div className="header__avatar" style={{ Color: "white" }}>
                {fallbackAvatar(currentUser)}
              </div>
            )}
          </Link>
        </div>
      ) : (
        <div
          className={`header__container-menu ${
            isMobileMenuOpened ? "header__container-menu_opened" : ""
          }`}
        >
          <ToggleSwitch
            handleToggleSwitchChange={() =>
              setCurrentTemperatureUnit(currentTemperatureUnit)
            }
          />
          <button
            onClick={handleSignupClick}
            type="button"
            className={`header__signup-btn ${
              isMobileMenuOpened ? "header__add-btn_opened" : ""
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={handleLoginClick}
            type="button"
            className="header__login-btn"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}
export default Header;
