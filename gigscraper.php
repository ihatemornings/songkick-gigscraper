<?php

include('lib/simple_html_dom.php');

/* Parameters */

$format = (isset($_GET['format']) && $_GET['format'] == "json") ? "json" : "html";

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
	
	$myspace_url = "http://events.myspace.com/$myspace_id/Events/1";
	
	// TODO: scrape more than one page
	
	ini_set('user_agent', 'Scrape/2.5');
	$html = file_get_html($myspace_url);

	// Use simplehtmldom to scrape gig listings into an array
	foreach ($html->find('#home-rec-events .eventitem') as $v) {
	
		$item['title'] = $v->find('a.event-title span',0)->plaintext;
	
		$item['info'] = $v->find('div.event-titleinfo span span',0)->plaintext;
		
		$item['ticketlink'] = $v->find('a.ticketFindLink',0)->href;
	
		$rawdate = $v->find('div.event-cal',0)->plaintext;
		$rawdatebits = explode(" @ ", $rawdate, 2);
		$justthedate = $rawdatebits[0];
		if ($timestamp = strtotime($justthedate)) {
			$item['date'] = date("D d M", $timestamp);
		} else {
			$item['date'] = $justthedate;
		}
		$item['time'] = $rawdatebits[1];
		
		$shows[] = $item;
	}
	
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
}
?>