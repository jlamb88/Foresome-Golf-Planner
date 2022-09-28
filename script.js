

var userLat;
var userLong;
var userProx;
var api_key = "c530c463eb236ecc331331c6c541cb4c315ecb3"
var zipCode = "30076"

console.log('Inside script.js');
//c530c463eb236ecc331331c6c541cb4c315ecb3
fetch('https://api.geocod.io/v1.7/geocode?q='+zipCode+'&api_key='+api_key+'')
.then(response => {
    console.log('Response object looks like', response);

    var parsedData = response.json();
    console.log('parsedData looks like', parsedData);
    return parsedData;
})
.then( maybeData => {
    console.log('maybeData', maybeData);

    userLat = maybeData.results[0].location.lat;
    userLong = maybeData.results[0].location.lng;
    console.log(userLat, userLong);

   

} )


