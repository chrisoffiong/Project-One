let googleApiKey = "AIzaSyCU3cg8wL6Oip0qL_iZbpCUrdBLFbm_Lk8"
let cityName = Atlanta
let countryCode = US
let weatherApiKey = "75598549dfb84653561068b1a40f42c2"
let weatherApi = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "," + countryCode + "&APPID=" + weatherApiKey
var config = {
    apiKey: "AIzaSyCt1tjlPv6urCLqmPuzSLoyVnGIevTPjds",
    authDomain: "project-one-64b32.firebaseapp.com",
    databaseURL: "https://project-one-64b32.firebaseio.com",
    projectId: "project-one-64b32",
    storageBucket: "project-one-64b32.appspot.com",
    messagingSenderId: "668349026732"
  };
  firebase.initializeApp(config);
