SocialButtons = (function($) {
    'use strict';

    var TwitterSocial = {
        init: function(selector, shareUrl, shareMsg, innerText, hashtags) {
            this.container = $(selector);
            this.shareUrl = shareUrl;
            this.shareMsg = shareMsg;
            this.innerText = innerText;
            this.hashtags = hashtags;
        },
        render: function() {
            var tweetClass = "twitter-share-button";
            var divEl = document.createElement('div');
            divEl.setAttribute("id", "share-on-twitter");

            var anchorEl = document.createElement('a');
            anchorEl.setAttribute("href", "https://twitter.com/share");
            anchorEl.setAttribute("class", tweetClass);
            anchorEl.setAttribute("data-count", "none");

            if (this.shareUrl) {
                anchorEl.setAttribute("data-url", this.shareUrl);
            }
            ;

            if (this.shareMsg) {
                anchorEl.setAttribute("data-text", this.shareMsg);
            }
            ;

            if (this.hashtags) {
                anchorEl.setAttribute("data-hashtags", this.hashtags);
            }
            ;

            anchorEl.innerHTML = this.innerText;

            divEl.appendChild(anchorEl);
            this.container.append(divEl);

            !function(doc, scriptEl, id) {
                var js,
                        fjs = doc.getElementsByTagName(scriptEl)[0],
                        p = /^http:/.test(doc.location) ? 'http' : 'https';

                if (!doc.getElementById(id)) {
                    js = doc.createElement(scriptEl);
                    js.id = id;
                    js.src = p + '://platform.twitter.com/widgets.js';
                    fjs.parentNode.insertBefore(js, fjs);
                }
            }(document, 'script', 'twitter-wjs');
        }
    };

    var TwitterShare = {
        init: function(selector, shareUrl, shareMsg, innerText, hashtags) {
            this.container = $(selector);
            this.shareUrl = shareUrl;
            this.shareMsg = shareMsg;
            this.innerText = innerText;
            this.hashtags = hashtags;
        },
        render: function() {
            var tweetClass = "twitter-share-button";
            var divEl = document.createElement('div');
            divEl.setAttribute("id", "share-on-twitter");

            var hrefUrl = "https://twitter.com/intent/tweet?";
            var anchorEl = document.createElement('a');
            anchorEl.setAttribute("class", tweetClass);

            var str = this.shareUrl;
            if (!this.shareUrl) {
                str = location.href;
            }

            str = str.replace(":", "%3A");
            str = str.replace("localhost", "localhost.com"); //Twitter does not work if the website does not have an identifier
            this.shareUrl = str.replace(new RegExp("/", "gm"), "%2F");

            if (this.hashtags) {
                hrefUrl += "hashtags=";
                hrefUrl += this.hashtags;
                hrefUrl += "&";
            }
            ;

            var msgSrt = this.shareMsg;
            hrefUrl += "original_referer=&";
            if (this.shareMsg) {
                this.shareMsg = escape(msgSrt);

                hrefUrl += "text=";
                hrefUrl += this.shareMsg;
                hrefUrl += "&";
            }
            ;

            hrefUrl += "tw_p=tweetbutton&";
            hrefUrl += "url=";
            hrefUrl += this.shareUrl;

            anchorEl.setAttribute("href", hrefUrl);

            if (this.innerText) {
                anchorEl.innerHTML = this.innerText;
            }
            ;

            divEl.appendChild(anchorEl);
            this.container.append(divEl);

            jQuery(document).on('ready post-load', function() {
                jQuery('a.' + tweetClass).on('click', function() {
                    window.open(hrefUrl, 'tweet', 'width=626, height=300');
                    return false;
                });
            });
        }
    };

    var FacebookShare = {
        init: function(selector, innerText, shareUrl) {
            this.container = $(selector);
            this.innerText = innerText;
            this.shareUrl = shareUrl;
        },
        render: function() {
            var fbShareClass = "fb-share-button";
            var divEl = document.createElement('div');
            divEl.setAttribute("id", "share-on-fb");

            var sharer = "https://www.facebook.com/sharer/sharer.php?u=";
            if (this.shareUrl) {
                sharer += this.shareUrl;
            }
            else {
                sharer += location.href;
            }
            ;

            var anchorEl = document.createElement('a');
            anchorEl.setAttribute("id", "share-on-fb");
            anchorEl.setAttribute("class", fbShareClass);
            anchorEl.setAttribute("href", "#");

            if (this.innerText) {
                anchorEl.innerHTML = this.innerText;
            }
            ;

            divEl.appendChild(anchorEl);
            this.container.append(divEl);

            jQuery(document).on('ready post-load', function() {
                jQuery('a.' + fbShareClass).on('click', function() {
                    window.open(sharer, 'sharer', 'width=626, height=436');
                    return false;
                });
            });
        }
    };

    var GooglePlusShare = {
        init: function(selector, urlToShare) {
            this.container = $(selector);
            this.relAtrib = "canonical";
            this.urlToShare = urlToShare;
        },
        render: function() {
            var gPlusEl = "<g:plusone></g:plusone>";
            var linkEl = document.createElement('link');

            if (!this.urlToShare) {
                this.urlToShare = location.href;
            }
            ;

            linkEl.setAttribute('rel', "canonical");
            linkEl.setAttribute('href', this.urlToShare);
            $('head').append(linkEl);

            var divEl = document.createElement('div');
            divEl.setAttribute("id", "share-on-gplus");
            var gPlusEl = "<g:plusone></g:plusone>";
            divEl.innerHTML = gPlusEl;
            this.container.append(divEl);

            window.___gcfg = {
                lang: 'en-US'
            };

            (function() {
                var po = document.createElement('script');
                po.type = 'text/javascript';
                po.async = true;
                po.src = 'https://apis.google.com/js/plusone.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(po, s);
            })();
        }
    };
    return {
        createSocialTweet: function(selector, shareUrl, shareMsg, innerText, hashtags) {
            var tweet = Object.create(TwitterSocial);
            tweet.init(selector, shareUrl, shareMsg, innerText, hashtags);
            return tweet;
        },
        createTwitterShare: function(selector, shareUrl, shareMsg, innerText, hashtags) {
            var tweet = Object.create(TwitterShare);
            tweet.init(selector, shareUrl, shareMsg, innerText, hashtags);
            return tweet;
        },
        createFbShare: function(selector, innerText, shareUrl) {
            var fbShare = Object.create(FacebookShare);
            fbShare.init(selector, innerText, shareUrl);
            return fbShare;
        },
        createGPlusShare: function(selector, urlToShare) {
            var gPlusShare = Object.create(GooglePlusShare);
            gPlusShare.init(selector, urlToShare);
            return gPlusShare;
        }
    };
}(jQuery));