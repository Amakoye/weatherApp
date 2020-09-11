const search = document.querySelector(".search");
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const currentTemp = document.querySelector(".temp");
const currentWeather = document.querySelector(".weather");

let now = new Date();

//console.log(now);

const api = {
  api_key: "890aaf7aaa4dc0d9d1222ef1416b4a91",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather?",
};

search.addEventListener("change", setQuery);

function setQuery(event) {
  let search = event.target.value;
  if (search.length !== 0) {
    getForecast(search);
  }
}

const getForecast = async (query) => {
  try {
    await fetch(`${api.baseUrl}q=${query}&units=metric&appid=${api.api_key}`)
      .then((data) => {
        return data.json();
      })
      .then(storeForecast);
  } catch (error) {}
};

// store & retrieve search to local storage
const storeForecast = (forecast) => {
  const weatherForecast = {
    weatherCity: `${forecast.name}, ${forecast.sys.country}`,
    weatherDate: `${now}`,
    weatherTemp: `${Math.round(forecast.main.temp)}<span>°c</span>`,
    currentWeather: `${forecast.weather[0].main}`,
  };

  //console.log(weather);
  window.localStorage.setItem(
    "weatherForecast",
    JSON.stringify(weatherForecast)
  );

  const weather = JSON.parse(window.localStorage.getItem("weatherForecast"));
  // Display weather Forecast
  displayForecast(weather);
};

const displayForecast = (weather) => {
  //console.log(weather);
  city.innerText = `${weather.weatherCity}`;
  date.innerText = `${weather.weatherDate}`;
  currentTemp.innerHTML = `${weather.weatherTemp}`;
  currentWeather.innerText = `${weather.currentWeather}`;
};

//
window.addEventListener("load", () => {
  let userLat;
  let userLong;
  //get current User location coordinates
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      userLat = position.coords.latitude;
      userLong = position.coords.longitude;
      console.log(currentUserForecast(userLat, userLong));
    });
  }
});

const currentUserForecast = async (lat, long) => {
  try {
    await fetch(
      `${api.baseUrl}lat=${lat}&lon=${long}&units=metric&appid=${api.api_key}`
    )
      .then((data) => {
        return data.json();
      })
      .then(storeForecast);
  } catch (error) {
    console.log(error);
  }
};
