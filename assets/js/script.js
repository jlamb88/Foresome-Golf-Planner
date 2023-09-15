

//Container Variables
var weatherContainer = $("#weatherContainer")
//variables for search bar and containers
var searchBtn = $('#searchBtn');
var prevBtn = $('#prevSrchBtn')
var cityInputEl = $('#cityInput');
var radInputEl = $('#distanceInput');
var searchContainerEl = $("#savedCities")
var prevDistance;
var savedSearched = [];

//geolocator variables
var userLat;
var userLong;
var userProx;
var api_key = 'c530c463eb236ecc331331c6c541cb4c315ecb3'

//date variables
var today = moment();
$(".todayDate").text(today.format("dddd, MMMM Do YYYY"));
$(".tomorrowDate").text(moment().add((1), 'days').format('dddd, MMMM Do YYYY'))
$('.afterTomorrowDate').text(moment().add((2), 'days').format('dddd, MMMM Do YYYY'))

//schedule variables and buttons
searchBtn.click(searchResults);


$("#searchBtn").click(() =>
    weatherSearch($("#cityInput").val())
)



function weatherSearch(loc) {
    const apiKey = "20f82cbfb698e805cd598e366c3108b2";
    if ($.isNumeric(loc)) {
        fetchAPI =
            'https://api.openweathermap.org/data/2.5/forecast?zip=' + loc + '&units=imperial&appid=' + apiKey;
    } else {
        if (loc.includes(",")) {
            stateChk = loc.slice(-2)
            if (checkState(stateChk)) {
                loc = loc + ", US";
            }
        }
        fetchAPI =
            'https://api.openweathermap.org/data/2.5/forecast?q=' + loc + '&units=imperial&appid=' + apiKey;
    }

    $('#data').empty()
    $('future').empty()
    $('#city-icon').empty()
    $('heading').empty()
    $('today-date').empty()
    $('#srch-list').empty()

    fetch(fetchAPI) //test JSON: "./assets/test.JSON"
        .then((response) => response.json())
        .then(function (data) {
            let pos = 0
            function createWeatherObj(obj) {
                let {
                    dt_txt: date,
                    main: {
                        temp,
                        feels_like: heatIndex,
                        temp_min: low,
                        temp_max: high,
                        humidity
                    },
                    weather: [
                        {
                            description: details,
                            icon
                        }],
                    wind: {
                        speed: wind
                    },
                    city
                } = obj

                return { date, temp, heatIndex, low, high, humidity, details, icon, wind, city }
            }
            weather = createWeatherObj({ ...data.list[pos], city: data.city.name })
            formatDt = moment.utc(weather.date).local().format("dddd MMMM Do, YYYY")
            temp = Math.round(weather.temp)
            wind = Math.round(weather.wind)
            heatIndex = Math.round(weather.heatIndex)

            $('#city-icon').append(`<h3 id="city-loc"> ${weather.city} </h3><div class="mb-3"><img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" id="now-icon" alt="weather now icon"></div><h2>${weather.details}</h2>`)
            $('today-date').append(`<strong>${formatDt}</strong>`)
            $('heading').append('<ul><li>Temp</li><li>Humidity</li><li>Feels Like</li><li>Wind</li></ul>')
            $('#data').append(
                `<li>${temp}<sup>o</sup></li><li>${weather.humidity}%</li><li>${heatIndex}<sup>o</sup></li><li>${wind} mph</li>`
            );


            let startDt = moment.utc(weather.date, "YYYY-MM-DD HH:mm:ss").local()
            let startHour = moment.utc(weather.date)
                .local()
                .format("HH");
            let startT = 9 - Math.floor((startHour - 12) / 3);
            for (pos = startT; pos < 40; pos += 8) {
                let weather = createWeatherObj({ ...data.list[pos], location: data.city.name })
                let weekday = moment.utc(weather.date, "YYYY-MM-DD HH:mm:ss").local().format("ddd");
                let temp = Math.round(weather.temp)
                let wind = Math.round(weather.wind)
                var newCard = $("<card>", {
                    class: "card mr-3",
                    style: "height: 16rem",
                    html:
                        `<div class="card-body"><h5 class="card-title">${weekday}</h5><div class="mb-2" id="card-icon"><img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" class="card-img" alt="weather icon"></div><ul class="card-text" id="day-dtls"><li>Temp: ${temp}<sup>o</sup></li><li>Humidity: ${weather.humidity}%</li><li>Wind: ${wind} mph</li></ul></div>`,
                });
                $("future").append(newCard);
            }
            if (startHour < 20) {
                let weather = createWeatherObj({ ...data.list[39], location: data.city.name })
                let weekday = moment.utc(weather.date, "YYYY-MM-DD HH:mm:ss").local().format("ddd");
                let temp = Math.round(weather.temp)
                let wind = Math.round(weather.wind)
                var newCard = $("<card>", {
                    class: "card mr-3",
                    style: "height: 16rem",
                    html:
                        `<div class="card-body"><h5 class="card-title">${weekday}</h5><div class="mb-2" id="card-icon"><img src="http://openweathermap.org/img/wn/${weather.icon}@2x.png" class="card-img" id="card-icon" alt="weather icon"></div><ul class="card-text" id="day-dtls"><li>Temp: ${temp}<sup>o</sup></li><li>Humidity: ${weather.humidity}%</li><li>Wind: ${wind} mph</li></ul></div>`,
                });
                $("future").append(newCard);

            }

            return;
        });
}

