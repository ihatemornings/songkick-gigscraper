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
			
			var $listing = $(this);
			
			$listing.append("<p>Loading gigs...</p>");
			$.getJSON("http://api.songkick.com/api/3.0/artists/" + songkick_id + "/calendar.json?apikey=" + api_key + "&jsoncallback=?", function(data) {
				$o = $("<table><tbody></tbody></table>");
				var events = data.resultsPage.results.event;
				for(var i in events) {
					
					// Get the basic info
					var event_summary = events[i].venue.displayName;
					var event_location = events[i].venue.metroArea.displayName;
					var event_ticketlink = events[i].uri.replace(/\\\//g, "/");
					
					// Sort out date and time
					var event_time = events[i].start.time ? events[i].start.time : "20:00";
					var event_date_object = new Date(events[i].start.date + "T" + event_time);
					var event_dtstart = format_iso8601(event_date_object);
					event_time = leadingZeros(event_date_object.getHours(), 2, "0") + ":" + leadingZeros(event_date_object.getMinutes(), 2, "0");
					event_date_object.setHours(event_date_object.getHours() + 3);
					var event_dtend = format_iso8601(event_date_object);
					var event_date = event_date_object.toDateString();
					
					// Add the gig to the list
					$o.append('<tr class="vevent"><th>' + event_date + '</th><td><a href="' + event_ticketlink + '"><span class="summary">' + event_summary + '</span>, <span class="location">' + event_location + '</span></a><br /><span class="meta"><abbr class="dtstart" title="' + event_dtstart + '">' + event_time + '</abbr> <abbr class="dtend" title="' + event_dtend + '">start</abbr></span></td></tr>');
				}
				$listing.empty().append($o);
			});
			
		});
	}
})(jQuery);
