import "../styles/ModalWithForm.css";
import ModalWithForm from "./ModalWithForm";
import { useState } from "react";

const LoginModal = ({
  activeModal,
  onLoginSubmit,
  onClose,
  buttonText,
  secondaryButton,
  handleModalSwitch,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSecondaryClick = (evt) => {
    evt.preventDefault();
    handleModalSwitch("signup");
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({ ...data, [name]: value });
  };

  const handleLogin = (evt) => {
    evt.preventDefault();
    onLoginSubmit({ email: data.email, password: data.password });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText={buttonText}
      secondaryButton={secondaryButton}
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleLogin}
      onSecondaryClick={handleSecondaryClick}
      name="login"
      containerClassName="modal__container"
    >
      <label className="modal__label" htmlFor="login-email">
        Email
        <input
          className="modal__input"
          type="email"
          id="login-email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          autoComplete="username"
          required
        />
        <span className="name-error modal__input-error" id="name-error"></span>
      </label>
      <label className="modal__label" htmlFor="login-password">
        Password
        <input
          className="modal__input"
          type="password"
          id="login-password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <span className="name-error modal__input-error" id="name-error"></span>
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
