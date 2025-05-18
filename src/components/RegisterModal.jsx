import "../styles/ModalWithForm.css";
import ModalWithForm from "./ModalWithForm";
import { useState } from "react";

const RegisterModal = ({
  activeModal,
  onRegisterSubmit,
  onClose,
  buttonText,
  secondaryButton,
  handleModalSwitch,
}) => {
  //const isOpen = activeModal === "signup";
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleSecondaryClick = (evt) => {
    evt.preventDefault();
    handleModalSwitch("login");
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({ ...data, [name]: value });
  };

  const handleRegistration = (evt) => {
    evt.preventDefault();
    onRegisterSubmit(data);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText={buttonText}
      secondaryButton={secondaryButton}
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleRegistration}
      onSecondaryClick={handleSecondaryClick}
      name="signup"
      containerClassName="modal__container"
    >
      <label className="modal__label" htmlFor="email">
        Email*
        <input
          className="modal__input"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <span className="name-error modal__input-error" id="name-error"></span>
      </label>
      <label className="modal__label" htmlFor="password">
        Password*
        <input
          className="modal__input"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          minLength="8"
          maxLength="20"
          value={data.password}
          onChange={handleChange}
          required
        />
        <span className="name-error modal__input-error" id="name-error"></span>
      </label>
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

export default RegisterModal;
