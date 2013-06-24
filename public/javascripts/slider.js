Slider = (function($) {
	'use strict';
	var Slider = {

		_init: function(selector, sliderWidth, interval) {
			this.container = $(selector);
			this.sliderItems = [];
			this.sliderWidth = sliderWidth;
			this.interval = interval;
			this.rotatorId;

		},
		_serialize: function() {
			this.container.empty();
			this._attachHoverEventToContainer();
			var fragment = document.createDocumentFragment();
			var list = document.createElement('ul');
			list.style.width = this.sliderItems.length * this.sliderWidth + 'px';
			fragment.appendChild(list);

			for (var i = 0; i < this.sliderItems.length; i++) {
				list.appendChild(this.sliderItems[i]._serialize());
			};

			this._addButtons();
			this.container.append(fragment);
			this._startRotate(this.interval);
		},
		_addSliderItem: function(name, info, srcPic, gameLink, category) {

			var sliderItem = SliderItem.create(name, info, srcPic, gameLink, category);
			this.sliderItems.push(sliderItem);
		},
		_startRotate: function() {
			var self = this;
			this.rotatorId = setInterval(function() {
				self._animateSlider('right');
			}, this.interval);

		},
		_animateSlider: function(direction) {
			var signNext;
			var signRevert;
			if (direction == 'left') {
				signNext = "+=";
				signRevert = "-=";
			} else {
				signNext = "-=";
				signRevert = "+=";
			}
			var $list = this.container.find('ul');
			var $currentLeft = parseInt($list.css('left'), 10);
			if (($currentLeft - this.sliderWidth) <= -$list.width() && signRevert=="+=") {
				$list.animate({
					left: signRevert + ($list.width() - this.sliderWidth)
				}, 1000);
			} else if ($currentLeft == 0 && signRevert == "-=") {
				$list.animate({
					left: signRevert + ($list.width() - this.sliderWidth)
				}, 1000);
			} else {
				if (!($currentLeft == 0 && signNext == "+=")) {
					$list.animate({
						left: signNext + this.sliderWidth
					}, 1000);
				}
			}
		},
		_addButtons: function() {
			var $leftArrow = $('<div id="left-arrow"></div>');
			var $rightArrow = $('<div id="right-arrow"></div>');
			var self = this;
			$rightArrow.on('click', function() {

				self._eventHandlerRightArrow();
			});

			$leftArrow.on('click', function() {

				self._eventHandlerLeftArrow();
			});

			this.container.parent().append($rightArrow);
			this.container.parent().prepend($leftArrow);

		},
		_eventHandlerLeftArrow: function() {
			var $list = this.container.find('ul');
			if ($list.is(":animated")) {
				return false;
			} else {
				if (this.rotatorId) {
					clearInterval(this.rotatorId);
				}
				this._animateSlider('left');
				this._startRotate();
			}
		},
		_eventHandlerRightArrow: function() {
			var $list = this.container.find('ul');
			if ($list.is(":animated")) {
				return false;
			} else {
				if (this.rotatorId) {
					clearInterval(this.rotatorId);
				}
				this._animateSlider('right');
				this._startRotate();
			}
		},
		_attachHoverEventToContainer: function() {
			var self = this;
			this.container.hover(function() {
				if (self.rotatorId) {
					clearInterval(self.rotatorId);
				}

			}, function() {

				self._startRotate();
			});
		}

	}

	return {

		createSlider: function(selector, sliderWidth, interval) {

			var slider = Object.create(Slider);
			slider._init(selector, sliderWidth, interval);
			return slider;

		}
	}


}(jQuery));