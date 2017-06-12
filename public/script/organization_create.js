
$( document ).ready(function() {
  function Organization(name, phone, email, website, description, photo_url,password){
    this.name = org_name;
    this.phone = org_phone;
    this.email = org_email;
    this.web_url = org_website;
    this.description = org_description;
    this.photo_url = org_photo_url;
    this.password = password;
  }


  $('.organization').on('submit', function(event){
    event.preventDefault();

    var newOrg = new Organization();

    newOrg.name = $('#org_name').val();
    newOrg.phone = $('#org_phone').val() || null;
    newOrg.email = $('#org_email').val() || null;
    newOrg.web_url = $('#org_website').val() || null;
    newOrg.description = $('#org_description').val() || null;
    newOrg.photo_url = $('#org_photo_url').val() || null;
    newOrg.password = $('#org_password').val();

    newOrg = JSON.stringify(newOrg);

    var request = $.ajax({
      url: "/organizations",
      method: "POST",
      data: newOrg,
      contentType: "application/json"
    })
    .done(function() {
      alert( "Account Created" );
      window.location.href = "organization_home.html";
    })
    .fail(function() {
      alert( "Organization Already Exists" );
    });
  });
});
