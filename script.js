// Nested API to pull golf course search info based on location and radius input
var srchRadius = 5;
var userLat = 33.749;
var userLong = -84.38798;
var passURL = "https://golf-course-finder.p.rapidapi.com/courses?radius="+srchRadius+"&lat="+userLat+"&lng="+userLong


const listOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '913df6397fmsh03cd288e42a6810p17e0eejsnef8826802277',
        'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
    }
};

// first API fetch to retrieve general course results in a geographic area from search
fetch(passURL, listOptions)
	.then(response => response.json())
	.then(async function(response)
            {
            var coursesList = response.courses;
            courseResultsCount = '<br>'+coursesList.length + ' courses meet your search criteria<br>';
            $('#courses-bar').append('<h6>'+courseResultsCount+'</h6></br>');
//iterates second fetch call for each course fetched by first results
            for(var i = 0; i < coursesList.length; i++) 
                {
                var courseDistance = coursesList[i].distance;
                var courseName = coursesList[i].name;
                await secondUrlFetchCall(coursesList[i]);
                }
            
            function secondUrlFetchCall(input) 
                {
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
                fetchURL = 'https://golf-course-finder.p.rapidapi.com/course/details?zip='+zipCodeQuery+'&name='+nameQuery;
                fetch(fetchURL, crseOptions)
                .then(response => response.json())
	            .then(function(response) 
                    {
                    var courseAddress = response.course_details.result.formatted_address
                    var courseURL = response.course_details.result.website
                    var placesImgKey = 'AIzaSyDwPSRdwH9WbRXsdvun20zY-AuIQhzuqeU' //Google Places API key
                    var courseImgRef = response.course_details.result.photos[0].photo_reference
                    var courseImg = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&photo_reference='+courseImgRef+'&key='+placesImgKey
                    var courseName = input.name
                    var courseDistance = input.distance
                    var courseResultsCard =
                    '<div class="card" id="course-card" style="width: 12.1rem;height: 28rem;margin: 0 0.75rem 0.75rem 0"> <img src="'+courseImg+'" class="card-img-top" id="card-image" alt="picture of golf course from search results"> <div class="card-body"> <h6 class="card-title">'+courseName+'</h6></br> <p class="card-text" id="card-address">'+courseAddress+'<br>'+courseDistance+' mi.</br></p> <a href="'+courseURL+'" class="btn btn-primary" id="card-URL">Website</a> </div> </div>';
                    
// Write search results card to page
                $('#courses-results').append(courseResultsCard);
                    return;
                    }
                    )
	            .catch(err => console.error(err));
                };
            }
    )

    