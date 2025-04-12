import "./Sidebar.css";
import avatar from "../../assets/avatar.png";

function Sidebar({ isMobileMenuOpened }) {
  return (
    <div className={`sidebar ${isMobileMenuOpened ? "sidebar_closed" : ""}`}>
      <div className="sidebar__line-top" />
      <div className="sidebar__content">
        <img className="sidebar__avatar" src={avatar} alt="avatar" />
        <div className="sidebar__functionalities">
          <p className="sidebar__username">Terrence Tegegne</p>
          <button className="sidebar__change-profile">
            Change profile data
          </button>
          <button className="sidebar__logout">Log out</button>
        </div>
      </div>
      <div className="sidebar__line-bottom" />
    </div>
  );
}

export default Sidebar;
