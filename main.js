// Sample API request #1 : http://api.openweathermap.org/data/2.5/weather?q=Toronto,ca&APPID=e89da154536fd30ccf31b6e56206ca6e
// Sample API request #2 : https://api.giphy.com/v1/gifs/translate?api_key=SoVlRBmtCajA9B1z7own0z3l0wLKZjB9&s=cats
const img = document.querySelector('img');
const searchBar = document.querySelector('[name=search]');
const weatherContainer = document.querySelector('.weather-container');
const submitButton = document.querySelector('.btn-submit');
const navbar = document.querySelector('nav');

console.log("Let's try a request targetting " + img + ': ');

async function getCurrentWeather(city) {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=7&APPID=e89da154536fd30ccf31b6e56206ca6e`
    );
    const data = await res.json();

    console.log(data);
    if (data.cod === 200) {
      let cityHeading = document.querySelector('.city-name');
      cityHeading.innerText = '';

      if (data.name) {
        weatherContainer.innerHTML = '';
        cityHeading.innerText = data.name + ', ' + data.sys.country;
      }
    }

    if (data.cod === '404' || data.code === '400') {
      console.log(data.message);
      // return;
    }

    let weatherData = processWeatherData(data);
    console.log('HERES AN OVERVIEW OF DATA RETRIEVED AS AN OBJECT:');
    console.table(weatherData);
  } catch (err) {
    console.log('No weather data found for the provided city.');
  }
}
getCurrentWeather('Whitby');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  getCurrentWeather(searchBar.value);
});

function processWeatherData(data) {
  console.log('THIS IS DA DATA MAN: ');
  console.table(data);

  let city = data.name;
  let date = new Date().toLocaleString().split(',')[0];
  let weather = data.weather[0].main;
  let temp = data.main.temp;
  let feelsLikeTemp = data.main.feels_like;
  let humidity = data.main.humidity;
  let wind = data.wind.speed;

  let weatherData = {
    city,
    date,
    weather,
    temp,
    feelsLikeTemp,
    humidity,
    wind,
  };

  return weatherData;
}

async function getForcast(city) {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&APPID=e89da154536fd30ccf31b6e56206ca6e`
    );
    const data = await res.json();

    console.log(data);

    if (data.cod === '404' || data.code === '400') {
      console.log(data.message);
      // return;
    }

    processData(data);
  } catch (err) {
    console.log('No weather data found for the provided city.');
  }
}
