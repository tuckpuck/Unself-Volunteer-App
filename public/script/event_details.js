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
      var card = $(`<div class="card col-6">
      <div class="card-block">
        <h5>${data[i].name}</h5>
        <p>${data[i].description}</p>
        <button type="button" class="volunteer btn btn-outline-success" data-eventRoleId=${data[i].event_role_id} data-userId=${data[i].user_id}>Volunteer</button>
      </div>
      </div>`);
      $('.row').append(card);
    }
    $('body').on('click', function(event){
      var eventRoleId = $(event.target).closest('.volunteer').data('event_role_id');
      var userId = $(event.target).closest('.volunteer').data('user_id');

      var newUserEventRole = {
        user_id: userId,
        event_role_id: eventRoleId,
      };

      newUserEventRole = JSON.stringify(newUserEventRole);

      $.ajax({
        url: `/user_event_roles`,
        method: "POST",
        data: newUserEventRole,
        contentType: "application/json"
      });
    });
  })
  .fail(function(){
    console.log('something went wrong');
  });
});
