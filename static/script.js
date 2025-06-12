console.log("script.js loaded!");

function updateReadingsTH() {
    console.log("UpdateReadings1 Called...")
    fetch('/api/readingsTH')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Sensor Error: ", data.error);
            } else {
                document.getElementById('temperature').textContent = data.temperature + " °C";
                document.getElementById('humidity').textContent = data.humidity + " %";



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
    console.log("UpdateReadings2 Called...")
    fetch('/api/readingsPM')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Sensor Error: ", data.error);
            } else {
                document.getElementById('busvolts').textContent = data.busVolts + " V";
                document.getElementById('current').textContent = data.current + " mA";
                document.getElementById('shVolts').textContent = data.shVolts + " mV";

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
    setInterval(updateReadingsTH, 2000);
});