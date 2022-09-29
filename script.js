
var srchRadius = 5;
var geoLat = 33.749;
var geoLng = -84.38798;
var passURL = "https://golf-course-finder.p.rapidapi.com/courses?radius="+srchRadius+"&lat="+geoLat+"&lng="+geoLng

const listOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '913df6397fmsh03cd288e42a6810p17e0eejsnef8826802277',
		'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
	}
};

fetch(passURL, listOptions)
	.then(response => response.json())
	.then(function(response)
    {
        console.log(response);
    var tempArry = response.courses;
     //    for (i=0;i<tempArry.length;i++) {
     //          coursesArry.push(tempArry[i])
     //    console.log("fetch",coursesArry);
     //}

    //  return coursesArry;
    var distArray = []; //Array of Objects that only contain the name and the zipcode from the first call
    for(var i = 0; i < tempArry.length; i++) {
        distArray.push({name: tempArry[i].name, zip_code: tempArry[i].zip_code});
    }

    var endResults = []; //This will contain the information of the second fetch call
    for(var i = 0; i < distArray.length; i++) {
        endResults.push(secondUrlFetchCall(distArray[i]));
        var distanceP = document.createElement('p');
        distanceP.textContent = tempArry.courses.distance;

    }
    })
    
const crseOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '913df6397fmsh03cd288e42a6810p17e0eejsnef8826802277',
            'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
        }
    };
    
function secondUrlFetchCall(input) {
    var nameQuery = input.name;
    var zipCodeQuery = input.zip_code;
    fetch('url').then(function(res) {
        return res.json();
    }).then(function(data) {
        return;
    })
}





    
//     fetchURL = 'https://golf-course-finder.p.rapidapi.com/course/details?zip='+zip+'&name='+name;
//     fetch(fetchURL, crseOptions)
//         .then(response => response.json())
//         .then(response => console.log(response))
//         .catch(err => console.error(err));
