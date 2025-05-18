import { useContext } from "react";

import "../styles/Sidebar.css";
import avatar from "../assets/avatar.png";

import CurrentUserContext from "../contexts/CurrentUserContext";

function Sidebar({
  isMobileMenuOpened,
  handleLoginClick,
  handleSignupClick,
  handleLogout,
  handleEditProfileClick,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  return (
    <div className={`sidebar ${isMobileMenuOpened ? "sidebar_closed" : ""}`}>
      {isLoggedIn ? (
        <div>
          <div className="sidebar__line-top" />
          <div className="sidebar__content">
            <img
              className="sidebar__avatar"
              src={currentUser?.avatar || avatar}
              alt="avatar"
            />

            <div className="sidebar__functionalities">
              <p className="sidebar__username">{currentUser?.name || "User"}</p>
              <button
                className="sidebar__first-btn"
                onClick={handleEditProfileClick}
              >
                Change profile data
              </button>
              <button className="sidebar__second-btn" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
          <div className="sidebar__line-bottom" />
        </div>
      ) : (
        <div>
          <div className="sidebar__line-top" />
          <div className="sidebar__content">
            <div className="sidebar__functionalities">
              <button
                className="sidebar__first-btn"
                onClick={handleSignupClick}
              >
                Sign up
              </button>
              <button
                className="sidebar__second-btn"
                onClick={handleLoginClick}
              >
                Log in
              </button>
            </div>
          </div>
          <div className="sidebar__line-bottom" />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
