import "../styles/DeleteConfirmationModal.css";

function DeleteConfirmationModal({ activeModal, onClose, onConfirm }) {
  return (
    activeModal === "delete-confirmation" && (
      <div
        className={`modal__delete ${activeModal ? "modal__delete_opened" : ""}`}
      >
        <div className="modal__delete-content">
          <button
            onClick={onClose}
            className="modal__close-button"
            type="button"
          ></button>
          <p className="modal__delete-text">
            Are you sure you want to delete this item? <br></br>
            This action is irreversible.
          </p>
          <div className="modal__delete-button-container">
            <button
              className="modal__delete-confirm"
              type="button"
              onClick={onConfirm}
            >
              Yes, delete item
            </button>
            <button
              className="modal__delete-cancel"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default DeleteConfirmationModal;
