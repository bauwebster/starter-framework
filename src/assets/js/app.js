$(document).ready(function() {

	//Smooth Scroll
	 $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });

	//FastClick Behaviour fo Touch Devices
	FastClick.attach(document.body);

	//Bootstrap-Select
	$('.selectpicker').addClass('form-control').selectpicker();

	// Preloading Spinner Option
	var opts = {
	  lines: 13 // The number of lines to draw
	, length: 35 // The length of each line
	, width: 6 // The line thickness
	, radius: 30 // The radius of the inner circle
	, scale: 1 // Scales overall size of the spinner
	, corners: 1 // Corner roundness (0..1)
	, color: '#000' // #rgb or #rrggbb or array of colors
	, opacity: 0.25 // Opacity of the lines
	, rotate: 0 // The rotation offset
	, direction: 1 // 1: clockwise, -1: counterclockwise
	, speed: 1 // Rounds per second
	, trail: 38 // Afterglow percentage
	, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
	, zIndex: 2e9 // The z-index (defaults to 2000000000)
	, className: 'spinner' // The CSS class to assign to the spinner
	, top: '50%' // Top position relative to parent
	, left: '50%' // Left position relative to parent
	, shadow: false // Whether to render a shadow
	, hwaccel: false // Whether to use hardware acceleration
	, position: 'fixed' // Element positioning
	}
	var target = document.getElementById('page-wrapper');

	var spinner = new Spinner(opts).spin(target);
	spinner.stop();

	//EA string text wrap
	$(".main-area *").replaceText( /(essential accessibility)/gi, "<span class='thename'>eSSENTIAL Accessibility&trade;</span>" );

	//Bootstrap Styleguide
	$('#myTab a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')
	});

	$('.bs-example-tooltips button').tooltip();

	$('.bs-popover-example button').popover();

	var $select = $('<select id="sidebar-nav" class="selectpicker form-control" data-width="90%">').appendTo('.sg-menu');

    $('.sg-menu li').each(function() {
        var $li    = $(this),
            $a     = $li.find('> a'),
            $p     = $li.parents('li'),
            prefix = new Array($p.length + 1).join('-');

        var $option = $('<option>')
            .text(prefix + ' ' + $a.text())
            .val($a.attr('href'))
            .appendTo($select);

        if ($li.hasClass('current-page')) {
            $option.attr('selected', 'selected');
        }
    });

    $('.sg-menu .selectpicker').addClass('form-control').selectpicker('mobile');

     $('#sidebar-nav').change( function () {
        var targetPosition = $($(this).val()).offset().top;
        $('html,body').animate({ scrollTop: targetPosition-100}, 'slow');
    });

    $('.sg-menu').affix({
	  offset: {
	    top: 0,
	    bottom: function () {
	      return (this.bottom = $('.footer-area').outerHeight(true))
	    }
	  }
	})

     $('body').scrollspy({ target: '.sg-menu', offset:124 })


// end document ready
});