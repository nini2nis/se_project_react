import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, APIkey } from "../../utils/Constants";
import { getWeather, filteredWeatherData } from "../../utils/WeatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filteredWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.err);
  }, []);
  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleAddClick={handleAddClick}
          weatherData={weatherData}
          toggleMobileMenu={toggleMobileMenu}
          isMobileMenuOpened={isMobileMenuOpened}
        />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          isMobileMenuOpened={isMobileMenuOpened}
        />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label className="modal__label" htmlFor="name">
          Image link
          <input
            className="modal__input"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
          />
          <span
            className="name-error modal__input-error"
            id="name-error"
          ></span>
        </label>
        <label className="modal__label" htmlFor="imageURL">
          Image
          <input
            className="modal__input"
            type="url"
            id="imageURL"
            name="link"
            placeholder="Type your caption"
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
            />
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        handleCardClick={handleCardClick}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
