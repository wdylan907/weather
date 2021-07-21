from flask import Flask, render_template
import requests
from os import environ

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/<lat>/<lng>')
def weather_data(lat, lng):
    OPENWEATHER_KEY = environ.get('OPENWEATHER_KEY')
    URL = ('https://api.openweathermap.org/data/2.5/onecall?'
           'units=imperial&exclude=minutely,hourly'
           f'&lat={lat}&lon={lng}&appid={OPENWEATHER_KEY}')
    return requests.get(URL).json()

@app.route('/mapboxkey')
def key():
    return environ.get('MAPBOX_KEY')

if __name__ == "__main__":
    app.run(debug=True,threaded=True)

