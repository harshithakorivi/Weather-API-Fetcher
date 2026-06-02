const apiKey = "929891ce62bcd1920840d5cede5a6be8";

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    if(city === ""){
        alert("Enter a location");
        return;
    }

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetchWeather(url);
}

async function fetchWeather(url){

    try{

        const response = await fetch(url);
        const data = await response.json();

        if(data.cod != 200){
            alert("Location not found");
            return;
        }

        displayWeather(data);

    }catch(error){

        alert("Unable to fetch weather data");
        console.error(error);
    }
}

function displayWeather(data){

    document.getElementById("cityName").innerText =
    `${data.name}, ${data.sys.country}`;

    document.getElementById("temperature").innerText =
    `🌡 Temperature: ${data.main.temp} °C`;

    document.getElementById("humidity").innerText =
    `💧 Humidity: ${data.main.humidity}%`;

    document.getElementById("windSpeed").innerText =
    `🌬 Wind Speed: ${data.wind.speed} m/s`;

    document.getElementById("condition").innerText =
    `☁ Condition: ${data.weather[0].description}`;

    const icon =
    data.weather[0].icon;

    document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

function getLocationWeather(){

    if(!navigator.geolocation){

        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        async(position)=>{

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetchWeather(url);
        },

        ()=>{
            alert("Location access denied");
        }
    );
}