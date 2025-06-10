from flask import Flask, render_template
import Adafruit_DHT

app = Flask(__name__)

@app.route("/")
def index():
    humidity, temperature = Adafruit_DHT.read_retry(Adafruit)