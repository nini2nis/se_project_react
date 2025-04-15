import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const AddItemModal = ({
  activeModal,
  onAddItemSubmit,
  onClose,
  buttonText,
}) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const isOpen = activeModal === "add-garment";

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleImageUrlChange = (evt) => {
    setImageUrl(evt.target.value);
  };

  const handleWeatherChange = (evt) => {
    setWeather(evt.target.value);
  };

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  const handleItemSubmit = (evt) => {
    evt.preventDefault();
    onAddItemSubmit({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText={buttonText}
      activeModal={activeModal}
      onClose={onClose}
      onSubmit={handleItemSubmit}
      name="add-garment"
      containerClassName="modal__container"
    >
      <label className="modal__label" htmlFor="name">
        Name
        <input
          className="modal__input"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
          required
        />
        <span className="name-error modal__input-error" id="name-error"></span>
      </label>
      <label className="modal__label" htmlFor="imageURL">
        Image
        <input
          className="modal__input"
          type="url"
          id="imageURL"
          name="link"
          placeholder="Type your caption"
          onChange={handleImageUrlChange}
          value={imageUrl}
          required
        />
        <span
          className="imageURL-error modal__input-error"
          id="imageURL-error"
        ></span>
      </label>
      <legend className="modal__legend">Select the weather type:</legend>
      <fieldset className="modal__radio-buttons">
        <label className="modal__label-radio" htmlFor="hot">
          Hot
          <input
            className="modal__radio-input"
            type="radio"
            id="hot"
            name="weather-type"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />
        </label>
        <label className="modal__label-radio" htmlFor="warm">
          Warm
          <input
            className="modal__radio-input"
            type="radio"
            id="warm"
            name="weather-type"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
        </label>
        <label className="modal__label-radio" htmlFor="cold">
          Cold
          <input
            className="modal__radio-input"
            type="radio"
            id="cold"
            name="weather-type"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
