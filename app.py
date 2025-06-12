from flask import Flask, jsonify, render_template
from components.sensor import DHT22Sensor, SIMULATION_MODE
from components.monitor import PowerMonitor
import time

app = Flask(__name__)

# Initialize sensor
if not SIMULATION_MODE:
    import board
    try:
        sensor = DHT22Sensor(pin=board.D4)
        monitor = PowerMonitor()
        print("Successfully initialized DHT22 sensor with hardware")
    except Exception as e:
        print(f"Error initializing hardware sensor: {e}")
        print("Falling back to simulation mode")
        sensor = DHT22Sensor()  # Fallback to simulation mode
else:
    sensor = DHT22Sensor()  # No pin needed in simulation mode
    print("Running with simulated DHT22 sensor")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/readingsTH')
def get_readingsTH():
    readings = sensor.get_readings()
    return jsonify(readings)

@app.route('/api/readingsPM')
def get_readingsPM():
    readings = monitor.get_readings()
    return jsonify(readings)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

