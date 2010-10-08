<?php

include('lib/simple_html_dom.php');

/* Parameters */

if (isset($_GET['format'])) {
	switch ($_GET['format']) {
		case "ical":
			$format = "ical";
			break;
		case "html":
			$format = "html";
			break;
		default:
			$format = "json";
	}
}

$myspace_id = (isset($_GET['id']) && $_GET['id'] != "") ? $_GET['id'] : "44063861";

/* Cache */

// Cache file stored as JSON
$file = "./cache/" . $myspace_id . ".json";

// If the cache file is over an hour old, delete it
$cache_expire = 3600;
if ($dir = opendir("./cache")) {
	while ($f = readdir($dir)) {
		$ts = filemtime('./cache/' . $f);
		$now = time();
		if ( substr($f, -5) == '.json' && ((filemtime('./cache/' . $f) + $cache_expire) < time()) ) {
			unlink('./cache/' . $f);
		}
	}
}

if (file_exists($file)) { // read from cache file
	
	$response = file_get_contents($file);
	$shows = json_decode($response, true);
	
} else { // scrape the Myspace page
	
	ini_set('user_agent', 'Scrape/2.5');
	$pageCount = 0;

	do
	{
		$gotResults = false;
		$pageCount++;
		$html = file_get_html("http://events.myspace.com/$myspace_id/Events/$pageCount");

		// Use simplehtmldom to scrape gig listings into an array
		$showsArray = $html->find('#home-rec-events .eventitem');
		if (count($showsArray) > 0) {
			$gotResults = true;
			foreach ($showsArray as $v) {

				$item['title'] = $v->find('a.event-title span',0)->plaintext;

				$item['info'] = $v->find('div.event-titleinfo span span',0)->plaintext;

				$item['ticketlink'] = $v->find('a.ticketFindLink',0)->href;

				$rawdate = $v->find('div.event-cal',0)->plaintext;

				if (preg_match("/(.*), (.*) @ (.*)/i", $rawdate, $datebits)) {

					$timestamp = strtotime($datebits[2] . $datebits[3]);
					$item['time'] = $datebits[3];

				} elseif (preg_match("/(.*) @ (.*)/i", $rawdate, $datebits)) {

					// When date is 'Today' or 'Tomorrow'
					$timestamp = strtotime($datebits[1] . $datebits[2]);
					$item['time'] = $datebits[2];

				}
				if ($timestamp) {
					$item['timestamp'] = $timestamp;
					$item['dtstart'] = date(DATE_ISO8601, $timestamp);
					$item['dtend'] = date(DATE_ISO8601, $timestamp + 10800);
					$item['date'] = date("D d M", $timestamp);
				} else {
					$item['timestamp'] = '';
					$item['dtstart'] = '';
					$item['dtend'] = '';
					$item['date'] = '';
					$item['time'] = '';
				}

				$shows[] = $item;
			}
		}
	}
	while ($gotResults);
}

switch($format) {
	
	case "html": // basic formatting, mainly for testing
		
		echo <<< END
		<html>
		<head>
		<style type="text/css">
		body {
			color:#FBF8C3;
			font:12px/20px "Lucida Grande",Arial,sans-serif;
			text-shadow:1px 1px 2px black;
			background: #2B2B2B;
		}
		td {
			font-size: 12px;
			padding: 0.5em;
			border-bottom: 1px solid #666;
		}
		</style>
		</head>
		<body>
END;
		
		echo '<table id="giglisting" cellspacing="0" cellpadding="0">' . "\n";
		
		foreach ($shows as $show) {
			echo '<tr><td>' . $show['date'] . '</td><td>' . $show['info'] . '</td></tr>' . "\n";
		}
		
		echo '</table>' . "\n";
		
		echo <<< END
		</body>
		</html>
END;
		break;
	
	case "json":
		
		$callback = (isset($_GET['callback']) && $_GET['callback'] != "?") ? true : false;
		header('Content-type: application/json');
		
		$response = json_encode($shows);
		
		// Write the JSON file
		if ($callback) echo $_GET['callback'] . "(";
		echo $response;
		if ($callback) echo ")";
		
		// Write the cache file
		$fstream = fopen($file, "w");
		$result = fwrite($fstream, $response);
		fclose($fstream);
		chgrp($file, "www-data");
		
		break;
	
	case "ical":
	
		$calfilename = "littlefishgigs.ics";
		header("Content-Type: text/Calendar");
		header("Content-Disposition: inline; filename=$calfilename");
		?>
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ihatemornings//gigscraper//EN
X-WR-CALNAME:Little Fish gigs
X-ORIGINAL-URL:http://littlefish.com/gigs
X-PUBLISHED-TTL:86400
TZ:00
<?php foreach ($shows as $show) { ?>
BEGIN:VEVENT
SUMMARY:Little Fish @ <?php echo $show['info'] . "\n"; ?>
DTSTART:<?php echo date("Ymd\THi00", $show['timestamp']) . "\n"; ?>
DTEND:<?php echo date("Ymd\THi00", $show['timestamp'] + 10800) . "\n"; ?>
END:VEVENT
<?php } ?>
END:VCALENDAR
<?php break;
}
?>