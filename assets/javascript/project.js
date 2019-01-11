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



function weather(){
    $.ajax({
        url: weatherApi,
        method: "GET"
      }).then(function(response) {
         console.log(response);
         console.log((response.main.temp - 273.15) * 1.80 + 32)
    })
}


  weather();
