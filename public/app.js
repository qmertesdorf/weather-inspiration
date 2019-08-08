$(document).ready(function() {
  var disp = document.getElementById("disp-info");

  $("#get-location-btn").click(function() {
    getLocation();
  });
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      disp.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  function showPosition(position) {
    let userLat = position.coords.latitude;
    let userLong = position.coords.longitude;

    $.getJSON(
      `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLong}&APPID=d9865046d7b35cf5a68299a454741a3a`
    ).then(showWeather);
  }
  function showWeather(data) {
    const weatherType = data.weather[0].main
    const img = determineWeatherImageFromType(weatherType)
    $("body").css("background-image", `url("${img}")`);
    $(disp).css("font-size", "70px");
    disp.innerHTML = `Weather for ${
      data.name
    } is: ${data.weather[0].main.toLowerCase()}`;
  }
});

function determineWeatherImageFromType(type) {
  switch (type) {
    case "Rain":
      return "http://www.desktopanimated.com/wp-content/uploads/2013/12/Rain_1.jpg";
    case "Clouds":
      return "https://pics.freeartbackgrounds.com/midle/Blue_Cloudy_Sky_Background-1074.jpg";
    case "Thunderstorm":
      return "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/WevYznP/videoblocks-4k-of-spectacular-sky-with-thunderstorms-and-lightnings-in-the-night-storm-clouds-powerful-and-several-lightning-strikes-with-flashes-and-lights-in-thunderstorm-background-of-electrical-storm-dan_hsedo0vgbz_thumbnail-full04.png";
    case "Drizzle":
      return "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/D8qa-2E/moddy-wet-weather-background-raining-city-scenery-sad-rain-drops_hzwjel7r__F0000.png";
    case "Clear":
      return "https://wallpapertag.com/wallpaper/full/2/c/d/308641-blue-sky-background-1920x1080-for-android.jpg";
    case "Snow":
      return "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/Y2S3rB2/abstract-winter-snowing-background-flake_ny9utacgx__F0000.png";
    case "Atmosphere":
      return "https://wallpapertag.com/wallpaper/full/2/c/d/308641-blue-sky-background-1920x1080-for-android.jpg";
    case "Haze":
      return "https://i.ytimg.com/vi/Gec6XaH1VnY/maxresdefault.jpg";
    default:
      console.log("Unknown weather type!");
  }
}
