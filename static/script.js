console.log("script.js loaded!");

function updateReadings() {
    console.log("UpdateReadings Called...")
    fetch('/api/readings')
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

document.addEventListener("DOMContentLoaded", () => {
    // Initial update
    updateReadings();
    
    // Update every 2 seconds
    setInterval(updateReadings, 2000);
});