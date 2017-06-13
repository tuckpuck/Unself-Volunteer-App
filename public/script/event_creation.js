$(document).ready(function() {

  $(function() {
    for (let i = 1; i <= 11; i++) {
      $('.start-time').append($('<option></option>').val(i + ':00').html(i + ':00'));
      if (i % 2 === 0 || i % 1 === 0) {
        $('.start-time').append($('<option></option>').val(i + ':30').html(i + ':30'));
      }
    }
  });
  $(function() {
    for (let i = 1; i <= 11; i++) {
      $('.end-time').append($('<option></option>').val(i + ':00').html(i + ':00'));
      if (i % 2 === 0 || i % 1 === 0) {
        $('.end-time').append($('<option></option>').val(i + ':30').html(i + ':30'));
      }
    }
  });

  $('.event').on('submit', function(event) {
    event.preventDefault();
    var newEvent = {
      name: $('#event-name').val(),
      description: $('#event-description').val(),
      //cause: $('#event-cause').val(),
      start_date: $('#start-date').val(),
      end_date: $('#end-date').val(),
      start_time: $('#start-time').val() + $('#ampmStart').val(),
      end_time: $('#end-time').val() + $('#ampmEnd').val(),
      street_address: $('#street-address').val(),
      //city: $('#city').val(),
      zip_code: $('#zipcode').val(),
      photo_url: $('#event-url').val(),
      event_url: $('#photo-url').val()
    };

    newEvent = JSON.stringify(newEvent);

    var request = $.ajax({
        url: "/events",
        method: "POST",
        data: newEvent,
        contentType: "application/json"
      })
      .done(function() {
        alert("Event Created");
        window.location.href = "event_roles.html";
      })
      .fail(function() {
        alert("Please Check That All Fields Are Completed");
      });
  });

});
