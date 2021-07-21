from flask import Flask, render_template
import requests
import os
#from config import OPENWEATHER_KEY, MAPBOX_KEY

OPENWEATHER_KEY = os.environ.get('OPENWEATHER_KEY')
MAPBOX_KEY = os.environ.get('MAPBOX_KEY')

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/<lat>/<lng>')
def weather_data(lat, lng):
    URL = ('https://api.openweathermap.org/data/2.5/onecall?'
           'units=imperial&exclude=minutely,hourly'
           f'&lat={lat}&lon={lng}&appid={OPENWEATHER_KEY}')
    return requests.get(URL).json()

if __name__ == "__main__":
    app.run(debug=True,threaded=True)

