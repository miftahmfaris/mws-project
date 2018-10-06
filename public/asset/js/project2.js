var arr_marker = [
  [-8.70166, 115.169856],
  [-8.70166, 115.169856],
  [-8.70166, 115.169856],
  [-8.70166, 115.169856],
  [-8.70166, 115.169856],
  [-6.1602, 106.8198]
];
var mymap = L.map("mapid").setView([-6.1602, 106.8198], 13);
// var marker = L.marker(arr_marker).addTo(mymap);
for (m of arr_marker) {
  L.marker(m).addTo(mymap);
}
var circle = L.circle([-6.1602, 106.8198], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500
}).addTo(mymap);
var popup = L.popup()
  .setLatLng([-6.168909, 106.820895])
  .setContent("Kantor Terbaik.")
  .openOn(mymap);
var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("Lokasi yang dipilih: " + e.latlng.toString())
    .openOn(mymap);
}

L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1IjoibWlmdGFobWZhcmlzIiwiYSI6ImNqbTh0NWNibzA1YnQza2pvODlobm9lM3QifQ.m3iakD2cIyHg6SrgkHq4Ag"
  }
).addTo(mymap);

mymap.on("click", onMapClick);
