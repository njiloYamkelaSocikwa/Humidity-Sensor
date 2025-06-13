from flask import Flask, jsonify, render_template
from components.sensor import DHT22Sensor, SIMULATION_MODE
from components.monitor import PowerMonitor, sim_mode
import time
import logging

app = Flask(__name__)
app.logger.setLevel(logging.WARNING)


if not SIMULATION_MODE:
    import board
    try:
        sensor = DHT22Sensor(pin=board.D4)
        monitor = PowerMonitor()  # Initialize monitor here
        print("Successfully initialized DHT22 sensor with hardware")
    except Exception as e:
        print(f"Error initializing hardware sensor: {e}")
        print("Falling back to simulation mode")
        sensor = DHT22Sensor()  # Fallback to simulation mode
        monitor = PowerMonitor()  # Also initialize monitor in fallback
else:
    sensor = DHT22Sensor()  # No pin needed in simulation mode
    monitor = PowerMonitor()  # Initialize monitor in simulation mode
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

@app.route('/api/readings')
def get_readings():
    # Combined endpoint that returns both sensor and monitor readings
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
    print("\n==== Server Information ====")
    print(f"Access URLs:")
    print(f"Local: http://127.0.0.1:5000")
    print(f"Network: Check your IP address with 'ipconfig' in Windows")
    print("=============================\n")
    app.run(host='0.0.0.0', port=5000, debug=True)

