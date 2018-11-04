$(document).ready(function () {
    var locationLat, locationLong;
    navigator.geolocation.getCurrentPosition(function(position) {
      locationLat = position.coords.latitude;
      locationLong = position.coords.longitude;
      
      $("#LocationCoords").html("Latitude: " + locationLat + "<br>Longitude: " + locationLong);
      
      var weatherAPIAddress = 'https://api.darksky.net/forecast/777e46ee369d959ee0fd3572f56f08db/'+ locationLat+','+locationLong+'?callback=?';
      
      $.getJSON(weatherAPIAddress, function(data) {
        var tempCel, tempFahr = data.currently.temperature;
        tempCel = Math.round((tempFahr-32)/9*5, -2) + ' °C';
        tempFahr = Math.round(tempFahr) + ' °F';
        
        var tzone = data.timezone;
        var weatherImg = data.minutely.icon;
        var weatherSummary = data.minutely.summary;
        var windSpeed = data.currently.windSpeed + ' MPH';
        
        $("#location").html(tzone);
        $("#windSpeed").html(windSpeed);
        $("#weather").html(weatherSummary);
        $("#currentTemp").html(tempFahr);
        
        $("#tempCel").on('click', function() {
          $("#currentTemp").html(tempCel);
        });
        
        $("#tempFahr").on('click', function() {
          $("#currentTemp").html(tempFahr);
        });
        
            switch(weatherImg) {
           case 'rain':
                   $("#icon").prepend('<img src="https://image.flaticon.com/icons/svg/131/131041.svg" />');
             break;
           case 'clear-day':
               $("#icon").prepend('<img src="https://image.flaticon.com/icons/svg/463/463038.svg" />');
             break;
           case 'wind':
               $("#icon").prepend('<img src="https://image.flaticon.com/icons/svg/463/463062.svg" />');
             break;
               default:
               $("#icon").prepend('<img src="https://image.flaticon.com/icons/svg/149/149209.svg" />');
                           }
      }); //API request
    }); //Geolocation
   }); //document ready
   