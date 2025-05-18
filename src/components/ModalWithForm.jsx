import "../styles/ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  activeModal,
  name,
  onClose,
  onSubmit,
  containerClassName,
  buttonText,
  secondaryButton,
  onSecondaryClick,
}) {
  return (
    <div className={`modal ${activeModal === name && "modal_opened"}`}>
      <div className={containerClassName}>
        <button
          onClick={onClose}
          className="modal__close-button"
          type="button"
        ></button>
        {title && <h2 className="modal__title">{title}</h2>}
        <form onSubmit={onSubmit} className="modal__form" noValidate>
          {children}
          <div className="modal__button-container">
            {buttonText && (
              <button className="modal__submit-button" type="submit">
                {buttonText}
              </button>
            )}
            {secondaryButton && (
              <button
                className="modal__secondary-button"
                type="button"
                onClick={onSecondaryClick}
              >
                {secondaryButton}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
