function visVejr(vejr) {
	var vejrtekst = "";

	switch (vejr) {
		case "solrigt":
			vejrtekst = "Det bliver solrigt i dag.";
			document.getElementById('sunny').style.display = 'block';
			break;
		case "regnvejr":
			vejrtekst = "Der er udsigt til regnvejr i dag.";
			document.getElementById('rainy').style.display = 'block';
			break;
		case "overskyet":
			vejrtekst = "Himlen er overskyet i dag.";
			document.getElementById('cloudy').style.display = 'block';
			break;
		case "tordenvejr":
			vejrtekst = "Pas på, der er tordenvejr i området.";
			document.getElementById('thunder').style.display = 'block';
			break;
		default:
			vejrtekst = "Vælg venligst en vejrudsigt.";
			break;
	}

}
function toggleVejrudsigt() {
	var indhold = document.getElementById("vejrudsigt");
	if (indhold.style.display === "none" || indhold.style.display === "") {
		indhold.style.display = "block";
	} else {
		indhold.style.display = "none";
	}
}
