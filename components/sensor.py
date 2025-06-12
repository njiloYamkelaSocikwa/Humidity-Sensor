import time
import random

try:
    import board
    import adafruit_dht
    from digitalio import DigitalInOut
    # Test if we can actually use the hardware
    try:
        test_pin = DigitalInOut(board.D4)
        test_pin.deinit()
        SIMULATION_MODE = False
        print("Hardware mode active - DHT22 sensor available")
    except (AttributeError, ValueError, RuntimeError) as e:
        print(f"Hardware detected but can't access pins: {e}")
        SIMULATION_MODE = True
except (ImportError, NotImplementedError):
    SIMULATION_MODE = True
    print("Running in simulation mode - hardware modules not available")

class DHT22Sensor:
 
    def __init__(self, pin=None):
        self.simulation_mode = SIMULATION_MODE
        self.last_temp = None
        self.last_hum = None
        if not self.simulation_mode:
            try:
                self.dht_device = adafruit_dht.DHT22(pin)
                print(f"DHT22 sensor initialized on pin {pin}")
            except Exception as e:
                print(f"Failed to initialize DHT22 sensor: {e}")
                self.simulation_mode = True
                self.dht_device = None
        else:
            # No actual device in simulation mode
            self.dht_device = None
            print("Using simulated DHT22 sensor")

    def get_readings(self):
        if not self.simulation_mode:
            try:
                temperature = self.dht_device.temperature
                humidity = self.dht_device.humidity
                self.last_temp = temperature
                self.last_hum = humidity
                return {
                    "temperature": temperature,
                    "humidity": humidity,
                    "timestamp": time.time()
                }
            except RuntimeError as error:
                print(f"Error reading from DHT22: {error}")
                return {
                    "temperature": self.last_temp,
                    "humidity": self.last_hum,
                    "timestamp": time.time()
                }
        else:
            # Generate simulated data in simulation mode
            return {
                "temperature": round(random.uniform(20.0, 25.0), 1),
                "humidity": round(random.uniform(40.0, 60.0), 1),
                "timestamp": time.time()
            }
            
 