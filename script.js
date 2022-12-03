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
	const temp = document.createElement('h1');
	const weather = document.createElement('h1');
	feelsLike.innerText = weatherData.main.feels_like;
	temp.innerText = weatherData.main.temp;
	weather.innerText = weatherData.wind.deg;
	body.appendChild(feelsLike);
	body.appendChild(temp);
	body.appendChild(weather);

	return weatherData;
}

let weather = getWeather();
