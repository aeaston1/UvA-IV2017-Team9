YES, TERRORISM FLASKS DO EXISTS: http://www.cafepress.com/+terrorism+flasks

## How to run:

1. Install the python requirements (e.g. `pip install -r requirements.txt`)
1. Fix DATA_PATH in app/settings.py (or *BETTER*, to avoid merge drama and etc, make a data folder in static and `ln -s path_to_csv` there)
1. Run `python run.py`
1. It would run on [http://localhost:5000/](http://localhost:5000/) by default

## What's in there:
1. `__init__.py` - basically creates the app and starts the logging
1. `views.py` - all the decorators and functions that are triggered for specific urls
1. `data.py` - all the data things and manipulations 
1. `commons.py` - all general constants - e.g. data object, paths, etc. (maybe it should be constans not commons? :/)
1. `utils.py` - all utility functions - e.g. read a json, create dir if it doesn't exist, etc
1. `settings.py` - the app configurations; data object was wrongly there, now there's nothing smart there.. :/ 
1. `templates/` - all the html templates
1. `static/` - the js and css folders + data folders (e.g. images, logos, etc, maybe we can keep dumped data / models there as well (because I don't know where else) 

## Tutorials and Useful Links

### As a beginning: How to format stuffs here:
- https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

### Flask Tutorials:

- https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world (Nice tutorial, but a bit long)
- http://flask.pocoo.org/docs/0.12/quickstart/ (Flask Quick Start, nice explanations about the decorators)
- https://www.digitalocean.com/community/tutorials/how-to-structure-large-flask-applications
- https://www.airpair.com/python/posts/django-flask-pyramid (for the curious, on Django vs Flask vs Pyramid)
- http://flask.pocoo.org/docs/0.12/patterns/viewdecorators/ (view decorators)

- And I've been looking a lot at how these guys have structured their stuffs: https://bitbucket.org/thomaswaldmann/moin-2.0/src/10a026928fb82a498eef25c8f3c0c88f82db2b96/MoinMoin/?at=default

### Faceted Search:
- I'd do something like: https://github.com/svola/fantasticsearch/blob/master/fantasticsearch/views.py
- https://www.mongodb.com/blog/post/faceted-search-with-mongodb?mkt_tok=3RkMMJWWfF9wsRonua%2FKcu%2FhmjTEU5z17ukoUKC3iokz2EFye%2BLIHETpodcMTcNjPbzYDBceEJhqyQJxPr3FLdcN0tJuRhTrCw%3D%3D
- Random ideas: https://www.quora.com/What-are-the-best-tools-for-implementing-faceted-search
- https://blog.madewithlove.be/post/faceted-search-using-elasticsearch/
- http://srchulo.com/jquery_plugins/jquery_facets.html

### Map Tutorials and examples:
- And I want black dying leaves as markers for the attacks!!! http://leafletjs.com/examples/custom-icons/
- switched to the google maps API
- https://developers.google.com/maps/documentation/javascript
- https://developers.google.com/maps/documentation/javascript/marker-clustering 
- https://developers.google.com/maps/documentation/javascript/styling --> styling the map
- https://googlemaps.github.io/js-marker-clusterer/docs/examples.html --> used for clustering
- the images for the clusters are in '/imgs/mapClusterImages' and i think they can just be changed

(old)
- http://leafletjs.com/ (what we actually use)
- https://www.mapbox.com/mapbox.js/example/v1.0.0/
- the code that i have been using mostly for the current map http://leafletjs.com/examples/quick-start/ 
- tutorial and explanation of leafjs and mapbox http://www.sarasafavi.com/making-a-web-map-with-leaflet.html

### Random terrorism-related stuffs:

(Maybe also for inspiration for visualizations, analysis, report, etc)

- https://ourworldindata.org/terrorism/ 


## Ideas from social scientists:

### 'I like' Stuffs:
- I like the idea to **zoom in at the country level and show summary statistics**.
- ... **the by country graph** is the most useful visualization strategy
- The **interactive map** of the world seems really useful as a means of giving the reader a more global view of terrorism which the database, due its searchable narrow nature, does not.

### Achievable Stuffs:
- It might also be interesting to **filter the world map by group** -> could I find out where ISIS have carried out most attacks, for instance? 
- fiddling with a **cartogram** as well as a standard map, to see the small countries clearly. 
- I recently saw a **"tile map in a tile map"** which I really liked: each tile was a country, and a miniature version of the whole map could be seen in each tile.
- an option to **adjust and compare the graphs** (amount of attacks by group, or correlation between type of attack/weapon and type of target) **based on the time period** would be very useful. 
- the ability to **compare a number of countries/regions** easily within the tool. Eg. by use of multiple selection boxes would go a long way. 
- As well as (although I know this seems a bit simple) the ability to easily **save the comparative data or the detailed info screen** as a pdf file.

### Other useful Stuffs:
- http://www.gdeltproject.org.
- contact Jacob Aasland (specialist on terrorism)

### 'Thanks.. but... no, thanks' Stuffs:
- adding in **additional data** about other country levels variables might be interesting. That is what social scientists are looking for at the end of the day - correlations.
-  the ability to upload your **own data** ... economic, population demographic, or voter data to multiple countries and examine the correlations would allow opportunities for intriguing case studies.


