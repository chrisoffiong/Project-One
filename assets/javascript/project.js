M.AutoInit();
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


$("#submit").on("click", function(event) {
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
	}).then(function(response) {
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

		var map;
		let attractions = $("#attractions").val();

		function initMap() {
			map = new google.maps.Map(document.getElementById('mapDisplay'), {
				center: {
					lat: latitude,
					lng: longitude
				},
				zoom: 12
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
				google.maps.event.addListener(marker, 'click', function() {
					map.setZoom(17);
					map.setCenter(marker.getPosition());
					var request = {
						placeId: place.place_id,
						fields: ['address_component', 'adr_address', 'alt_id', 'formatted_address', 'geometry', 'icon', 'id', 'name', 'permanently_closed', 'photo', 'place_id', 'plus_code', 'scope', 'type', 'url', 'utc_offset', 'vicinity', 'opening_hours', 'price_level', 'rating', 'review']
					};
					service.getDetails(request, locationCallback);

					function locationCallback(results, status) {
						if (status === google.maps.places.PlacesServiceStatus.OK) {
							console.log(results);
							$("#cardDisplay").removeClass("hide");
							$("#cardTitle").html(results.name);
							$("#test4").html(results.formatted_address + "<br><br>Hours:");
                            results.opening_hours.weekday_text.forEach(function(day) {
                                $("#test4").append("<br>" + day);
                            });
						}
					}
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
    let location = childSnap.val().location;
    $("#latestReview").html(  "<div class= 'banch'> <p> Latest Story: </p> <img height = '180' width= '180' src=" + image + ">" + "<br> " + "<b id='bold'>"+ name + " at " + location + " says: </b> <i>" +  " " + review + " </i> </div> <p class='textcenter'> Tell us about your Journey <a href='review.html'>here!</a>")
  })

      $("#submit1").on("click", function () {
        var storageRef = firebase.storage().ref().child("new/");
        var imageRef = "new/";

        var task = storageRef.putString(baseImage, 'data_url').then(function (snapshot) {
          console.log('Uploaded a base64 string!');
        });
        console.log("yes")
        let newName = $("#userName").val().trim();
        let newImage = baseImage;
        let newLocation = $("#location").val().trim();
        let newReview = $("#textarea1").val().trim();

        let newBike = {
          name: newName,
          review: newReview,
          image: baseImage,
          location: newLocation
        }
        database.ref().push(newBike);
        $("#email").val("")
        return false;
      })
    })
      $(document).ready(function () {
        $('select').formSelect();
      })

      // $('.rating-container .star').click(function () {
      //   $('.rating-container .star').removeClass('active2');
      //   $(this).prevAll('.star').addBack().addClass('active2');
      // });

      $(document).ready(function () {
        $('input#input_text, textarea#textarea2').characterCounter();
      })
    
$(document).ready(function() {
	$('input#input_text, textarea#textarea2').characterCounter();
});
