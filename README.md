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

## To Do ##

Lots! This is a script I've knocked together for the Little Fish site, and as such it's not particularly robust, flexible or secure. It's probably just about complete enough for you to chuck it on your server and get it working with minimal tinkering. Feel free to branch it and make it good.

Off the top of my head, here are a few issues that I would like to address at some point:

* Old events are not saved, and it looks like the new Myspace events setup doesn't let you access past events either, so a way of saving old records in the cache would be very useful. For most bands, the Myspace listings <del>are</del> were the only complete gig record they <del>have</del> had.
* The date and listing formats are hard coded. A simple template for these would be nice, although it's easy enough to edit `gigscraper.js`.
* It would be nice to offer this as a service, but I can't guarantee the uptime and I don't have the time and skills to offer support. If you fancy it, go ahead!

## Any questions? ##

Feel free to ask. <ben@ihatemornings.com>. I'm expecting lots of non-coder musos to find this, so don't be afraid to ask n00b questions. I understand that not every guitarist has root access to their own server. ;)
