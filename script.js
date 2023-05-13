  const api = {
    key: "05eb9f4cdcc2cd8c41198a5d8c0d306e",
    base: "https://api.openweathermap.org/data/2.5/"
  };

  
  function displayWeather(weatherData) {
    const { name, sys, main, weather } = weatherData;
  
    const cityElement = document.querySelector('.location .city');
    const dateElement = document.querySelector('.location .date');
    const tempElement = document.querySelector('.current .temp');
    const weatherElement = document.querySelector('.current .weather');
    const hilowElement = document.querySelector('.current .hi-low');
  
    cityElement.textContent = `${name}, ${sys.country}`;
    dateElement.textContent = getDate();
  
    tempElement.innerHTML = `${Math.round(main.temp)}<span>°C</span>`;
    weatherElement.textContent = weather[0].main;
    hilowElement.textContent = `${Math.round(main.temp_min)}°C / ${Math.round(main.temp_max)}°C`;
  
    updateBackground(weather[0].main);
  }
  
  function updateBackground(weatherCondition) {
    const body = document.querySelector('body');
  
    if (weatherCondition.includes('Cloud')) {
      body.style.backgroundImage = "url('images/cloudy.jpg')";
    } else if (weatherCondition.includes('Sun')) {
      body.style.backgroundImage = "url('images/sunny.jpg')";
    } else if (weatherCondition.includes('Rain')) {
      body.style.backgroundImage = "url('images/rainy.jpg')";
    } else if (weatherCondition.includes('Fog')) {
      body.style.backgroundImage = "url('images/foggy.jpg')";
    } else if (weatherCondition.includes('Clear')) {
      body.style.backgroundImage = "url('images/clear.jpg')";
    } else if (weatherCondition.includes('Haze')) {
      body.style.backgroundImage = "url('images/haze.jpg')";
    } else {
      body.style.backgroundImage = "url('images/default.jpg')";
    }
  }
  
  function getDate() {
    const date = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  
  function showError(message) {
    console.log(message);
    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.textContent = message;
  
    const card = document.querySelector('.card');
    card.appendChild(errorElement);
  }
  
  function clearError() {
    const errorElement = document.querySelector('.error');
    if (errorElement) {
      errorElement.remove();
    }
  }


const searchBox = document.querySelector('.search-box');
const searchButton = document.querySelector('.search-button');
const errorDiv = document.querySelector('.error');
searchButton.addEventListener('click', searchWeather);

function searchWeather(event) {
  event.preventDefault();
  const query = searchBox.value;
  if (query.trim() !== '') {
    getResults(query);
    errorDiv.textContent = '';
  } else {
    errorDiv.textContent = 'Please enter a city name.';
  }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayWeather);
}
