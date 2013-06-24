module("Slider._init");
test('Test Init method is it correct', function() {

	var slider = Slider.createSlider("#id", 950, 6000);
	var item = "#id"
	equal("#id", item);
	equal(950, slider.sliderWidth);
	equal(6000, slider.interval);

});

test('Test Init method is it correct', function() {

	var slider = Slider.createSlider("#id", 450, 3000);

	equal("#id", "#id");
	equal(450, slider.sliderWidth);
	equal(3000, slider.interval);

});

module("Slider._addSliderItem");
test('Test _addSliderItem method is it correct', function() {

	var slider = Slider.createSlider("#id", 750, 6000);
	slider._addSliderItem("name", "info", "srcPic", "gameLink", "category");
	equal("name", slider.sliderItems[0].name);
	equal("info", slider.sliderItems[0].info);
	equal("srcPic", slider.sliderItems[0].srcPic);
	equal("gameLink", slider.sliderItems[0].gameLink);
	equal("category", slider.sliderItems[0].category);

});