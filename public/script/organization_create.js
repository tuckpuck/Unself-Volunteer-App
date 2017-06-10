
$( document ).ready(function() {
  function Organization(name, phone, email, website, description, photo_url){
    this.name = org_name;
    this.phone = org_phone;
    this.email = org_email;
    this.web_url = org_website;
    this.description = org_description;
    this.photo_url = org_photo_url;
  }


  $('.organization').on('submit', function(event){
    event.preventDefault();

    var newOrganization = new Organization();

    newOrganization.name = $('#org_name').val();
    newOrganization.phone = $('#org_phone').val() || null;
    newOrganization.email = $('#org_email').val() || null;
    newOrganization.web_url = $('#org_website').val() || null;
    newOrganization.description = $('#org_description').val() || null;
    newOrganization.photo_url = $('#org_photo_url').val() || null;

    newOrganization = JSON.stringify(newOrganization);

    var request = $.ajax({
      url: "/organizations",
      method: "POST",
      data: newOrganization,
      contentType: "application/json"
    })
    .done(function() {
      alert( "Account Created" );
    })
    .fail(function() {
      alert( "Organization Already Exists" );
    });
  });
});
