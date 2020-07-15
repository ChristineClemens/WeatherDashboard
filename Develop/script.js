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
    document.querySelector("#cityName").innerHTML = `${data.name} (${moment().format('L')}) <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}.png'>`;
    document.querySelector("#humidity").innerHTML = `Humidity: ${data.main.humidity}%`
    document.querySelector("#temperature").innerHTML = `Current Temperature: ${data.main.temp.toFixed(1)} &deg;C`;
    document.querySelector("#windSpeed").innerHTML = `Wind Speed: ${data.wind.speed} km/h`;
}
//Display UV Index        
function displayUV(data) {
    console.log(data);
    var humidityString = data.daily[0].uvi;
    var humidityNumber = parseFloat(humidityString);
    console.log(humidityNumber);
    if (humidityNumber >= 7) {
        document.querySelector("#UVindex").innerHTML = `<p class="badge badge-danger">UV Index ${humidityNumber}</p>`;
    }
    if (humidityNumber <= 3) {
        document.querySelector("#UVindex").innerHTML = `<p class="badge badge-success">UV Index ${humidityNumber}</p>`;
    }
    if (humidityNumber > 3 && humidityNumber < 7) {
        document.querySelector("#UVindex").innerHTML = `<p class="badge badge-warning">UV Index ${humidityNumber}</p>`;
    }
}

//Display five-day forecast
function fiveDayForecast(data) {
    for (i = 1; i <= 5; i++) {
        document.querySelector(`#date${i}`).innerHTML =
        `<img src='https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png'>
        <p style="font-weight:bold"> ${moment(data.daily[i].dt,"X").format('L')} </p> 
        ${data.daily[i].temp.day.toFixed(1)} &deg;C <br> ${data.daily[i].humidity}% <br> ${data.daily[i].weather[0].description}`;
    }
}

//----------------------------------------------------------------------------------------------------
//Store search history to local storage and display previously searched cities.

function loadLocalStorageItems() {
    if (localStorage.getItem("last")) {
        generateCityInfo(localStorage.getItem("last"));
    }
};

function saveCity(city, cityURL) {
    if (localStorage.getItem(city) === null) {
        localStorage.setItem(city, cityURL);
        localStorage.setItem("last", cityURL);
        document.querySelector("#searchHistory").innerHTML += `<li class="list-group-item"><a onclick="retrieveStoredInfo()" href="#">${city}</a></li>`;
    }
}

//Call information for searched city.
async function getCity() {
    var searchInputRaw = document.querySelector("#cityInput").value;
    var searchInput = document.querySelector("#cityInput").value.split(" ").join("").toLowerCase();
    //Current weather
    var searchInputURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=${APIKey}`;
    saveCity(searchInputRaw, searchInputURL);
    generateCityInfo(searchInputURL);
}

function retrieveStoredInfo() {
    var city = event.target.textContent;
    var localStorageInfo = localStorage.getItem(city);
    generateCityInfo(localStorageInfo);
}

async function generateCityInfo(searchInputURL) {
    await fetchData(searchInputURL)
        .then(data => {
            passData(data, displayLocalWeather);
            var longitude = data.coord.lon;
            var latitude = data.coord.lat;
            //Forecast, UVI, City Name
            var searchForecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&units=metric&appid=${APIKey}`;
            fetchData(searchForecastURL)
                .then(forecastData => {
                    passData(forecastData, fiveDayForecast);
                    passData(forecastData, displayUV);
                }
            );    
        }
    );
}

//Search button functionality.
document.querySelector("#searchBtn").addEventListener("click", getCity);

if (localStorage.getItem("last")) {
    loadLocalStorageItems();
} else {
    getLocation();
};