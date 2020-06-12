var APIKey = "2015c5f25f689dcf6dedba026011e032";

//Identify current location.
function getLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        console.log (latitude);
        var longitude = position.coords.longitude;
        console.log (longitude);
        var UVindex = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&units=metric&appid=${APIKey}`;
        var todayLocalURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`;
        var forecastLocalURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&units=metric&appid=${APIKey}`;
        
        fetchData(todayLocalURL)
            .then(data => passData(data, displayLocalWeather));
        fetchData(UVindex)
            .then(data => passData(data, displayUV));
        fetchData(forecastLocalURL)
            .then(data => passData(data, fiveDayForecast));
    }) 
}

//Fetch local current weather using geolocation. 
function passData(data, receiveData) {
    console.log(data);
    receiveData(data);
}      
function fetchData(URL) {
    var promise = fetch (URL, {
        method: "GET",
    })
    .then (response => response.json())
    return promise;
}

//Display local current weather in current weather box.
function displayLocalWeather(data) {
    console.log(data);
    document.querySelector("#cityName").innerHTML = `${data.name} <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}.png'>`;
    document.querySelector("#humidity").innerHTML = `Humidity: ${data.main.humidity}%`
    document.querySelector("#temperature").innerHTML = `Current Temperature: ${data.main.temp.toFixed(1)} &deg;C`;
    document.querySelector("#windSpeed").innerHTML = `Wind Speed: ${data.wind.speed} km/h`;
}
//Display UV Index        
function displayUV(data) {
    console.log(data);
    document.querySelector("#UVindex").innerHTML = `UV Index ${data.daily[0].uvi}`;
}

//Display five-day forecast
function fiveDayForecast(data) {
    for (i = 1; i <= 5; i++) {
        document.querySelector(`#date${i}`).innerHTML =
        `<img src='https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png'> High: ${data.daily[i].temp.max.toFixed(1)} &deg;C Low: ${data.daily[i].temp.min.toFixed(1)} &deg;C ${data.daily[i].weather[0].description}`
    }
}
getLocation();

//----------------------------------------------------------------------------------------------------

function searchCity() {
    var searchCityURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    var city = document.querySelector("#cityInput").value;

    var searchBtn = document.querySelector("#searchBtn");
    searchBtn.addEventListener("click", searchCity);


}

