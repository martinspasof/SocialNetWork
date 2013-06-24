test( "slider item name test", function() {
	var testSlide = SliderItem.create("testSlide", "Just a test slide", "images/pic.jpg", "javascripts/game.js", "arcade");
    ok( testSlide.name == "testSlide", "Passed!" );
});

test( "slider item info test", function() {
	var testSlide = SliderItem.create("testSlide", "Just a test slide", "images/pic.jpg", "javascripts/game.js", "arcade");
    ok( testSlide.info == "Just a test slide", "Passed!" );
});

test( "slider item picture source test", function() {
	var testSlide = SliderItem.create("testSlide", "Just a test slide", "images/pic.jpg", "javascripts/game.js", "arcade");
    ok( testSlide.srcPic == "images/pic.jpg", "Passed!" );
});

test( "slider item game script source test", function() {
	var testSlide = SliderItem.create("testSlide", "Just a test slide", "images/pic.jpg", "javascripts/game.js", "arcade");
    ok( testSlide.gameLink == "javascripts/game.js", "Passed!" );
});

test( "slider item category test", function() {
	var testSlide = SliderItem.create("testSlide", "Just a test slide", "images/pic.jpg", "javascripts/game.js", "arcade");
    ok( testSlide.category == "arcade", "Passed!" );
});

test( "slider item serialization test", function() {
	var testSlide = SliderItem.create("testSlide", "Just a test slide", "images/pic.jpg", "javascripts/game.js", "arcade");
	var serializedElement = testSlide._serialize();
    ok( serializedElement.tagName == "LI", "Passed!" );
});

test( "slider item children count test", function() {
	var testSlide = SliderItem.create("testSlide", "Just a test slide", "images/pic.jpg", "javascripts/game.js", "arcade");
	var serializedElement = testSlide._serialize();
    ok( serializedElement.children.length == 3, "Passed!" );
});

test( "slider item first child type test", function() {
	var testSlide = SliderItem.create("testSlide", "Just a test slide", "images/pic.jpg", "javascripts/game.js", "arcade");
	var serializedElement = testSlide._serialize();
    ok( serializedElement.children[0].nodeName == "IMG", "Passed!" );
});

test( "slider item second child type test", function() {
	var testSlide = SliderItem.create("testSlide", "Just a test slide", "images/pic.jpg", "javascripts/game.js", "arcade");
	var serializedElement = testSlide._serialize();
    ok( serializedElement.children[1].nodeName == "DIV", "Passed!" );
});

test( "slider item last child type test", function() {
	var testSlide = SliderItem.create("testSlide", "Just a test slide", "images/pic.jpg", "javascripts/game.js", "arcade");
	var serializedElement = testSlide._serialize();
    ok( serializedElement.children[2].nodeName == "A", "Passed!" );
});