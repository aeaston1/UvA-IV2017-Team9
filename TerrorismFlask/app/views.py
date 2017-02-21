from flask import render_template
from app import app

import data


@app.route('/')
@app.route('/index')

#def index():
#    return "Hello, World!"

#def index():
#    user = {'nickname': 'Terrorist1'}  # fake user
#    return render_template('index.html',
#                           title='Home',
#                           user=user)


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


@app.route('/counts')
def counts():
    country_counts = data.get_country_counts('app/static/data/globalterrorismdb_0616dist.csv')
 
    app.logger.warning("Gonna print counts now")
    return render_template("counts.html",
                           country_counts=country_counts)



@app.route('/map')
def map():
    country_counts = data.get_country_counts('app/static/data/globalterrorismdb_0616dist.csv')

    app.logger.warning("Gonna map counts now")
    return render_template("map.html",
                           country_counts=country_counts)




