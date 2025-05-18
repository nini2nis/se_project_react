import "../styles/Profile.css";
import Sidebar from "./Sidebar";
import ClothesSection from "./ClothesSection";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  isMobileMenuOpened,
  handleLogout,
  handleLoginClick,
  handleSignupClick,
  isOwn,
  currentUser,
  handleEditProfileClick,
  handleCardLike,
}) {
  return (
    <div className="profile">
      <Sidebar
        isMobileMenuOpened={isMobileMenuOpened}
        handleLogout={handleLogout}
        handleLoginClick={handleLoginClick}
        handleSignupClick={handleSignupClick}
        handleEditProfileClick={handleEditProfileClick}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
        isOwn={isOwn}
        currentUser={currentUser}
        handleCardLike={handleCardLike}
      />
    </div>
  );
}

export default Profile;
