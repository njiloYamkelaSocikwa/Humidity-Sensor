from components.monitor import PowerMonitor
import time

def main():
    # Create an instance of PowerMonitor
    power_monitor = PowerMonitor()
    
    print("Starting power monitoring test...")
    print("Press Ctrl+C to exit")
    
    try:
        while True:
            # Get readings
            readings = power_monitor.get_readings()
            
            # Print formatted readings
            print("\n===== Power Monitor Readings =====")
            print(f"Bus Voltage: {readings['busVolts']:.2f} V")
            print(f"Shunt Volts (-): {readings['shVolts']:.2f} mW")
            print(f"Current: {readings['current']:.2f} mA")
            print("================================\n")
            
            # Wait before taking next reading
            time.sleep(2)
            
    except KeyboardInterrupt:
        print("\nTest terminated by user")
    except Exception as e:
        print(f"\nAn error occurred: {e}")

if __name__ == "__main__":
    main()