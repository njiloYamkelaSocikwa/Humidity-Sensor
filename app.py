from flask import Flask, jsonify, render_template
from sensor import DHT22Sensor, SIMULATION_MODE
import time

app = Flask(__name__)

# Initialize sensor
if not SIMULATION_MODE:
    import board
    try:
        sensor = DHT22Sensor(pin=board.D4)
        print("Successfully initialized DHT22 sensor with hardware")
    except Exception as e:
        print(f"Error initializing hardware sensor: {e}")
        print("Falling back to simulation mode")
        sensor = DHT22Sensor()  # Fallback to simulation mode
else:
    sensor = DHT22Sensor()  # No pin needed in simulation mode
    print("Running with simulated DHT22 sensor")

# Store last readings to handle sensor errors
last_temperature = None
last_humidity = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/readings')
def get_readings():
    readings = sensor.get_readings()
    return jsonify(readings)

@app.route('/api/temperature')
def get_temperature():
    temperature = sensor.get_temperature()
    return jsonify({
        'temperature': temperature,
        'timestamp': time.time()
    })

@app.route('/api/humidity')
def get_humidity():
    humidity = sensor.get_humidity()
    return jsonify({
        'humidity': humidity,
        'timestamp': time.time()
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

