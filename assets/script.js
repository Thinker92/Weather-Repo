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

let formSubmitHandler = function(event) {
    event.preventDefault();
    let city = searchInputEl.value.trim();
    if (city) {
        console.log("User input was: " + city);
    } else {
        alert("Please enter a city")
    }
}

searchInputForm.addEventListener("submit", formSubmitHandler);

// Function getCoordinates= Input: "City", output: (lat, long)
// Function getWeatherData= Input: (Lat, Log), Output: Save to local storage function
// Function saveToLocal= Input: {Weather Data}, city, Append to cities set cities to local storage
// Function displayResults= Write to HTML from local storage 

