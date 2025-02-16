async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const apiKey = "YOUR_API_KEY_HERE";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("weather-result").innerHTML = "City not found!";
            return;
        }

        document.getElementById("weather-result").innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    } catch (error) {
        console.log("Error fetching weather data", error);
    }
}
