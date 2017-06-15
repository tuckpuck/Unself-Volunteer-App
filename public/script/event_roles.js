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

  (function getRoles() {
    $.ajax({
      url: "/roles",
      method: "get",
      contentType: "application/json"
    })
    .done(function(data){
      for (var i = 0; i < data.length; i++) {
        $('.select-roles').append($(`<option value="${data[i].id}"></option>`).html(data[i].name));
      }
    })
    .fail(function() {
      console.log("No Roles Found!");
    });
  })();

  function EventRole (start_date, end_date, start_time, end_time, number_needed, role_id){
    this.start_date = start_date;
    this.end_date = end_date;
    this.start_time = start_time;
    this.end_time = end_time;
    this.number_needed = number_needed;
  }

  $('#add-role').on('submit', function(event) {
    event.preventDefault();
    var eventRole = new EventRole();

    eventRole.start_date = $('#s-date').val();
    eventRole.end_date = $('#e-date').val();
    eventRole.start_time = $('#s-time').val() + $('#ampmStart').val();
    eventRole.end_time = $('#e-time').val() + $('#ampmEnd').val();
    eventRole.number_needed = $('#number_needed').val();
    eventRole.role_id = $('.select-roles').val();


    eventRole = JSON.stringify(eventRole);


    var request = $.ajax({
        url: "/event_roles",
        method: "POST",
        data: eventRole,
        contentType: "application/json"
      })
      .done(function() {
        var currentRole = $('<li class="list-group-item"></li>').html(` ${$('.select-roles option:selected').html()} (Volunteers Needed: ${$('#number_needed').val()})`);

        $('#roleTable').append(currentRole);
        $('.modal').modal('hide');
        $('form').find("input[type=text], textarea").val("");
        $('form').find("input[type=number], textarea").val("");
        $('form').find("select").val(0);
      })
      .fail(function() {
        console.log("Please Check That All Fields Are Completed");
      });

  });
});
