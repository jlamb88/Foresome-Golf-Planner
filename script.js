

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
















































































































var coursePar = "70"
var strokes = "85"
var courseName = "CCR"
var courseEl = $('#course')
var parEl = $('#par')
var strokesEl =$('#strokes')

function scorecard(courseName, strokes, coursePar){

    myScore = {
        course: courseEl.val(),
        //for next two might need parseInt
        strokes: strokesEl.val(),
        coursePar: courseEl.val(),
        score: (strokes - coursePar)
    }
    //build out except by doing && for all arguments
if ((course!=='')){
    mySavedScore.push(myScore)
}
    //lets store the information in local storage
localStorage.setItem("scoreCard",JSON.stringify(mySavedScore))

    return (courseName, score); 
}
submitButton.addEventListener("click", function(event) {

console.log (scorecard)
console.log (score)


