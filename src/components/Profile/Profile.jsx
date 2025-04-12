import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  isMobileMenuOpened,
}) {
  return (
    <div className="profile">
      <Sidebar isMobileMenuOpened={isMobileMenuOpened} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
    </div>
  );
}

export default Profile;
