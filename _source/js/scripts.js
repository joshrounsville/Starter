(function() {
  'use strict';


  //////////////////////////////// Helpers ////////////////////////////////

  //////// set booleans for window size
  var body = document.body;
  var cs = window.getComputedStyle(body, null);

  var isPhone = cs.paddingBottom === '1px';
  var isDesktop = cs.paddingBottom!== '1px';
  var notDesktop = cs.paddingBottom === '1px';

  window.addEventListener('resize', function() {
    isPhone = cs.paddingBottom === '1px';
    isDesktop = cs.paddingBottom !== '1px';
    notDesktop = cs.paddingBottom === '1px';
  });


  //////// setup request animation frame shim
  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x ) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  }());




  //////////////////////////////// Functions ////////////////////////////////

  var main = (function() {
    var text = 'Hello World!';

    var changeHTML = function() {
      var element = document.getElementById('js--headline');
      console.log(element);
      element.textContent = text;
    };

    return {
      callMain: function() {
        changeHTML();
        console.log(text);
      }
    };

  })();

  main.callMain();


} ());
