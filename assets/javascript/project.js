
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
    let place = $("#cities").val();
    let attractions = $("#attractions").val();
    let googleUrl = "https//maps.googleapis.com/maps/api/place/textsearch/json?query=" + place + "&radius=1500&location=33.75,-84.39&key=" + googleApiKey
    console.log(place);
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
        let iconId = response.weather[0].icon;
        let iconUrl = "http://openweathermap.org/img/w/" + iconId + ".png";
        console.log(latitude, longitude);
        console.log((response.main.temp - 273.15) * 1.80 + 32);

        $("#weatherDisplay").html(response.weather[0].main + " " + Math.ceil((response.main.temp - 273.15) * 1.80 + 32) + "&#176;" + "F " + "<img id='icon' src='" + iconUrl + "'>");

      })

      var map;
       function initMap() {
         map = new google.maps.Map(document.getElementById('mapDisplay'), {
           center: {lat: -34.397, lng: 150.644},
           zoom: 8
         });
       }
       initMap();
  });







$(document).ready(function(){
  $('select').formSelect();
})
