This used to be a Myspace gig scraper. But Myspace kept changing their event listing pages, and it looks like they're finally going to die anyway, so I've converted it into a SongKick-powered band gig listings jQuery plugin.

I use it to display the gigs on [the gigs page of the Little Fish website](http://littlefishmusic.com/gigs).

## Installation ##

1. Include jQuery in the calling page (eg. `<script type="javascript" src="gigscraper/lib/jquery.js"></script>`).
2. Include the gigscraper plugin file (eg. `<script type="javascript" src="gigscraper/gigscraper.js"></script>`).
5. Call the plugin on an element in the page: `$("#listings").gigscraper("12345678","ABCDEFG");`, where 12345678 is your SongKick Artist ID and ABCDEFG is your SongKick API key. You can get a key from the [SongKick developers site](http://www.songkick.com/developer).

Have a look at `gigscraper-test.html` for an example.

## To Do ##

* Work out how time zones will work outside the UK
* Display past gigs, set lists etc. (SongKick doesn't do this through the API yet)
* Display the next gig near a visitor's IP
* Allow simple HTML templates instead of the hard-coded table.

## Any questions? ##

Feel free to ask. <ben@ihatemornings.com>. I'm expecting lots of non-coder musos to find this, so don't be afraid to ask n00b questions. ;)
