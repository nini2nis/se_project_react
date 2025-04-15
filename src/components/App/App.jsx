import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { coordinates, APIkey } from "../../utils/Constants";
import { getWeather, filteredWeatherData } from "../../utils/WeatherApi";
import { getInitialItems, addNewItem, removeItem } from "../../utils/Api";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import Footer from "../Footer/Footer";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

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

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  function toggleMobileMenu() {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  }

  const handleAddItemSubmit = (itemData) => {
    setIsLoading(true);
    addNewItem(itemData)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteClick = () => {
    setActiveModal("delete-confirmation");
  };

  const handleDeleteItem = (itemId) => {
    removeItem(itemId)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== itemId));
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filteredWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getInitialItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            toggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpened={isMobileMenuOpened}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  isMobileMenuOpened={isMobileMenuOpened}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                  handleCardClick={handleCardClick}
                  isMobileMenuOpened={isMobileMenuOpened}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          name="add-garment"
          activeModal={activeModal}
          buttonText={isLoading ? "Saving..." : "Save"}
          onClose={closeActiveModal}
          onAddItemSubmit={handleAddItemSubmit}
        />
        <ItemModal
          name="preview"
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          buttonText="Delete item"
          onDeleteClick={handleDeleteClick}
          onDeleteItem={handleDeleteItem}
        />
        <DeleteConfirmationModal
          name="delete-confirmation"
          activeModal={activeModal}
          onClose={closeActiveModal}
          onConfirm={() => handleDeleteItem(selectedCard._id)}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
