import "./ItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function ItemModal({ activeModal, onClose, card, buttonText, onDeleteClick }) {
  return (
    <>
      <ModalWithForm
        name="preview"
        activeModal={activeModal}
        onClose={onClose}
        containerClassName="modal__container_type_image"
      >
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
      </ModalWithForm>
    </>
  );
}

export default ItemModal;
