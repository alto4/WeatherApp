// Sample API request #1 : http://api.openweathermap.org/data/2.5/weather?q=Toronto,ca&APPID=e89da154536fd30ccf31b6e56206ca6e
// Sample API request #2 : https://api.giphy.com/v1/gifs/translate?api_key=SoVlRBmtCajA9B1z7own0z3l0wLKZjB9&s=cats
const img = document.querySelector('img');
const searchBar = document.querySelector('[name=search]');

console.log("Let's try a request targetting " + img + ': ');

async function getImage(searchTerm) {
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=SoVlRBmtCajA9B1z7own0z3l0wLKZjB9&s=${searchTerm}`
  );
  const gifData = await res.json();
  img.src = gifData.data.images.original.url;
}

getImage('banana');

searchBar.addEventListener('keypress', () => {
  getImage(searchBar.value);
});
