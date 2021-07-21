function getCoords(query) {
  fetch(`/get_coords/${query}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      const lat = res.features[0].center[1];
      const lng = res.features[0].center[0];
      console.log(lat + ", " + lng);
    });
}

getCoords("New York");
getCoords("Nanortalik");
getCoords("Ciudad Real");
getCoords("Carrboro");
