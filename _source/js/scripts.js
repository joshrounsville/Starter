(function($, window, document) {


  //////////////////////////////// Helpers ////////////////////////////////

  //////// set booleans for window size
  var body = $('body');
  var isPhone = body.css('padding-bottom') === '1px';
  var isDesktop = body.css('margin-bottom') !== '1px';
  var notDesktop = body.css('margin-bottom') === '1px';

  $(window).resize(function() {
    isPhone = body.css('padding-bottom') === '1px';
    isDesktop = body.css('margin-bottom') !== '1px';
    notDesktop = body.css('margin-bottom') === '1px';
  });


  //////// svg fallback
  Modernizr.addTest('svgasimg', document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1'));

  if ( !Modernizr.svgasimg ) {
    $('img[src*="svg"]').attr('src', function() {
      return $(this).attr('src').replace('.svg', '.png');
    });
  }






  //////////////////////////////// Functions ////////////////////////////////


  var toggleMobileNav = function() {

    if ( body.hasClass('mobile-nav-show') ) {
      body.removeClass('mobile-nav-show');
    } else {
      body.addClass('mobile-nav-show');
    }

  }

  $('.js--mobile-nav-toggle').on('touchstart click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    toggleMobileNav();
  });



} (window.jQuery, window, document));
