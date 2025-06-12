const tempData = []
const humData = []
const bvData = []
const currData = []
const shvData = []

function updateReadingsTH() {
    fetch('/api/readingsTH')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Sensor Error: ", data.error);
            } else {
                let temp = data.temperature
                let hum = data.humidity

                document.getElementById('temperature').textContent = temp + " °C";
                document.getElementById('humidity').textContent = hum + " %";

                if (temp != null) tempData.push(temp)
                if (hum != null) humData.push(hum)

                // Update timestamp if available
                if (data.timestamp) {
                    const date = new Date(data.timestamp * 1000);
                    document.getElementById('timestamp').textContent = "Last updated: " + date.toLocaleTimeString();
                }
            }
        })
        .catch(error => {
            console.error("Fetch error: ", error);
        });
}

function updateReadingsPM() {
    fetch('/api/readingsPM')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Sensor Error: ", data.error);
            } else {

                let bs = data.busVolts
                let cu = data.current
                let sv = data.shVolts

                document.getElementById('busvolts').textContent = bs + " V";
                document.getElementById('current').textContent = cu + " mA";
                document.getElementById('shVolts').textContent = sv + " mV";

                if (bs != null) bvData.push()
                if (cu != null) currData.push()
                if (sv != null) shvData.push()
                
                // Update timestamp if available
                if (data.timestamp) {
                    const date = new Date(data.timestamp * 1000);
                    document.getElementById('timestamp').textContent = "Last updated: " + date.toLocaleTimeString();
                }
            }
        })
        .catch(error => {
            console.error("Fetch error: ", error);
        });
}




document.addEventListener("DOMContentLoaded", () => {
    // Initial update
    updateReadingsTH();
    updateReadingsPM();

    // Update every 2 seconds
    setInterval(updateReadingsPM, 1000);
    setInterval(updateReadingsTH, 1000);
    
});