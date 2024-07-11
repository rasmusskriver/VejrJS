// Få dagens dato
var today = new Date();
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var dateString = today.toLocaleDateString('da-DK', options);

// Sæt datoen ind i <h2> elementet med id "date"
document.getElementById('date').textContent = dateString;

function toggleVejrudsigt() {
	var indhold = document.getElementById("vejrudsigt");
	if (indhold.style.display === "none" || indhold.style.display === "") {
		indhold.style.display = "block";
	} else {
		indhold.style.display = "none";
	}
}

document.addEventListener('DOMContentLoaded', function() {
	const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=56.1656&longitude=10.2123&hourly=temperature_2m,relative_humidity_2m,precipitation,rain,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=Europe%2FBerlin&forecast_days=1&models=metno_seamless';
	const testJson = new Request("test1.json");

	fetch(testJson)
		.then(response => {
			if (!response.ok) {
				throw new Error('Netværksresponsen var ikke OK');
			}
			return response.json();
		})
		.then(data => {
			const weatherDiv = document.getElementById('vejrudsigt');
			const weatherDiv1 = document.getElementById('average-container');
			const hourlyData = data.hourly;
			const rainSum = hourlyData.rain.reduce((acc, value) => acc + value, 0) / hourlyData.rain.length;;
			const averageCloudCover = hourlyData.cloud_cover.reduce((a, b) => a + b, 0) / hourlyData.cloud_cover.length;

			// Bestem vejrforhold baseret på nedbørsmængde
			if (rainSum >= 4) {
				document.getElementById('rainy5').style.display = 'block';
			} else if (rainSum >= 3) {
				document.getElementById('rainy45').style.display = 'block';
			} else if (rainSum >= 2) {
				document.getElementById('rainy34').style.display = 'block';
			} else if (rainSum >= 1) {
				document.getElementById('rainy23').style.display = 'block';
			}
			else{

			// Bestem vejrforhold baseret på skydække
			if (averageCloudCover >= 90) {
				document.getElementById('cloudy90100').style.display = 'block';
			} else if (averageCloudCover >= 80) {
				document.getElementById('cloudy8090').style.display = 'block';
			} else if (averageCloudCover >= 60) {
				document.getElementById('cloudy6070').style.display = 'block';
			} else if (averageCloudCover >= 40) {
				document.getElementById('cloudy4060').style.display = 'block';
			} else if (averageCloudCover >= 30) {
				document.getElementById('sunny3040').style.display = 'block';
			} else if (averageCloudCover >= 20) {
				document.getElementById('sunny2030').style.display = 'block';
			} else if (averageCloudCover >= 10) {
				document.getElementById('sunny1020').style.display = 'block';
			} else if (averageCloudCover >= 0) {
				document.getElementById('sunny010').style.display = 'block';
			}

			}

			let content1 = '';
			var averageCloudCover1 = hourlyData.cloud_cover.reduce((a, b) => a + b, 0) / hourlyData.cloud_cover.length;
			var averageTemp = hourlyData.temperature_2m.reduce((a, b) => a + b, 0) / hourlyData.temperature_2m.length;
			var nodecimals = Math.round(averageCloudCover1);
			var nodecimals1 = Math.round(averageTemp)

			content1 += `<p> Gennemsnitlig skydække ${nodecimals} % </p>`;
			content1 += `<p> Gennemsnitlig nedbør ${rainSum.toFixed(2)} mm </p>`;
			content1 += `<p> Gennemsnitlig temperatur ${nodecimals1} grader </p>`;
			weatherDiv1.innerHTML = content1;

			let content = '';

			for (let i = 0; i < hourlyData.time.length; i++) {
				const time = hourlyData.time[i];
				const temperature = hourlyData.temperature_2m[i];
				const precipitation = hourlyData.precipitation[i];
				const cloudCover = hourlyData.cloud_cover[i];

				content += `<p>${time}: Temperatur: ${temperature}°C Nedbør: ${precipitation}mm Skydække: ${cloudCover}%</p>`;
			}

			weatherDiv.innerHTML = content;
		})
		.catch(error => {
			console.error('Fejl ved hentning af data:', error);
		});
});
