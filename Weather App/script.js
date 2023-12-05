// using const because these elements are not changed anywhere once fetched
const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const locationNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");

async function checkWeather(city) {
  const apiKey = "dd389586cfb6d943d39f8c06aa002457";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const weatherData = await fetch(`${url}`).then((response) => response.json());

  if (weatherData.cod === `404`) {
    locationNotFound.style.display = "flex";
    weatherBody.style.display = "none";
    return;
  }
  locationNotFound.style.display = "none";
  weatherBody.style.display = "flex";

  temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}`;
  description.innerHTML = `${weatherData.weather[0].description}`;
  humidity.innerHTML = `${weatherData.main.humidity}%`;
  windSpeed.innerHTML = `${weatherData.wind.speed}Km/Hr`;

  switch (weatherData.weather[0].main) {
    case "Clouds":
      weatherImg.src = "images/cloud.png";
      break;

    case "Clear":
      weatherImg.src = "images/clear.png";
      break;

    case "Rain":
      weatherImg.src = "images/rain.png";
      break;

    case "Mist":
      weatherImg.src = "images/mist.png";
      break;

    case "Snow":
      weatherImg.src = "images/snow.png";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});