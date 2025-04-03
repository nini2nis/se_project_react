import "./ModalWithForm.css";

function ModalWithForm({ children, title, buttonText, isOpen, onClose }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__container">
        <button
          onClick={onClose}
          className="modal__close-button"
          type="button"
        />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" noValidate>
          {children}
          <button className="modal__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
