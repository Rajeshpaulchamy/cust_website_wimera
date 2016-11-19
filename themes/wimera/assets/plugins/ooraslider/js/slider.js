/**
 * @name OORA SLIDER
 * @version 0.0.1
 * @author Rajeshwaran Paulchamy <Rajeshwaran.Paulchamy@gmail.com>
 * @description Simple Slider.
*/
'use strict';

/**
 * defaults: Slider default config
*/
var defaults = {
	/* autoplay? */
	'autoplay': true,
	/* autoplay direction */
	'direction': 'right',
	/* autoplay interval */
	'interval': 5,
	/* callback on events */
	'callback': function() {}
};

/**
 * @name    Slider
 * @param   {String}  containerSelector  Container of the slider
 * @param   {String}  itemSelector  Selector of list item.
 * @param   {String}  leftArrowSelector Left Arrow Selector
 * @param   {String}  rightArrowSelector Right Arrow Selector
 * @return  {Object}  options Slider Options
 */
function Slider(containerSelector, itemSelector, leftArrowSelector, rightArrowSelector, options) {
	var container,
		list,
		options,
		i;

	if(!containerSelector || !itemSelector) {
		console.error('Slider: arguments error.');
		return this;
	}
	container = $(containerSelector);
	if(!container) {
		console.error('Slider: cannot find container.');
		return this;
	}


	/* read options */
	options = options || {};
	for (var name in defaults) {
		if (options[name] === undefined) {
			options[name] = defaults[name];
		}
	}	
	
	/* prepare list */
	list = $(container).find(itemSelector);
	if(!list || !list.length) {
		console.error('Slider: no item inside container.');
		return this;
	}

	/* required to adjust the dots position */
	this.width = $(container).width();
	
	this.container = container;
	this.options = options;
	this.list = list;
	this.count = list.length;
	this.current = 0;
	
	/* show dots */
	if(this.count > 1) {
		this.showDots();
		$(leftArrowSelector).click($.proxy(this.clickedOnLeftArrow, this));
		$(rightArrowSelector).click($.proxy(this.clickedOnRightArrow, this));
	}

	/* work based on the options */
	/* auto play */
	if(options.autoplay) {
		this.interval = Math.max(2000, options.interval * 1000);
	}	

	/* initialize the slider */
	this.showSlider(0);	
}

Slider.prototype.autoplay = function() {
	var interval = this.interval,
		self = this;
	
	this.timerId = setTimeout(function() {
		console.log("oora-slider: Timer triggered.");
		self.slide();
		/* self.autoplay(); */
	}, interval);
};

Slider.prototype.showSlider = function(index) {
	var i, 
		prevIndex = this.current;

	/* stop the timer */
	if(this.options.autoplay) {
		if(this.timerId) {
			clearTimeout(this.timerId);
			console.log("oora-slider: Timer stopped.");
		}
	}
	
	/* call the application callback before start the process*/
	if(typeof this.options.callback === "function") {
		this.options.callback("before-start", prevIndex, index, this.list);
	}
	
	/* hide all the slides */
	for(i = 0; i < this.count; i++) {
		$(this.list[i]).hide();
	}

	/* show the slide */
	$(this.list[index]).show();
	console.log("oora-slider: Slide [" + index + "] is in visible state");
	
	/* configure the current slide index */
	this.current = index;
	
	/* update the dots */
	if(this.count > 1) {
		this.updateDots(index);	
	}
	
	/* call the application callback after the process*/
	if(typeof this.options.callback === "function") {
		this.options.callback("after-start", prevIndex, index, this.list);
	}
	
	/* start the timer */
	if(this.options.autoplay) {
		this.autoplay();
		console.log("oora-slider: Timer started.");
	}
};

Slider.prototype.slide = function(direction) {
	var current,
		direction = direction || this.options.direction;

	if(direction === 'right') {
		current = (this.current + 1) % this.count;
	} else {
		current = (this.current - 1 + this.count) % this.count;
	}

	/* show the slider */
	this.showSlider(current);
};

Slider.prototype.showDots = function() {
	var i, 
		$wrapper, 
		$dot,
		slider = this;
		
	$wrapper = $("<div>", 
					{
						"class": "oora-slide-indicator"
					});
					

	for(i = 0; i < this.count; i++) {
		$dot = $("<span>", 
					{
						id: "oora-slide-dot-" + i, 
						"class": "oora-slide-dot"
					});
					
		$dot.click($.proxy(this.clickedOnDot, this));
		
		$wrapper.append($dot);
	}
	
	$(this.container).append($wrapper);
	
	/* center align to slider */
	setTimeout(function () {
		var wrapperWidth = $wrapper.width(),
			wrapperLeft = (slider.width - wrapperWidth) / 2 + 'px';
			
		$wrapper.css("left", wrapperLeft);
	}, 500);

};

/* update indicator style */
Slider.prototype.updateDots = function(index) {
	var i,
		indicators;
	
	indicators = $(this.container).find(".oora-slide-dot");

	for (i = 0; i < this.count; i++) {
		indicators[i].className = 'oora-slide-dot';
	}
	indicators[index].className = 'oora-slide-dot active';
};

/* on dot clicked */
Slider.prototype.clickedOnDot = function(event) {
	var current = event.target.id.replace('oora-slide-dot-','');
	
	/* show the slider */
	this.showSlider(current);
};

/* on left arrow clicked */
Slider.prototype.clickedOnLeftArrow = function(event) {
	/* start the slide */
	this.slide("left");
};

/* on right arrow clicked */
Slider.prototype.clickedOnRightArrow = function(event) {
	/* start the slide */
	this.slide("right");
};
