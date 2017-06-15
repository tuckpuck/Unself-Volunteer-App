$( document ).ready(function() {

  //clear cookie on logout
  $('#logout').on('click', function (event) {
    window.location.href = "logout.html";
    localStorage.clear();
    let request = $.ajax({
      url: "/token",
      method: "DELETE",
      contentType:"application/json"
    });
  });
});
