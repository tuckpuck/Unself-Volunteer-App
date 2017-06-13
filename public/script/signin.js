$(document).ready(function() {
  function Auth(email, password) {
    this.email = email;
    this.password = password;
  }

  $('.form-signin').on('submit', function(event) {

    event.preventDefault();

    var newAuth = new Auth();
    newAuth.email = $('#inputEmail').val();
    newAuth.password = $('#inputPassword').val();

    newAuth = JSON.stringify(newAuth);

    var request = $.ajax({
        url: "/token",
        method: "POST",
        data: newAuth,
        contentType: "application/json"
      })

      .done(function(data) {
        if (data.user_id === null) {
          window.location.href = "organization_home.html";
        } else {
          window.location.href = "user_home.html";
        }
      })
      .fail(function() {
        $('.container-fluid').append($(`<div class="alert alert-warning alert-dismissible fade show col-6 offset-3" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        Bad email or password
        </div>
        `));
        $('.alert alert-warning').alert();
      });
  });

});
