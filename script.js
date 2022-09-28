var srchRadius = 10;
var geoLat = 33.749;
var geoLng = -84.38798;
var passURL = "https://golf-course-finder.p.rapidapi.com/courses?radius="+srchRadius+"&lat="+geoLat+"&lng="+geoLng

// const courses = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": passURL,
// 	"method": "GET",
// 	"headers": {
// 		"X-RapidAPI-Key": "913df6397fmsh03cd288e42a6810p17e0eejsnef8826802277",
// 		"X-RapidAPI-Host": "golf-course-finder.p.rapidapi.com"
// 	}
// };

// $.ajax(courses).done(function (response) {
// 	console.log(response);
// });

// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://golf-course-finder.p.rapidapi.com/courses?radius=10&lat=36.56910381018662&lng=-121.95035631683683",
// 	"method": "GET",
// 	"headers": {
// 		"X-RapidAPI-Key": "913df6397fmsh03cd288e42a6810p17e0eejsnef8826802277",
// 		"X-RapidAPI-Host": "golf-course-finder.p.rapidapi.com"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });
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
    {console.log(response);
    courses = Array.from(response.courses);
    console.log(courses);
        return courses})
    
    
const crseOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '913df6397fmsh03cd288e42a6810p17e0eejsnef8826802277',
            'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
        }
    };
    
    for (i=0;i<courses.length;i++) {
    courseNm = courses[i].name;
    zip = courses[i].zip_code;
    console.log(courseNm, zip)





    
//     fetchURL = 'https://golf-course-finder.p.rapidapi.com/course/details?zip='+zip+'&name='+name;
//     fetch(fetchURL, crseOptions)
//         .then(response => response.json())
//         .then(response => console.log(response))
//         .catch(err => console.error(err));
}