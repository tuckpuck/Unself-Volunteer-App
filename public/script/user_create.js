
$( document ).ready(function() {
  function User(first_name, last_name, email, phone, age, photo_url){
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.age = age;
    this.photo_url = photo_url;
  }


  $('.volunteer').on('submit', function(event){
    event.preventDefault();

    var newUser = new User();

    newUser.first_name = $('#first_name').val();
    newUser.last_name = $('#last_name').val();
    newUser.email = $('#email').val();
    newUser.phone = $('#phone').val() || null;
    newUser.age = $('#age').val() || null;
    newUser.photo_url = $('#photo_url').val() || null;

    newUser = JSON.stringify(newUser);

    var request = $.ajax({
      url: "/users",
      method: "POST",
      data: newUser,
      contentType: "application/json"
    })
    .done(function() {
      alert( "Account Created" );
      window.location.href = "user_home.html";
    })
    .fail(function() {
      alert( "Email Already Exists" );
    });

  });
});
