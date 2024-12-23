const apiKey = '60ca6b65c2425fa2675963b561d85054'; 
const getWeatherButton = document.getElementById('getWeather');
const cityInput = document.getElementById('city');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const precipitation = document.getElementById('precipitation');
const airQuality = document.getElementById('airQuality');
const timeElement = document.getElementById('Time');
const weatherIcon = document.getElementById('weatherIcon');
const searchHistoryContainer = document.getElementById('searchHistory');
const themeToggleButton = document.getElementById('themeToggle');
const unitToggleButton = document.getElementById('unitToggle');
let unit = 'metric'; 


themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});


unitToggleButton.addEventListener('click', () => {
    unit = unit === 'metric' ? 'imperial' : 'metric';
    unitToggleButton.textContent = unit === 'metric' ? 'Toggle Units (°C/°F)' : 'Toggle Units (°F/°C)';
    getWeather(); 
});


const getWeather = () => {
    const city = cityInput.value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            
            cityName.textContent = `City: ${data.name}`;
            const temperatureValue = data.main.temp;
            temperature.textContent = `Temperature: ${temperatureValue}°${unit === 'metric' ? 'C' : 'F'}`;
            description.textContent = `Weather: ${data.weather[0].description}`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
            precipitation.textContent = `Precipitation: ${data.rain ? data.rain['1h'] : 0} mm`;
            airQuality.textContent = `Air Quality: Satisfactory`; // Placeholder for air quality
            
            
            const date = new Date();
            const currentDate = date.toLocaleDateString();
            const currentTime = date.toLocaleTimeString();
            timeElement.textContent = `Date: ${currentDate}, Time: ${currentTime}`;

            
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            weatherIcon.innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}" />`;

            

            
            const historyItem = document.createElement('div');
            historyItem.textContent = city;
            searchHistoryContainer.appendChild(historyItem);
        })
        .catch(error => {
            alert(error.message);
        });
};


getWeatherButton.addEventListener('click', getWeather);
