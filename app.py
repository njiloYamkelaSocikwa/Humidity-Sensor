from flask import Flask, render_template

try: 
    import adafruit_dht
    DHT = True
    print("Successful import of DHT")
except:
    DHT = False
    print("Unsuccessful import of DHT")


app = Flask(__name__)

@app.route("/")
def index():
    if DHT:
        humidity = adafruit_dht.DHT22.temperature
        temperature = adafruit_dht.DHT22.temperature
    else:
        humidity = -1
        temperature = -1
    
    return render_template("index.html", temp=temperature, humidity = humidity)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)