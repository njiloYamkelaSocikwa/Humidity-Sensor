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
                return {
                    "temperature": temperature,
                    "humidity": humidity,
                    "timestamp": time.time()
                }
            except RuntimeError as error:
                print(f"Error reading from DHT22: {error}")
                return {
                    "temperature": None,
                    "humidity": None,
                    "timestamp": time.time()
                }
        else:
            # Generate simulated data in simulation mode
            return {
                "temperature": round(random.uniform(20.0, 25.0), 1),
                "humidity": round(random.uniform(40.0, 60.0), 1),
                "timestamp": time.time()
            }
            
    def get_temperature(self):
        """
        Get the temperature reading from the DHT22 sensor.
        
        Returns:
            float or None: Temperature in Celsius or None if reading fails
        """
        if not self.simulation_mode:
            try:
                return self.dht_device.temperature
            except RuntimeError as error:
                print(f"Error reading temperature: {error}")
                return None
        else:
            # Simulated temperature
            return round(random.uniform(20.0, 25.0), 1)
            
    def get_humidity(self):
        """
        Get the humidity reading from the DHT22 sensor.
        
        Returns:
            float or None: Relative humidity percentage or None if reading fails
        """
        if not self.simulation_mode:
            try:
                return self.dht_device.humidity
            except RuntimeError as error:
                print(f"Error reading humidity: {error}")
                return None
        else:
            # Simulated humidity
            return round(random.uniform(40.0, 60.0), 1)

