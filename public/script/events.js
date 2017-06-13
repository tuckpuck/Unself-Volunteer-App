$(document).ready(function() {

  function Event(event_name, description, cause, start_date, end_date, start_time, end_time, street_address, city, zip, photo_url, event_url, organization_id) {
    this.name = event_name;
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
    this.organization_id = organization_id;
  }

  var request = $.ajax({
    url: "/events",
    method: "GET",
    contentType: "application/json"
  })
  .done(function(data) {
    for (let i = 0; i < data.length; i++){
      var eventData = data[i];
      var getEvent = new Event(
        eventData.name,
        eventData.event_description,
        eventData.cause,
        eventData.start_date,
        eventData.end_date,
        eventData.start_time,
        eventData.end_time,
        eventData.street_address,
        eventData.city,
        eventData.zip_code,
        eventData.photo_url,
        eventData.event_url
      );
      populateCard(getEvent);
    }

  })
  .fail(function() {
    alert("Failed to get events");
  });

});
