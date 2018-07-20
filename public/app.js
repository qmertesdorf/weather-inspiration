$(document).ready(function(){
    var x = document.getElementById("disp-info");
    
    $("#get-location-btn").click(function(){
        getLocation();
    })
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    function showPosition(position) {
        let userLat = (position.coords.latitude);
        let userLong = (position.coords.longitude);
        
        console.log(userLat + " " + userLong);
        console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&APPID=d9865046d7b35cf5a68299a454741a3a`)
        $.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&APPID=d9865046d7b35cf5a68299a454741a3a`)
        .then(showWeather);    
    }
    function showWeather(data){
        console.log(data);
        console.log(`Weather for your location is: ${data.weather[0].description}`);
        x.innerHTML = `Weather for your location in: ${data.weather[0].description}`;
    }
})