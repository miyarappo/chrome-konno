(function () {
  //nCage
  var main = function ($) {

    console.log()
    var self = $.nCage = new function () {};

    $.extend(self, {
      nCageImgs: [
        'http://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Nicolas_Cage_2011_CC.jpg/220px-Nicolas_Cage_2011_CC.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Nicolas_Cage_-_66%C3%A8me_Festival_de_Venise_(Mostra).jpg/220px-Nicolas_Cage_-_66%C3%A8me_Festival_de_Venise_(Mostra).jpg',
        'http://content8.flixster.com/rtactor/40/33/40334_pro.jpg',
        'http://images.fandango.com/r88.0/ImageRenderer/200/295/images/performer_no_image_large.jpg/0/images/masterrepository/performer%20images/p10155/kickass-pm-4.jpg',
      ],
      handleImages: function (lstImgs, time) {
        $.each($('img'), function (i, item) {
          //Skip if image is already replaced
          if ($.inArray($(item).attr('src'), lstImgs) == -1) {
            var h = $(item).height();
            var w = $(item).width();

            //If image loaded
            if (h > 0 && w > 0) {
              //Replace
              $(item).css('width', w + 'px').css('height', h + 'px');
              $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
            } else {
              //Replace when loaded
              $(item).load(function () {
                //Prevent 'infinite' loop
                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                  var h = $(item).height();
                  var w = $(item).width();
                  $(item).css('width', w + 'px').css('height', h + 'px');
                  $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
                }
              });
            }
          }
        });

        //Keep replacing
        if (time > 0)
          setTimeout(function () {
            self.handleImages(lstImgs, time);
          }, time);
      }
    });

    //Run on jQuery ready
    $(function () {
      self.handleImages(self.nCageImgs, 3000);
    });
  };

  main($)
  //Method to load jQuery
  // function loadJS(src, callback) {
  //   var s = document.createElement('script');
  //   s.src = src;
  //   s.async = true;
  //   s.onreadystatechange = s.onload = function () {
  //     var state = s.readyState;
  //     if (!callback.done && (!state || /loaded|complete/.test(state))) {
  //       callback.done = true;
  //       callback();
  //     }
  //   };
  //   document.getElementsByTagName('head')[0].appendChild(s);
  // }

  // //Add jQuery if not present, then run main
  // if (typeof jQuery == 'undefined') {
  //   loadJS(('https:' == document.location.protocol ? 'https://' : 'http://') + 'ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js', function () {
  //     jQuery.noConflict();
  //     main(jQuery);
  //   });
  // } else {
  //   main(jQuery);
  // }
})();
