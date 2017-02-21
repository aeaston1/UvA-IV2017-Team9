from flask import render_template
from app import app

@app.route('/')
@app.route('/index')

#def index():
#    return "Hello, World!"

def index():
    user = {'nickname': 'Terrorist1'}  # fake user
    return render_template('index.html',
                           title='Home',
                           user=user)

