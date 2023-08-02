
// MAP
var map = L.map("map",{
    center: [53.54, -113.49],
    zoom: 11
});

//TILE LAYER
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);