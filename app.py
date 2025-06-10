from flask import Flask, render_template
import time
import board

try: 
    import adafruit_dht
    DHT = True
    print("Successful import of DHT")
    dht = adafruit_dht.DHT22(board.D4)
except:
    DHT = False
    print("Unsuccessful import of DHT")


app = Flask(__name__)

@app.route("/")
def index():

    if DHT:
        try:
            humidity = dht.humidity
            temperature = dht.temperature
            time.sleep(2)
            print("The temp is {} degrees C and the humidity is {}\n".format(temperature, humidity))
        except:
                print("error")
    else:
        print("error")
    
        
    return render_template("index.html", temp=temperature, humidity = humidity)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)