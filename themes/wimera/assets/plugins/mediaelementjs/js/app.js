'use strict';

var player = [],
	firstTime = true,
	isMobile = false,
	clickToPlayPause = false;

jQuery(function($) {

	$(".player").attr("width", ($(window).width() + 0) + "%");
	$(".player").attr("height", ($(window).height() + 0) + "%");	

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		isMobile = true;
		clickToPlayPause = true;
	}


	/* the below functions are not used; keep it for future use */
	var loaded = function(mediaElement) {
	}
	var ended = function(mediaElement) {
	}


	var playerOptions = {
		features: [],
		alwaysShowControls: false,
		clickToPlayPause: clickToPlayPause,
		loop: true,
		success: function(me) {
			me.addEventListener('loadeddata', loaded, false);
			me.addEventListener('ended', ended, false);
		}
	}

	player[0] = new MediaElementPlayer("#player1", playerOptions);
	player[1] = new MediaElementPlayer("#player2", playerOptions);
	player[2] = new MediaElementPlayer("#player3", playerOptions);
	player[3] = new MediaElementPlayer("#player4", playerOptions);

	/*=================================================================
	 * OORA-Slider initialization
	 *=================================================================*/

	/* slider callback */
	var onCallback = function(eventName, prevIndex, curIndex, list) {
		var video;

		if (eventName == "before-start") {
			player[curIndex].pause();
			console.log("player paused");
		} else {
			player[curIndex].setCurrentTime(0);
			if(isMobile) {
				player[curIndex].play();
				/* do nothing */
			} else {
				player[curIndex].play();
				console.log("player start playing");
			}
		}
	}


	setTimeout(function() {
		var slider1 = new Slider('#slider1', 
			'.oora-slide-item',
			'.oora-slide-arrow-left',
			'.oora-slide-arrow-right',
			{
				interval: 22,
				duration: 1,
				callback: onCallback
			});
	}, 2000);

	var onSliderResize = function() {
		var maxWidth = 1024;
		var maxHeight = 500;

		var $window = $(window);
		var width = $window.width();
		var height = $window.height();

		if(width < maxWidth) {
			var newHeight = width / (maxWidth / maxHeight);
			if(newHeight < 200) {
				newHeight = 200;
			}

			$('.oora-slide-wrap').css({ height: newHeight  + 'px' });
			/* $('.z-slide-content').css({'-webkit-transform': 'scale(' + scale + ')'}); */
		} else {
			$('.oora-slide-wrap').css({ height: maxHeight + 'px' });
		}

	};

	/*$(window).resize(onSliderResize);
	onSliderResize();*/
});
