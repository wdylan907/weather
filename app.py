from flask import Flask, render_template
import requests
from os import environ

OPENWEATHER_KEY = environ.get('OPENWEATHER_KEY')
MAPBOX_KEY = environ.get('MAPBOX_KEY')

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/weather/<lat>/<lng>')
def weather_data(lat, lng):
    URL = ('https://api.openweathermap.org/data/2.5/onecall?'
           'units=imperial&exclude=minutely,hourly'
           f'&lat={lat}&lon={lng}&appid={OPENWEATHER_KEY}')
    return requests.get(URL).json()

@app.route('/get_name/<lat>/<lng>')
def get_name(lat, lng):
    URL = ("https://api.mapbox.com/geocoding/v5/mapbox.places/"
            f"{lng},{lat}.json?access_token={MAPBOX_KEY}&types=place,region")
    return requests.get(URL).json()

@app.route('/get_coords/<query>')
def get_coords(query):
    URL = ("https://api.mapbox.com/geocoding/v5/mapbox.places/"
            f"{query}.json?access_token={MAPBOX_KEY}")
    return requests.get(URL).json()

@app.route('/mapboxkey')
def key():
    return MAPBOX_KEY

if __name__ == "__main__":
    app.run(debug=True,threaded=True)

