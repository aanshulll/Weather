const apikey = 'f655b17eb3134ced5c376cec4ea91fbf';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const icon = document.querySelector(".icon");
const input = document.querySelector("input");
const srcbtn = document.querySelector(".src");
const msgbtn = document.querySelector(".msg");
const body = document.querySelector("body");
const bottom = document.querySelector(".bottom");
const bottom2 = document.querySelector(".bottom2");

async function check(city) {
    try {
        const res = await fetch(`${apiUrl}${city}&appid=${apikey}`);
        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log(data);

        // Format sunrise and sunset times
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

        // Update UI elements with weather data
        document.querySelector(".srise").innerHTML = sunrise;
        document.querySelector(".sset").innerHTML = sunset;
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp - 273.15) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
        document.querySelector(".up").innerHTML = Math.round(data.main.temp_max - 273.15) + "°C";
        document.querySelector(".down").innerHTML = Math.round(data.main.temp_min - 273.15) + "°C";
        document.querySelector(".feel").innerHTML = Math.round(data.main.feels_like - 273.15) + "°C";
        document.querySelector(".des").innerHTML = data.weather[0].description;

        // Set the appropriate weather icon
        const weatherCondition = data.weather[0].main;
        switch (weatherCondition) {
            case 'Clear':
                icon.src = "images/clear.png";
                break;
            case 'Clouds':
                icon.src = "images/clouds.png";
                break;
            case 'Drizzle':
                icon.src = "images/drizzle.png";
                break;
            case 'Rain':
                icon.src = "images/rain.png";
                break;
            case 'Snow':
                icon.src = "images/snow.png";
                break;
            case 'Mist':
                icon.src = "images/mist.png";
                break;
            case 'Smoke':
                icon.src = "images/smoke.png";
                break;
            default:
                icon.src = "images/default.png";
                break;
        }
    } catch (error) {
        console.error('Failed to fetch weather data:', error.message);
        msgbtn.innerHTML = 'Failed to fetch weather data. Please try again.';
        msgbtn.style.display = "block";
    }
}

// Event listener for the search button
srcbtn.addEventListener("click", () => {
    const city = input.value.trim();
    if (city === "") {
        msgbtn.innerHTML = 'City name is required!';
        msgbtn.style.display = "block";
        bottom.style.display = "none";
        bottom2.style.display = "none";
        icon.style.display = "none";
        return;
    }

    check(city);

    // Reset UI states
    msgbtn.style.display = "none";
    bottom.style.display = "block";
    bottom2.style.display = "none";
    icon.style.display = "block";
    document.querySelector('.msgpic').style.display = "none";
});
