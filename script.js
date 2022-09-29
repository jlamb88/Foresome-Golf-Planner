var weatherTracker = {
    "weatherapi": "ac96e744e22de6b8cf05d8399f7bfdf3",
    fetchtracker: function(){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=+city+&metric=imerial&appid=ac96e744e22de6b8cf05d8399f7bfdf3")
        .then((response) => response.json())
        .then((data) => this.forecastDisplay(data));
    },

    display: function (data) {
        var { name } = data;
        var { speed } = data.wind;
        var { description, icon } = data.weather[0];
        var { humidity, temp } = data.main;
        console.log(name, temp, description, icon, humidity, speed);
        
    }
 
 
}