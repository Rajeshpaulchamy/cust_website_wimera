jQuery(function($) {

	$("main").hide();
	$("nav").hide();

	function startLoad() {
		/*=================================================================
		 * Loading
		 *=================================================================*/
		$(".loading").fadeOut("slow");
		// bring in to visible
		$("main").show();
		// bring in to visible
		$("nav").show();

		/*=================================================================
		 * Chatbox initialization
		 *=================================================================*/
		$(document).on('click', '.chatbox-titlebar', function(ev) {
			$('.chatbox-content').toggle();	
		});
		$(document).on('click', '.chatbox-icon-close', function(ev) {
			$('.chatbox').hide();	
		});
		$('.chatbox-content').toggle();
		$('.chatbox-content').scroll();


		/*=================================================================
		 * OORA-Slider initialization
		 *=================================================================*/
		 
		/* //slider callback 
		var onCallback = function(eventName, prevIndex, curIndex, list) {
			var video, i;
			
			// load all video file 
			for(i = 0; i < list.count; i++) {
				video = $(list[i]).find("video");
				video[0].preload = "auto";
			}
			
			if (eventName == "before-start") {
				video = $(list[prevIndex]).find("video").trigger('pause');
			} else {
				video = $(list[curIndex]).find("video").trigger('play');
				if(video[0].readyState && video[0].readyState == 4) {
					video[0].currentTime = 0;
					console.log("Current time is set !!!");
				}
			}
		}
		
		var slider1 = new Slider('#slider1', 
								'.oora-slide-item',
								'.oora-slide-arrow-left',
								'.oora-slide-arrow-right',
								{
									interval: 22,
									duration: 1,
									callback: onCallback
								});*/

		var onSliderResize = function() {
			var maxWidth = 1024;
			var maxHeight = 550;
	
			var $window = $(window);
			var width = $window.width();
			var height = $window.height();
	
			if(width < maxWidth) {
				var newHeight = width / (maxWidth / maxHeight);
				if(newHeight < 200) {
					newHeight = 200;
				}
	
				$('.sliderIframe').css({ height: newHeight  + 'px' });
				/* $('.z-slide-content').css({'-webkit-transform': 'scale(' + scale + ')'}); */
			} else {
				$('.sliderIframe').css({ height: maxHeight + 'px' });
			}
	
		};
	
		$(window).resize(onSliderResize);
		onSliderResize();


		/*=================================================================
		 * Start WOW animation
		 *=================================================================*/
		new WOW().init();		


		/*=================================================================
		 * Set active class for navbar
		 *=================================================================*/
		var setActive = function (idSelected) {

			$(".nav").find(".active").removeClass("active");

			if(window.location.href.indexOf("solutions") > -1  || 
				window.location.href.indexOf("automotive") > -1 ||
				window.location.href.indexOf("iot") > -1) {

				$("#nav-solutions").addClass("active");

			} else if(window.location.href.indexOf("aboutus") > -1) {

				$("#nav-aboutus").addClass("active");

			} else if (window.location.href.indexOf("careers") > -1) {

				$("#nav-careers").addClass("active");

			}  else if (window.location.href.indexOf("contactus") > -1) {

				$("#nav-contactus").addClass("active");

			}  else {

				$("#nav-home").addClass("active");
			}
		};

		$(".nav a").on("click", function(){
			//$(".nav").find(".active").removeClass("active");
			setActive(this.hash);
		});
		
		setActive();

	}


	/*=================================================================
	 * Start loop to check the loading status
	 *=================================================================*/
	function timeout() {

		setTimeout(function () {
			var video = document.getElementById("firstVideo");

			/* check video capability of the browser */
			if(Modernizr.video) {
				startLoad();
				/*if ( video.readyState == 4 ) {
					startLoad();
				} else {
					timeout();
				}*/
			} else {
				startLoad();
			}

		}, 100);
	}


	/*=================================================================
	 * If it is not a home page start load the scripts immediately
	 *=================================================================*/
	var pathArray = window.location.pathname.split( '/' );
	if(pathArray[1]) {
		startLoad();
	} else {
		timeout();
	}

});

