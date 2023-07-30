let cities = [];

let searchInputForm = document.querySelector("#searchForm");
let searchInputEl = document.querySelector("#inputCity");
let prevSearchEl = document.querySelector("#pastSearch");
let cityObjectEl = document.querySelector("#cityData");
let weekForecastContainerEl = document.querySelector("#fiveDay");
let weekForecastTitle = document.querySelector("#fiveDayTitle");
let todaysForecastEl = document.querySelector("#oneDay");
let todaysForecastTitle = document.querySelector("#cityName");
let todaysForecastData = document.querySelector("#cityDetails");

const openWeatherAPI = "e1c07b6ea350045571a9f63ab10e6b58"


let formSubmitHandler = function(event) {
    event.preventDefault();
    let city = searchInputEl.value.trim();
    if (city) {
        console.log("User input was: " + city);
        getCoordinates(city)
    } else {
        alert("Please enter a city")
    }
}

searchInputForm.addEventListener("submit", formSubmitHandler);

// Function getCoordinates= Input: "City", output: (lat, long)
function getCoordinates(city) {
    let geocodingURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${openWeatherAPI}`;

    fetch(geocodingURL)
        .then(response => response.json())
            .then(data => {
                if (data[0]){
                    getWeatherData(city,data[0].lat, data[0].lon);
                } else {
                    alert("City not found.");
                }
            })
        .catch(error => console.log('Error: ', error))
}

// Function getWeatherData= Input: (Lat, Log), Output: Save to local storage function
function getWeatherData(city,lat, lon) {
    let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${openWeatherAPI}`;
    fetch(weatherURL)
        .then(response => response.json())
            .then(data => {
                let temp = (((data.list[0].main.temp) -273.15)*(9/5)+32).toFixed(1)
                console.log("Temp: ");
                console.log(temp);

                let cityData = {city: city, data: data}
                cities.push(cityData); 
                localStorage.setItem('cities',JSON.stringify(cities));
                displayResults(data);
                display5DayForecast(data);
            })
}

// Function displayResults= Write to HTML from local storage 
// Display today's weather
function displayResults(weatherData) {
    // Clear existing data
    todaysForecastData.innerHTML = "";

    // Display city name and current date
    todaysForecastTitle.textContent = weatherData.city.name + " (" + new Date().toLocaleDateString() + ")";

    // Create elements for temperature, wind speed and humidity
    let tempEl = document.createElement("p");
    tempEl.textContent = "Temperature: " + (((weatherData.list[0].main.temp) -273.15)*(9/5)+32).toFixed(1) + " °F";

    let windEl = document.createElement("p");
    windEl.textContent = "Wind Speed: " + weatherData.list[0].wind.speed + " MPH";

    let humidityEl = document.createElement("p");
    humidityEl.textContent = "Humidity: " + weatherData.list[0].main.humidity + " %";

    // Append elements to the forecast data container
    todaysForecastData.appendChild(tempEl);
    todaysForecastData.appendChild(windEl);
    todaysForecastData.appendChild(humidityEl);
    //Add the weather icon
    let weatherIconEl = document.createElement("img");
    weatherIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + weatherData.list[0].weather[0].icon + ".png");
    
    weatherIconEl.classList.add('weather-icon');
    
    todaysForecastData.appendChild(weatherIconEl);

}

// Load past searches from local storage
function loadPastSearches() {
    let storedCities = JSON.parse(localStorage.getItem('cities'));
    
    if (storedCities !== null) {
        cities = storedCities;
    }

    // Clear any existing past searches
    prevSearchEl.innerHTML = "<ul>Past Searches: </ul>";

    // Create a button for each past search
    for (let i = 0; i < cities.length; i++) {
        let cityBtn = document.createElement("button");
        cityBtn.textContent = cities[i].city;
        cityBtn.setAttribute('class', 'btn btn-secondary');
        cityBtn.setAttribute('data-index', i);
        prevSearchEl.appendChild(cityBtn);
    }
}

// Handle click on a past search button
prevSearchEl.addEventListener("click", function(event) {
    let element = event.target;
    if (element.matches("button") === true) {
        let index = element.getAttribute('data-index');
        displayResults(cities[index].data);
    }
});

// Display 5-day forecast
function display5DayForecast(weatherData) {
    // Clear existing forecast
    let forecastCards = document.querySelector("#forecastCards");
    forecastCards.innerHTML = "";
    
    // Create a card for each day
    for (let i = 1; i <= 5; i++) {
        let forecastData = weatherData.list[i];

        let forecastCard = document.createElement("div");
        forecastCard.setAttribute('class', 'card');

        let forecastDate = document.createElement("h5");
        forecastDate.textContent = new Date(forecastData.dt * 1000).toLocaleDateString();
        forecastCard.appendChild(forecastDate);

        let forecastTemp = document.createElement("p");
        forecastTemp.textContent = "Temp: " + (((forecastData.main.temp) -273.15)*(9/5)+32).toFixed(1) + " °F";
        forecastCard.appendChild(forecastTemp);

        let forecastWind = document.createElement("p");
        forecastWind.textContent = "Wind: " + forecastData.wind.speed + " MPH";
        forecastCard.appendChild(forecastWind);

        let forecastHumidity = document.createElement("p");
        forecastHumidity.textContent = "Humidity: " + forecastData.main.humidity + " %";
        forecastCard.appendChild(forecastHumidity);
        let forecastIcon = document.createElement("img");
        forecastIcon.setAttribute("src", "http://openweathermap.org/img/w/" + forecastData.weather[0].icon + ".png");
        forecastIcon.classList.add('weather-icon');
        forecastCard.appendChild(forecastIcon);

        forecastCards.appendChild(forecastCard);
    }
}



loadPastSearches();



// 5-Day Forecast Card:
// Date
// Icon
// Temp
// Wind
// Humidity