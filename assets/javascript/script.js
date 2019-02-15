$('#myDropdown').on('change', function () {
    event.preventDefault();
    $("tbody").empty();

    var keyword = $("#myDropdown option:selected").val().split(",");
    var APIKey = "b469f459b0d41338e261cd9c6ad4f7c7";
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=UWntsAG6SrntmMGlFkjQPlufpFdcaO0H&city=" + keyword[0] +"&sort=date,asc";

    $.ajax ({
          url: queryURL,
          method: "GET"
    })
    .done (function(response) {
          var results = response._embedded.events;
          for (var i = 10; i < results.length; i++) {
             
             var eventName = results[i].name;
             var eventURL = results[i].url;
             var eventVenue = {
                name: results[i]._embedded.venues[0].name,
                city: results[i]._embedded.venues[0].city.name,
                state: results[i]._embedded.venues[0].state.stateCode
             }
             var eventDate = {
                date: results[i].dates.start.localDate,
                time: results[i].dates.start.localTime
             }
             var dateConverted = moment(eventDate.date).format('L');
             var timeConverted = moment(eventDate.time, "HH:mm:ss").format('LT');
    
$("#event_results > tbody").append("<tr><td>" + dateConverted + "</td><td>" + timeConverted + "</td><td>" + eventName + 
 "</td><td>" + eventVenue.name + "</td><td><a class='btn btn-primary' target='_blank' href=" + eventURL + "role='button'>Purchase</a></td></tr>");
 var APIKey2 = "c3f6f3e278a66c22e9dba97578ca1b50";
 var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?" + "q="+ keyword +",us&units=imperial&appid=" + APIKey2;
$.ajax({
 url: queryURL2,
 method: "GET",
})
 .then (function(response) {
  var icon = ("<img src='http://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
  
  $("#showWeatherForcast").html('<p><b>' + response.name + "</b></p>"+ " Temperature: "+
  response.main.temp + ' &deg;F'+ "<br>"+ " Wind Speed: " + response.wind.speed + " mph"+"</br>" + response.weather[0].description);
  $('#icon').html( icon );
 });
 $("#InputSearch").val("");
 }                   
}); 
$("#search_button").click(function(){
   event.preventDefault();
 var city =$("#city").val().trim();
});
})