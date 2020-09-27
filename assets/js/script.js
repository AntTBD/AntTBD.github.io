window.addEventListener("load", function() {
  document.querySelector("body").classList.add("loaded");
  setTimeout(function() {
    startAnimation();
  }, 1000);

  // hide all projects cards for apparition
  if ($('#diplomas-content')) {
    $('#diplomas-content').find(".card").each(function(i) {
      $(this).hide();
    });
  }
  // hide all projects cards for apparition
  if ($('#projects-content')) {
    $('#projects-content').find(".card").each(function(i) {
      $(this).hide();
    });
  }
  // hide all experiences cards for apparition
  if ($('.timeline')) {
    $('.timeline').hide();
  }


});


function animBar(elem) {
  if (elem) {
    var sizemax = (100 * parseFloat(elem.css('width')) / parseFloat(elem.parent().css('width'))) + '%'; // permet de garder en pourcentages//elem.css("width");
    elem.hide();
    elem.css("width", 0);
    setTimeout(function() {
      elem.show();
      elem.css("width", sizemax);
      //elem.animate({width:sizemax},1000);
    }, 700);
  }
}


// get all params of url
var parseQueryString = function() {

  var str = window.location.search;
  var objURL = {};

  str.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function($0, $1, $2, $3) {
      objURL[$1] = $3;
    }
  );
  return objURL;
};

//save it in var:
var URLparams = parseQueryString();
var langue;

// switch language
if (URLparams["lang"] === 'en') {
  langue = "en";
  $(".en").show();
  $(".fr").hide();
  $(".tooltip .tooltip-inner .en").show();
  $(".tooltip .tooltip-inner .fr").hide();
} else {
  langue = "fr";
  $(".fr").show();
  $(".en").hide();
  $(".tooltip .tooltip-inner .fr").show();
  $(".tooltip .tooltip-inner .en").show();
}




// add param
function insertParam(key, value) {
  key = encodeURIComponent(key);
  value = encodeURIComponent(value);

  var s = document.location.search;
  var kvp = key + "=" + value;

  var r = new RegExp("(&|\\?)" + key + "=[^\&]*");

  s = s.replace(r, "$1" + kvp);

  if (!RegExp.$1) {
    s += (s.length > 0 ? '&' : '?') + kvp;
  }

  //alert(s);

  //again, do what you will here
  document.location.search = s;
}


function startAnimation() {




  //animations progress bar
  if ($('#diplomas-content')) {
    $("#diplomas-content").find(".card").each(function(i) {
      //$(this).hide();
      let delay = (i) * 250;
      let elem = $(this);
      setTimeout(function() {
        //elem.css('opacity', '1.0');
        //elem.css('height', '100%');
        //elem.show("slow");
        elem.fadeIn();
        animBar(elem.find(".progress-bar"));
      }, delay);
    });
  }

  if ($('.timeline')) {

    $('.timeline').show();
    // appartion des card de la timeline
    $('.timeline').find(".card").each(function(i) {
      $(this).addClass("animate");
      if ($(this).hasClass("left")) {
        $(this).addClass("fadeInLeft");
      } else if ($(this).hasClass("right")) {
        $(this).addClass("fadeInRight");
      }
    });
    // apparition des points sur la timeline
    $('.timeline').find(".timeline-point").each(function(i) {
      $(this).addClass("animate fadeIn");

    });
  }


  if ($('#projects-content')) {
    // start animation of project card
    $('#projects-content').find(".card").each(function(i) {
      //$(this).hide();
      let delay = (i) * 500;
      let elem = $(this);
      setTimeout(function() {
        //elem.css('opacity', '1.0');
        //elem.css('height', '100%');
        //elem.show("slow");
        elem.fadeIn();
      }, delay);
    });
  }



}


