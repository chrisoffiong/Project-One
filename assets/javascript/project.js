let googleapikey = AIzaSyCU3cg8wL6Oip0qL_iZbpCUrdBLFbm_Lk8
let cityName = Atlanta
let countryCode = US
let weatherApi = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "," + countryCode
var config = {
    apiKey: "AIzaSyCt1tjlPv6urCLqmPuzSLoyVnGIevTPjds",
    authDomain: "project-one-64b32.firebaseapp.com",
    databaseURL: "https://project-one-64b32.firebaseio.com",
    projectId: "project-one-64b32",
    storageBucket: "project-one-64b32.appspot.com",
    messagingSenderId: "668349026732"
  };
  firebase.initializeApp(config);
