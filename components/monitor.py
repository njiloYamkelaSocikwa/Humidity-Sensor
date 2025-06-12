import board
import busio
import adafruit_ina219
i2c = busio.I2C(board.SCL, board.SDA)
sensor = adafruit_ina219.INA219(i2c)

class PowerMonitor:
    def __init__(self):
        self.last_busVolts = None
        self.last_shVolts = None
        self.last_current = None
        


    def get_readings(self):
        try:
            busVolts = round(sensor.bus_voltage, 3)
            shVolts = round(sensor.shunt_voltage, 3)
            current = round(sensor.current, 3)
            
            self.last_busVolts = busVolts
            self.last_shVolts = shVolts
            self.last_current = current
        
            return {
                "busVolts": busVolts,
                "shVolts": shVolts,
                "current": current 
            }
        
        except Exception as e:
            print(f"Error reading current: {e}")
            return {
                "busVolts": self.last_busVolts,
                "shVolts": self.last_shVolts,
                "current": self.last_current 
            }