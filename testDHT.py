import time
import board
import adafruit_dht

dhtDevice = adafruit_dht.DHT22(board.D4)

while True:
    try:
        temperature_c = dhtDevice.temperature
        humidity = dhtDevice.humidity
        print(f"Temp: {temperature_c:.1f} C  Humidity: {humidity:.1f}%")
    except Exception as e:
        print("Reading failed:", e)
    time.sleep(2)