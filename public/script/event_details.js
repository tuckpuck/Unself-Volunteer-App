$(document).ready(function() {
  var eventId = window.location.href.split('?')[1];
  var request = $.ajax({
    url: `/event_roles${eventId}`,
    method: "GET",
    contentType: "application/json"
  })
  .done(function(data){
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      console.log(data[i]);
      $('#event_detail_img').attr('src', data[i].photo_url);
      $('#event_detail_name').text(data[i].event_name);
      $('#event_detail_org').text(data[i].organization_name);
      if (data[i].start_date === data[i].end_date) {
        $('#event_detail_date').text(`Date: ${data[i].start_date}`);
      }
      else {
        $('#event_detail_date').text(`Date: ${data[i].start_date} to ${data[i].end_date}`);
      }
      if (data[i].start_time === data[i].end_time) {
        $('#event_detail_time').text(`Time: ${data[i].start_time}`);
      }
      else {
        $('#event_detail_time').text(`Time: ${data[i].start_time} to ${data[i].end_time}`);
      }
      $('#event_detail_description').text(data[i].event_description);
      if (data[i].event_url.includes('www.')){
        $('#event_detail_url').attr('href', data[i].event_url).text('Visit the Website').attr('target','_blank');
      }
      if(data[i].event_role_id !== null){
        var card = $(`<div class="card col-6">
        <div class="card-block">
          <h5>${data[i].name}</h5>
          <p>${data[i].description}</p>
          <button type="button" class="volunteer btn btn-outline-success" data-eventroleid=${data[i].event_role_id} data-userid=${data[0].user_id}>Volunteer</button>
        </div>
        </div>`);
        $('#event_detail_roles').append(card);
      }
    }
    $('.browse-all-events').on('click', function(event){
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
  $('.event-details').on('click', function(event) {
    if (localStorage.getItem('origin') === 'org') {
      window.location.href = 'organization_home.html';
    }
    else {
      window.location.href = 'user_home.html';
    }
  });
});
