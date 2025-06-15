from flask import Flask, jsonify
from flask_cors import CORS
from components.sensor import DHT22Sensor, SIMULATION_MODE
from components.monitor import PowerMonitor, sim_mode
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.logger.setLevel(logging.WARNING)


# Initialize sensors (same as before)
if not SIMULATION_MODE:
    import board
    try:
        sensor = DHT22Sensor(pin=board.D4)
        monitor = PowerMonitor()
        print("Successfully initialized DHT22 sensor with hardware")
    except Exception as e:
        print(f"Error initializing hardware sensor: {e}")
        print("Falling back to simulation mode")
        sensor = DHT22Sensor()
        monitor = PowerMonitor()
else:
    sensor = DHT22Sensor()
    monitor = PowerMonitor()
    print("Running with simulated DHT22 sensor")

# API endpoints
@app.route('/api/readingsTH')
def get_readingsTH():
    readings = sensor.get_readings()
    return jsonify(readings)

@app.route('/api/readingsPM')
def get_readingsPM():
    readings = monitor.get_readings()
    return jsonify(readings)

@app.route('/api/readings')
def get_readings():
    th_readings = sensor.get_readings()
    pm_readings = monitor.get_readings()
    combined = {**th_readings, **pm_readings}
    return jsonify(combined)

@app.route('/api/mode')
def get_mode():
    return jsonify({
        'simulation_mode': SIMULATION_MODE
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
