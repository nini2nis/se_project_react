import "./Header.css";
import { Link, NavLink } from "react-router-dom";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";
import menuIcon from "../../assets/menu-icon.png";
import closeIcon from "../../assets/CloseButtonBlack.png";

function Header({
  handleAddClick,
  weatherData,
  toggleMobileMenu,
  isMobileMenuOpened,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
        <NavLink to="/">
          <img className="header__logo" src={logo} alt="logo" />
        </NavLink>
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
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
        <NavLink
          to="/Profile"
          className={`header__user-container ${
            isMobileMenuOpened ? "header__user-container_opened" : ""
          }`}
        >
          <p className="header__username">Terrence Tegegne</p>
          <img className="header__avatar" src={avatar} alt="avatar" />
        </NavLink>
      </div>
    </header>
  );
}
export default Header;
