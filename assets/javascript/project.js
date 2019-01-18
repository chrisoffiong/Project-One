let baseImage;

function encodeImageFileAsURL() {

  var filesSelected = document.getElementById("inputFileToLoad").files;
  if (filesSelected.length > 0) {
    var fileToLoad = filesSelected[0];

    var fileReader = new FileReader();

    fileReader.onload = function (fileLoadedEvent) {
      var srcData = fileLoadedEvent.target.result; // <--- data: base64
      baseImage = srcData;



    }
    fileReader.readAsDataURL(fileToLoad);
  }
}

$("#submit").on("click", function (event) {
  event.preventDefault();

  let city = $("#cities").val();


  console.log(city);
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
    let location = {
      lat: latitude,
      lng: longitude
    };
    let iconId = response.weather[0].icon;
    let iconUrl = "http://openweathermap.org/img/w/" + iconId + ".png";
    console.log(latitude, longitude);
    console.log((response.main.temp - 273.15) * 1.80 + 32);

    $("#weatherDisplay").html(response.weather[0].main + " " + Math.ceil((response.main.temp - 273.15) * 1.80 + 32) + "&#176;" + "F " + "<img id='icon' src='" + iconUrl + "'>");
    var map;
    let attractions = $("#attractions").val();

    function initMap() {
      map = new google.maps.Map(document.getElementById('mapDisplay'), {
        center: {
          lat: latitude,
          lng: longitude
        },
        zoom: 11
      });
      infowindow = new google.maps.InfoWindow();
      var bikeLayer = new google.maps.BicyclingLayer();
      bikeLayer.setMap(map);

      var service = new google.maps.places.PlacesService(map);

      service.nearbySearch({
        location: location,
        radius: 20000,
        keyword: [attractions]
      }, callback);

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
        google.maps.event.addListener(marker, 'click', function () {
          map.setZoom(17);
          map.setCenter(marker.getPosition());
          console.log(place.place_id);

          var request = {
            placeId: place.place_id,
            fields: ['address_component', 'adr_address', 'alt_id', 'formatted_address', 'geometry', 'icon', 'id', 'name', 'permanently_closed', 'photo', 'place_id', 'plus_code', 'scope', 'type', 'url', 'utc_offset', 'vicinity']
          };

          service.getDetails(request, callback);



          // $(".card-title").html(place.name);
          // $(".card-content").html(marker.getPosition());
        });

      }

    }


    initMap();
  })

});
$(document).ready(function () {
  
  var config = {
    apiKey: "AIzaSyCt1tjlPv6urCLqmPuzSLoyVnGIevTPjds",
    authDomain: "project-one-64b32.firebaseapp.com",
    databaseURL: "https://project-one-64b32.firebaseio.com",
    projectId: "project-one-64b32",
    storageBucket: "project-one-64b32.appspot.com",
    messagingSenderId: "668349026732"
  };
  firebase.initializeApp(config);

  let database = firebase.database();
  var defaultStorage = firebase.storage();

  database.ref().on("child_added", function (childSnap) {
    let name = childSnap.val().name;
    let review = childSnap.val().review;
    let image = childSnap.val().image;
    $("#imagediv").html("<img height = '200' width= '200' src=" + image + ">")
  })
  
  $("#submit1").on("click", function () {
    var storageRef = firebase.storage().ref().child("new/");
var imageRef = "new/";

    // storageRef.getDownloadURL().then(function(url) {
    //     imageRef.child("image").set(url);
    // }); 

    var task = storageRef.putString(baseImage, 'data_url').then(function(snapshot) {
         console.log('Uploaded a base64 string!');
         });
    console.log("yes")
    let newName = $("#email").val().trim();
    let newImage = baseImage;
    let rating = ""
    let newReview = $("#textarea1").val().trim();

    let newBike = {
      name: newName,
      review: newReview,
      image: baseImage
    }
    database.ref().push(newBike);
    $("#email").val("")
    return false;
  })


})
$('.rating-container .star').click(function () {
  $('.rating-container .star').removeClass('active2');
  $(this).prevAll('.star').addBack().addClass('active2');
});

// $(document).ready(function () {
//   $('select').formSelect();
  
//   encodeImageFileAsURL()
// })
