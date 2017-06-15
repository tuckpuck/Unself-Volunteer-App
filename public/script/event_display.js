$(document).ready(function() {

  let name = localStorage.getItem('name');
  $('#welcome').text('Hello, ' + name + '!');

  $('.browse-all-events').on('click', function(event){
      getData(true);
  });

  getData(false);



function getData(getAllEvents){
    var origin = localStorage.getItem('origin');
    var url = "/events";

    if(getAllEvents !== true)
    {
      url = url + "/" + origin;
    }

    var request = $.ajax({
      url: url,
      method: "GET",
      contentType: "application/json"
    })
    .done(function(data) {
      for (let i = 0; i < data.length; i++){
        var eventData = data[i];
        var newEvent = {
          id: eventData.id,
          name: eventData.name,
          description: eventData.event_description,
          //cause: eventData.cause,
          start_date: eventData.start_date,
          end_date: eventData.end_date,
          start_time: eventData.start_time,
          end_time: eventData.end_time,
          street_address: eventData.street_address,
          // city: eventData.city,
          zip: eventData.zip_code,
          photo_url: eventData.photo_url,
          event_url: eventData.event_url
        };
        populateCard(newEvent);
      }
      if(data.length > 0){
        $("#no_events").css("display", "none");
      }
      else{
        $("#no_events").css("display", "block");
      }

    })
    .fail(function() {
      $("#no_events").css("display", "block");
      console.log("Failed to get events");
    });
  }

  function populateCard(eventObj) {
    let $el = $(`<div class="card events-dynamic" data-eventid="${eventObj.id}">` + '<div class="text-center">'  + '<a class="eventpic"><img class="eventimg card-img-top" src="" alt="Volunteer Event Picture"></a>' + '</div>' + '<div class="card-block">' + '<p class="eventname text-center"></p></a>' +
    '<p class="eventdescription text-center"></p>' + '<p class="eventdate card-text"></p>' + '<p class="eventtime card-text"></p>' + '<p class="streetaddress card-text inline-block"></p>' + '<p class="eventcity card-text inline-block"></p>' + '</div>' + '</div>');

// This top one is the one to change to our event page
    $el.find(".eventlink").attr("href", eventObj.event_url);

    if (eventObj.photo_url === "") {
      $el.find(".eventimg").attr("src", "img/happyvolunteers.jpg");
      // $el.find(".eventpic").attr("href", "img/happyvolunteers.jpg");
    } else {
      $el.find(".eventimg").attr("src", eventObj.photo_url);
      // $el.find(".eventpic").attr("href", eventObj.photo_url);
    }

    $el.find(".eventname").text(eventObj.name);
    if (eventObj.start_date === eventObj.end_date) {
      $el.find(".eventdescription").text(eventObj.description);
    $el.find(".eventdate").text("Date: " + eventObj.start_date);
    } else {
    $el.find(".eventdate").text("Date: " + eventObj.start_date + " to " + eventObj.end_date);
  }
    if (eventObj.start_time === eventObj.end_time) {
    $el.find(".eventtime").text("Time: " + eventObj.start_time);
    } else {
    $el.find(".eventtime").text("Time: " + eventObj.start_time + " to " + eventObj.end_time);
  }
  if (eventObj.street_address !== undefined) {
    $el.find(".streetaddress").text("Location: " + eventObj.street_address);
  } else {
    $el.find(".streetaddress").text("");
  }
  if (eventObj.city_id !== undefined) {
    $el.find(".eventcity").text(", " + eventObj.city_id);
  } else {
    $el.find(".eventcity").text("");
  }
  $el.find(".eventwebsite").attr("href", eventObj.event_url);
      $('#append').append($el);
  }

  $('#append').on('click', function(event){
    var eventId = $(event.target).closest('.card').data('eventid');
    window.location.href = `event_details.html?${eventId}`;
  });

});
