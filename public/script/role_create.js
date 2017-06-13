
$( document ).ready(function() {
  function Role(name, description, organization_id){
    this.name = name;
    this.description = description;
    this.organization_id = organization_id;
  }


  $('#role').on('submit', function(event){
    event.preventDefault();

    var newRole = new Role();

    newRole.name = $('#role_name').val();
    newRole.description = $('#role_description').val();
    newRole.organization_id = 1;//$('#organization_id').val();
    console.log(newRole);
    newRole = JSON.stringify(newRole);

    var request = $.ajax({
      url: "/roles",
      method: "POST",
      data: newRole,
      contentType: "application/json"
    })
    .done(function() {
      res.sendStatus(200);
    })
    .fail(function() {
      $('#required').append($(`<div class="alert alert-danger  fade show alert-dismissible" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
      </button>
      Organization Already Exists
      </div>
      `));
      $('.alert alert-danger').alert();
    });
  });
});
