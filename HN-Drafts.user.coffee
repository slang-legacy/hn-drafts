###*
// ==UserScript==
// @name        HN-Drafts
// @namespace   https://github.com/slang800/HN-drafts
// @description Save to drafts button for HN
// @include     http://news.ycombinator.com/reply*
// @include     http://news.ycombinator.com/item*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version     1
// ==/UserScript==
###

for url of localStorage
	console.log url
	$("a[href=\"#{url}\"]").after('<span style="color:red"> (draft saved)</span>')


add_comment = $('form input[type="submit"]')
save_draft = $('form input[type="button"]')
textarea = $('textarea')[0]

add_comment.after('<input type="button" value="save draft">')

key = (window.location.pathname + window.location.search).substr(1) # cut off slash at beginning of str


if localStorage.getItem(key)?
	textarea.value = localStorage.getItem(key)

save_draft.click( ->
	localStorage.setItem(key, textarea.value)
)

add_comment.click( ->
	localStorage.removeItem(key)
)
