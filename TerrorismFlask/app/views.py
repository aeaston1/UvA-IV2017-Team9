from flask import render_template
from app import app

import commons


@app.route('/')
@app.route('/index')


def index():
    user = {'nickname': 'Miguel'}  # fake user
    posts = [  # fake array of posts
        { 
            'author': {'nickname': 'John'}, 
            'body': 'Beautiful day in Portland!' 
        },
        { 
            'author': {'nickname': 'Susan'}, 
            'body': 'The Avengers movie was so cool!' 
        }
    ]

    app.logger.warning("You've been warned")
    return render_template("index.html",
                           title='Home',
                           user=user,
                           posts=posts)


#TODO: I'm still not convinced that this is the way to handle data...
@app.route('/counts')
def counts():
    country_counts = commons.GTD_DATA.get_country_counts()
 
    app.logger.warning("Gonna print counts now")
    return render_template("counts.html",
                           country_counts=country_counts)


@app.route('/country/<country>')
def display_country(country):
    country_data = commons.GTD_DATA.get_country_data(country)
    country_data.update({'country': country})

    app.logger.warning("Gonna display country stuffs")
    return render_template("country.html",
                           country_data=country_data)



@app.route('/map')
def map():
    country_counts = commons.GTD_DATA.get_country_counts()

    app.logger.warning("Gonna map counts now")
    return render_template("map.html",
                           country_counts=country_counts)




