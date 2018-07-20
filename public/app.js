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
                img = "http://www.desktopanimated.com/wp-content/uploads/2013/12/Rain_1.jpg";
                break;
            case "Clouds":
                img = "https://pics.freeartbackgrounds.com/midle/Blue_Cloudy_Sky_Background-1074.jpg";
                break;
            case "Thunderstorm":
                img = "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/WevYznP/videoblocks-4k-of-spectacular-sky-with-thunderstorms-and-lightnings-in-the-night-storm-clouds-powerful-and-several-lightning-strikes-with-flashes-and-lights-in-thunderstorm-background-of-electrical-storm-dan_hsedo0vgbz_thumbnail-full04.png";
                break;
            case "Drizzle":
                img = "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/D8qa-2E/moddy-wet-weather-background-raining-city-scenery-sad-rain-drops_hzwjel7r__F0000.png";
                break;
            case "Clear":
                img = "https://wallpapertag.com/wallpaper/full/2/c/d/308641-blue-sky-background-1920x1080-for-android.jpg";
                break;
            case "Snow":
                img = "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/Y2S3rB2/abstract-winter-snowing-background-flake_ny9utacgx__F0000.png";
                break;
            case "Atmosphere":
                img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQASQIbASOtYSoFfIGhkXvGUu89J3qV87xuWHYOBZa7Cls1oNr9Ww";
                break;
            default:
            console.log("yeeeah I screwed this up!");
        }
        console.log(img);
        $("body").css("background-image", `url("${img}")`);
        $(disp).css("font-size", "70px");
        disp.innerHTML = `Enjoy the ${(data.weather[0].main).toLowerCase()} in ${data.name}!`;
    }
})