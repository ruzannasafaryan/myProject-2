const apiKey = "your_api_key_here";
const cityList = ["London", "New York", "Tokyo", "Paris", "Sydney", "Yerevan"];

const cityListElement = document.getElementById("city-list");
const cityDetailElement = document.getElementById("city-detail");
const weatherInfoElement = document.getElementById("weather-info");
const backButton = document.getElementById("back-button");

const fetchWeatherData = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
};

const renderCityList = async () => {
    cityListElement.innerHTML = "";
    for (const city of cityList) {
        const cityItem = document.createElement("div");
        cityItem.className = "city-item";
        cityItem.textContent = city;
        
        cityItem.addEventListener("click", async () => {
            const weatherData = await fetchWeatherData(city);
            renderCityDetail(weatherData);
        });

        cityListElement.appendChild(cityItem);
    }
};

const renderCityDetail = (weatherData) => {
    cityListElement.style.display = "none";
    cityDetailElement.style.display = "block";
    
    const { name, main, weather, wind } = weatherData;
    weatherInfoElement.innerHTML = `
        <h3>${name}</h3>
        <p>Temperature: ${main.temp}°C</p>
        <p>Weather: ${weather[0].description}</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
};

backButton.addEventListener("click", () => {
    cityDetailElement.style.display = "none";
    cityListElement.style.display = "block";
});

renderCityList();
