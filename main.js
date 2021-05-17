// Sample API request #1 : http://api.openweathermap.org/data/2.5/weather?q=Toronto,ca&APPID=e89da154536fd30ccf31b6e56206ca6e

const img = document.querySelector('img');
const searchBar = document.querySelector('[name=search]');
const weatherContainer = document.querySelector('.weather-container');
const submitButton = document.querySelector('.btn-submit');
const navbar = document.querySelector('nav');

// Get city data
async function getCurrentWeather(city) {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=7&APPID=e89da154536fd30ccf31b6e56206ca6e&units=metric`
    );

    const data = await res.json();

    // If request is successful, display city name in DOM
    if (data.cod === 200) {
      let cityHeading = document.querySelector('.city-name');
      cityHeading.innerText = '';

      if (data.name) {
        weatherContainer.innerHTML = '';
        cityHeading.innerText = data.name + ', ' + data.sys.country;
      }
    }

    // If any errors arise, display them in the console
    if (data.cod === '404' || data.code === '400') {
      console.error(data.message);
    }

    // Process, then render data in DOM
    let weatherData = processWeatherData(data);
    renderData(weatherData);
  } catch (err) {
    console.error('No weather data found for the provided city.');
  }
}

// Default to display Toronto's weather upon initial load
getCurrentWeather('Toronto');

// When submit button is clicked, make API request and clear searchbar
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  getCurrentWeather(searchBar.value);
  searchBar.value = '';
});

// Process data from API response and return a neater object representation containing only needed data
function processWeatherData(data) {
  let city = data.name;
  let date = new Date().toLocaleString().split(',')[0];
  let weather = data.weather[0].main;
  let icon = data.weather[0].icon;
  let temp = data.main.temp;
  let feelsLikeTemp = data.main.feels_like;
  let humidity = data.main.humidity;
  let wind = data.wind.speed;

  let weatherData = {
    city,
    date,
    weather,
    icon,
    temp,
    feelsLikeTemp,
    humidity,
    wind,
  };

  return weatherData;
}

// Render weather data in DOM
function renderData(data) {
  let { city, icon, date, weather, temp, feelsLikeTemp, humidity, wind } = data;

  weatherContainer.innerHTML = `
  <h1 class="temperature">${Math.round(temp)}<span>&deg;C</span></h1>
  <h1>${city}</h1>
  <img src="http://openweathermap.org/img/w/${icon}.png" alt="${weather} icon." />
  <h2 class="weather-description">${weather}</h2>
  <h2>Feels Like: ${feelsLikeTemp}&deg;C</h2>
  <h2>Humidity: ${humidity}</h2>
  <h2>Wind: ${(wind * 3.6).toFixed(2)} KM/H</h2>
  `;

  // Update background image according to currently displayed city's weather
  evaluateBackgroundImage(weather);
}

// Based on current city's weather, choose an appropriate background image
function evaluateBackgroundImage(weather) {
  let body = document.querySelector('body');

  switch (weather.toLowerCase()) {
    case 'clouds':
      body.style.background = `linear-gradient(
        rgba(0, 0, 0, .78), 
        rgba(0, 0, 0, .99)
      ), url('./images/cloudy.jpg')`;
      break;
    case 'clear':
      body.style.background = `linear-gradient(
        rgba(0, 0, 0, .78), 
        rgba(0, 0, 0, .99)
      ), url('./images/clear.jpg')`;
      break;
    case 'snow':
      body.style.background = `linear-gradient(
        rgba(0, 0, 0, .78), 
        rgba(0, 0, 0, .99)
      ), url('./images/snow.jpg')`;
      break;
    case 'rain':
      body.style.background = `linear-gradient(
        rgba(0, 0, 0, .5), 
        rgba(0, 0, 0, .4)
      ), url('./images/rain.jpg')`;
      break;
    default:
      body.style.background = `linear-gradient(
        rgba(0, 0, 0, .78), 
        rgba(0, 0, 0, .99)
      ), url('./images/earth.jpg')`;
      break;
  }
}
