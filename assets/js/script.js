//Container Variables
var weatherContainer = $("#weatherContainer")
//variables for search bar and containers
var searchBtn = $('#searchBtn');
var cityInputEl = $('#cityInput');
var radInputEl = $('#distanceInput');
var searchContainerEl = $("#savedCities")
var prevDistance;
var savedSearched = [];

//variable for score card
var coursePar = ""
var strokes = ""
var course = ""
var courseEl = $('#course')
var parEl = $('#par')
var strokesEl = $('#strokes')
var scoreContainerEl = $('#scoreContainer')
var submitScoreButton = $('#submit')
var mySavedScore = []
var prevBtnEl = $("#savedCities")
prevBtnEl.on("click", "button", prevSearchResults) //target any of the links as buttons, the later function attached to this will determine what the search is


//geolocator variables
var userLat;
var userLong;
var userProx;
var api_key = "c530c463eb236ecc331331c6c541cb4c315ecb3"

//date variables
var today = moment();
$(".todayDate").text(today.format("dddd, MMMM Do YYYY"));
$(".tomorrowDate").text(moment().add((1), 'days').format('dddd, MMMM Do YYYY'))
$('.afterTomorrowDate').text(moment().add((2), 'days').format('dddd, MMMM Do YYYY'))

//schedule variables and buttons
var saveBtnEl = $("#scheduleContainer")
saveBtnEl.on("click", "button", saveEvent)
allInput = $(".time-block")
searchBtn.click(searchResults);

//now we are looking for a single click on any button
// searchContainerEl.on("click", "button", prevSearchResults);

//buttons
submitScoreButton.on("click", createScoreCard);


var weatherTracker = {
    weatherapi: "ac96e744e22de6b8cf05d8399f7bfdf3",
    zipcode: "",
    fetchtracker: function () {
        fetch("https://api.openweathermap.org/data/2.5/forecast?zip=" + zipcode + ",us&units=imerial&appid=" + weatherapi)
            //city needs to be linked to the golf API
            .then((response) => response.json())
            .then((data) => this.forecastDisplay(data));
    },
}

const listOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '913df6397fmsh03cd288e42a6810p17e0eejsnef8826802277',
        'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
    }
};
function golfAPI(res) {
    var passURL = "https://golf-course-finder.p.rapidapi.com/courses?radius=" + srchRadius + "&lat=" + userLat + "&lng=" + userLong

    // first API fetch to retrieve general course results in a geographic area from search
    fetch(passURL, listOptions)
        .then(response => response.json())
        .then(async function (response) {

            var coursesList = response.courses;
            courseResultsCount = '<br>' + coursesList.length + ' courses meet your search criteria<br>';
            $('#courses-bar').append('<h6>' + courseResultsCount + '</h6></br>');
            //iterates second fetch call for each course fetched by first results
            for (var i = 0; i < coursesList.length; i++) {
                var courseObj = { name: coursesList[i].name, distance: coursesList[i].distance, address: "", image: "", URL: "" }
                var courseDistance = coursesList[i].distance;
                var courseName = coursesList[i].name;
                await secondUrlFetchCall(coursesList[i]);
            }

            function secondUrlFetchCall(input) {
                const crseOptions =
                {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '913df6397fmsh03cd288e42a6810p17e0eejsnef8826802277',
                        'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
                    }
                };

                var nameQuery = input.name.split(' ').join("%20");
                var zipCodeQuery = input.zip_code;
                fetchURL = 'https://golf-course-finder.p.rapidapi.com/course/details?zip=' + zipCodeQuery + '&name=' + nameQuery;
                fetch(fetchURL, crseOptions)
                    .then(response => response.json())
                    .then(function (response) {
                        var courseAddress = response.course_details.result.formatted_address
                        var courseURL = response.course_details.result.website
                        var placesImgKey = 'AIzaSyDwPSRdwH9WbRXsdvun20zY-AuIQhzuqeU' //Google Places API key
                        var courseImgRef = response.course_details.result.photos[0].photo_reference
                        var courseImg = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&photo_reference=' + courseImgRef + '&key=' + placesImgKey
                        var courseName = input.name
                        var courseDistance = input.distance
                        var courseResultsCard =
                            '<div class="card" id="course-card" style="width: 12.1rem;height: 28rem;margin: 0 0.75rem 0.75rem 0"> <img src="' + courseImg + '" class="card-img-top" id="card-image" alt="picture of golf course from search results"> <div class="card-body"> <h6 class="card-title">' + courseName + '</h6></br> <p class="card-text" id="card-address">' + courseAddress + '<br>' + courseDistance + ' mi.</br></p> <a href="' + courseURL + '" class="btn btn-primary" id="card-URL">Website</a> </div> </div>';

                        // Write search results card to page
                        $('#courses-results').append(courseResultsCard);
                        return;

                    }
                    )
                    .catch(err => console.error(err));
            };
        }
        )
}

