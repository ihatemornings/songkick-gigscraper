This used to be a Myspace gig scraper. But Myspace kept changing their event listing pages, and it looks like they're finally going to die anyway, so I've converted it into a Songkick-powered band gig listings jQuery plugin.

I use it to display the gigs on [the gigs page of the Little Fish website](http://littlefishmusic.com/gigs).

## Installation ##

1. Include jQuery in the calling page. I recommend Google hosted jQuery, like so: `<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>`.
2. Include the gigscraper plugin file (eg. `<script type="javascript" src="gigscraper/gigscraper.js"></script>`).
3. Call the plugin on an element in the page: `$("#listings").gigscraper("12345678","ABCDEFG");`, where 12345678 is your SongKick Artist ID and ABCDEFG is your SongKick API key. You can get a key from the [SongKick developers site](http://www.songkick.com/developer).
4. Have a quick read of the [Songkick API terms of use](http://www.songkick.com/developer/api-terms-of-use) and pick a logo from that page to add to your design (that's part of the deal).

Have a look at `gigscraper-test.html` for an example.

## To Do ##

* Display the next gig near a visitor's IP
* Allow simple HTML templates instead of the hard-coded table.

## Any questions? ##

Feel free to ask. <ben@ihatemornings.com>. I'm expecting lots of non-coder musos to find this, so don't be afraid to ask n00b questions. ;)
