import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/Constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData, isMobileMenuOpened }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section
      className={`weather-card ${
        isMobileMenuOpened ? "weather-card_closed" : ""
      }`}
    >
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}&deg; {currentTemperatureUnit}
      </p>
      <img
        className="weather-card__image"
        src={weatherOption?.url}
        alt={`Banner showing ${weatherOption?.day} ${weatherOption?.condition} weather`}
      />
    </section>
  );
}
export default WeatherCard;
