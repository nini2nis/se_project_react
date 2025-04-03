import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__container_type_image">
        <button
          onClick={onClose}
          className="modal__close-button"
          type="button"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;

/*
ItemModal renders the item image and title. 
The component accepts the following props:

    onClose (works the same way as the ModalWithForm)
    The item card data that you need to render
    */
