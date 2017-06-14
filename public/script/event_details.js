$(document).ready(function() {
  var eventId = window.location.href.split('?')[1];
  console.log(eventId);
  var request = $.ajax({
    url: `/event_roles${eventId}`,
    method: "GET",
    contentType: "application/json"
  })
  .done(function(data){
    console.log(data);
  })
  .fail(function(){
    console.log('something went wrong');
  });
});
