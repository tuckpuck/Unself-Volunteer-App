
$( document ).ready(function() {
  function User(first_name, last_name, email, phone, age, photo_url, password){
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.age = age;
    this.photo_url = photo_url;
    this.password = password;
  }

  $('.newvolunteer').on('submit', function(event){

    event.preventDefault();

    var newUser = new User();

    newUser.first_name = $('#first_name').val();
    newUser.last_name = $('#last_name').val();
    newUser.email = $('#email').val();
    newUser.phone = $('#phone').val() || null;
    newUser.age = $('#age').val() || null;
    newUser.photo_url = $('#photo_url').val() || null;
    newUser.password = $('#user_password').val();

    newUser = JSON.stringify(newUser);

    var request = $.ajax({
      url: "/users",
      method: "POST",
      data: newUser,
      contentType: "application/json"
    })
    .done(function(data) {
      localStorage.setItem('name',data.first_name);
      localStorage.setItem('id',data.user_id);
      localStorage.setItem('origin','user');
      window.location.href = "user_home.html";
    })
    .fail(function(jqXHR, textStatus,errorThrown) {
      alert(errorThrown);
    });
  });
});
