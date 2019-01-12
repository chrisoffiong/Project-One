
var config = {
  apiKey: "AIzaSyCt1tjlPv6urCLqmPuzSLoyVnGIevTPjds",
  authDomain: "project-one-64b32.firebaseapp.com",
  databaseURL: "https://project-one-64b32.firebaseio.com",
  projectId: "project-one-64b32",
  storageBucket: "project-one-64b32.appspot.com",
  messagingSenderId: "668349026732"
};
firebase.initializeApp(config);

$("#submit").on("click", function(event){
    event.preventDefault();
    let googleApiKey = "AIzaSyCU3cg8wL6Oip0qL_iZbpCUrdBLFbm_Lk8"
    let cityName = $("#cityInput").val();
    let countryCode = "us"
    let weatherApiKey = "75598549dfb84653561068b1a40f42c2"
    let weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + countryCode + "&appid=" + weatherApiKey
    let state = $("#stateInput").val();
    let areaCode = $("#areaCodeInput").val();
    console.log(cityName);
    console.log(state);
    console.log(areaCode);

      $.ajax({
        url: weatherApi,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        let latitude = response.coord.lat;
        let longitude = response.coord.lon;
        console.log("Latitude: " + latitude + " Longitude: " + longitude);
        console.log((response.main.temp - 273.15) * 1.80 + 32);
      })

})





function initMap() {

  var map = new google.maps.Map(document.getElementById('mapDisplay'), {
    zoom: 13,
    center: {
      lat: -28.024,
      lng: 140.887
    }
  });
  console.log(google);

  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  var markers = locations.map(function (location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length]
    });
  });
  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  });
}
var locations = [{
      lat: 33.775620,
      lng: -84.396286
    }]

    initMap();
