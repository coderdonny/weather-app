const body = document.querySelector('body');
async function getWeather() {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=0ba7cce150f486819412ea0336b94a65
        `,
		{ mode: 'cors' }
	);
	const weatherData = await response.json();

	console.log(weatherData);

	const feelsLike = document.createElement('h1');
	feelsLike.innerText = weatherData.main.feels_like;
	body.appendChild(feelsLike);
}

getWeather();
