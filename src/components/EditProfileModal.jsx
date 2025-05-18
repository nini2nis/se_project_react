import "../styles/ModalWithForm.css";
import ModalWithForm from "./ModalWithForm";
import { useState } from "react";

const EditProfileModal = ({
  activeModal,
  onClose,
  buttonText,
  onProfileChangeSubmit,
}) => {
  const [data, setData] = useState({
    name: "",
    avatar: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({ ...data, [name]: value });
  };

  const handleProfileChange = (evt) => {
    evt.preventDefault();
    onProfileChangeSubmit(data);
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
      <label className="modal__label" htmlFor="name">
        Name*
        <input
          className="modal__input"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          value={data.name}
          onChange={handleChange}
          required
        />
        <span className="name-error modal__input-error" id="name-error"></span>
      </label>
      <label className="modal__label" htmlFor="avatar">
        Avatar URL*
        <input
          className="modal__input"
          type="url"
          id="avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={handleChange}
          required
        />
        <span className="name-error modal__input-error" id="name-error"></span>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
