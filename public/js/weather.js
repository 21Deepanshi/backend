const apiKey = '662a02f77028e10e54139df0535ce5f9'; //OpenWeather API key
const searchBtn = document.querySelector("button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Calgary,CA&units=metric&appid=662a02f77028e10e54139df0535ce5f9`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);
        
        const temperature = Math.round(data.main.temp) + "°C";
        const weatherDescription = data.weather[0].description;
        const weatherIconCode = data.weather[0].icon;

        const weatherSummary = `${temperature} <br> ${weatherDescription}`;

        document.querySelector(".temp").innerHTML = weatherSummary;
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (weatherIconCode.includes("d")) {
            if (data.weather[0].main === "Clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main === "Mist") {
                weatherIcon.src = "images/mist.png";
            } else if (data.weather[0].main === "Snow") {
                weatherIcon.src = "images/snow.png";
            }
        } else {
            if (data.weather[0].main === "Clouds") {
                weatherIcon.src = "images/clouds-night.png";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "images/clear-night.png";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "images/rain-night.png";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "images/drizzle-night.png";
            } else if (data.weather[0].main === "Mist") {
                weatherIcon.src = "images/mist-night.png";
            } else if (data.weather[0].main === "Snow") {
                weatherIcon.src = "images/snow.png";
            }
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error("Error fetching weather:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    getWeather("Calgary");
});