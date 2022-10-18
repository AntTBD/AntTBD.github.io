var imgs = document.images,
  len = imgs.length,
  counter = 0;

[].forEach.call(imgs, function(img) {
  if (img.complete)
    incrementCounter();
  else
    img.addEventListener('load', incrementCounter, false);
});

function incrementCounter() {
  counter++;
  if (counter === len) {
    console.log('All images loaded!');
    window.addEventListener("load", function() {
      onAllImageLoaded();
    });
  }
}

function onBodyLoaded() {
  document.body.classList.add("loaded");
}

function onAllImageLoaded() {
  document.body.addEventListener("webkitAnimationEnd", startAnimation); // Code for Chrome, Safari and Opera
  document.body.addEventListener("animationend", startAnimation); // Standard syntax

  var images = document.querySelectorAll('img[loading="lazy"]');
  var sources = document.querySelectorAll("source[data-srcset]");
  sources.forEach(function(source) {
    source.srcset = source.dataset.srcset;
    if (source.complete) source.classList.remove("lazyloading")
    else source.addEventListener('load', function() {
      source.classList.remove("lazyloading");
    }, false);
  });
  images.forEach(function(img) {
    img.src = img.dataset.src;
    if (img.complete) img.classList.remove("lazyloading")
    else img.addEventListener('load', function() {
      img.classList.remove("lazyloading");
    }, false);
  });



}


function animBar(elem) {
  if (elem) {
    var sizemax = (parseFloat(elem.attr('aria-valuenow')) / parseFloat(elem.attr('aria-valuemax')) * 100.0) + '%'; // permet de garder en pourcentages//elem.css("width");
    setTimeout(function() {
      elem.show();
      elem.css("width", sizemax);
      //console.log(sizemax);
    }, 1000);
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
// set html language
document.documentElement.setAttribute('lang', langue); //navigator.language);

// switch mode dark light
if (URLparams["theme"] === 'dark') {
  localStorage.setItem("darkSwitch", "dark");
} else if (URLparams["theme"] === 'light') {
  localStorage.setItem("darkSwitch", "light");
} else {
  localStorage.removeItem("darkSwitch");
}
document.getElementsByTagName('header')[0].classList.add("loaded");
document.getElementsByTagName('footer')[0].classList.add("loaded");



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


var firstTime = false;

function startAnimation() {
  if (firstTime == true) return;
  else
    firstTime = true;

  if ($('#loading-icon')) {
    $("#loading-icon").remove();
  }

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

//change all url of navbar with language settings
function changeNavbarUrlLanguageAndDarkMode() {
  $('#navbar a').each(function(i, element) {
    var newUrl;
    if ($(element).hasClass("choix-lang")) { // if dropdown language choice (keep lang argument)
      $(element).parent().children('.dropdown-menu a').each(function(j, dropdown_menu) {
        newUrl = $(dropdown_menu).attr("href").split("&theme=")[0];
        if (null !== localStorage.getItem("darkSwitch")) {
          newUrl += "&theme=" + localStorage.getItem("darkSwitch");
        }
        $(dropdown_menu).attr("href", newUrl); // Set herf value
      });
    } else {
      var oldUrl = $(element).attr("href"); // Get current url
      newUrl = oldUrl.split("?")[0];
      if (langue === 'en') {
        newUrl += "?lang=en"; // Create new url
      } else {
        newUrl += "?lang=fr"; // Create new url
      }
      if (null !== localStorage.getItem("darkSwitch")) {
        newUrl += "&theme=" + localStorage.getItem("darkSwitch");
      }
      $(element).attr("href", newUrl); // Set herf value
    }


  });

  $('.lead a').each(function(i, element) {
    var newUrl;

    var oldUrl = $(element).attr("href"); // Get current url
    newUrl = oldUrl.split("?")[0];
    if (langue === 'en') {
      newUrl += "?lang=en"; // Create new url
    } else {
      newUrl += "?lang=fr"; // Create new url
    }
    if (null !== localStorage.getItem("darkSwitch")) {
      newUrl += "&theme=" + localStorage.getItem("darkSwitch");
    }
    $(element).attr("href", newUrl); // Set herf value



  });
}


$(document).ready(function() {


  //change all url of navbar with language settings
  changeNavbarUrlLanguageAndDarkMode();


  if ($('#home')) {
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
    // hide all projects cards for apparition
    if ($('#diplomas-content')) {
      $('#diplomas-content').find(".card").each(function(i) {
        $(this).hide();
      });
    }
    // on click minus or square
    $("#diplomas-show").click(function(event) {
      if ($("#diplomas-show i").hasClass('fa-minus-square')) {
        $("#diplomas-show i").removeClass('fa-minus-square');
        $("#diplomas-show i").addClass('fa-plus-square');
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
        $("#diplomas-show i").addClass('fa-minus-square');
        $("#diplomas-show i").removeClass('fa-plus-square');
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
    // hide all experiences cards for apparition
    if ($('.timeline')) {
      $('.timeline').hide();
    }
    // on click minus or square
    $("#work-show").click(function(event) {
      if ($("#work-show i").hasClass('fa-minus-square')) {
        $("#work-show i").removeClass('fa-minus-square');
        $("#work-show i").addClass('fa-plus-square');
        $("#work-content").fadeOut();
      } else {
        $("#work-show i").addClass('fa-minus-square');
        $("#work-show i").removeClass('fa-plus-square');
        $("#work-content").fadeIn();
      }
    });
  }

  if ($('#projects-show')) {
    // hide all projects cards for apparition
    if ($('#projects-content')) {
      $('#projects-content').find(".card").each(function(i) {
        $(this).hide();
      });
    }
    // on click minus or square
    $("#projects-show").click(function(event) {
      if ($("#projects-show i").hasClass('fa-minus-square')) {
        $("#projects-show i").removeClass('fa-minus-square');
        $("#projects-show i").addClass('fa-plus-square');
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
        $("#projects-show i").addClass('fa-minus-square');
        $("#projects-show i").removeClass('fa-plus-square');
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
    // on click minus or square
    $("#CV-pdf-show").click(function(event) {
      if ($("#CV-pdf-show i").hasClass('fa-minus-square')) {
        $("#CV-pdf-show i").removeClass('fa-minus-square');
        $("#CV-pdf-show i").addClass('fa-plus-square');
        $("#CV-pdf-content").fadeOut();
      } else {
        $("#CV-pdf-show i").addClass('fa-minus-square');
        $("#CV-pdf-show i").removeClass('fa-plus-square');
        $("#CV-pdf-content").fadeIn();
      }
    });
  }

  // if ($('#skill-show')) {
  //   $("#skill-show").click(function(event) {
  //     if ($("#skill-show i").hasClass('fa-minus-square')) {
  //       $("#skill-show i").removeClass('fa-minus-square');
  //       $("#skill-show i").addClass('fa-plus-square');
  //       $("#skill-content").hide();
  //     } else {
  //       $("#skill-show i").addClass('fa-minus-square');
  //       $("#skill-show i").removeClass('fa-plus-square');
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
  $('[data-bs-toggle="tooltip"]').tooltip()
});