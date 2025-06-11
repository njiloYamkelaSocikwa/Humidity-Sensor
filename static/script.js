console.log("script.js loaded!");

function updateReadings() {
    console.log("UpdateReadings Called...")
    fetch('/readings')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Sensor Error: ", data.error);
            } else {
                document.getElementById('temperature').textContent = data.temperature + " °C";
                document.getElementById('humidity').textContent = data.humidity + " %";
            }
        })
        .catch(error => {
            console.error("Fetch error: ", error);
        });



}

document.addEventListener("DOMContentLoaded", () => {
    updateReadings();
    setInterval(updateReadings, 2000);
});