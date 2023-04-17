// CORS anywhere app created by Github user Rob--W https://cors-anywhere.herokuapp.com/

// Google Places Api key goes here
const API_KEY = ""

var data;

//get location from user's browser
var x = document.getElementById("latlong");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  // prints location out in hidden <p> attribute
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;

  // concatenates lat and long for url parameter
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  var latLong = '' + lat + ',' + long;

  // appends google url with user latitude and longitude
  var url = new URL("https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?");
  var params = new URLSearchParams(url.search);
  params.append("location", latLong);
  params.append("radius", 2000);
  params.append("type", "restaurant");
  params.append("key", API_KEY);
  var readyUrl = url + params;

  // fetch json data from generated url
  fetch(readyUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
      })
    .then(data => {
        console.log(data);
        displayRestaurant(data);
      })
    .catch((error) => console.error("FETCH ERROR:", error));
  return data;
}

// displays data
function displayRestaurant(data) {
  const restaurantDiv = document.getElementById("restaurant");

  // find random restaurant from json array
  const restaurantArr = data.results;
  const keys = Object.keys(restaurantArr);
  const randIndex = Math.floor(Math.random() * keys.length);
  const randKey = keys[randIndex];
  const restaurant = restaurantArr[randKey];

  // displays restaurant name
  const restaurantName = restaurant.name;
  const name = document.createElement("p");
  name.innerHTML = restaurantName;
  restaurantDiv.append(name);
  document.getElementById("restaurant").innerHTML = restaurantName;
  if (restaurantName == "") {
    return("No name found.")
  }

  // displays restaurant rating
  const restaurantRating = restaurant.rating;
  const rating = document.createElement("p");
  rating.innerHTML = restaurantRating;
  restaurantDiv.append(rating);
  if (restaurantRating == "") {
    return("No rating found.");
  }

  // displays restaurant address
  const restaurantAddress = restaurant.vicinity;
  const address = document.createElement("p");
  address.innerHTML = restaurantAddress;
  restaurantDiv.append(address);
  if (restaurantAddress == "") {
    return("No address found.")
  }
}
