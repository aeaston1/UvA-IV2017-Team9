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

### Flask Tutorials:

- https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world (Nice tutorial, but a bit long)
- http://flask.pocoo.org/docs/0.12/quickstart/ (Flask Quick Start, nice explanations about the decorators)
- https://www.digitalocean.com/community/tutorials/how-to-structure-large-flask-applications
- https://www.airpair.com/python/posts/django-flask-pyramid (for the curious, on Django vs Flask vs Pyramid)

### Random terrorism-related stuffs:

(Maybe also for inspiration for visualizations, analysis, report, etc)

- https://ourworldindata.org/terrorism/ 
