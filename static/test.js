document.getElementById("button").addEventListener("click", () => {
  let query = document.getElementById("input").value;
  let lat;
  let lng;
  getCoords(query);
});
