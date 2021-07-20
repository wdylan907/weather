const map = L.map("map");
map.setView([35.9101, -79.0753], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 14,
    minZoom: 1,
    id: "mapbox/outdoors-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: MAPBOX_KEY,
  }
).addTo(map);

map.on("mousedown", (p) => {
  hold = setTimeout(() => {
    getWeatherData(p.latlng.lat, p.latlng.lng);
  }, 1000);
});

map.on("mouseup", () => {
  clearTimeout(hold);
});

function getWeatherData(lat, lng) {
  fetch(`/${lat}/${lng}`)
    .then((data) => data.json())
    .then((data) => console.log(data));
}
