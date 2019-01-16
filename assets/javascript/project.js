
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

    let place = $("#cities").val();


    console.log(place);
    let cityId = $(".icons").val().trim();
    let countryCode = "us"
    let weatherApiKey = "75598549dfb84653561068b1a40f42c2"
    let weatherApi = "https://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&appid=" + weatherApiKey
    let state = $("#stateInput").val();
    let areaCode = $("#areaCodeInput").val();
    console.log(state);
    console.log(areaCode);

      $.ajax({
        url: weatherApi,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        let latitude = response.coord.lat;
        let longitude = response.coord.lon;
        let location = {lat: latitude, lng: longitude};
        let iconId = response.weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/w/" + iconId + ".png";
        console.log(latitude, longitude);
        console.log((response.main.temp - 273.15) * 1.80 + 32);

        $("#weatherDisplay").html(response.weather[0].main + " " + Math.ceil((response.main.temp - 273.15) * 1.80 + 32) + "&#176;" + "F " + "<img id='icon' src='" + iconUrl + "'>");

        var map;
        let attractions = $("#attractions").val();
         function initMap() {
           map = new google.maps.Map(document.getElementById('mapDisplay'), {
             center: {lat: latitude, lng: longitude},
             zoom: 11
           });
           infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: location,
          radius: 20000,
          name: [attractions]
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
          console.log(results);
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
initMap();
  })




  });

$(document).ready(function(){
  $('select').formSelect();
})
