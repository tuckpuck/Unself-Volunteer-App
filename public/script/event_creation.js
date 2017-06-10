$(document).ready(function() {

  $(function() {
    for (let i = 1; i <= 11; i++) {
      $('#start-time').append($('<option></option>').val(i + ':00').html(i + ':00'));
    }
  });
  $(function() {
    for (let i = 1; i <= 11; i++) {
      $('#end-time').append($('<option></option>').val(i + ':00').html(i + ':00'));
    }
  });

  function Event(event_name, description, cause, start_date, end_date, start_time, end_time, street_address, city, zip, photo_url, event_url) {
    this.event_name = event_name;
    this.event_description = description;
    this.cause = cause;
    this.start_date = start_date;
    this.end_date = end_date;
    this.start_time = start_time;
    this.end_time = end_time;
    this.street_address = street_address;
    this.city = city;
    this.zip_code = zip;
    this.photo_url = photo_url;
    this.event_url = event_url;
  }
  $('#organizer-submit').on('click', function(event) {
    event.preventDefault();
    var newEvent = new Event();
    newEvent.event_name = $('#event-name').val();
    newEvent.description = $('#event-description').val();
    newEvent.cause = $('#event-cause').val();
    newEvent.start_date = $('#start-date').val();
    newEvent.end_date = $('#end-date').val();
    newEvent.start_time = $('#start-time').val();
    newEvent.start_ap = $('#ampmStart').val();
    newEvent.end_time = $('#end-time').val();
    newEvent.end_ap = $('#ampmEnd').val();
    newEvent.street_address = $('#street-address').val();
    newEvent.city = $('#city').val();
    newEvent.state = $('#state').val();
    newEvent.zip = $('#zipcode').val();
    newEvent.event_url = $('#event-url').val();
    newEvent.photo_url = $('#photo-url').val();
    newEvent = JSON.stringify(newEvent);

    var request = $.ajax({
        url: "/events",
        method: "POST",
        data: newEvent,
        contentType: "application/json"
      })
      .done(function() {
        alert("Event Created!");
      })
      .fail(function() {
        alert("Please Check That All Fields Are Completed");
      });

  });

});
