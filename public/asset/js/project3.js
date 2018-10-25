var mymap = L.map("mapid").setView([-6.221028, 106.791434], 16);

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

function findLocation(x, y) {
  // console.log(x,y);
  for (var i = 0; i < places.length; i++) {
    if (places[i].location[0] == x && places[i].location[1] == y) {
      return i;
    }
  }
  return -1;
}

function showLocation(e) {
  //console.log("you clicked " + e.latlng.lat + " dan "+ e.latlng.lng);
  let ix = findLocation(e.latlng.lat, e.latlng.lng);
  if (ix >= 0) {
    img.src = places[ix].image;
    par.textContent = places[ix].review;
  }
}

let gmb = document.getElementById("mapImage");
let rev = document.getElementById("review");
let img = document.createElement("img");
let par = document.createElement("p");

gmb.appendChild(img);
rev.appendChild(par);

const URL = "../asset/json/map.json";

fetch(URL)
  .then(response => {
    if (response.status !== 200) {
      console.log(`Ada Masalah. Status code:${response.status}`);
      throw response.statusText;
    }
    return response.json();
  })
  .then(res => {
    places = res.places;
    localStorage.setItem("places", JSON.stringify(res.places));
  })
  .catch(err => {
    console.log(err);
  });

let places = JSON.parse(localStorage.getItem("places"));
console.log(places);
for (var p of places) {
  var marker = L.marker(p.location)
    .addTo(mymap)
    .bindPopup(p.sponsor);
  marker.on("click", showLocation);
}