async function geoAPI() {
    console.log("geoAPI Running")
    let geo = fetch('https://api.geocod.io/v1.7/geocode?q=' + zipCode + '&api_key=' + api_key + '')
        .then(response => {
            // console.log('Response object looks like', response);
            var parsedData = response.json();
            // console.log('parsedData looks like', parsedData);
            return parsedData;
        })
        .then(maybeData => {
            // console.log('maybeData', maybeData);
            userLat = maybeData.results[0].location.lat;
            userLong = maybeData.results[0].location.lng;
            // console.log(userLat, userLong);
            return userLat, userLong
        })
    return geo
}

function checkScore() {
    var score = parseInt(strokesEl.val()) - parseInt(parEl.val());
    if (score < 0) {
        return score + " under par";
    }
    else {
        return score + " over par";
    }
}

function createScoreCard() {
    // run your function to get scores from local storage

    var course = courseEl.val();
    var strokes = parseInt(strokesEl.val());
    var coursePar = parseInt(parEl.val());
    var score = checkScore();

    if (course && strokes && coursePar && score) {
        // create your score object
        var myScoreObj = {
            course,
            strokes,
            coursePar,
            score
        }
        // push your score object to your array
        mySavedScore.push(myScoreObj);
        // saved your scores array to local storage
        storeScores(mySavedScore);
        // call your renderScore functin
        renderScore();

    } else {
        alert("Please enter course, score, strokes, & par");
    }
}

function storeScores(scoresArray) {
    localStorage.setItem("scoreCard", JSON.stringify(scoresArray))
}

function renderScore() {
    scoreContainerEl.empty()

    // iterate through your saved score array
    for (var i = 0; i < mySavedScore.length; i++) {
        var scoreText = ("Course: " + mySavedScore[i].course + ": Score: " + mySavedScore[i].score)
        var scoreList = $("<li></li>")
        scoreList.text(scoreText);
        scoreList.addClass('w-100');
        scoreContainerEl.append(scoreList);
    }
}

function renderScore() {
    scoreContainerEl.empty()
    for (var i = 0; i < mySavedScore.length; i++) {
        var scoreText = ("course: " + mySavedScore[i].course + ": Score: " + mySavedScore[i].score)
        var scoreList = $("<li></li>")
        scoreList.text(scoreText);
        scoreList.addClass('w-100');
        scoreContainerEl.append(scoreList)
    }
}

function init() {
    //when the page loads we hide the weather display since they have yet to search for things
    //we also will call down items from local storage, and then we will render the cities
    weatherContainer.hide()
    if (!localStorage.getItem("prevSearches")) {
        savedSearched = [];
    } else {
        savedSearched = JSON.parse(localStorage.getItem("prevSearches"));
    }
    if (!localStorage.getItem("mySavedEvents")) {
        savedEvents = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    } else {
        savedEvents = JSON.parse(localStorage.getItem("mySavedEvents"))
    }
    if (!localStorage.getItem("scoreCard")) {
        mySavedScore = []
        console.log(mySavedScore)
    } else { mySavedScore = JSON.parse(localStorage.getItem("scoreCard")) }
    // populate your saved score array with the contents from local storage, using scoreCard as the key name

    render()
    renderCities();
    renderScore()
}

async function saveSearch(event) {
    //when we save we don't want something to be removed from the search bar
    event.preventDefault();
    var currentSearch = {
        cityText: cityInputEl.val(),
        radiusText: radInputEl.val()
    }
    if ((currentSearch.cityText !== '') && (currentSearch.radiusText !== '')) {
        savedSearched.push(currentSearch)
    }
    //now we want to save the data and also send the data to an array and display it
    zipCode = currentSearch.cityText;
    srchRadius = currentSearch.radiusText;

    storeCities()
    renderCities();
}

