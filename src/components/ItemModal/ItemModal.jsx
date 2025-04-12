import "./ItemModal.css";
import "../ModalWithForm/ModalwithForm.css";

function ItemModal({
  activeModal,
  onClose,
  card,
  buttonText,
  onDeleteClick,
  name,
}) {
  return (
    <div className={`modal ${activeModal === name ? "modal_opened" : ""}`}>
      <div className="modal__container_type_image">
        <button
          onClick={onClose}
          className="modal__close-button"
          type="button"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-top">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              className="modal__item-delete"
              type="button"
              onClick={onDeleteClick}
            >
              {buttonText}
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

{
  /* <div
      name="preview"
      activeModal={activeModal}
      onClose={onClose}
      containerClassName="modal__container_type_image"
    ></div> */
}
