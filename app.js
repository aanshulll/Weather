const apikey = 'f655b17eb3134ced5c376cec4ea91fbf';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const icon = document.querySelector(".icon");
const input = document.querySelector("input");
const srcbtn = document.querySelector(".src");
const msgbtn = document.querySelector(".msg");
const err = document.querySelector(".msg>h1");
const errpic = document.querySelector(".msgpic")
const body = document.querySelector("body");

const bottom = document.querySelector(".bottom");
const bottom2 = document.querySelector(".bottom2");
async function check(city) {
    if (!city) {
        console.error('City name is required!');
        return;
    }

    try {
        const res = await fetch(`${apiUrl}${city}&appid=${apikey}`);
        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log(data);
        const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

        document.querySelector(".srise").innerHTML = sunrise;
        document.querySelector(".sset").innerHTML = sunset;
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp - 273.15) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".pressure").innerHTML = data.main.pressure + "km/h";
        document.querySelector(".up").innerHTML = Math.round(data.main.temp_max - 273.15) + "°c";
        document.querySelector(".down").innerHTML = Math.round(data.main.temp_min - 273.15) + "°c";
        document.querySelector(".feel").innerHTML = Math.round(data.main.feels_like - 273.15) + "°c";
        document.querySelector(".des").innerHTML = data.weather[0].description;
        if (data.weather[0].main === 'Clear') {
            icon.src = "clear.png";
        }
        else if (data.weather[0].main === 'Clouds') {
            icon.src = "clouds.png";
        }
        else if (data.weather[0].main === 'Drizzle') {
            icon.src = "drizzle.png";
        }
        else if (data.weather[0].main === 'Rain') {
            icon.src = "rain.png";
        }
        else if (data.weather[0].main === 'Snow') {
            icon.src = "snow.png";
        }
        else if (data.weather[0].main === 'Mist') {
            icon.src = "mist.png";
        }
        else if (data.weather[0].main === 'Smoke') {
            icon.src = "smoke.png";
        }

        else {
            icon.src = "clear.png";
        }


    } catch (error) {
        console.error('Failed to fetch weather data:', error.message);
    }

}





srcbtn.addEventListener("click", () => {
    if (input.value == "") {
        err.innerText = "City name is required!"
        err.style.color = "red"
        errpic.src = "https://assets.dochipo.com/editor/animations/404-error/b6463d8b-ac87-42a7-ad59-6584a19a77a8.gif"
             
    }
    else {
        check(input.value);
        msgbtn.style.display = "none";
        bottom.style.display = "block"
        bottom2.style.display = "none"
        icon.style.display = "block"
        document.querySelector('.msgpic').style.display = "none"
    }
}
)

check(); 
