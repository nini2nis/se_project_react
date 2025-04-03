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

/* 

The Main component is a wrapper for the main content of the 
app. 
It includes:

    The WeatherCard component shows the current temperature. 
    Weather data is sent here, in addition to the Header, 
    as props. Note that the weather data 
    is not stored in Main, so you need to pass it down 
    from the App component.
    Clothing item cards, which are filtered based on the 
    current weather. Wrap the ItemCard component into 
    the unordered list and use the 
     filter() and map() methods.

First, you need to go to https://openweathermap.org/ 
and register. Upon registration, you will get a unique 
API key, which is necessary to make requests to the API. 
You can find this key on the account dashboard:
The request itself is a string that looks like this: 

https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}

The apiKey is the key described above. The latitude 
and longitude are just simple strings that contain 
the coordinates of a specific location.

You can keep the API key and coordinates of your 
preferred location in the utils/constants.js file.

Weather API returns a lot of information, but for 
our project, we’ll only need to extract the city 
name and the current temperature value and define 
the weather types. Create a function to extract all 
of the necessary data from the API.

We recommend keeping all of the data manipulation 
functionality (fetching and filtering) with the API 
in a separate utils/weatherApi.js file. Import the 
API module to App.js. The request to the API should 
only be made when mounting the App component.

Since the cards must be filtered by weather type in 
Main.js, you can write the logic of defining 
temperature ranges in utils/weatherApi.js. For example:

if (temperature >= 86) {
  return 'hot';
} else if (temperature >= 66) {
  return 'warm';
} else {
  return 'cold';
}

Here, we only use three ranges based on our personal 
temperature sensitivity, but you are free to define
 your ranges and expand the number of weather types.
*/
