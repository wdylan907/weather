let MAPBOX_KEY;
let map;
let marker = null;
initMap();
initSearchBox();

function initMap() {
  fetch("/mapboxkey")
    .then((res) => res.text())
    .then((res) => {
      MAPBOX_KEY = res;
    })
    .then(createMap)
    .then(addEventHandlers);
}

function initSearchBox() {
  document.getElementById("form").addEventListener("submit", () => {
    let query = document.getElementById("input").value;
    searchByName(query);
  });
}

function createMap() {
  map = L.map("map", { zoomDelta: 2 });
  initLoc();
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

function initLoc() {
  const n = Math.floor(Math.random() * locations.length);
  searchByName(locations[n]);
}

function addEventHandlers() {
  let hold;
  map.on("mousedown", (p) => {
    hold = setTimeout(() => {
      searchByCoord(p.latlng.lat, p.latlng.lng);
    }, 1000);
  });
  map.on("mouseup", () => {
    clearTimeout(hold);
  });
}

function searchByCoord(lat, lng) {
  let placeName;
  getName(lat, lng);
  fetch(`/weather/${lat}/${lng}`)
    .then((res) => res.json())
    .then((res) => displayData(res));
}

function getName(lat, lng) {
  fetch(`/get_name/${lat}/${lng}`)
    .then((res) => res.json())
    .then((res) => {
      placeName = res.features[0].place_name;
    });
}

function displayData(data) {
  placeMarker(data.lat, data.lon, placeName);
  document.getElementById("name").innerHTML = placeName;
  document.getElementById("lat").innerHTML = "Lattitude: " + data.lat;
  document.getElementById("lon").innerHTML = "Longitude: " + data.lon;
  document.getElementById("temp").innerHTML =
    "Temperature: " + data.current.temp;
  document.getElementById("desc").innerHTML =
    "Description: " + data.current.weather[0].description;
}

function searchByName(query) {
  let lat;
  let lng;
  fetch(`/search_by_name/${query}`)
    .then((res) => res.json())
    .then((res) => {
      lat = res.features[0].center[1];
      lng = res.features[0].center[0];
    })
    .then(() => {
      map.setZoom(8);
      map.panTo([lat, lng]);
      searchByCoord(lat, lng);
    });
}

function placeMarker(lat, lng, label) {
  if (marker !== null) {
    map.removeLayer(marker);
  }
  marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(label);
}
