let MAPBOX_KEY;
let map;
initMap();

function initMap() {
  fetch("/mapboxkey")
    .then((res) => res.text())
    .then((res) => {
      MAPBOX_KEY = res;
    })
    .then(createMap)
    .then(addEventHandlers);
}

function createMap() {
  map = L.map("map", { zoomDelta: 2 });
  map.setView([35.9101, -79.0753], 13);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 14,
      minZoom: 2,
      id: "mapbox/outdoors-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: MAPBOX_KEY,
    }
  ).addTo(map);
}

function addEventHandlers() {
  map.on("mousedown", (p) => {
    hold = setTimeout(() => {
      getData(p.latlng.lat, p.latlng.lng);
    }, 1000);
  });

  map.on("mouseup", () => {
    clearTimeout(hold);
  });
}

function getData(lat, lng) {
  fetch(`/${lat}/${lng}`)
    .then((res) => res.json())
    .then((res) => displayData(res));
}

function displayData(data) {
  console.log(data);

  document.getElementById("lat").innerHTML = "Lattitude: " + data.lat;
  document.getElementById("lon").innerHTML = "Longitude: " + data.lon;
  document.getElementById("temp").innerHTML =
    "Temperature: " + data.current.temp;
  document.getElementById("desc").innerHTML =
    "Description: " + data.current.weather[0].description;
}
