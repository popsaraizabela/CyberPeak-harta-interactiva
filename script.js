// Inițializare hartă
var map = L.map('map').setView([45.9432, 24.9668], 6); // Centrat pe România

// Adăugare strat de hartă OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Array pentru a stoca markerele
var markers = [];

// Funcție pentru a adăuga un marker la click
function onMapClick(e) {
    var marker = L.marker(e.latlng).addTo(map)
        .bindPopup("Loc marcat:<br>" + e.latlng.toString())
        .openPopup();
    markers.push(marker);
}

// Funcție pentru a șterge toate markerele
function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
}

// Ascultă evenimentul de click pe hartă
map.on('click', onMapClick);
