'use strict';

$(function() {

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


  //////// carousel setup
  var slider = $('.slider');

  slider.owlCarousel({
    items : 3,
    itemsDesktop : [1199, 4],
    itemsDesktopSmall : [980, 3],
    itemsTablet: [768, 2],
    itemsTabletSmall: false,
    itemsMobile : [479, 1],
    slideSpeed : 200,
    paginationSpeed : 800,
    rewindSpeed : 1000,
    autoPlay : false,
    stopOnHover : true,
    navigation : true,
    rewindNav : true,
    scrollPerPage : false,
    pagination : true,
    paginationNumbers: false,
    responsive: true,
    responsiveRefreshRate : 200,
    responsiveBaseWidth: window,
    baseClass : 'owl-carousel',
    mouseDrag : false
  });






});