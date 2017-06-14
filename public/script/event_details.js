$(document).ready(function() {
  var eventId = window.location.href.split('?')[1];
  var request = $.ajax({
    url: `/event_roles${eventId}`,
    method: "GET",
    contentType: "application/json"
  })
  .done(function(data){
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      var card = $(`<div class="card">
      <div class="card-block">
        <h5>${data[i].name}</h5>
        <p>${data[i].description}</p>
        <button type="button" class="btn btn-outline-success">Volunteer</button>
      </div>
      </div>`);
      $('body').append(card);
    }
  })
  .fail(function(){
    console.log('something went wrong');
  });
});
