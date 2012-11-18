
/**
// ==UserScript==
// @name        HN-Drafts
// @namespace   https://github.com/slang800/HN-drafts
// @description Save to drafts button for HN
// @include     http://news.ycombinator.com/reply*
// @include     http://news.ycombinator.com/item*
// @include     http://news.ycombinator.com/user*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @version     1
// ==/UserScript==
*/


(function() {
  var add_comment, draft_markers, generate_table, key, save_draft, textarea;

  switch (window.location.pathname) {
    case '/user':
      $('form input[type="submit"]').after("<hr>\n<p>drafts:</p>\n<table id=\"draft_table\"></table>");
      generate_table = function() {
        var key, table_html, value;
        table_html = '';
        for (key in localStorage) {
          value = localStorage[key];
          table_html += "<tr>\n	<td>\n		<a href=\"" + key + "\">" + value + "</a>\n	</td>\n	<td>\n		<input type=\"button\" value=\"Delete\">\n	</td>\n</tr>";
        }
        if (table_html === '') {
          table_html = 'none';
        }
        return $('#draft_table').html(table_html);
      };
      generate_table();
      $('input[value="Delete"]').click(function() {
        localStorage.removeItem($(this).parent().parent().find('a').attr('href'));
        return generate_table();
      });
      break;
    default:
      draft_markers = function() {
        var link, url, _results;
        _results = [];
        for (url in localStorage) {
          link = $("a[href=\"" + url + "\"]");
          if (link.next().length === 0) {
            _results.push(link.after('<span style="color:red"> (draft saved)</span>'));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      draft_markers();
      add_comment = $('form input[type="submit"]');
      add_comment.after('<input type="button" value="save draft">');
      save_draft = $('form input[type="button"]');
      textarea = $('textarea')[0];
      key = (window.location.pathname + window.location.search).substr(1);
      if (localStorage.getItem(key) != null) {
        textarea.value = localStorage.getItem(key);
      }
      save_draft.click(function() {
        localStorage.setItem(key, textarea.value);
        return draft_markers();
      });
      add_comment.click(function() {
        return localStorage.removeItem(key);
      });
  }

}).call(this);
