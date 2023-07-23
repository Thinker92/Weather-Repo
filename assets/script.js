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
                console.log("Data: ");
                console.log(data);
                let cityData = {city: city, data: data}
                cities.push(cityData);
                localStorage.setItem('cities',JSON.stringify(cities));
                // Temperature in Kelvins? 
                // Convert to F:
                // eg. (301.55K - 273.15) * (9/5) +32 = 83.12F
            })
}
// Function saveToLocal= Input: {Weather Data}, city, Append to cities set cities to local storage
// Function displayResults= Write to HTML from local storage 

