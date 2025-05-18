import "../styles/ItemCard.css";

import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onLikeClick }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const isLiked = isLoggedIn
    ? item.likes.some((id) => id === currentUser._id)
    : false;

  const handleLikeClick = () => {
    onLikeClick({ itemId: item._id, isLiked: isLiked });
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__title-container">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn &&
          (isLiked ? (
            <button className="card__liked" onClick={handleLikeClick} />
          ) : (
            <button className="card__like" onClick={handleLikeClick} />
          ))}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
