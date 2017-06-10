
$( document ).ready(function() {
  function Organization(org_name, org_phone, org_email, org_website, org_description, org_photo_url){
    this.org_name = org_name;
    this.org_phone = org_phone;
    this.org_email = org_email;
    this.org_website = org_website;
    this.org_description = org_description;
    this.org_photo_url = org_photo_url;
  }


  $('.organization').on('submit', function(event){
    event.preventDefault();

    var newOrganization = new Organization();

    newOrganization.org_name = $('#org_name').val();
    newOrganization.org_phone = $('#org_phone').val() || null;
    newOrganization.org_email = $('#org_email').val() || null;
    newOrganization.org_website = $('#org_website').val() || null;
    newOrganization.org_description = $('#org_description').val() || null;
    newOrganization.org_photo_url = $('#org_photo_url').val() || null;

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
