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

// var popup = L.popup();
// function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//     .openOn(map);
// }
// map.on("click", onMapClick);

function getCoords(obj) {
  coordinates = [obj.latlng.lat, obj.latlng.lng];
  console.log(coordinates);
}

map.on("mousedown", (p) => {
  timer = setTimeout(() => {
    //getCoords(p);
    coordinates = [p.latlng.lat, p.latlng.lng];
    console.log(coordinates);
  }, 1000);
});

map.on("mouseup", () => {
  clearTimeout(timer);
});