$(document).ready(function() {


  //change all url of navbar with language settings
  $('#navbar a:not(.choix-lang)').each(function() {

    var oldUrl = $(this).attr("href"); // Get current url
    var newUrl;
    if (URLparams["lang"] === 'en') {
      newUrl = oldUrl.split("?")[0] + "?lang=en"; // Create new url
    } else {
      newUrl = oldUrl + "?lang=fr"; // Create new url
    }

    $(this).attr("href", newUrl); // Set herf value

  });

  if ($('#btn-arrow-down')) {
    // button with scroll down animation for home page
    $('#btn-arrow-down').click(function() {
      var target = $(this.hash);
      if (target.length) {
        $("html, body").animate({
            scrollTop: target.offset().top
          },
          2000
        );
      }
    });
  }
  // scroll down animation for all href with #
  /*$('a[href*="#"]:not([href="#"])').click(function() {
      var target = $(this.hash);
      if (target.length) {
          $("html, body").animate(
              {
                  scrollTop: target.offset().top
              },
              2000
          );
      }
  });*/



  if ($('#diplomas-show')) {
    $("#diplomas-show").click(function(event) {
      if ($("#diplomas-show").html() === '<i class="fas fa-minus-square"></i>') {
        $("#diplomas-show").html('<i class="fas fa-plus-square"></i>');
        // $("#projects-content").slideUp("slow");
        let nbrCard = $('#diplomas-content').find(".card").length;
        $('#diplomas-content').find(".card").each(function(i) {
          let delay = (nbrCard - i) * 200;
          let elem = $(this);
          setTimeout(function() {
            elem.fadeOut();
          }, delay);
        });
      } else {
        $("#diplomas-show").html('<i class="fas fa-minus-square"></i>');
        //$("#projects-content").show("slow");
        $('#diplomas-content').find(".card").each(function(i) {
          let delay = (i) * 200;
          let elem = $(this);
          setTimeout(function() {
            //elem.css('height', '100%');
            elem.fadeIn();
            animBar(elem.find(".progress-bar"));
          }, delay);
        });
      }
    });
  }

  if ($('#work-show')) {
    $("#work-show").click(function(event) {
      if ($("#work-show").html() === '<i class="fas fa-minus-square"></i>') {
        $("#work-show").html('<i class="fas fa-plus-square"></i>');
        $("#work-content").fadeOut();
      } else {
        $("#work-show").html('<i class="fas fa-minus-square"></i>');
        $("#work-content").fadeIn();
      }
    });
  }

  if ($('#projects-show')) {
    $("#projects-show").click(function(event) {
      if ($("#projects-show").html() === '<i class="fas fa-minus-square"></i>') {
        $("#projects-show").html('<i class="fas fa-plus-square"></i>');
        // $("#projects-content").slideUp("slow");
        let nbrCard = $('#projects-content').find(".card").length;
        $('#projects-content').find(".card").each(function(i) {
          let delay = (nbrCard - i) * 500;
          let elem = $(this);
          setTimeout(function() {
            elem.fadeOut();
          }, delay);
        });
      } else {
        $("#projects-show").html('<i class="fas fa-minus-square"></i>');
        //$("#projects-content").show("slow");
        $('#projects-content').find(".card").each(function(i) {
          let delay = (i) * 500;
          let elem = $(this);
          setTimeout(function() {
            //elem.css('height', '100%');
            elem.fadeIn();
          }, delay);
        });
      }
    });
  }

  // Hide or Show sections
  if ($('#CV-pdf-show')) {
    $("#CV-pdf-show").click(function(event) {
      if ($("#CV-pdf-show").html() === '<i class="fas fa-minus-square"></i>') {
        $("#CV-pdf-show").html('<i class="fas fa-plus-square"></i>');
        $("#CV-pdf-content").fadeOut();
      } else {
        $("#CV-pdf-show").html('<i class="fas fa-minus-square"></i>');
        $("#CV-pdf-content").fadeIn();
      }
    });
  }

  // if ($('#skill-show')) {
  //   $("#skill-show").click(function(event) {
  //     if ($("#skill-show").html() === '<i class="fas fa-minus-square"></i>') {
  //       $("#skill-show").html('<i class="fas fa-plus-square"></i>');
  //       $("#skill-content").hide();
  //     } else {
  //       $("#skill-show").html('<i class="fas fa-minus-square"></i>');
  //       $("#skill-content").show();
  //     }
  //   });
  // }



});

$(function() {
  if ($('.loaded .page-header nav .navbar-collapse').css('opacity') === 1)
    $('.loaded .page-header nav').addClass('visibleOK');
});

// Enable tooltips everywhere
$(function() {
  $('[data-toggle="tooltip"]').tooltip()
});