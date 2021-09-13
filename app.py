from flask import Flask, render_template
import requests
from os import environ

# MAPBOX_KEY = environ.get('MAPBOX_KEY')
# WEATHERAPI_KEY = environ.get('WEATHERAPI_KEY')
MAPBOX_KEY = 'pk.eyJ1Ijoid2R5bGFuOTA3IiwiYSI6ImNrcTN1NTZscDBhOTUyb3FlOGF4MXR5OTMifQ.aQUCaSfWltYEmJ7rScfX8Q'
WEATHERAPI_KEY = 'c8a9b5f00dcf47778a4165016211309'

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/weather/<lat>/<lng>')
def search_by_coords(lat, lng):
    URL = ('http://api.weatherapi.com/v1/current.json?'
           f'key={WEATHERAPI_KEY}&q={lat},{lng}')
    return requests.get(URL).json()

@app.route('/search_by_name/<query>')
def search_by_name(query):
    URL = ('http://api.weatherapi.com/v1/current.json?'
           f'key={WEATHERAPI_KEY}&q={query}')
    return requests.get(URL).json()

@app.route('/mapboxkey')
def key():
    return MAPBOX_KEY

if __name__ == "__main__":
    app.run(debug=True,threaded=True)

