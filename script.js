function toggleVejrudsigt() {
	var indhold = document.getElementById("vejrudsigt");
	if (indhold.style.display === "none" || indhold.style.display === "") {
		indhold.style.display = "block";
} else {
		indhold.style.display = "none";
	}
}

document.addEventListener('DOMContentLoaded', function() {
	const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=56.1656&longitude=10.2123&hourly=temperature_2m,precipitation,cloud_cover&daily=rain_sum&timezone=Europe%2FBerlin&forecast_days=1&models=dmi_seamless';

	fetch(apiUrl)
		.then(response => {
			if (!response.ok) {
				throw new Error('Netværksresponsen var ikke OK');
			}
		return response.json();
		})
	.then(data => {
			const weatherDiv = document.getElementById('vejrudsigt');
			const hourlyData = data.hourly;
			const dailyData = data.daily;
			const rainSum = dailyData.rain_sum[0]; // Samlede regnmængde for dagen
			const cloudCoverThreshold = 50; // Threshold for at definere overskyet

			// Skjul alle billederne først
			document.getElementById('sunny').style.display = 'none';
			document.getElementById('cloudy').style.display = 'none';
			document.getElementById('rainy').style.display = 'none';

			// Bestem vejrsituationen og vis det tilsvarende billede
			if (rainSum > 2) {
				// Hvis der er mere end 0.5 mm regn, vis regnvejrsbilledet
				document.getElementById('rainy').style.display = 'block';
			} else {
				// Find gennemsnitlig skydække for dagen
				const averageCloudCover = hourlyData.cloud_cover.reduce((a, b) => a + b, 0) / hourlyData.cloud_cover.length;

				if (averageCloudCover >= cloudCoverThreshold) {
					// Hvis gennemsnitlig skydække er over eller lig med threshold, vis overskyet billede
					document.getElementById('cloudy').style.display = 'block';
				} else {
					// Ellers vis solskinsbilledet
					document.getElementById('sunny').style.display = 'block';
				}
			}
			let content = '';

			for (let i = 0; i < hourlyData.time.length; i++) {
				const time = hourlyData.time[i];
				const temperature = hourlyData.temperature_2m[i];
				const precipitation = hourlyData.precipitation[i];
				const cloudCover = hourlyData.cloud_cover[i];

				content += `<li>${time}: Temperatur: ${temperature}°C Nedbør: ${precipitation}mm Skydække: ${cloudCover}%</li>`;
			}

			weatherDiv.innerHTML = content;
			// Valgfri: Vis de rå JSON-data (for debugging formål)
		})
		.catch(error => {
			console.error('Fejl ved hentning af data:', error);
	});
});
