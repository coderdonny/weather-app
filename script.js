const body = document.querySelector('body');
const search = document.querySelector('#location');
const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', function (e) {
	e.preventDefault();
	let location = search.value;
	console.log(location);
	getLocation(location);
});

async function getLocation(location) {
	const url = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=0ba7cce150f486819412ea0336b94a65
	`;
	try {
		const response = await fetch(url, { mode: 'cors' });
		const locationData = await response.json();

		console.log('latitude:' + ' ' + locationData[0].lat);
		console.log('longitude:' + ' ' + locationData[0].lon);

		getWeather(locationData[0].lat, locationData[0].lon);
	} catch (error) {
		console.log(error);
	}
}

async function getWeather(lat, lon) {
	const unitsOfMeasurement = document.querySelector('#units');
	const unit =
		unitsOfMeasurement.options[unitsOfMeasurement.selectedIndex].value;
	try {
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=0ba7cce150f486819412ea0336b94a65`;
		console.log(url);
		const response = await fetch(url, { mode: 'cors' });
		const weatherData = await response.json();

		handleData(weatherData);
	} catch (error) {
		console.log(error);
	}
}

function handleData(weatherData) {
	let weather = weatherData.weather[0].main;
	let feelsLike = weatherData.main.feels_like;
	let temp = weatherData.main.temp;
	let wind = weatherData.wind.deg;

	let weatherDataObj = {
		weather: weather,
		feelsLike: feelsLike,
		temperature: temp,
		wind: wind,
	};

	console.log(weatherDataObj);
	displayData(weatherDataObj);
}

function displayData(data) {
	const weather = document.createElement('h1');
	weather.innerText = data.weather;
	const temp = document.createElement('h1');
	temp.innerText = data.temperature;
	body.append(weather);
	body.append(temp);
}
