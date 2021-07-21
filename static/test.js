document.getElementById("form").addEventListener("submit", () => {
  let query = document.getElementById("input").value;
  let lat;
  let lng;
  console.log(query);
  getCoords(query);
});
