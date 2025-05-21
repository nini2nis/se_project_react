import "../styles/ClothesSection.css";
import ItemCard from "./ItemCard";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  isOwn,
  handleCardLike,
}) {
  const filteredItems = isOwn
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : clothingItems;

  return (
    <div className="clothes-section">
      <div className="clothes-section__text-container">
        <p className="clothes-section__useritems">Your items</p>
        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__cards">
        {filteredItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onLikeClick={handleCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
