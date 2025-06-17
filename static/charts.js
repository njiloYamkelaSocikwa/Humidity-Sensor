// Common chart options with animations disabled
const noAnimationOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false, // Completely disable all animations
    animations: {
        colors: false,
        x: false,
        y: false
    },
    transitions: {
        active: {
            animation: {
                duration: 0 // Set duration to 0 for any required transitions
            }
        }
    },
    elements: {
        line: {
            tension: 0.4 // Keep the smooth line curves without animation
        }
    }
};

// Temperature Chart
const tempCtx = document.getElementById('tempChart').getContext('2d');
// Create gradient for temperature chart
const tempGradient = tempCtx.createLinearGradient(0, 0, 0, 400);
tempGradient.addColorStop(0, 'rgba(231, 224, 221, 0.3)');
tempGradient.addColorStop(1, 'rgba(231, 224, 221, 0.0)');

const tempChart = new Chart(tempCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Temperature (°C)',
                data: [],
                borderColor: '#E7E0DD',
                backgroundColor: tempGradient,
                pointRadius: 0,
                fill: true
            }
        ]
    },
    options: {
        ...noAnimationOptions,
        scales: {
            y: {
                suggestedMin: 20,
                suggestedMax: 30
            },
            x: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return index % 2 === 0 ? this.getLabelForValue(value) : '';
                    }
                }
            }
        }
    }
});

// Bus Voltage Chart
const busCtx = document.getElementById('busChart').getContext('2d');
const busGradient = busCtx.createLinearGradient(0, 0, 0, 400);
busGradient.addColorStop(0, 'rgba(230, 255, 0, 0.3)');
busGradient.addColorStop(1, 'rgba(230, 255, 0, 0.0)');

const busChart = new Chart(busCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Bus Voltage (V)',
                data: [],
                borderColor: '#E6FF00',
                backgroundColor: busGradient,
                pointRadius: 0,
                fill: true
            }
        ]
    },
    options: {
        ...noAnimationOptions,
        scales: {
            y: {
                 suggestedMin: 0,
                suggestedMax: 5,
                beginAtZero: true
            },
            x: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return index % 2 === 0 ? this.getLabelForValue(value) : '';
                    }
                }
            }
        }
    }
});

// Shunt Voltage Chart
const shvCtx = document.getElementById('shvChart').getContext('2d');
// Create gradient for shunt voltage chart
const shvGradient = shvCtx.createLinearGradient(0, 0, 0, 400);
shvGradient.addColorStop(0, 'rgba(255, 63, 242, 0.3)');
shvGradient.addColorStop(1, 'rgba(255, 63, 242, 0.0)');

const shvChart = new Chart(shvCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Shunt Voltage (mV)',
                data: [],
                borderColor: '#FF3FF2',
                backgroundColor: shvGradient,
                pointRadius: 0,
                fill: true
            }
        ]
    },
    options: {
        ...noAnimationOptions,
        scales: {

            x: {
                ticks: {
                    callback: function (value, index, ticks) {
                        // Show every 2nd label
                        return index % 2 === 0 ? this.getLabelForValue(value) : '';
                    }
                }
            }
        }
    }
});

// Current Chart
const curCtx = document.getElementById('curChart').getContext('2d');
// Create gradient for current chart
const curGradient = curCtx.createLinearGradient(0, 0, 0, 400);
curGradient.addColorStop(0, 'rgba(0, 255, 0, 0.3)');
curGradient.addColorStop(1, 'rgba(0, 255, 0, 0.0)');

const curChart = new Chart(curCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Current (mA)',
                data: [],
                borderColor: '#00FF00',
                backgroundColor: curGradient,
                pointRadius: 0,
                fill: true
            }
        ]
    },
    options: {
        ...noAnimationOptions,
        scales: {
            y: {
                 suggestedMin: -1,
                suggestedMax: 1
            },
            x: {
                ticks: {
                    callback: function (value, index, ticks) {
                        // Show every 2nd label
                        return index % 2 === 0 ? this.getLabelForValue(value) : '';
                    }
                }
            }
        }
    }
});

// Humidity Chart
const humCtx = document.getElementById('humChart').getContext('2d');
// Create gradient for humidity chart
const humGradient = humCtx.createLinearGradient(0, 0, 0, 400);
humGradient.addColorStop(0, 'rgba(54, 162, 235, 0.3)');
humGradient.addColorStop(1, 'rgba(54, 162, 235, 0.0)');

const humChart = new Chart(humCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Humidity (%)',
                data: [],
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: humGradient,
                pointRadius: 0,
                fill: true
            }
        ]
    },
    options: {
        ...noAnimationOptions,
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            },
            x: {
                ticks: {
                    callback: function (value, index, ticks) {
                        // Show every 2nd label
                        return index % 2 === 0 ? this.getLabelForValue(value) : '';
                    }
                }
            }
        }
    }
});

// Simplified updateCharts function with no animations
function updateCharts() {
    // Fetch temperature/humidity data
    fetch('/api/readingsTH')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(thData => {
            // Fetch power monitor data
            return fetch('/api/readingsPM')
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    return response.json();
                })
                .then(pmData => {
                    const timestamp = new Date().toLocaleTimeString();
                    
                    // Update each chart without animation
                    const updateChartNoAnimation = (chart, newValue) => {
                        // Add new data point
                        chart.data.labels.push(timestamp);
                        chart.data.datasets[0].data.push(newValue);
                        
                        // Remove oldest data point if needed
                        if (chart.data.labels.length > 20) {
                            chart.data.labels.shift();
                            chart.data.datasets[0].data.shift();
                        }
                    };
                    
                    // Update all charts
                    updateChartNoAnimation(tempChart, thData.temperature);
                    updateChartNoAnimation(humChart, thData.humidity);
                    updateChartNoAnimation(busChart, pmData.busVolts);
                    updateChartNoAnimation(shvChart, pmData.shVolts);
                    updateChartNoAnimation(curChart, pmData.current);
                    
                    // Force immediate update without animations
                    tempChart.update();
                    humChart.update();
                    busChart.update();
                    shvChart.update();
                    curChart.update();
                    
                    // Update timestamp
                    updateTimestamp();
                });
        })
        .catch(error => {
            console.error('Error updating charts:', error);
        });
}

// Update charts at regular interval
setInterval(updateCharts, 800);

// Update the timestamp
function updateTimestamp() {
    const now = new Date();
    document.getElementById('lastUpdated').textContent = now.toLocaleString();
}