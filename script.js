$(document).ready(function() {
  var x;
  var y;
  var unit = 1;
  var temp;
  var main;
  
        /* Obtaining Json object */

  navigator.geolocation.getCurrentPosition(function(position) {
    do_something(position.coords.latitude, position.coords.longitude);
  });

  function do_something(x, y) {
    var weatherVal = new XMLHttpRequest();
    weatherVal.open(
      "GET",
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        x +
        "&lon=" +
        y +
        "&units=metric&appid=0db047cf6286052f22a78852cefa60d6"
    );

    weatherVal.onload = function() {
      var print = JSON.parse(weatherVal.responseText);
      temp = Math.round(print.main.temp);
      htmlRender(print);
    };
    weatherVal.send();
  }
  
      /* Change HTML values */

  function htmlRender(weatherObj) {
    $(".city").html(weatherObj.name);
    $(".temp").html(Math.round(weatherObj.main.temp));
    $(".main").html(weatherObj.weather[0].main);
    
    /* Wallpaper Change */
    
    switch (weatherObj.weather[0].main) {
      case "Rain":
        $(".wallpaper").attr(
          "src",
          "https://i.pinimg.com/736x/d7/f9/0d/d7f90d83ca7bda55d77b1a40f0b51537--wallpapers-ipad-iphone--wallpaper.jpg"
        );
        break;
      case "Snow":
        $(".wallpaper").attr(
          "src",
          "http://papers.co/wallpaper/papers.co-me25-snow-mountain-lovers-nature-4-wallpaper.jpg"
        );
        break;
      case "Drizzle": $(".wallpaper").attr(
          "src", "http://iphonewalls.net/wp-content/uploads/2013/09/Cat%20Against%20Wet%20Window%20iPhone%205%20Wallpaper.jpg"
        );
        break;
      case "Clouds": $(".wallpaper").attr(
          "src", "https://i.pinimg.com/originals/2e/c6/b5/2ec6b5e14fe0cba0cb0aa5d2caeeccc6.jpg")
        break;
      case "Clear":
        $(".wallpaper").attr(
          "src",
          "https://i.pinimg.com/originals/94/b7/92/94b792c00769a8c4c8c4f4cc65ca9951.png")
         $(".main").css("top","190px");
        
    }
  }
 

  
/* Celsius Fahreneit Converter */
  $(".convButton").on("click", function() {
    if (unit == 1) {
      temp = (temp * 9 / 5) + 32;
      $(".temp").html(Math.round(temp));
      $(".convButton").html("&#8457;");
      unit = 2;
    } else {
      temp = (temp-32)*5/9;
      $(".temp").html(Math.round(temp));
      $(".convButton").html("&#8451;");
      unit = 1;
    }
  });
});

$(".convButton").hover(function () {
  $(".convButton").css("color","red")
}, 
function () {
  $(".convButton").css("color","white")
});
