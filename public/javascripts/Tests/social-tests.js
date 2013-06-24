module("Twitter Share Tests");
test("twitter share constructor test -> shareUrl", function () {
	var selector = "#social";
	var shareUrl = "http://google.com/search/pesho";
	var shareMsg = "Visit our site";
	var innerText = "Twitter";
	var hashtags = ["cold", "hot"];

	var twitter = SocialButtons.createTwitterShare(selector, shareUrl, shareMsg, innerText, hashtags);

	equal(twitter.shareUrl, shareUrl);
});

test("twitter share constructor test -> innerText", function () {
	var selector = "#social";
	var shareUrl = "http://google.com/search/pesho";
	var shareMsg = "Visit our site";
	var innerText = "Twitter";
	var hashtags = ["cold", "hot"];

	var twitter = SocialButtons.createTwitterShare(selector, shareUrl, shareMsg, innerText, hashtags);

	equal(twitter.shareMsg, shareMsg);
});

test("twitter share constructor test -> innerText", function () {
	var selector = "#social";
	var shareUrl = "http://google.com/search/pesho";
	var shareMsg = "Visit our site";
	var innerText = "Twitter";
	var hashtags = ["cold", "hot"];

	var twitter = SocialButtons.createTwitterShare(selector, shareUrl, shareMsg, innerText, hashtags);

	equal(twitter.innerText, innerText);
});

test("twitter share constructor test -> hashtags", function () {
	var selector = "#social";
	var shareUrl = "http://google.com/search/pesho";
	var shareMsg = "Visit our site";
	var innerText = "Twitter";
	var hashtags = ["cold", "hot"];

	var twitter = SocialButtons.createTwitterShare(selector, shareUrl, shareMsg, innerText, hashtags);

	equal(twitter.hashtags, hashtags);
});

test("twitter share test -> render method", function () {
	var selector = "#social";
	var shareUrl = "http://google.com/search/pesho";
	var shareMsg = "Visit our site";
	var innerText = "Twitter";
	var hashtags = ["cold", "hot"];

	var twitter = SocialButtons.createTwitterShare(selector, shareUrl, shareMsg, innerText, hashtags);
	twitter.render();

	var expected = $(selector);
	var divEl = document.createElement('div');
	divEl.setAttribute("id", "tweet-share");

	var hrefUrl = "https://twitter.com/intent/tweet?";
	var anchorEl = document.createElement('a');
	anchorEl.setAttribute("class", "twitter-share-button");

	var str = shareUrl.replace(":", "%3A");
	this.urlToShare = str.replace(new RegExp("/","gm"),"%2F")

	hrefUrl += "hashtags=" + hashtags + "&";
	hrefUrl += "original_referer=&" + "text=" + shareMsg + "&";
	hrefUrl += "tw_p=tweetbutton&" + "url=" + shareUrl;			
	
	anchorEl.setAttribute("href", hrefUrl);
	anchorEl.innerHTML = innerText;

	divEl.appendChild(anchorEl);
	expected.append(divEl);

	deepEqual(twitter.container, expected);
});

test("twitter share test -> render method no URL and no Msg and no innerText", function () {
	var selector = "#social";
	var shareUrl = "";
	var shareMsg = "";
	var innerText = "";
	var hashtags = ["cold", "hot"];

	var twitter = SocialButtons.createTwitterShare(selector, shareUrl, shareMsg, innerText, hashtags);
	twitter.render();

	var expected
	 = $(selector);
	var divEl = document.createElement('div');
	divEl.setAttribute("id", "tweet-share");

	var hrefUrl = "https://twitter.com/intent/tweet?";
	var anchorEl = document.createElement('a');
	anchorEl.setAttribute("class", "twitter-share-button");

	var str = location.href;
	shareUrl = str.replace(":", "%3A");
	this.urlToShare = str.replace(new RegExp("/","gm"),"%2F")

	hrefUrl += "hashtags=" + hashtags + "&";
	hrefUrl += "original_referer=&" + "text=" + "" + "&";
	hrefUrl += "tw_p=tweetbutton&" + "url=" + shareUrl;			
	
	anchorEl.setAttribute("href", hrefUrl);

	divEl.appendChild(anchorEl);
	expected.append(divEl);

	deepEqual(twitter.container, expected);
});

module("Facebook Share Tests");
test("Facebook share constructor test -> innerText", function () {
	var selector = "#social";
	var innerText = "Facebook";
	var shareUrl = "http://google.com/search/pesho";

	var fb = SocialButtons.createFbShare(selector, innerText, shareUrl);

	equal(fb.innerText, innerText);
});

test("Facebook share constructor test -> shareUrl", function () {
	var selector = "#social";
	var innerText = "Facebook";
	var shareUrl = "http://google.com/search/pesho";

	var fb = SocialButtons.createFbShare(selector, innerText, shareUrl);

	equal(fb.shareUrl, shareUrl);
});

test("Facebook share test -> render method", function () {
	var selector = "#social";
	var innerText = "Facebook";
	var shareUrl = "http://google.com/search/pesho";

	var fb = SocialButtons.createFbShare(selector, innerText, shareUrl);
	fb.render();

	var expected = $(selector);
	var divEl = document.createElement('div');
	divEl.setAttribute("id", "share-on-fb");

	var sharer = "https://www.facebook.com/sharer/sharer.php?u=" + shareUrl;

	var anchorEl = document.createElement('a');
	anchorEl.setAttribute("id", "share-on-fb");
	anchorEl.setAttribute("class", "fb-share-button");
	anchorEl.setAttribute("href", "#");
	anchorEl.innerHTML = innerText;

	divEl.appendChild(anchorEl);
	expected.append(divEl);

	deepEqual(fb.container, expected);
});

test("Facebook share test -> render method no URL and no InnerText", function () {
	var selector = "#social";
	var innerText = "";
	var shareUrl = "";

	var fb = SocialButtons.createFbShare(selector, innerText, shareUrl);
	fb.render();

	var expected = $(selector);
	var divEl = document.createElement('div');
	divEl.setAttribute("id", "share-on-fb");

	var sharer = "https://www.facebook.com/sharer/sharer.php?u=" + location.href;

	var anchorEl = document.createElement('a');
	anchorEl.setAttribute("id", "share-on-fb");
	anchorEl.setAttribute("class", "fb-share-button");
	anchorEl.setAttribute("href", "#");

	divEl.appendChild(anchorEl);
	expected.append(divEl);

	deepEqual(fb.container, expected);
});

module("Google+ Share Tests");
test("Google+ share constructor test -> shareUrl", function () {
	var selector = "#social";
	var shareUrl = "http://kalinkov.com/search/pesho";

	var gplus = SocialButtons.createGPlusShare(selector, shareUrl);

	equal(gplus.urlToShare, shareUrl);
});
