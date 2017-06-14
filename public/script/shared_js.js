$( document ).ready(function() {

  //clear cookie on logout
  $('#logout').on('click', function (event) {
    window.location.href = "logout.html";
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    localStorage.removeItem('origin');
    let request = $.ajax({
      url: "/token",
      method: "DELETE",
      contentType:"application/json"
    });
  });
});
