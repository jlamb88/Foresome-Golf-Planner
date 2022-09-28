var weatherTracker = {
    "weatherapi": "ac96e744e22de6b8cf05d8399f7bfdf3",
    fetchtracker: function(){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Atlanta&appid=ac96e744e22de6b8cf05d8399f7bfdf3")
        .then((response) => response.json())
        .then((data) => console.log(data));
    }

    forecastDisplay: function (data) {
        var { name } = data;
        var { speed } = data.wind;
        var { description, icon } = data.weather;
        var { humidity, temp } = data.main;
        console.log(name, temp, description, icon, humidity, speed);
    
    },
 
 
}