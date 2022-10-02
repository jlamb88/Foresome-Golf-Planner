
// for (i=0;i<tempArry.length;i++) {
//              coursesArry.push(tempArry[i])
//        console.log("fetch",coursesArry);
//     }

//     return coursesArry;
//    var distArray = []; //Array of Objects that only contain the name and the zipcode from the first call
//    for(var i = 0; i < tempArry.length; i++) {
//        distArray.push({name: tempArry[i].name, zip_code: tempArry[i].zip_code});

// *********************************API CODE************************************
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

fetch(passURL, listOptions)
	.then(response => response.json())
	.then(async function(response)
            {
            var coursesList = response.courses;
            courseResultsCount = coursesList.length + ' courses meet your search criteria';
            $('#courses-bar').append('<h6>'+courseResultsCount+'</h6></br>');
            var endResults = []; 
            for(var i = 0; i < coursesList.length; i++) 
                {
                var courseObj = {name: coursesList[i].name, distance: coursesList[i].distance, address: "",image: "",URL: ""}
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
                    var placesImgKey = 'AIzaSyDwPSRdwH9WbRXsdvun20zY-AuIQhzuqeU'
                    var courseImgRef = response.course_details.result.photos[0].photo_reference
                    var courseImg = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&maxheight=75&photo_reference='+courseImgRef+'&key='+placesImgKey
                    var courseName = input.name
                    var courseDistance = input.distance
                    // courseImg = "image"
                    // courseName = "Bobby Jones"
                    // courseAddress = "123 Main St"
                    // courseDistance = "3.6 mi."
                    // courseURL = "test"
                    var courseResultsCard =
                    '<div class="card" id="course-card" style="width: 11rem;height: 25rem;margin: 0 1rem 1rem 0"> <img src="'+courseImg+'" class="card-img-top" id="card-image" alt="picture of golf course from search results"> <div class="card-body"> <h6 class="card-title">'+courseName+'</h6> <p class="card-text" id="card-address">'+courseAddress+'<br>'+courseDistance+' mi.</br></p> <a href="'+courseURL+'" class="btn btn-primary" id="card-URL">Website</a> </div> </div>';
                
                $('#courses-results').append(courseResultsCard);
                    return;
                    }
                    )
	            .catch(err => console.error(err));
                };
            }
    )