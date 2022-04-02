// General Variables
var submitCity = document.getElementById("search-button");
var cityInput = document.querySelector("#city");
var viewHistory = document.getElementById("history");
var weatherArea = document.getElementById("weather-area");


// Variables API
var searchHistory =[];
var apiKey = "7bb39c020ee4d2d28ea8fdfc55867b54"; 
var cityName = "Orlando";
var weatherDescription = "";
var weatherIcon;
var kelvin = 0;
var lat;
var lon;
var temp;
var wind;
var humidity;
var uvIndex = 0;



async function SearchWeather(cityName) {
    const weatherReturn = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey)
    const weatherInfo = await weatherReturn.json()

    var latiLongi = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+ weatherInfo.coord.lat + "&lon="+ weatherInfo.coord.lon +"&exclude={part}&appid="+ apiKey)
    var latiLongiConversion = await latiLongi.json();

    createCity(weatherInfo, latiLongiConversion);
    
};


submitCity.addEventListener("click", function(){
    event.preventDefault();

    cityName = cityInput.value;
    
    searchHistory.push(cityName);

    localStorage.setItem("cityName", cityName);
    generateCity(searchHistory);

    SearchWeather(cityName);
});

function generateCity(searchHistory) {
    for(var i = 0; i < searchHistory.length; i++){
        viewHistory.innerHTML = "";
        var searchHistoryBtnEl = document.createElement("h2");

        searchHistoryBtnEl.id = "id-" + searchHistory[i];

    
        searchHistoryBtnEl.innerHTML = searchHistory[i];
    
        viewHistory.prepend(searchHistoryBtnEl);
    
    }
}

function createCity(cityName, latLonConversion) {
    uvIndex =latLonConversion.current.uvi;
    
    weatherArea.innerHTML = "";

    var emptyDiv = document.createElement("div");
    var cityNameElement = document.createElement("h2");
    var cityTemperatureElement = document.createElement("p");
    var cityHumidityElement = document.createElement("p");
    var cityWindSpeedElement = document.createElement("p");
    var iconElement = document.createElement("img");
    var uvIndexElement = document.createElement("p");

    kelvin = cityName.main.temp;
    var fahrenheit = ((kelvin - 273.15) * (9/5) + 32);
    var fahrenheitOneDigit = fahrenheit.toFixed(1);

    weatherDescription = cityName.weather[0].description;

    weatherIcon = cityName.weather[0].icon;

    iconElement.src = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

    cityNameElement.innerHTML = cityName.name;
    cityTemperatureElement.innerHTML = "Temperature: " + fahrenheitOneDigit + " ℉";
    cityHumidityElement.innerHTML = "Humidity: " + cityName.main.humidity + "%";
    cityWindSpeedElement.innerHTML = "Wind Speed: " + cityName.wind.speed + " mph";
    uvIndexElement.innerHTML = "Uv Index: " + uvIndex;

    cityNameElement.className = "col-9";
    cityTemperatureElement.className = "col -6";
    cityHumidityElement.className = "col -6";
    cityWindSpeedElement.className = "col -6";
    uvIndexElement.className = "col -6";

    if(uvIndex <= 2){
        uvIndexElement.innerHTML = "Favorable Uv Index: " + uvIndex;
        uvIndexElement.className = "uv-favorable col -6";
    }else if(uvIndex >= 3 && uvIndex <= 5){
        uvIndexElement.innerHTML = "Moderate Uv Index: " + uvIndex;
        uvIndexElement.className = "uv-moderate col -6";
    }else{
        uvIndexElement.innerHTML = "Severe Uv Index: " + uvIndex;
        uvIndexElement.className = "uv-severe col -6";
    }


    emptyDiv.appendChild(cityNameElement);
    emptyDiv.appendChild(iconElement);
    emptyDiv.appendChild(cityTemperatureElement);
    emptyDiv.appendChild(cityHumidityElement);
    emptyDiv.appendChild(cityWindSpeedElement);
    emptyDiv.appendChild(uvIndexElement);
    
    weatherArea.appendChild(emptyDiv);
}

function getWeather(cityName) {
    
}