function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'f9317eda1b4405eeb28160c4276185f6'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const weatherMain = data.weather[0].main.toLowerCase();
            let emoji = '';

            if (weatherMain.includes('clear')) {
                emoji = '☀️';
            } else if (weatherMain.includes('clouds')) {
                emoji = '⛅';
            } else if (weatherMain.includes('rain')) {
                emoji = '☔';
            } else if (weatherMain.includes('thunderstorm')) {
                emoji = '⛈️';
            } else if (weatherMain.includes('snow')) {
                emoji = '❄️';
            } else if (weatherMain.includes('mist') || weatherMain.includes('fog')) {
                emoji = '🌫️';
            } else {
                emoji = '🌈';
            }

            const weatherDiv = document.getElementById('weatherData');
            weatherDiv.innerHTML = `
                <div class="weather-card">
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <div class="emoji">${emoji}</div>
                    <div class="temp">${data.main.temp}°C</div>
                    <div class="condition">${data.weather[0].description}</div>
                </div>
            `;
        })
        .catch(error => {
            document.getElementById('weatherData').innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
}
