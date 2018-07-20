$(document).ready(function(){
    var disp = document.getElementById("disp-info");
    
    $("#get-location-btn").click(function(){
        getLocation();
    })
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            disp.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    function showPosition(position) {
        let userLat = (position.coords.latitude);
        let userLong = (position.coords.longitude);
        
        console.log(userLat + " " + userLong);
        $.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&APPID=d9865046d7b35cf5a68299a454741a3a`)
        .then(showWeather);    
    }
    function showWeather(data){
        console.log(data);
        console.log(`Weather for your location is: ${data.weather[0].description}`);
        // disp.innerHTML = `Weather for your location is: ${data.weather[0].description}`;
        let img;
        switch (data.weather[0].main) {
            case "Rain":
                console.log("Rain!");
                img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT22R42juDi4Q2pZPAeb-1hSVYo27wn6HjquricAbnuOxhV5_cX"
                break;
            case "Clouds":
                console.log("Clouds!");
                img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQASQIbASOtYSoFfIGhkXvGUu89J3qV87xuWHYOBZa7Cls1oNr9Ww"
                break;
            default:
            console.log("yeeeah I screwed this up!");
        }
        console.log(img);
        $("body").css("background-image", `url("${img}")`);
    }
})