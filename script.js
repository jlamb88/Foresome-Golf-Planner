var searchBtn = $('#searchBtn');
var cityInputEl = $('#cityInput');
var radInputEl = $('#distanceInput');
var searchContainerEl = $("#savedCities")
var prevCities;
var prevDistance;
var savedSearched = []

//Charlee note: rename all variables and formatting once the HTML is built
searchBtn.click(saveSearch);
searchContainerEl.on("click", "button", showPrevCity);
function init() {
    //when the page loads we hide the weather display since they have yet to search for things
    //we also will call down items from local storage, and then we will render the cities
    weatherContainer.style.visibility = "hidden";

    if (!localStorage.getItem("prevSearches")) {
        savedSearched = [];
    } else {
        savedSearched = JSON.parse(localStorage.getItem("prevSearches"));
    }
    renderCities();
}

async function saveSearch(event) {
    //when we save we don't want something to be removed from the search bar
    event.preventDefault();
    var currentSearch = {
        cityText: cityInputEl.val(),
        radiusText: radInputEl.val()
    }
    console.log(currentSearch)
    if ((currentSearch.cityText !== '') && (currentSearch.radiusText !== '')) {
        savedSearched.push(currentSearch)
    } else (savedSearched = [])
    //now we want to save the data and also send the data to an array and display it
    zipcode = currentSearch.cityText;
    //We want to clear these variables so that they are empty if we call a new city
    // nextForecast = [];
    // futureArray = [];
    storeCities();
    renderCities();
    //add lines functions that call API and display the information
}

function storeCities() {
    //lets store them locally so when we reload the page they'll still be here
    localStorage.setItem("prevSearches", JSON.stringify(savedSearched));
}
function renderCities() {
    searchContainerEl.innerHTML = "";

    for (var i = 0; i < savedSearched.length; i++) {
        //lets add the all of the previous cities as buttons
        var searchText = "zipcode: " + savedSearched[i].cityText + ' : ' + savedSearched[i].radiusText + " mile radius";
        var prevBtn = $("<button></button>");

        var btnContainer = $("<li></li>");

        prevBtn.text(searchText);
        prevBtn.addClass('w-100')
        btnContainer.append(prevBtn);
        searchContainerEl.append(btnContainer);
    }
}
function extractCity(event) {
    var cityInput = event.currentTarget.innerHTML;
    zipcode = cityInput;
    return zipcode;
}
var todayWeather;

//replace this code with the same to execute the API and display elements
function showPrevCity(event) {
    //if they want to see a previous city we will first extract the info and then run the same info that would happen if they just search for it
    extractCity(event);
    //We want to clear these variables so that they are empty if we call a new city
    nextForecast = [];
    futureArray = [];
    // getAPI();
    // runFuture()
}