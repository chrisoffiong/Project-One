let googleApiKey = "AIzaSyCU3cg8wL6Oip0qL_iZbpCUrdBLFbm_Lk8"
let cityName = "atlanta"
let countryCode = "us"
let weatherApiKey = "75598549dfb84653561068b1a40f42c2"
let weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "," + countryCode + "&appid=" + weatherApiKey
var config = {
  apiKey: "AIzaSyCt1tjlPv6urCLqmPuzSLoyVnGIevTPjds",
  authDomain: "project-one-64b32.firebaseapp.com",
  databaseURL: "https://project-one-64b32.firebaseio.com",
  projectId: "project-one-64b32",
  storageBucket: "project-one-64b32.appspot.com",
  messagingSenderId: "668349026732"
};
firebase.initializeApp(config);



function weather() {
  $.ajax({
    url: weatherApi,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    console.log((response.main.temp - 273.15) * 1.80 + 32)
  })
}


weather();
var map;
var service;
var infowindow;

function initialize() {
  var pyrmont = new google.maps.LatLng(33.7756,-84.3963);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });
  
  addMarker({lat:33.7756, lng: -84.4030})

  function addMarker(coords) {
  var marker = new google.maps.Marker({
    position: coords,
    map: map,
    title: 'Hello World!'
  })
  console.log(google.maps)
  }
  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);


function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}
}

    initialize();
  