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

  function checkScroll(){
    var startY = $('.navbar').height() * 2; //The point where the navbar changes in px

    if($(window).scrollTop() > startY){
        $('.navbar').addClass("scrolled");
    }else{
        $('.navbar').removeClass("scrolled");
    }
  }

  if($('.navbar').length > 0){
      $(window).on("scroll load resize", function(){
          checkScroll();
      });
  }

});
