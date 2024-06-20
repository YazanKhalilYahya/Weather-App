/*https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric
https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=790169426ca523a4573f16f265a84ae8&units=metric
*/

const api_key = "790169426ca523a4573f16f265a84ae8";
const url = "https://api.openweathermap.org/data/2.5/weather?";

const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const weather_img = document.querySelector(".weather-img");
const search_btn = document.querySelector(".search-btn");
const input = document.querySelector(".city-input");
const humidity = document.querySelector(".humidity-percentage");
const wind_speed = document.querySelector(".wind-speed");
const invalid_city = document.querySelector(".invalid-city");

search_btn.addEventListener("click", () => {
  async function get_weather_info() {
    const fetch_url = await fetch(
      `${url}q=${input.value}&appid=${api_key}&units=metric`
    );
    if (fetch_url.status == 404) {
      invalid_city.style.display = "block";
      document.querySelector(".weather-details").style.display = "none";
    } else {
      const data = await fetch_url.json();
      city.innerHTML = data.name;
      temp.innerHTML = Math.round(data.main.temp) + "°C";
      humidity.innerHTML = `${data.main.humidity}%`;
      wind_speed.innerHTML = `${data.wind.speed} km/h`;

      if (data.weather[0].main == "Clouds") {
        weather_img.src = "images/clouds.png";
      } else if (data.weather[0].main == "Rain") {
        weather_img.src = "images/rain.png";
      } else if (data.weather[0].main == "Clear") {
        weather_img.src = "images/clear.png";
      } else if (data.weather[0].main == "Drizzle") {
        weather_img.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weather_img.src = "images/mist.png";
      } else {
        weather_img.src = "images/snow.png";
      }
      invalid_city.style.display = "none";
      document.querySelector(".weather-details").style.display = "block";
    }
  }
  get_weather_info();
});
