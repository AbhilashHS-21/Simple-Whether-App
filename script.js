const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const searchKey = document.getElementById("myInput");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const errorImg = document.querySelector(".not-found");

searchKey.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    search.click();
  }
});

search.addEventListener("click", () => {
  const API_KEY = "b14a8743e46985ddffe474ee65f089b2";

  const city = document.querySelector(".search-box input").value;

  if (city === "") return;
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "450px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        errorImg.style.display = "block";
        errorImg.classList.add("fadeIn");
        return;
      }

      errorImg.style.display = "none";
      errorImg.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Mist":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)} m/sec `;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
