(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function() {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#sideNav"
  });

  // Check whether an element has been scrolled into view
  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return elemTop <= docViewBottom && elemBottom >= docViewTop;
  }

  // List of available charts and their values
  var charts = {
    phpChart: 95,
    sqlChart: 95,
    html5Chart: 85,
    css3Chart: 80,
    jsChart: 80,
    javaChart: 50,
    csharpChart: 50,
    vbChart: 85
  };

  // Initialise charts
  var inView = {};
  for (var key in charts) {
    inView[key] = false;
  }

  // Handle scroll
  $(window).scroll(function() {
    for (var key in charts) {
      if (isScrolledIntoView("#" + key)) {
        if (!inView[key]) {
          inView[key] = true;
          var options = {
            legend: {
              display: false
            },
            tooltips: {
              enabled: false
            },
            events: [],
            responsive: true,
            maintainAspectRatio: false
          };

          var value = charts[key];
          var ctx = document.getElementById(key);
          var myDoughnutChart = new Chart(ctx, {
            type: "doughnut",
            data: {
              datasets: [
                {
                  data: [value, 100 - value],
                  backgroundColor: [value > 70 ? "green" : "orange", "white"]
                }
              ]
            },
            options: options
          });
        }
      } else {
        inView[key] = false;
      }
    }
  });

  // Initialise tooltips
  $('[data-toggle="tooltip"]').tooltip({ animation: true });

  // Initialise masonry
  $(".grid").masonry({
    // Options
    itemSelector: ".grid-item",
    columnWidth: 0
  });
})(jQuery); // End of use strict
