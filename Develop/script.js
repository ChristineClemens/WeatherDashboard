var APIKey = "2015c5f25f689dcf6dedba026011e032";

// //Identify current location.
// function getLocation() {
//     navigator.geolocation.getCurrentPosition(function(position) {
//         var latitude = position.coords.latitude;
//         console.log (latitude);
//         var longitude = position.coords.longitude;
//         console.log (longitude);
//         var UVindex = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&units=metric&appid=${APIKey}`;
//         var todayLocalURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`;
//         var forecastLocalURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&units=metric&appid=${APIKey}`;
        
//         fetchData(todayLocalURL)
//             .then(data => passData(data, displayLocalWeather));
//         fetchData(UVindex)
//             .then(data => passData(data, displayUV));
//         fetchData(forecastLocalURL)
//             .then(data => passData(data, fiveDayForecast));
//     }) 
// }

//Fetch local current weather using geolocation. 
// function passData(data, receiveData) {
//     console.log(data);
//     receiveData(data);
// }      
// function fetchData(URL) {
//     var promise = fetch (URL, {
//         method: "GET",
//     })
//     .then (response => response.json())
//     return promise;
// }

// //Display local current weather in current weather box.
// function displayLocalWeather(data) {
//     console.log(data);
//     document.querySelector("#cityName").innerHTML = `${data.name} (${moment().format('L')}) <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}.png'>`;
//     document.querySelector("#humidity").innerHTML = `Humidity: ${data.main.humidity}%`
//     document.querySelector("#temperature").innerHTML = `Current Temperature: ${data.main.temp.toFixed(1)} &deg;C`;
//     document.querySelector("#windSpeed").innerHTML = `Wind Speed: ${data.wind.speed} km/h`;
// }
// //Display UV Index        
// function displayUV(data) {
//     console.log(data);
//     var humidityString = data.daily[0].uvi;
//     var humidityNumber = parseFloat(humidityString);
//     console.log(humidityNumber);
//     if (humidityNumber >= 7) {
//         document.querySelector("#UVindex").innerHTML = `<p class="badge badge-danger">UV Index ${humidityNumber}</p>`;
//     }
//     if (humidityNumber <= 3) {
//         document.querySelector("#UVindex").innerHTML = `<p class="badge badge-success">UV Index ${humidityNumber}</p>`;
//     }
//     if (humidityNumber > 3 && humidityNumber < 7) {
//         document.querySelector("#UVindex").innerHTML = `<p class="badge badge-warning">UV Index ${humidityNumber}</p>`;
//     }
// }

// //Display five-day forecast
// function fiveDayForecast(data) {
//     for (i = 1; i <= 5; i++) {
//         document.querySelector(`#date${i}`).innerHTML =
//         `<img src='https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png'>
//         <p style="font-weight:bold"> ${moment(data.daily[i].dt,"X").format('L')} </p> 
//         ${data.daily[i].temp.day.toFixed(1)} &deg;C <br> ${data.daily[i].humidity}% <br> ${data.daily[i].weather[0].description}`;
//     }
// }
// getLocation();

//----------------------------------------------------------------------------------------------------

function getCity() {
    var searchInput = document.querySelector("#cityInput").value;
    console.log(searchInput);
    var searchInputURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=${APIKey}`;
    
    fetchCityData(searchInputURL)
        .then(data => passCityData(data, displayCityData));
    fetchCityData(searchInputURL)
        .then(data => passCityData(data, fiveDayCityForecast));
}

const searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("submit", e => {
    e.preventDefault();
    const searchInput = document.querySelector("#cityInput").value
    getCity();
});

//Retrieve information about the searched city.
function passCityData(data, receiveData) {
        console.log(data);
        receiveData(data);
}      

function fetchCityData(URL) {
    var cityPromise = fetch (URL, {
        method: "GET",
    })
    .then (response => response.json())
    return cityPromise;
}

//Display data using the appropriate API.
function displayCityData(data) {
    console.log(data);
    document.querySelector("#cityName").innerHTML = `${searchInput} (${moment().format('L')}) <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}.png'>`;
    document.querySelector("#humidity").innerHTML = `Humidity: ${data.main.humidity}%`
    document.querySelector("#temperature").innerHTML = `Current Temperature: ${data.main.temp.toFixed(1)} &deg;C`;
    document.querySelector("#windSpeed").innerHTML = `Wind Speed: ${data.wind.speed} km/h`;
}

function fiveDayCityForecast(data) {
    for (i = 1; i <= 5; i++) {
        document.querySelector(`#date${i}`).innerHTML =
        `<img src='https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png'>
        <p style="font-weight:bold"> ${moment(data.daily[i].dt,"X").format('L')} </p> 
        ${data.daily[i].temp.day.toFixed(1)} &deg;C <br> ${data.daily[i].humidity}% <br> ${data.daily[i].weather[0].description}`;
    }
}
//Store search history to local storage and display previously searched cities.
function saveCity() {
    localStorage.setItem("city", json.stringify(data));
}

function displaySavedCity() {
    localStorage.getItem("city");
    document.querySelector("#searchHistory") += localStorage.getItem("city").value;
}

//----------------------------------------------------------------------------------------------------

  