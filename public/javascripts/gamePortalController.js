var gamePortalController = (function($) {
	'use strict';

	function createSlider(selector, interval, sliderWidth) {
		$.ajax({
			url: '../data-base/games.txt',
			type: 'GET',
			success: function(data, textStatus, xhr) {
				var parseData = JSON.parse(data);
				var slider = Slider.createSlider(selector, sliderWidth, interval);
				for (var i = 0; i < parseData.games.length; i++) {
					var id = parseData.games[i].id;
					var name = parseData.games[i].name;
					var info = parseData.games[i].info;
					var srcPic = "../images/" + parseData.games[i].srcPic;
					//var gameLink = parseData.games[i].gameLink;
					var gameLink = "game.php?id=" + id;
					var category = parseData.games[i].category;
					slider._addSliderItem(name, info, srcPic, gameLink, category);
				}

				slider._serialize();
			},
			error: function(xhr, textStatus, errorThrown) {
				console.log(textStatus);
			}
		});

	}

	function attachApiButtons(selector) {
		var fbButton = SocialButtons.createFbShare(selector,"<img src='../images/facebook.png'>");
		fbButton.render();

		var twitterBtn = SocialButtons.createTwitterShare(selector, "http://google.com/search/pesho", "Visit our games.", "<img src='../images/twitter.png'>", ["games", "fun"]);
		twitterBtn.render();
	}

	return {

		serialize: function(options) {

			createSlider(options.sliderSelector, options.sliderIterval, options.sliderWidth);
			attachApiButtons(options.apiSelector);
		}
	}

}(jQuery));

$(document).ready(function($) {

	gamePortalController.serialize({

		sliderSelector: "#slider-content",
		sliderIterval: 6000,
		sliderWidth: 950,
		apiSelector: "#api-buttons"
	});

});