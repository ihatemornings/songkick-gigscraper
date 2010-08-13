;(function($){  
	
	$.fn.gigscraper = function(myspace_id, options) {
		
		settings = jQuery.extend({
			php_url: "http://secondhead.co.uk/gigscraper/gigscraper.php"
		}, options);
		
		return this.each(function() {
		
			var $listing = $(this);
			
			$listing.append("<p>Loading gigs...</p>");
			$.getJSON(settings.php_url + "?format=json&id=" + myspace_id + "&callback=?", function(data) {
				$o = $("<table><tbody></tbody></table>");
				for(var i in data) {
					$o.append('<tr><th>' + data[i].date + '</th><td>' + data[i].info + '</td></tr>');
				}
				$listing.empty().append($o);
			});
			
		});
	}
})(jQuery);
