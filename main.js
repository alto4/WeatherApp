// Sample API request #1 : http://api.openweathermap.org/data/2.5/weather?q=Toronto,ca&APPID=e89da154536fd30ccf31b6e56206ca6e
// Sample API request #2 : https://api.giphy.com/v1/gifs/translate?api_key=SoVlRBmtCajA9B1z7own0z3l0wLKZjB9&s=cats
const img = document.querySelector('img');
const searchBar = document.querySelector('[name=search]');
const weatherContainer = document.querySelector('.weather-container');
const submitButton = document.querySelector('.btn-submit');
const navbar = document.querySelector('nav');

console.log("Let's try a request targetting " + img + ': ');

async function getWeather(city) {
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
  } catch (err) {
    console.log('No weather data found for the provided city.');
  }
}
getWeather('Whitby');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  getWeather(searchBar.value);
});
