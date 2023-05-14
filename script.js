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
      body.style.backgroundImage = "url('asserts/cloudy.jpg')";
    } else if (weatherCondition.includes('Sun')) {
      body.style.backgroundImage = "url('asserts/sunny.jpg')";
    } else if (weatherCondition.includes('Rain')) {
      body.style.backgroundImage = "url('asserts/rainy.jpg')";
    } else if (weatherCondition.includes('Fog')) {
      body.style.backgroundImage = "url('asserts/Fog.jpg')";
    } else if (weatherCondition.includes('Clear')) {
      body.style.backgroundImage = "url('asserts/Clear.jpg')";
    } else if (weatherCondition.includes('Haze')) {
      body.style.backgroundImage = "url('asserts/Haze.jpg')";
    } else if (weatherCondition.includes('Humid')) {
      body.style.backgroundImage = "url('asserts/Humid.jpg')";
    } else if (weatherCondition.includes('Mist')) {
      body.style.backgroundImage = "url('asserts/Mist.jpg')";
    } else if (weatherCondition.includes('Hot')) {
      body.style.backgroundImage = "url('asserts/Hot.jpg')";
    } else if (weatherCondition.includes('Snow')) {
      body.style.backgroundImage = "url('asserts/Snow.jpg')";
    } else if (weatherCondition.includes('Windy')) {
      body.style.backgroundImage = "url('asserts/Windy.jpg')";
    } else if (weatherCondition.includes('Cold')) {
      body.style.backgroundImage = "url('asserts/Cold.jpg')";
    } else {
      body.style.backgroundImage = "url('asserts/default.jpg')";
    }
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
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
