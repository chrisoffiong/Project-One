
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
    let googleApiKey = "AIzaSyD70gJxVU99cft60x0vppvi_XjKjG_MigM"
    let googleUrl = "https//maps.googleapis.com/maps/api/place/textsearch/json?query=bike+rack&radius=1500&location=33.75,-84.39&key=" + googleApiKey
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
        console.log(parseInt(iconId.substring(0, 2)));
        let iconUrl = "http://openweathermap.org/img/w/" + iconId + ".png";
        console.log(latitude, longitude);
        console.log((response.main.temp - 273.15) * 1.80 + 32);
        $("#weatherDisplay").html(Math.ceil((response.main.temp - 273.15) * 1.80 + 32) + "&#176;" + "F ");
        $("#weatherIcon").html("<img id='icon' src='" + iconUrl + "'>");
        $("#weatherType").html(response.weather[0].main);
        $("#weatherCard").addClass("z-depth-1");
        $("#weatherCard").addClass("populatedCard");
        if (iconId.substr(-1) == "n") {
          $("#weatherCard").css("background-color", "#282828"); 
          $("#weatherDisplay").css("color", "white"); 
          $("#weatherType").css("color", "white");         
        } else if (parseInt(iconId.substring(0, 2)) < 3) {
          $("#weatherCard").css("background-color", "#add6f5"); 
          $("#weatherDisplay").css("color", "#3c5375"); 
          $("#weatherType").css("color", "#3c5375");          
        } else if (parseInt(iconId.substring(0, 2)) < 9) {
          $("#weatherCard").css("background-color", "#808080"); 
          $("#weatherDisplay").css("color", "white"); 
          $("#weatherType").css("color", "white");
        } else if (parseInt(iconId.substring(0, 2)) < 13) { 
          $("#weatherCard").css("background-color", "#3c5375"); 
          $("#weatherDisplay").css("color", "white"); 
          $("#weatherType").css("color", "white");
        } else if (parseInt(iconId.substring(0, 2)) < 50) { 
          $("#weatherCard").css("background-color", "white"); 
          $("#weatherDisplay").css("color", "#3c5375"); 
          $("#weatherType").css("color", "#3c5375");
        } else {
          $("#weatherCard").css("background-color", "#bda29e"); 
          $("#weatherDisplay").css("color", "#3c5375"); 
          $("#weatherType").css("color", "#3c5375");         
        }
      })

      $.ajax({
        url: googleUrl,
        method: "GET"
      }).then(function(response2) {
        console.log(response2)
      })
      var map;
      var service;
      var infowindow;

      function initialize() {
        var pyrmont = new google.maps.LatLng(33.7756,-84.3963);

        map = new google.maps.Map(document.getElementById('mapDisplay'), {
            center: pyrmont,
            zoom: 15
          });

          infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService(map);
          service.nearbySearch({
            location: pyrmont,
            radius: 500,
            type: ['bicycle_store']
          }, callback);

          function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
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
            });

            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(place.name);
              infowindow.open(map, this);
            });
      }

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
});



$(document).ready(function(){
  $('select').formSelect();
});
$('.rating-container .star').click(function () {
    $('.rating-container .star').removeClass('active2');
    $(this).prevAll('.star').addBack().addClass('active2');
});

$(document).ready(function() {
  $('input#input_text, textarea#textarea2').characterCounter();
});


