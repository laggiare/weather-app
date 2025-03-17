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

// Weather description translations (English to Serbian) - Full list
const weatherTranslations = {
    // Thunderstorm (2xx)
    "thunderstorm with light rain": "grmljavina sa slabom kišom",
    "thunderstorm with rain": "grmljavina sa kišom",
    "thunderstorm with heavy rain": "grmljavina sa jakom kišom",
    "light thunderstorm": "slaba grmljavina",
    "thunderstorm": "grmljavina",
    "heavy thunderstorm": "jaka grmljavina",
    "ragged thunderstorm": "nepravilna grmljavina",
    "thunderstorm with light drizzle": "grmljavina sa slabom rosuljom",
    "thunderstorm with drizzle": "grmljavina sa rosuljom",
    "thunderstorm with heavy drizzle": "grmljavina sa jakom rosuljom",

    // Drizzle (3xx)
    "light intensity drizzle": "rosulja slabog intenziteta",
    "drizzle": "rosulja",
    "heavy intensity drizzle": "rosulja jakog intenziteta",
    "light intensity drizzle rain": "slaba kiša sa rosuljom",
    "drizzle rain": "kiša sa rosuljom",
    "heavy intensity drizzle rain": "jaka kiša sa rosuljom",
    "shower rain and drizzle": "pljusak i rosulja",
    "heavy shower rain and drizzle": "jaki pljusak i rosulja",
    "shower drizzle": "pljusak rosulje",

    // Rain (5xx)
    "light rain": "slaba kiša",
    "moderate rain": "umerena kiša",
    "heavy intensity rain": "kiša jakog intenziteta",
    "very heavy rain": "veoma jaka kiša",
    "extreme rain": "ekstremna kiša",
    "freezing rain": "ledena kiša",
    "light intensity shower rain": "kiša slabog intenziteta",
    "shower rain": "pljusak",
    "heavy intensity shower rain": "pljusak jakog intenziteta",
    "ragged shower rain": "nepravilan pljusak",

    // Snow (6xx)
    "light snow": "slab sneg",
    "snow": "sneg",
    "heavy snow": "jaki sneg",
    "sleet": "susnežica",
    "light shower sleet": "slaba susnežica",
    "shower sleet": "susnežica",
    "light rain and snow": "slaba kiša i sneg",
    "rain and snow": "kiša i sneg",
    "light shower snow": "slab sneg u pljusku",
    "shower snow": "sneg u pljusku",
    "heavy shower snow": "jaki sneg u pljusku",

    // Atmosphere (7xx)
    "mist": "magla",
    "smoke": "dim",
    "haze": "izmaglica",
    "sand/dust whirls": "peščani/vrtlozi prašine",
    "fog": "magla",
    "sand": "pesak",
    "dust": "prašina",
    "volcanic ash": "vulkanski pepeo",
    "squalls": "naglasi vetra",
    "tornado": "tornado",

    // Clear (800)
    "clear sky": "vedro nebo",

    // Clouds (80x)
    "few clouds": "malo oblaka",
    "scattered clouds": "raštrkani oblaci",
    "broken clouds": "razbijeni oblaci",
    "overcast clouds": "potpuno oblačno"
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
    const url = `${workerURL}/?city=${city}&lang=${lang}`; // Add lang parameter

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("weather-result").innerHTML = translations[lang].cityNotFound;
            return;
        }

        // Get weather description from API response
        let weatherDescription = data.weather[0].description;

        // Fallback to client-side translation if lang=sr didn’t work (still in English)
        if (lang === "sr" && weatherTranslations[weatherDescription]) {
            weatherDescription = weatherTranslations[weatherDescription];
        }

        document.getElementById("weather-result").innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>${translations[lang].temperature}: ${data.main.temp}°C</p>
            <p>${translations[lang].weather}: ${weatherDescription}</p>
        `;
    } catch (error) {
        document.getElementById("weather-result").innerHTML = translations[lang].failedFetch;
        console.error("Error fetching weather data:", error);
    }
}

// Set initial language on page load
document.addEventListener("DOMContentLoaded", () => {
    changeLanguage();
});