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

        //Fetch local current weather using geolocation.       
        function fetchData(URL) {
            fetch (URL, {
                method: "GET",
            })
            .then(response => response.json())
            .then(data => {displayData(data), displayUV(data)})
        }
        //Display local current weather in current weather box.
        function displayData(data) {
            console.log(data);
            document.querySelector("#icon").innerHTML = `<img src='http://openweathermap.org/img/wn/${data.weather[0].icon}.png'>`;
            document.querySelector("#cityName").innerHTML = `${data.name}`;
            document.querySelector("#temperature").innerHTML = `Current Temperature: ${data.main.temp}`;
            document.querySelector("#windSpeed").innerHTML = `Wind Speed: ${data.wind.speed}`;
        }
        fetchData(todayLocalURL);
        
        function displayUV(data) {
            console.log(data)
            document.querySelector("#UVindex").innerHTML = `${data.daily[0].uvi}`;
        }
        fetchData(UVindex);
    })
}
getLocation();