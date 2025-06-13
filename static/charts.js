// Temperature and Humidity Chart
const tempCtx = document.getElementById('tempChart').getContext('2d');
const tempChart = new Chart(tempCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Temperature (°C)',
                data: [],
                borderColor: '#E7E0DD',
                tension: 0.4
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {

            },
            x: {
                ticks: {
                    display: false
                }
            }
        }
    }
});

// Temperature and Humidity Chart
const busCtx = document.getElementById('busChart').getContext('2d');
const busChart = new Chart(busCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Bus Voltage (%)',
                data: [],
                borderColor: '#E6FF00',
                tension: 0.4
            }
        ]
    },
    options: {
        scales: {
            y: {


            },
            x: {
                ticks: {
                    display: false
                }
            }
        }
    }
});

// Temperature and Humidity Chart
const shvCtx = document.getElementById('shvChart').getContext('2d');
const shvChart = new Chart(shvCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Shunt Voltage (mA)',
                data: [],
                borderColor: '#FF3FF2',
                tension: 0.4
            }
        ]
    },
    options: {
        scales: {
            y: {


            },
            x: {
                ticks: {
                    display: false
                }
            }
        }
    }
});

// Temperature and Humidity Chart
const curCtx = document.getElementById('curChart').getContext('2d');
const curChart = new Chart(curCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Current (mA)',
                data: [],
                borderColor: '',
                borderColor: '#00FF00',
                tension: 0.4
            }
        ]
    },
    options: {
        scales: {
            y: {

            },
            x: {
                ticks: {
                    display: false
                }
            }
        }
    }
});

// Temperature and Humidity Chart
const humCtx = document.getElementById('humChart').getContext('2d');
const humChart = new Chart(humCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Humidity (%)',
                data: [],
                borderColor: 'rgb(54, 162, 235)',
                tension: 0.4
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100

            },
            x: {
                ticks: {
                    display: false
                }
            }
        }
    }
});

function updateCharts() {
    fetch('/api/readings')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Debugging log
            const timestamp = new Date().toLocaleTimeString();

            // Update Temperature Chart
            tempChart.data.labels.push(timestamp);
            tempChart.data.datasets[0].data.push(data.temperature);
            // Keep only the last 20 data points
            if (tempChart.data.labels.length > 20) {
                tempChart.data.labels = tempChart.data.labels.slice(-20);
                tempChart.data.datasets[0].data = tempChart.data.datasets[0].data.slice(-20);
            }
            tempChart.update();

            // Update Humidity Chart
            humChart.data.labels.push(timestamp);
            humChart.data.datasets[0].data.push(data.humidity);
            // Keep only the last 20 data points
            if (humChart.data.labels.length > 20) {
                humChart.data.labels = humChart.data.labels.slice(-20);
                humChart.data.datasets[0].data = humChart.data.datasets[0].data.slice(-20);
            }
            humChart.update();

            // Update Bus Voltage Chart
            busChart.data.labels.push(timestamp);
            busChart.data.datasets[0].data.push(data.busVolts);
            // Keep only the last 20 data points
            if (busChart.data.labels.length > 20) {
                busChart.data.labels = busChart.data.labels.slice(-20);
                busChart.data.datasets[0].data = busChart.data.datasets[0].data.slice(-20);
            }
            busChart.update();

            // Update Shunt Voltage Chart
            shvChart.data.labels.push(timestamp);
            shvChart.data.datasets[0].data.push(data.shVolts);
            // Keep only the last 20 data points
            if (shvChart.data.labels.length > 20) {
                shvChart.data.labels = shvChart.data.labels.slice(-20);
                shvChart.data.datasets[0].data = shvChart.data.datasets[0].data.slice(-20);
            }
            shvChart.update();

            // Update Current Chart
            curChart.data.labels.push(timestamp);
            curChart.data.datasets[0].data.push(data.current);
            // Keep only the last 20 data points
            if (curChart.data.labels.length > 20) {
                curChart.data.labels = curChart.data.labels.slice(-20);
                curChart.data.datasets[0].data = curChart.data.datasets[0].data.slice(-20);
            }
            curChart.update();

            updateTimestamp();
        })
        .catch(error => {
            console.error('Error updating charts:', error);
        });
}

// Update every 2 seconds
setInterval(updateCharts, 800);

// Update the timestamp
function updateTimestamp() {
    const now = new Date();
    document.getElementById('lastUpdated').textContent = now.toLocaleString();
}