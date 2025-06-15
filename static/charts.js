// Define common options for all charts
const chartOptions = {
    responsive: true,
    animation: false, // Disable animations completely
    scales: {
        y: {
            grid: {
                display: true,
                color: 'rgba(255, 255, 255, 0.1)'
            }
        },
        x: {
            ticks: {
                display: true,
                callback: function(value, index) {
                    return index % 2 === 0 ? this.getLabelForValue(value) : '';
                }
            },
            grid: {
                display: false
            }
        }
    },
    elements: {
        point: {
            radius: 0
        },
        line: {
            tension: 0.4 // Smooth line
        }
    }
};

// Define suggested ranges for each measurement
const suggestedRanges = {
    temperature: { min: 18, max: 25 }, // °C, comfortable room temperature
    humidity: { min: 30, max: 60 },    // %, healthy indoor humidity
    busVoltage: { min: 3.0, max: 5.5 }, // V, typical operating voltage
    shuntVoltage: { min: -50, max: 50 }, // mV, typical range
    current: { min: 0, max: 500 }      // mA, safe operating current
};

// Temperature Chart
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
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(231, 224, 221, 0.1)'
            }
        ]
    },
    options: {
        ...chartOptions,
        scales: {
            ...chartOptions.scales,
            y: {
                ...chartOptions.scales.y,
                suggestedMin: suggestedRanges.temperature.min,
                suggestedMax: suggestedRanges.temperature.max,
                ticks: {
                    callback: function(value) {
                        return value + '°C';
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    footer: function() {
                        return `Recommended: ${suggestedRanges.temperature.min}-${suggestedRanges.temperature.max}°C`;
                    }
                }
            }
        }
    }
});

// Bus Voltage Chart
const busCtx = document.getElementById('busChart').getContext('2d');
const busChart = new Chart(busCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Bus Voltage (V)',
                data: [],
                borderColor: '#E6FF00',
                tension: 0.4,
                fill: true, // Add filling
                backgroundColor: 'rgba(230, 255, 0, 0.1)'
            }
        ]
    },
    options: {
        ...chartOptions,
        scales: {
            ...chartOptions.scales,
            y: {
                ...chartOptions.scales.y,
                suggestedMin: suggestedRanges.busVoltage.min,
                suggestedMax: suggestedRanges.busVoltage.max,
                ticks: {
                    callback: function(value) {
                        return value + 'V';
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    footer: function() {
                        return `Recommended: ${suggestedRanges.busVoltage.min}-${suggestedRanges.busVoltage.max}V`;
                    }
                }
            }
        }
    }
});

// Shunt Voltage Chart
const shvCtx = document.getElementById('shvChart').getContext('2d');
const shvChart = new Chart(shvCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Shunt Voltage (mV)',
                data: [],
                borderColor: '#FF3FF2',
                tension: 0.4,
                fill: true, // Add filling
                backgroundColor: 'rgba(255, 63, 242, 0.1)'
            }
        ]
    },
    options: {
        ...chartOptions,
        scales: {
            ...chartOptions.scales,
            y: {
                ...chartOptions.scales.y,
                suggestedMin: suggestedRanges.shuntVoltage.min,
                suggestedMax: suggestedRanges.shuntVoltage.max,
                ticks: {
                    callback: function(value) {
                        return value + 'mV';
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    footer: function() {
                        return `Recommended: ${suggestedRanges.shuntVoltage.min}-${suggestedRanges.shuntVoltage.max}mV`;
                    }
                }
            }
        }
    }
});

// Current Chart
const curCtx = document.getElementById('curChart').getContext('2d');
const curChart = new Chart(curCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Current (mA)',
                data: [],
                borderColor: '#00FF00',
                tension: 0.4,
                fill: true, // Add filling
                backgroundColor: 'rgba(0, 255, 0, 0.1)'
            }
        ]
    },
    options: {
        ...chartOptions,
        scales: {
            ...chartOptions.scales,
            y: {
                ...chartOptions.scales.y,
                suggestedMin: suggestedRanges.current.min,
                suggestedMax: suggestedRanges.current.max,
                ticks: {
                    callback: function(value) {
                        return value + 'mA';
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    footer: function() {
                        return `Recommended: ${suggestedRanges.current.min}-${suggestedRanges.current.max}mA`;
                    }
                }
            }
        }
    }
});

// Humidity Chart
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
                tension: 0.4,
                fill: true, // Add filling
                backgroundColor: 'rgba(54, 162, 235, 0.1)'
            }
        ]
    },
    options: {
        ...chartOptions,
        scales: {
            ...chartOptions.scales,
            y: {
                ...chartOptions.scales.y,
                beginAtZero: true,
                suggestedMin: suggestedRanges.humidity.min,
                suggestedMax: suggestedRanges.humidity.max,
                max: 100,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    footer: function() {
                        return `Recommended: ${suggestedRanges.humidity.min}-${suggestedRanges.humidity.max}%`;
                    }
                }
            }
        }
    }
});

// Function to update all charts
// This function is no longer used - updateChartsFromCache in script.js is used instead

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




// This function is now managed in script.js to keep data consistent

function updateTimestamp() {
    const now = new Date();
    document.getElementById('lastUpdated').textContent = now.toLocaleString();
}
