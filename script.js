const translations = {
    en: {
        enterCity: "Enter city name",
        getWeather: "Get Weather",
        temperature: "Temperature",
        weather: "Weather",
        cityNotFound: "City not found!",
        failedFetch: "Failed to retrieve weather data.",
    },
    sr: {
        enterCity: "Unesite ime grada",
        getWeather: "Prikaži vreme",
        temperature: "Temperatura",
        weather: "Vreme",
        cityNotFound: "Grad nije pronađen!",
        failedFetch: "Neuspešno preuzimanje podataka o vremenu.",
    }
};

// Function to change UI text when language is switched
function changeLanguage() {
    const lang = document.getElementById("language").value;

    document.getElementById("city").placeholder = translations[lang].enterCity;
    document.getElementById("getWeatherBtn").textContent = translations[lang].getWeather;
}

// Function to fetch weather data
async function getWeather() {
    const city = document.getElementById("city").value;
    const lang = document.getElementById("language").value;

    if (!city) {
        alert(translations[lang].enterCity);
        return;
    }

    const workerURL = "https://summer-glitter-idk.laggiare.workers.dev";
    const url = `${workerURL}/?city=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("weather-result").innerHTML = translations[lang].cityNotFound;
            return;
        }

        document.getElementById("weather-result").innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>${translations[lang].temperature}: ${data.main.temp}°C</p>
            <p>${translations[lang].weather}: ${data.weather[0].description}</p>
        `;

    } catch (error) {
        document.getElementById("weather-result").innerHTML = translations[lang].failedFetch;
        console.error("Error fetching weather data:", error);
    }
}
