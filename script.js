const body = document.querySelector('body');

async function getLocation() {
	try {
		const response = await fetch(
			`http://api.openweathermap.org/geo/1.0/direct?q=Toronto&appid=0ba7cce150f486819412ea0336b94a65
			`,
			{ mode: 'cors' }
		);
		const locationData = await response.json();

		console.log('latitude:' + ' ' + locationData[0].lat);
		console.log('longitude:' + ' ' + locationData[0].lon);

		return locationData;
	} catch (error) {
		console.log(error);
	}
}

getLocation().then((data) => {
	getCoordinates(data);
});

function getCoordinates(data) {
	let lat = data[0].lat;
	let lon = data[0].lon;

	getWeather(lat, lon).then((data) => {
		console.log(data.weather[0].main);
		console.log(data);
		handleData(data);
	});
}

async function getWeather(lat, lon) {
	try {
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0ba7cce150f486819412ea0336b94a65`;

		const response = await fetch(url, { mode: 'cors' });
		const weatherData = await response.json();

		return weatherData;
	} catch (error) {
		console.log(error);
	}
}

function handleData(weatherData) {
	let feelsLike = weatherData.main.feels_like;
	let temp = weatherData.main.temp;
	let wind = weatherData.wind.deg;
}
