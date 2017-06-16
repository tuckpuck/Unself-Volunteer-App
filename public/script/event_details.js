$(document).ready(function() {
  var eventId = window.location.href.split('?')[1];
  var userId = localStorage.getItem('id');
  var origin = localStorage.getItem('origin');
  var request = $.ajax({
      url: `/event_roles${eventId}`,
      method: "GET",
      contentType: "application/json"
  })
  .done(function(data) {
    var request2 = $.ajax({
        url: `/user_event_roles${eventId}`,
        method: "GET",
        contentType: "application/json"
    })
    .done(function(userData) {
      console.log('user roles', userData);

      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
          $('#event_detail_img').attr('style', `background-image: url(${data[i].photo_url})`);
        $('#event_detail_name').text(data[i].event_name);
        $('#event_detail_org').text(data[i].organization_name);
        if (data[i].start_date === data[i].end_date) {
          $('#event_detail_date').text(data[i].start_date);
        } else {
          $('#event_detail_date').text(` ${data[i].start_date} to ${data[i].end_date}`);
        }
        if (data[i].start_time === data[i].end_time) {
          $('#event_detail_time').text(data[i].start_time);
        } else {
          $('#event_detail_time').text(` ${data[i].start_time} to ${data[i].end_time}`);
        }
        $('#event_detail_description').text(data[i].event_description);
        if (data[i].event_url.includes('www.')) {
          $('#event_detail_url').attr('href', data[i].event_url).text('Visit the Website').attr('target', '_blank');
        }
        if (data[i].event_role_id !== null) {
          var buttonText = 'Volunteer';
          var buttonClass = "volunteer btn btn-outline-success";
          for(let j = 0; j < userData.length; j++){
             if(userData[j].event_role_id === data[i].event_role_id){
               buttonText = 'Remove Me';
               buttonClass = "volunteer btn btn-outline-danger";
               break;
             }
          }

          var card = $(`<div class="card col-md-5 col-sm-12">
        <div class="card-block ">
          <h4>${data[i].name}</h4>
          <h6>${data[i].role_start_date} to ${data[i].role_end_date}</h6>
          <h6>${data[i].role_start_time} to ${data[i].role_end_time}</h6>
          <h6>Volunteers ${data[i].number_volunteers} / ${data[i].number_needed}</h6>
          <p>${data[i].description}</p>
          <button type="button" class="${buttonClass}"  data-eventroleid=${data[i].event_role_id} data-userid=${userId}>${buttonText}</button>
        </div>
        </div>`);
          $('#event_detail_roles').append(card);

          if (localStorage.getItem('origin') === 'org') {
            $('.volunteer').hide();
          }
          else {
            $('.volunteer').show();
          }
        }
      }
      $('.volunteer').on('click', function(event){
        var $buttonClicked = $(event.target);
        var eventRoleId = $(event.target).data('eventroleid');
        var userId = $('.volunteer').data('userid');
        var newUserEventRole = {
          user_id: userId,
          event_role_id: eventRoleId,
        };

        newUserEventRole = JSON.stringify(newUserEventRole);
        var reqMethod = 'POST';
        if($buttonClicked.text() === 'Remove Me'){
          reqMethod = 'DELETE';
        }
        $.ajax({
          url: `/user_event_roles`,
          method: reqMethod,
          data: newUserEventRole,
          contentType: "application/json"
        })
        .done(function(data) {
          $buttonClicked.toggleClass('btn-outline-success');
          $buttonClicked.toggleClass('btn-outline-danger');
          if($buttonClicked.text() === 'Volunteer'){
            $buttonClicked.text('Remove Me');
          }
          else{
            $buttonClicked.text('Volunteer');
          }

          location.reload();
        })
        .fail(function() {
          console.log('no data');
        });
      });
    });
  });

  $('.event-details').on('click', function(event) {
    if (localStorage.getItem('origin') === 'org') {
      window.location.href = 'organization_home.html';
    } else {
      window.location.href = 'user_home.html';
    }
  });

  $('#done').on('click', function(){
    var origin = localStorage.getItem('origin');
    var allEvents = localStorage.getItem('all_events');

    if(allEvents === 'true'){
      window.location.href = 'browse_events.html';
    }
    else{
      if(origin === 'user')
        window.location.href = 'user_home.html';
      else
        window.location.href = 'organization_home.html';
    }
  });
});
