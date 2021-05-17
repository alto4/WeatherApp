// Sample API request #1 : http://api.openweathermap.org/data/2.5/weather?q=Toronto,ca&APPID=e89da154536fd30ccf31b6e56206ca6e
// Sample API request #2 : https://api.giphy.com/v1/gifs/translate?api_key=SoVlRBmtCajA9B1z7own0z3l0wLKZjB9&s=cats
const img = document.querySelector('img');
const searchBar = document.querySelector('[name=search]');
const weatherContainer = document.querySelector('.weather-container');

console.log("Let's try a request targetting " + img + ': ');

async function getWeather(city) {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=e89da154536fd30ccf31b6e56206ca6e`
  );
  const data = await res.json();

  if (data) {
    // img.src = gifData.data.images.original.url;
    console.log("Here's your data: " + data.weather);
    console.table(data);
    console.table(data.weather);
    console.log(data.name);

    let cityHeading = document.createElement('h1');

    if (data.name) {
      weatherContainer.innerHTML = '';
      cityHeading.innerText = data.name + ', ' + data.sys.country;
      weatherContainer.appendChild(cityHeading);
    } else {
      weatherContainer.innerHTML = '';
    }
  }
}
getWeather('Whitby');

searchBar.addEventListener('keyup', () => {
  getWeather(searchBar.value);
});