function checkState(test) {
    stateArr = [
        'AL', 'AK', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'IL', 'IN', 'IA', 'ID', 'KS', 'KY', 'LA', 'ME', 'MA', 'MD', 'MI', 'MN', 'MS', 'MO', 'NC', 'NE', 'ND', 'NV', 'NM', 'NJ', 'NY', 'NH', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WY', 'WA', 'WI', 'WV'];
    test = test.toUpperCase()
    return stateArr.includes(test);
};

const listOptions = {
    method: 'GET',
    headers: {
        'content-type': 'application/octet-stream',
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
                        'content-type': 'application/octet-stream',
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

async function geoAPI(zipCode) {
    let geo = fetch('https://api.geocod.io/v1.7/geocode?q=' + zipCode + '&api_key=' + api_key + '')
        .then(response => {
            var parsedData = response.json();
            return parsedData;
        })
        .then(maybeData => {
            userLat = maybeData.results[0].location.lat;
            userLong = maybeData.results[0].location.lng;
            return userLat, userLong
        })
    return geo
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


    render()
    renderCities();
}

async function saveSearch(event) {
    //when we save we don't want something to be removed from the search bar
    event.preventDefault();
    var currentSearch = {
        cityText: cityInputEl.val(),
        radiusText: radInputEl.val()
    }
    if (!(savedSearched.includes(currentSearch.cityText) && savedSearched.includes(currentSearch.radiusText))) {
        savedSearched.push(currentSearch)
    }
    //now we want to save the data and also send the data to an array and display it
    zipCode = currentSearch.cityText;
    srchRadius = currentSearch.radiusText;
    localStorage.setItem("prevSearches", JSON.stringify(savedSearched));

    renderCities();
}

function renderCities() {
    searchContainerEl.empty()
    for (var i = 0; i < savedSearched.length; i++) {
        //lets add the all of the previous cities as buttons
        var searchText = savedSearched[i].cityText + ' - ' + savedSearched[i].radiusText + " mile(s)";

        var prevBtn = $('<button id="prevSrchBtn"></button>');
        var btnContainer = $('<li></li>');

        prevBtn.text(searchText);
        prevBtn.addClass('w-100')
        btnContainer.append(prevBtn);
        searchContainerEl.append(btnContainer);
        prevBtn.click(prevSearchResults)
            ;

    }
}

function extractCity(event) {
    //how can I get both the zipcode and radius out of this?
    var cityInput = event.currentTarget.innerHTML;
    var cityInputParse = cityInput.split(' ')
    //lets split the innerText of the HTML by spaces, and then extract the city/zipcode and radius, since they're all uniform
    zipCode = cityInputParse[0];
    srchRadius = cityInputParse[2]

    return zipCode, srchRadius;
}



function render() {

    //lets get our items from the local storage

    //for the length of the buttons (all buttons) we will loop here
    for (a = 0; a < allInput.length; a++) {
        //and lets put those values in the input boxes
        allInput[a].value = savedEvents[a]
    }
}

function searchResults(event) {
    //we want to empty out the previous results before a new one
    $('#courses-results').empty()
    $('#courses-bar').empty()
    saveSearch(event)
    geoAPI(zipCode).then(function (res) {
        golfAPI(res);
    })
    weatherContainer.show()
}

function prevSearchResults(event) {
    //we want to empty out the previous results before a new one
    $('#courses-results').empty()
    $('#courses-bar').empty()
    extractCity(event)
    weatherSearch(zipCode)
    geoAPI(zipCode).then(function (res) {
        golfAPI(res);
        weatherContainer.show()
    })
}

var now = moment();
$('#currentDay').text(now.format("dddd MMM Do, YYYY"));
var currentHour = now.format("H");

for (n = 7; n < 18; n++) {
    var containerEl = $("#scheduleContainer");
    if (n < 12) {
        hourTime = n + "am";
    }
    else if (n > 12) {
        hourTime = (n - 12) + "pm";
    }
    else {
        hourTime = n + 'pm';
    }

    var schedRow = '<section class="schedrow row" id ="schedule-row"></section>';
    containerEl.append(schedRow);
    currentRow = $("section").last()
    currentRow.append('<section class="col hour" id="hour">' + hourTime + '</section>')

    currentRow.append('<textarea id="appt" data-time="' + hourTime + '"></textarea>')
    apptText = localStorage.getItem(hourTime);
    $("#appt", currentRow).text(apptText)

    currentRow.append('<button type="button" class="saveBtn col" id="' + hourTime + '">save</button>')
    $("button", currentRow).click(function () {
        var apptTime = $(this).attr("id")
        var apptText = $(this).siblings("#appt").val();
        localStorage.setItem(apptTime, apptText);
    })

    currentAppt = $("textarea").last()
    if (n < currentHour) {
        currentAppt.attr("class", "col-10 past description")
    }
    else if (n > currentHour) {
        currentAppt.attr("class", "col-10 future description")
    }
    else {
        currentAppt.attr("class", "col-10 present description")
    }
}

//display everything by calling the init 
init()