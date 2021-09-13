let MAPBOX_KEY;
let map;
let marker;
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
  searchByName("Chapel Hill");
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution: 'Map data &copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy <a href="https://www.mapbox.com/">Mapbox</a>',
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
  let hold;
  map.on("mousedown", (point) => {
    hold = setTimeout(() => {
      searchByCoord(point.latlng.lat, point.latlng.lng);
    }, 1000);
  });
  map.on("mouseup", () => {
    clearTimeout(hold);
  });
}

function searchByName(query) {
  fetch(`/search_by_name/${query}`)
    .then((res) => res.json())
    .then((res) => {
      map.setZoom(8);
      searchByCoord(res.location.lat, res.location.lon);
    });
}

function searchByCoord(lat, lng) {
  map.panTo([lat, lng]);
  fetch(`/weather/${lat}/${lng}`)
    .then((res) => res.json())
    .then((res) => displayData(res));
}

function displayData(data) {
  console.log(data)
  let locationName = `${data.location.name}, ${data.location.region}`
  placeMarker(data.location.lat, data.location.lon, locationName)
  document.getElementById("name").innerHTML = locationName
  document.getElementById("icon").src = data.current.condition.icon
  document.getElementById("temperature").innerHTML = `${data.current.temp_f} °F`
  document.getElementById("description").innerHTML = data.current.condition.text
  document.getElementById("humidity").innerHTML = `${data.current.humidity}% humidity` 
}

function placeMarker(lat, lng, label) {
  if (marker) map.removeLayer(marker);
  marker = L.marker([lat, lng]).addTo(map);
  marker.bindPopup(label);
}
