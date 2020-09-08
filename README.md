# pubtools
Modular Node tools for Uploading Webcomics

These are the tools I use to upload a comic for use with my front-end project Mobinge.  There are
two related tools: qtopanel and publisher.  qtopanel finds all images in _sourceDir_ and copies
them to serve locally.  publisher looks at the manifest to see what needs to upload today and
pushes it live.

## settings
Both tools look for a settings.json in the src directory.  There is an example-settings.json file
that you can use as a guide.  It needs these values populated.

*manifest* This is a path to where you keep a manifest.  This is a JSON file that describes what
panels and entries are in your webcomic.

*convertPanelCommand* Command to turn your images into final uploadable size.  For me, it's this:
"gimp -i -b '(mass-panel-export \"%s%04d.xcf.gz\" \"%s\" %1.2d \"%s\")' -b '(gimp-quit 0)'".
The %04d is replaced with the current entry number (zero padded to four places), and the second
%s is the imageDir.

*bucket* Name of the S3 bucket this goes to.

*imageDir* This is the directory where you keep all your images on local.

*blogDir* This is where you keep a local Jekyll blog.

*comicUrl* This is the URL for your final comic.

*blogRemoteDir* Relative to the remote bucket, where the blog goes, blank for root directory

*remoteDir* Relative to the remote bucket, where the images go, blank for root directory.

*sourceDir* Directory for initial panels for images.

*postDir* Directory for writing Jekyll posts.

*manifestTmp* Name for storing temporary manifest.

*manifest* Name and path for final manifest in the bucket

*blogFormat* Pattern for blog files.  :year :month :day and :entryNum get replaced with appropriate values.

*dayInterval* Number of days between posts.  Currently one higher than the number of days.

*twitterApiKey* Four different values that match up to twitter values.  Go to developer.twitter.com to get these values.

## Modules
Both queueing and publishing are done with module files that are dynamically read and included.
You can add or delete modules at will, and they work without further configuration.

### Q Steps
These are the steps that run when you queue up a panel to serve locally:

 * gimp-panel - Coverts your GIMP panels to a final image.
 * add-entry - Plans the entry and thumbnail to the JSON manifest.
 * gimp-thumb - Converts your GIMP thumbnails to a final image.
 * blog-entry - Creates text for the base of a Jekyll blog entry about the comic.
 * photo-strip - Creates a vertical strip of your panels for posting on things like Reddit and Twitter.
  * write-manifest - Store entry information in the manifest.
  
### Pub Steps
These steps run when you publish:

  * upload-panels - Uploads panels for today's strip to S3.
  * upload-thumb - Uploads thumbnails for today's strip to S3.
  * temp-manifest - Builds a temp manifest that has the strips ready to go live from the complete manifest.
  * upload-manifest - Uploads the temp manifest to S3.
  * build-jekyll - Tells Jekyll to create the blog file and indexes.
  * upload-atom - Uploads RSS feed of blog entries.
  * upload-index - Uploads index of blog entries.
  * upload-blog - Uploads the blog entry itself.
  * invalidate - Tells Cloudfront to refresh its links to S3.
  * run-tapas - Triggers Selenium script to update Tapas.
  * run-webtoons - Triggers Selenium script to update Webtoons.
  * upload-strip - Uploads photo-strip vertical version of panels to S3.
  * post-twitter - Updates Twitter with the vertical strip.
  
### qtopanel
This needs one argument, which is the final panel of the new entry.
e.g. If you're at panel 152, and you want to add four more panels, you'd run "node qtopanel 156",
and it'd at 153, 154, 155 and 156.  It assumes the panels exist and that there's a thumbnail 
numbered for the entry.  It runs all the q steps for the new panels.

### publisher
This needs no arguments.  It looks to see if something is supposed to go up today, and it sends
it up.

### specified modules
There are command line arguments you can run to skip some modules or only run some modules.

*--skip or -s* Run all modules _except_ the ones specified.  For instance:
_node qtopanel -s photo-strip, write manifest_

*--only or -o* Run _only_ the specified modules.  For instance:
_node publisher -o run-tapas_
