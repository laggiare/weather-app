const baseUrl = "https://summer-glitter-idk.laggiare.workers.dev";  // Making sure this is my correct Worker URL

async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `${baseUrl}?city=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            // Successfully fetched weather data
            document.getElementById("weather-result").innerHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
        } else {
            // Handle error if city not found
            document.getElementById("weather-result").innerHTML = "City not found!";
        }
    } catch (error) {
        console.log("Error fetching weather data", error);
        document.getElementById("weather-result").innerHTML = `Failed to retrieve weather data: ${error.message}`;
    }
}
