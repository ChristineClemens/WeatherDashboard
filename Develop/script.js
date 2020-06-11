var APIKey = "2015c5f25f689dcf6dedba026011e032";

//Identify current location.
function getLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        console.log (latitude);
        var longitude = position.coords.longitude;
        console.log (longitude);
        var UVindex = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&units=metric&appid=${APIKey}`;
        var todayLocalURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`
        var forecastLocalURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&units=metric&appid=${APIKey}`;

        displayData(fetchData(todayLocalURL));
        displayUV(fetchData(UVindex));  
    })
}

//Fetch local current weather using geolocation.       
function fetchData(URL) {
	var result;
    fetch (URL, {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => result = data);
	return result;
}
// var result = fetchData(URL);
// displayData(result);

//Display local current weather in current weather box.
function displayData(data) {
    console.log(data);
    document.querySelector("#icon").innerHTML = `<img src='https://openweathermap.org/img/wn/${data.weather[0].icon}.png'>`;
    document.querySelector("#cityName").innerHTML = `${data.name}`;
    document.querySelector("#temperature").innerHTML = `Current Temperature: ${data.main.temp}`;
    document.querySelector("#windSpeed").innerHTML = `Wind Speed: ${data.wind.speed}`;
}
//Display UV Index        
function displayUV(data) {
    document.querySelector("#UVindex").innerHTML = `${data.daily[0].uvi}`;
}
getLocation();



// function fetchData(URL) {
//     fetch (URL, {
//         method: "GET",
//     })
//     .then(response => response.json())
//     .then(data => {displayData(data); displayUV(data);})
// }

//----------------------------------------------------------------------------------------------------
var searchCityURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

var searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", searchCity)

function searchCity() {
    var city = document.querySelector("#cityInput").value;
}