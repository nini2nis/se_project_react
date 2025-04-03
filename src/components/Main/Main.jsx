import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/Constants";
import ItemCard from "../ItemCard/ItemCard";
import randomizeIcon from "../../assets/randomize.png";

function Main({ weatherData, handleCardClick, isMobileMenuOpened }) {
  return (
    <main className="main">
      <WeatherCard
        weatherData={weatherData}
        isMobileMenuOpened={isMobileMenuOpened}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F}&deg;/ You might want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
        <button type="button" className="cards__randomize-btn">
          <img
            src={randomizeIcon}
            alt="icon"
            className="cards__randomize-icon"
          />
          Randomize
        </button>
      </section>
    </main>
  );
}
export default Main;
