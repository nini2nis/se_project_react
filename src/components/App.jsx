import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../styles/App.css";

import { register, authorize, getUserInfo, changeProfile } from "../utils/Auth";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { coordinates, APIkey } from "../utils/Constants";
import { getWeather, filteredWeatherData } from "../utils/WeatherApi";
import api from "../utils/Api";

import Header from "./Header";
import Main from "./Main";
import ProtectedRoute from "./ProtectedRoutes";
import Profile from "./Profile";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import AddItemModal from "./AddItemModal";
import ItemModal from "./ItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditProfileModal from "./EditProfileModal";
import Footer from "./Footer";

function App() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

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

  const handleRegistration = ({ email, password, name, avatar }) => {
    register({ email, password, name, avatar })
      .then(() => navigate("/profile"))
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return getUserInfo(data.token);
        }
      })
      .then((response) => {
        const userData = response.user;
        setCurrentUser({
          _id: userData._id,
          name: userData.name,
          avatar: userData.avatar,
          email: userData.email,
        });
        setIsLoggedIn(true);
        setIsAuthLoading(false);
        closeActiveModal();
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setIsAuthLoading(false);
    const redirectPath = "/";
    navigate(redirectPath);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    if (!storedToken) {
      setCurrentUser(null);
      setIsLoggedIn(false);
      setIsAuthLoading(false);
      return;
    }

    getUserInfo(storedToken)
      .then((userData) => {
        setCurrentUser({
          _id: userData.user._id,
          name: userData.user.name,
          avatar: userData.user.avatar,
          email: userData.user.email,
        });
        setIsLoggedIn(true);
        setIsAuthLoading(false);
      })
      .catch((err) => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
        setIsAuthLoading(false);
        console.error(err);
      });
  }, []);

  const handleProfileChange = ({ name, avatar }) => {
    const storedToken = localStorage.getItem("jwt");
    changeProfile({ name, avatar }, storedToken)
      .then((userData) => {
        setCurrentUser({
          ...currentUser,
          name: userData.name,
          avatar: userData.avatar,
        });
        setIsAuthLoading(false);
        closeActiveModal();
      })
      .catch((err) => {
        setIsAuthLoading(false);
        console.error(err);
      });
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleSignupClick = () => {
    setActiveModal("signup");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleModalSwitch = (modalName) => {
    setActiveModal(modalName);
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
    api
      .addNewItem(itemData)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  const isOwn =
    currentUser &&
    selectedCard?.owner &&
    selectedCard.owner === currentUser._id;

  const handleDeleteClick = () => {
    setActiveModal("delete-confirmation");
  };

  const handleDeleteItem = (itemId) => {
    const token = localStorage.getItem("jwt");
    api
      .removeItem(itemId, token)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== itemId));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ itemId, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? api
          .addCardLike(itemId, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === itemId ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(itemId, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === itemId ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
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
    api
      .getInitialItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
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
              handleSignupClick={handleSignupClick}
              handleLoginClick={handleLoginClick}
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
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      userData={userData}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleCardClick={handleCardClick}
                      isMobileMenuOpened={isMobileMenuOpened}
                      handleLogout={handleLogout}
                      isOwn={isOwn}
                      handleEditProfileClick={handleEditProfileClick}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <RegisterModal
            name="sign-up"
            activeModal={activeModal}
            buttonText={"Sign Up"}
            secondaryButton={"or Log In"}
            onClose={closeActiveModal}
            onRegisterSubmit={handleRegistration}
            handleModalSwitch={handleModalSwitch}
          />
          <LoginModal
            name="login"
            activeModal={activeModal}
            buttonText={"Log In"}
            secondaryButton={"or Sign Up"}
            onClose={closeActiveModal}
            onLoginSubmit={handleLogin}
            handleModalSwitch={handleModalSwitch}
          />
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
            isOwn={isOwn}
            onDeleteClick={handleDeleteClick}
            onDeleteItem={handleDeleteItem}
          />
          <DeleteConfirmationModal
            name="delete-confirmation"
            activeModal={activeModal}
            onClose={closeActiveModal}
            onConfirm={() => handleDeleteItem(selectedCard._id)}
          />
          {currentUser && (
            <EditProfileModal
              name="edit-profile"
              activeModal={activeModal}
              onClose={closeActiveModal}
              buttonText={isLoading ? "Saving..." : "Save changes"}
              onProfileChangeSubmit={handleProfileChange}
              profileData={{
                name: currentUser.name,
                avatar: currentUser.avatar,
              }}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
