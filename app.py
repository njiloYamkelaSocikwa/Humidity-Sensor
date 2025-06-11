from flask import Flask, render_template, jsonify
import time
import random
import adafruit_dht
import board

# Checking if the Adafruit module has been successfully imported
try: 
    correctOS = True
    dhtDevice = adafruit_dht.DHT22(board.D4)
    print("Successful import of DHT")
except:
    correctOS = False
    print("Unsuccessful import of DHT")


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/readings')
def readings():
    global lastHumReading, lastTempReading

    if correctOS:
        try:
 
            temp_read = dhtDevice.temperature
            hum_read = dhtDevice.humidity

            lastTempReading = temp_read
            lastHumReading = hum_read

            print(f"Temperature: {temp_read} °C, Humidity: {hum_read} %")
            return jsonify(temperature=round(temp_read, 2), humidity=round(hum_read, 2))
        
        except Exception as e:
            print(f"Error reading sensor: {e}")
            if lastTempReading is None:
                lastTempReading = 0.0
            if lastHumReading is None:
                lastHumReading = 0.0
            return jsonify(temperature=round(lastTempReading, 2), humidity=round(lastHumReading, 2))
    else:
        temp_read = random.randint(1, 100)
        hum_read = random.randint(1, 100)
        print(f"Simulated Temperature: {temp_read} °C, Simulated Humidity: {hum_read} % ")
        return jsonify(temperature=round(temp_read, 2), humidity=round(hum_read, 2))



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
