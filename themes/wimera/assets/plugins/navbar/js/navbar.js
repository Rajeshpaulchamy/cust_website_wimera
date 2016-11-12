
(function($) {
	$.fn.menumaker = function(options) {
		var cssmenu = $(this),
			settings = $.extend({
				format: "dropdown",
				sticky: false
			}, options);
		return this.each(function() {
			$(this).find(".sandwitch").on('click', function() {
				$(this).toggleClass('menu-opened');
				var mainmenu = $(this).next('ul');
				if (mainmenu.hasClass('open')) {
					mainmenu.slideToggle().removeClass('open');
				} else {
					mainmenu.slideToggle().addClass('open');
					if (settings.format === "dropdown") {
						mainmenu.find('ul').show();
					}
				}
			});
			cssmenu.find('li ul').parent().addClass('has-sub');
			multiTg = function() {
				cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
				/* added to handle the '+' symbol for dropdowns */
				cssmenu.find(".has-sub").prepend('<span class="symbol"></span>');
				cssmenu.find('.submenu-button').on('click', function() {
					$(this).toggleClass('submenu-opened');
					if ($(this).siblings('ul').hasClass('open')) {
						$(this).siblings('ul').removeClass('open').slideToggle();
					} else {
						$(this).siblings('ul').addClass('open').slideToggle();
					}
				});
			};

			/* code to position the dropdown ul list which are comes under the first level */
			 $(".navbar ul li").on('mouseenter mouseleave', function (e) {
				if (e.type == "mouseleave") {
					$(this).removeClass('edge');
					return;
				}

				if ($('ul', this).length) {
						var elm = $('ul:first', this);
						var off = elm.offset();
						var l = off.left;
						var w = elm.width();
						var docH = $(".navbar").height();
						var docW = $(".navbar").width();
						
						var isEntirelyVisible = (l + w <= docW);
						
						if (!isEntirelyVisible) {
						    $(this).addClass('edge');
						} else {
						    $(this).removeClass('edge');
						}
				}
			});

			if (settings.format === 'multitoggle') multiTg();
			else cssmenu.addClass('dropdown');
			if (settings.sticky === true) cssmenu.css('position', 'fixed');
		
			/* 
			 * the below function is not working as expected;
			 * the expression '$(window).width()' is not actually returning the correct width
			 * so that, the navbar is not changing to mobile mode when screen is small.
			 */ 
			/*resizeFix = function() {
				var mediasize = 718;
				if ($(window).width() > mediasize) {
					cssmenu.find('ul').show();
				}
				if ($(window).width() <= mediasize) {
					cssmenu.find('ul').hide().removeClass('open');
				}
			};
			resizeFix();
			return $(window).on('resize', resizeFix);*/
		});
	};
})(jQuery);

(function($) {
	$(document).ready(function() {
		$(".navbar").menumaker({
			format: "multitoggle"
		});
	});
})(jQuery);

