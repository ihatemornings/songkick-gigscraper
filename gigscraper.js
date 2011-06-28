;(function($){  
	
	$.fn.gigscraper = function(songkick_id, api_key) {
		
		return this.each(function() {
			
			function leadingZeros(num, totalChars, padWith) {
				num = num + "";
				padWith = (padWith) ? padWith : "0";
				if (num.length < totalChars) {
					while (num.length < totalChars) {
						num = padWith + num;
					}
				} else {}
				
				if (num.length > totalChars) {
					num = num.substring((num.length - totalChars), totalChars);
				} else {}
				
				return num;
			}
			
			function format_iso8601(date_object) {
				var d = date_object.getFullYear() + "-";
				d += leadingZeros(date_object.getMonth(), 2, "0") + "-";
				d += leadingZeros(date_object.getDate(), 2, "0") + "T";
				d += leadingZeros(date_object.getHours(), 2, "0") + ":";
				d += leadingZeros(date_object.getMinutes(), 2, "0") + "Z";
				return d;
			}
			
			function parseDate(d, t) {
				var d_parts = d.match(/(\d+)/g);
				var t_parts = t.match(/(\d+)/g);
				return new Date(d_parts[0], d_parts[1]-1, d_parts[2], t_parts[0], t_parts[1]);
			}
			
			var $listing = $(this);
			
			$listing.append("<p>Loading gigs...</p>").addClass("loading");
			$.getJSON("http://api.songkick.com/api/3.0/artists/" + songkick_id + "/calendar.json?apikey=" + api_key + "&jsoncallback=?", function(data) {
				$o = $("<table><tbody></tbody></table>");
				var events = data.resultsPage.results.event;
				var month_text = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
				for(var i in events) {
					
					// Get the basic info
					if (events[i].type == "Festival") {
						var event_venue = events[i].displayName;
					} else {
						var event_venue = events[i].venue.displayName;
					}
					
					var event_location = events[i].venue.metroArea.displayName;
					var event_ticketlink = events[i].uri.replace(/\\\//g, "/");
					
					var event_headliners = '';
					var event_supports = '';
					
					for (var j in events[i].performance) {
						var a = events[i].performance[j];
						if (a.billing == 'headline') {
							if (events[i].type == "Concert" || j < 3) {
								if (event_headliners != '') event_headliners += '<br />';
								event_headliners += a.displayName;
							}
						} else {
							if (event_supports != '') event_supports += '<br />';
							event_supports += a.displayName;
						}
					}
					
					if (events[i].type == "Festival") event_supports += 'etc&hellip;';
					
					// Sort out date and time
					var event_time = events[i].start.time ? events[i].start.time : "20:00";
					var event_date_object = parseDate(events[i].start.date, event_time);
					var event_dtstart = format_iso8601(event_date_object);
					event_time = leadingZeros(event_date_object.getHours(), 2, "0") + ":" + leadingZeros(event_date_object.getMinutes(), 2, "0");
					var event_month = month_text[event_date_object.getMonth()];
					var event_day_of_month = leadingZeros(event_date_object.getDate(), 2, "0");
					event_date_object.setHours(event_date_object.getHours() + 3);
					var event_dtend = format_iso8601(event_date_object);
					var event_end_date = "";
					if (events[i].type == "Festival") {
						event_date_object = parseDate(events[i].end.date, event_time);
						event_end_date = " &ndash; " + leadingZeros(event_date_object.getDate(), 2, "0");
					}
					
					// Add the gig to the list
					var output = '<tr class="vevent">';
					output += '<th><abbr class="dtstart month" title="' + event_dtstart + '">' + event_month + '</abbr> <abbr class="dtend day" title="' + event_dtend + '">' + event_day_of_month + event_end_date + '</abbr></th>';
					output += '<td class="bands"><a href="' + event_ticketlink + '"><span class="headliners summary">' + event_headliners + '</span><br /><span class="supports">' + event_supports + '</span></a></td>';
					output += '<td><span class="location"><span class="venue">' + event_venue + '</span><br />' + event_location + '</span></td>';
					output += '</tr>';
					$o.append(output);
				}
				$listing.empty().append($o).removeClass("loading");
			});
			if ($listing.hasClass("loading")) {
				$listing.empty().append("<p>No upcoming gigs.</p>");
			}
			
		});
	}
})(jQuery);
