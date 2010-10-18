;(function($){  
	
	$.fn.gigscraper = function(myspace_id, options) {
		
		settings = jQuery.extend({
			php_url: "http://secondhead.co.uk/gigscraper/gigscraper.php"
		}, options);
		
		return this.each(function() {
		
			var $listing = $(this);
			var now = new Date();
			
			$listing.append("<p>Loading gigs...</p>");
			$.getJSON(settings.php_url + "?format=json&id=" + myspace_id + "&callback=?", function(data) {
				$o = $("<table><tbody></tbody></table>");
				for(var i in data) {
					if ((data[i].timestamp * 1000) > now.getTime()) {
						var infobits = data[i].info.split(", ");
						var summary = infobits[0];
						var location = infobits[1];
						if (infobits.length > 2) {
							if (infobits[2] != infobits[1] && !/^\s+$/.test(infobits[2])) {
								location = location + ', ' + infobits[2];
							}
						}
						var ticketlink = (data[i].ticketlink) ? ', <a href="' + data[i].ticketlink + '">buy tickets</a>' : '';
						$o.append('<tr class="vevent"><th>' + data[i].date + '</th><td><span class="summary">' + summary + '</span>, <span class="location">' + location + '</span><br /><span class="meta"><abbr class="dtstart" title="' + data[i].dtstart + '">' + data[i].time + '</abbr> <abbr class="dtend" title="' + data[i].dtend + '">start</abbr>' + ticketlink + '</span></td></tr>');
					}
				}
				$listing.empty().append($o);
			});
			
		});
	}
})(jQuery);
