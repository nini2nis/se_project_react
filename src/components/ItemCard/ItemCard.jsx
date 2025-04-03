import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;

/* 
ItemCard is a component that renders the image and title 
for an item of clothing. Moreover, the image is an 
interactive element, meaning that if the user clicks on it, 
the item modal will open. Note that the item card itself 
doesn’t know about the modal state. Therefore, you need 
to pass it down from App to Main. In other words, when 
the user clicks on the image, you need to call the state 
change function handleCardClick() that ItemCard receives 
as a prop.
*/