function storeCities() {
    localStorage.setItem("prevSearches", JSON.stringify(savedSearched));
}

function renderCities() {
    searchContainerEl.empty()
    for (var i = 0; i < savedSearched.length; i++) {
        //lets add the all of the previous cities as buttons
        var searchText = "Location: " + savedSearched[i].cityText + ' : ' + savedSearched[i].radiusText + " mile radius";

        var prevBtn = $("<button></button>");
        var btnContainer = $("<li></li>");

        prevBtn.text(searchText);
        prevBtn.addClass('w-100')
        btnContainer.append(prevBtn);
        searchContainerEl.append(btnContainer);
    }

}

function extractCity(event) {
    //how can I get both the zipcode and radius out of this?
    var cityInput = event.currentTarget.innerHTML;
    var cityInputParse = cityInput.split(' ')
    //lets split the innerText of the HTML by spaces, and then extract the city/zipcode and radius, since they're all uniform
    zipCode = cityInputParse[1];
    srchRadius = cityInputParse[3]
    console.log(zipCode)
    console.log(srchRadius)
    return zipCode, srchRadius;
}

function saveEvent(event) {
    event.preventDefault()
    //now we prevent default and the new variable newInput will reference the previousElementSibling of pressed button
    var newInput = event.target.previousElementSibling
    // now we want to use switch to determine what the data-num was, and log the input in the aprorpriate cell of the array
    switch (newInput.dataset.num) {
        case "1":
            savedEvents[0] = newInput.value;
            break;
        case "2":
            savedEvents[1] = newInput.value;
            break;
        case "3":
            savedEvents[2] = newInput.value;
            break;
        case "4":
            savedEvents[3] = newInput.value;
            break;
        case "5":
            savedEvents[4] = newInput.value;
            break;
        case "6":
            savedEvents[5] = newInput.value;
            break;
        case "7":
            savedEvents[6] = newInput.value;
            break;
        case "8":
            savedEvents[7] = newInput.value;
            break;
        case "9":
            savedEvents[8] = newInput.value;
            break;
        case "10":
            savedEvents[9] = newInput.value;
            break;
        case "11":
            savedEvents[10] = newInput.value;
            break;
        case "12":
            savedEvents[11] = newInput.value;
            break;
        case "13":
            savedEvents[12] = newInput.value;
            break;
        case "14":
            savedEvents[13] = newInput.value;
            break;
        case "15":
            savedEvents[14] = newInput.value;
            break;
        case "16":
            savedEvents[15] = newInput.value;
            break;
        case "17":
            savedEvents[16] = newInput.value;
            break;
        case "18":
            savedEvents[17] = newInput.value;
            break;
        case "19":
            savedEvents[18] = newInput.value;
            break;
        case "20":
            savedEvents[19] = newInput.value;
            break;
        case "21":
            savedEvents[20] = newInput.value;
            break;
        case "22":
            savedEvents[21] = newInput.value;
            break;
        case "23":
            savedEvents[22] = newInput.value;
            break;
        case "24":
            savedEvents[23] = newInput.value;
            break;
        case "25":
            savedEvents[24] = newInput.value;
            break;
        case "26":
            savedEvents[25] = newInput.value;
            break;
        case "27":
            savedEvents[26] = newInput.value;
            break;

    }
    //now we want to save it in our local storage
    localStorage.setItem("mySavedEvents", JSON.stringify(savedEvents));
    //and render it 
    render();
}

function render() {

    //lets get our items from the local storage

    //for the length of the buttons (all buttons) we will loop here
    for (a = 0; a < allInput.length; a++) {
        console.log(savedEvents[a])
        //and lets put those values in the input boxes
        allInput[a].value = savedEvents[a]
    }
}

function searchResults(event) {
    //we want to empty out the previous results before a new one
    $('#courses-results').empty()
    $('#courses-bar').empty()
    saveSearch(event)
    geoAPI().then(function (res) {
        golfAPI(res);
    })
    weatherContainer.show()
}

function prevSearchResults(event) {
    //we want to empty out the previous results before a new one
    $('#courses-results').empty()
    $('#courses-bar').empty()
    extractCity(event)
    geoAPI().then(function (res) {
        golfAPI(res);
        console.log(userLat)
        console.log(userLong)
        weatherContainer.show()
    })
}
//display everything by calling the init 
init()