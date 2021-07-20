const map = L.map('map');
map.setView([35.9101, -79.0753], 13);
L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery &copy <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/outdoors-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken: API_KEY
    }
  ).addTo(map);

map.on('click', function(p){
    coordinates = [p.latlng.lat, p.latlng.lng]
    console.log(coordinates);
});

map.on('zoomend', function() {
    if (map.getZoom() < 1) map.setZoom(1);
});