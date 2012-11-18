
/**
// ==UserScript==
// @name        HN-Drafts
// @namespace   https://github.com/slang800/HN-drafts
// @description Save to drafts button for HN
// @include     http://news.ycombinator.com/reply*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version     1
// ==/UserScript==
*/


(function() {

  $('form input[type="submit"]').after("<input type=\"button\" value=\"save draft\">");

}).call(this);
