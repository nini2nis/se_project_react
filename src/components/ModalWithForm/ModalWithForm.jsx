import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  activeModal,
  name,
  onClose,
  onSubmit,
  containerClassName,
  buttonText,
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
          {buttonText && (
            <button className="modal__submit-button" type="submit">
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
