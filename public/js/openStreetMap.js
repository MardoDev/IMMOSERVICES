//alert('Salut le monde c\'est MardoDev depuis OpenStreetMap.js');
var map = L.map('map').setView([-4.7958304, 11.8888992], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {

}).addTo(map);

L.marker([-4.7958304, 11.8888992]).addTo(map)
    .bindPopup('<h4 style="color: #0d6efd">F2E : Fluide Energie Environnement</h4><p>Le client est roi</p>')
    .openPopup();