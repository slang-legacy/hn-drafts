###*
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
###

switch window.location.pathname
	when '/user'
		$('form input[type="submit"]').after("""
			<hr>
			<p>drafts:</p>
			<table id="draft_table"></table>
		""")

		generate_table = () ->
			table_html = ''
			for key, value of localStorage
				table_html += """
					<tr>
						<td>
							<a href="#{key}">#{value}</a>
						</td>
						<td>
							<input type="button" value="Delete">
						</td>
					</tr>
				"""
			if table_html is '' then table_html = 'none'

			$('#draft_table').html(table_html)


		generate_table()

		$('input[value="Delete"]').click( ->
			localStorage.removeItem(
				$(this).parent().parent().find('a').attr('href')
			)
			generate_table()
		)

	else
		for url of localStorage
			$("a[href=\"#{url}\"]").after('<span style="color:red"> (draft saved)</span>')

		add_comment = $('form input[type="submit"]')
		add_comment.after('<input type="button" value="save draft">')

		save_draft = $('form input[type="button"]')
		textarea = $('textarea')[0]


		key = (window.location.pathname + window.location.search).substr(1) # cut off slash at beginning of str

		if localStorage.getItem(key)?
			textarea.value = localStorage.getItem(key)

		save_draft.click( ->
			localStorage.setItem(key, textarea.value)
		)

		add_comment.click( ->
			localStorage.removeItem(key)
		)
