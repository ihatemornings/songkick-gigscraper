This is the script I've used to scrape the event listings from [the Little Fish Myspace page](http://myspace.com/littlefishmusic) and display the gigs on [the gigs page of the Little Fish website](http://littlefishmusic.com/gigs).

Because the site is built on Tumblr, I've hosted the Javascript and PHP files externally, at <http://secondhead.co.uk/gigscraper>. You're welcome to play with it there. Try this link to get you started (you can use your own Myspace ID):

* <http://secondhead.co.uk/gigscraper/gigscraper.php?format=html&id=44063861>

## Installation ##

1. Upload the files to your own server.
2. Make the `cache` directory writeable by the server.
3. Include jQuery in the calling page (eg. `<script type="javascript" src="gigscraper/lib/jquery.js"></script>`).
4. Include the gigscraper plugin file (eg. `<script type="javascript" src="gigscraper/gigscraper.js"></script>`).
5. Call the plugin on an element in the page: `$("#listings").gigscraper("12345678");`, where 12345678 is your Myspace ID.

Have a look at `gigscraper-test.html` for an example.

## Archiving and formats ##

Myspace recently stopped archiving old shows. This is a nightmare. Because of this, the script now keeps old shows in the cache file, adding or updating new ones every time it scrapes.

The PHP script will output HTML, JSON or ICAL formats. HTML is mostly for testing. JSON is the one you'll use to load gigs onto your page. You can subscribe to the ICAL feed (just add `&format=ical` to the end of the script URL) on your iPhone or your desktop calendar, so when the guitarist adds a new date to Myspace and forgets to tell the band you'll be one step ahead.

## To Do ##

Lots! This is a script I've knocked together for the Little Fish site, and as such it's not particularly robust, flexible or secure. It's probably just about complete enough for you to chuck it on your server and get it working with minimal tinkering. Feel free to branch it and make it good.

Off the top of my head, here are a few issues that I would like to address at some point:

* The date and listing formats are hard coded. A simple template for these would be nice, although it's easy enough to edit `gigscraper.js`.
* It would be nice to offer this as a service, but I can't guarantee the uptime and I don't have the time and skills to offer support. If you fancy it, go ahead!

## Any questions? ##

Feel free to ask. <ben@ihatemornings.com>. I'm expecting lots of non-coder musos to find this, so don't be afraid to ask n00b questions. I understand that not every guitarist has root access to their own server. ;)
