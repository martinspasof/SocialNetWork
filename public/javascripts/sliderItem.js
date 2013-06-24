SliderItem = (function($) {
	'use strict';

	var SliderItem = {

		_init: function(name, info, srcPic, gameLink, category) {
			this.name = name;
			this.info = info;
			this.srcPic = srcPic;
			this.gameLink = gameLink;
			this.category = category;

		},
		_serialize: function() {

			var li = document.createElement('li');
			var img = document.createElement('img');
			img.src = this.srcPic;
			li.appendChild(img);
			var gameInfo = document.createElement('div');
			gameInfo.className = 'gameInfo';
			li.appendChild(gameInfo);
			var h2 = document.createElement('h2');
			h2.innerHTML = this.name;
			var p = document.createElement('p');
			p.innerHTML = this.info;
			gameInfo.appendChild(h2);
			gameInfo.appendChild(p);
			var link = document.createElement('a');
			link.href = this.gameLink;
			link.innerHTML = "Play Now";
			li.appendChild(link);
			return li;
		}

       

	}

	return {

		create: function(name, info, srcPic, gameLink, category){

			var sliderItem = Object.create(SliderItem);
			sliderItem._init(name, info, srcPic, gameLink, category);
			return sliderItem;
		}
	}

}(jQuery));

