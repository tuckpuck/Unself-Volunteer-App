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
        <button type="button" class="volunteer btn btn-outline-success" data-eventroleid=${data[i].event_role_id} data-userid=${data[0].user_id}>Volunteer</button>
      </div>
      </div>`);
      $('#event_detail_roles').append(card);
    }
    $('button').on('click', function(event){
      console.log(event.target);
      var eventRoleId = $(event.target).data('eventroleid');
      var userId = $('.volunteer').data('userid');
      console.log(eventRoleId);
      console.log(userId);
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
      })
      .done(function(data){
        console.log(data);
      });
    });
  })
  .fail(function(){
    console.log('no data');
  });
});
