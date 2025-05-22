import "../styles/ModalWithForm.css";
import ModalWithForm from "./ModalWithForm";

const EditProfileModal = ({
  activeModal,
  onClose,
  buttonText,
  onProfileChangeSubmit,
  profileData,
}) => {
  const handleProfileChange = (evt) => {
    evt.preventDefault();
    const formData = {
      name: evt.target.name.value,
      avatar: evt.target.avatar.value,
    };
    onProfileChangeSubmit(formData);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText={buttonText}
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleProfileChange}
      name="edit-profile"
      containerClassName="modal__container"
    >
      <label className="modal__label" htmlFor="edit-name">
        Name*
        <input
          className="modal__input"
          type="text"
          id="edit-name"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          defaultValue={profileData.name}
          required
        />
        <span className="name-error modal__input-error" id="name-error"></span>
      </label>
      <label className="modal__label" htmlFor="edit-avatar">
        Avatar URL*
        <input
          className="modal__input"
          type="url"
          id="edit-avatar"
          name="avatar"
          placeholder="Avatar URL"
          defaultValue={profileData.avatar}
          required
        />
        <span className="name-error modal__input-error" id="name-error"></span>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
