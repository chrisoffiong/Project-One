
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
    let cityName = $(".icons").val().trim();
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
        console.log(latitude, longitude);
        console.log((response.main.temp - 273.15) * 1.80 + 32);
        $("#weatherDisplay").html(response.weather[0].main + " " + Math.ceil((response.main.temp - 273.15) * 1.80 + 32) + "&#176;" + "F ");
      })

      var map;
      
      
      function initialize() {
        let pyrmont;
        if ($("option").val() == "atlanta") {
          pyrmont = new google.maps.LatLng(33.7756,-84.3963);
        }
        else if ($("option").val() == "boston") {
           pyrmont = new google.maps.LatLng(42.3601,-71.0589)
        }
        else if ($("option").val() == "new york") {
           pyrmont = new google.maps.LatLng(40.7831,-73.9712)
        }
        else if ($("option").val() == "portland") {
           pyrmont = new google.maps.LatLng(45.5122,-122.6587)
        }
        else if ($("option").val() == "seattle") {
           pyrmont = new google.maps.LatLng(47.6062, -122.3321)
        }
        
        var request;
        map = new google.maps.Map(document.getElementById('mapDisplay'), {
            center: pyrmont,
            zoom: 13
          });
      if ($("#shops").val() == "shops") {
        var request = {
          location: pyrmont,
          radius: '5000',
          type: ['bicycle_store']
        } 
      }
      else if ($("#attractions").val() == "attractions") {
        var request = {
          location: pyrmont,
          radius: '5000',
          type: ['stadium','aquarium','movie_theater','bar']
      }
    }
       ;
    
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
      }
    
      
      function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        })
      }
      initialize()
      google.maps.event.addDomListener(window, 'load', initialize)
})

$(document).ready(function(){
  $('select').formSelect();
})
