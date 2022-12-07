const weatherContainer = document.querySelector('#weather-container');
const search = document.querySelector('#location');
const searchForm = document.querySelector('.search-form');
const unitsOfMeasurement = document.querySelector('#units');

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

		console.log(locationData);
		console.log(locationData[0].country);
		console.log(locationData[0].state);
		console.log(locationData[0].name);

		console.log('latitude:' + ' ' + locationData[0].lat);
		console.log('longitude:' + ' ' + locationData[0].lon);

		getWeather(locationData[0].lat, locationData[0].lon, locationData);
	} catch (error) {
		console.log(error);
	}
}

async function getWeather(lat, lon, locationData) {
	const unit =
		unitsOfMeasurement.options[unitsOfMeasurement.selectedIndex].value;
	try {
		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=0ba7cce150f486819412ea0336b94a65`;
		console.log(url);
		const response = await fetch(url, { mode: 'cors' });
		const weatherData = await response.json();

		handleData(weatherData, locationData);
	} catch (error) {
		console.log(error);
	}
}

function handleData(weatherData, locationData) {
	let state = locationData[0].state;
	let city = locationData[0].name;
	let weather = weatherData.weather[0].main;
	let feelsLike = weatherData.main.feels_like;
	let temp = weatherData.main.temp;
	let wind = weatherData.wind.deg;

	const outputDataObj = {
		state: state,
		city: city,
		weather: weather,
		feelsLike: feelsLike,
		temperature: temp,
		wind: wind,
	};

	console.log(outputDataObj);
	displayData(outputDataObj);
}

function displayData(data) {
	const location = document.createElement('h1');
	location.className = 'location-information';
	location.innerText = `${data.city}, ${data.state}`;

	const weather = document.createElement('h1');
	weather.innerText = data.weather;

	const temp = document.createElement('h1');

	let units =
		unitsOfMeasurement.options[unitsOfMeasurement.selectedIndex].value;
	if (units === 'metric') {
		temp.innerText = temp.innerText = data.temperature + '°' + ' ' + 'C';
	} else if (units === 'imperial') {
		temp.innerText = temp.innerText = data.temperature + '°' + ' ' + 'F';
	}

	weatherContainer.append(location);
	weatherContainer.append(temp);
	weatherContainer.append(weather);
}
