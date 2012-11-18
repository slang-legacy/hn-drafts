
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
  var key, textarea;

  $('form input[type="submit"]').after("<input type=\"button\" value=\"save draft\">");

  key = window.location.pathname + window.location.search;

  textarea = $('textarea')[0];

  if (localStorage.getItem(key) != null) {
    textarea.value = localStorage.getItem(key);
  }

  console.log(textarea);

  $('form input[type="button"]').click(function() {
    localStorage.setItem(key, textarea.value);
    return console.log(localStorage.getItem(key));
  });

}).call(this);
