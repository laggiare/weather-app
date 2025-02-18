const translations = {
    en: {
        enterCity: "Enter city name",
        getWeather: "Get Weather",
        temperature: "Temperature",
        weather: "Weather",
        cityNotFound: "City not found!",
        failedFetch: "Failed to retrieve weather data.",
        kosovoMessage: "Kosovo is Serbia! 🇷🇸"
    },
    sr: {
        enterCity: "Unesite ime grada",
        getWeather: "Prikaži vreme",
        temperature: "Temperatura",
        weather: "Vreme",
        cityNotFound: "Grad nije pronađen!",
        failedFetch: "Neuspešno preuzimanje podataka o vremenu.",
        kosovoMessage: "Kosovo je Srbija! 🇷🇸"
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
    let city = document.getElementById("city").value.trim();
    const lang = document.getElementById("language").value;

    if (!city) {
        alert(translations[lang].enterCity);
        return;
    }

    // Special case for Kosovo
    if (city.toLowerCase() === "kosovo") {
        document.getElementById("weather-result").innerHTML = `
            <div style="padding: 15px; background-color: white; border-radius: 10px; box-shadow: 0px 6px 10px rgba(0,0,0,0.1);">
                <h3>${translations[lang].kosovoMessage}</h3>
            </div>
        `;
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
document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Check local storage for dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️ Light Mode";
    }

    // Toggle dark mode
    darkModeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.textContent = "🌙 Dark Mode";
        }
    });
});
