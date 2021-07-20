function getWeatherData(lat, lng) {
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
