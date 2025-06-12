import board
import busio
import adafruit_ina219
i2c = busio.I2C(board.SCL, board.SDA)
sensor = adafruit_ina219.INA219(i2c)

class PowerMonitor:
    def __init__(self):
        self.last_busVolts = None
        self.last_power = None
        self.last_current = None

    def readCurrent(self):
        print("Reading Current...")
        try:
            busVolts = sensor.bus_voltage
            power = sensor.shunt_voltage / 1000
            current = sensor.current
            
            self.last_busVolts = busVolts
            self.last_power = power
            self.last_current = current

            print("Bus Voltage: {busVolts}V")
            print("Power: {power} mV")
            print("Current: {current}mA")
        
            return {
                        "busVolts": busVolts,
                        "power": power,
                        "current": current 
            }
        except:
             return {
                        "busVolts": self.last_busVolts,
                        "power": self.last_power,
                        "current": self.last_current 
            }

    


        