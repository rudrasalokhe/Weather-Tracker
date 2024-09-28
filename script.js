const input = document.querySelector('input');
const btn = document.getElementById('btn');
const icon = document.querySelector(".icon");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");

const today = new Date();

// Get the current day, month, and year
const day = today.getDate();
const month = today.getMonth() + 1;  // Months are 0-indexed, so we add 1
const year = today.getFullYear();

// Format the date as 'dd/mm/yyyy' or however you prefer
const currentDate = `${day}/${month}/${year}`;

// Display the current date in an HTML element with id="date"
document.getElementById('date').innerText = currentDate;




btn.addEventListener("click", () => {
    let city = input.value;
    getWeather(city);
});

function getWeather(city) {
    console.log(city);
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=3842077aff7dd687af95bb430894cd15&units=metric')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const iconCode = data.weather[0].icon;
        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon"/>`;

        const weatherCity = data.name;
        const weatherCountry = data.sys.country;
        weather.innerHTML = `${weatherCity}, ${weatherCountry}`;

        const weatherTemperature = data.main.temp;  // Corrected line
        temperature.innerHTML = `${weatherTemperature}°C`;

        const weatherDescription = data.weather[0].description;  // Optional: add description
        description.innerHTML = weatherDescription;
    })
    .catch(error => console.error('Error fetching the weather data:', error));
}
