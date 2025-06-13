const tempData = []
const humData = []
const bvData = []
const currData = []
const shvData = []

const valueDisplay = document.getElementById('value-display');

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

                valueDisplay.textContent = `Current value: ${newValue}`;


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


            }
        })
        .catch(error => {
            console.error("Fetch error: ", error);
        });
}

function checkSimulationMode() {
     fetch('/api/mode')
       .then(response => response.json())
       .then(data => {
         const modeLed = document.getElementById('mode-led');
         const modeText = document.getElementById('mode-text');
         
         if (!data.simulation_mode) {
           modeLed.className = 'led green';
           modeText.textContent = 'Simulation';
         } else {
           modeLed.className = 'led blue';
           modeText.textContent = 'Hardware';
         }
       })
       .catch(error => {
         console.error("Fetch error checking mode: ", error);
       });
   }


document.addEventListener("DOMContentLoaded", () => {
    // Initial update
    updateReadingsTH();
    updateReadingsPM();
    checkSimulationMode();

    // Update every 2 seconds
    setInterval(updateReadingsPM, 2000);
    setInterval(updateReadingsTH, 2000);
    setInterval(updateCharts, 1000)


});

