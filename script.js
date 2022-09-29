
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

var coursesArry = [];
fetch(passURL, listOptions)
	.then(response => response.json())
	.then(function(response)
    {console.log(response);
    tempArry = Array.from(response.courses);
    coursesArry = [];
    for (i=0;i<tempArry.length;i++) {
            coursesArry[i].push(tempArry[i])
        console.log("fetch",coursesArry);}
        return coursesArry;
    })

    console.log("Return",coursesArry)
    
const crseOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '913df6397fmsh03cd288e42a6810p17e0eejsnef8826802277',
            'X-RapidAPI-Host': 'golf-course-finder.p.rapidapi.com'
        }
    };
    
    





    
//     fetchURL = 'https://golf-course-finder.p.rapidapi.com/course/details?zip='+zip+'&name='+name;
//     fetch(fetchURL, crseOptions)
//         .then(response => response.json())
//         .then(response => console.log(response))
//         .catch(err => console.error(err));
