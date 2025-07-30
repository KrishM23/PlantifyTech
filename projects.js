document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const video = document.getElementById('camera');
    const captureBtn = document.getElementById('capture-btn');
    const canvas = document.getElementById('photo-canvas');
    const resultDiv = document.getElementById('result');
    const resultsChart = document.getElementById('resultsChart').getContext('2d');
    const comparisonChart = document.getElementById('comparisonChart').getContext('2d');
    let chart, comparisonChartInstance;

    // Access the device camera and stream to video element
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            console.log('Camera access granted');
            video.srcObject = stream;
        })
        .catch(error => {
            console.error('Error accessing the camera:', error);
        });

    captureBtn.addEventListener('click', () => {
        console.log('Capture button clicked');
        // Capture the photo
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas image to a data URL
        const imageDataURL = canvas.toDataURL('image/png');
        console.log('Photo captured');

        // Send the image data to the backend AI model for assessment
        fetch('http://127.0.0.1:5000/assess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: imageDataURL })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response received from backend', data);
            // Display the result from the AI model
            let resultText = '';
            if (data.shouldPlantTree) {
                resultText += 'It is recommended to plant a tree in this habitat.<br>';
            } else {
                resultText += 'It is not recommended to plant a tree in this habitat.<br>';
            }
            resultText += `<br><strong>Metrics:</strong><br>`;
            resultText += `<div class="metric"><span>Humidity:</span> ${data.humidity.toFixed(2)} / 10</div>`;
            resultText += `<div class="metric"><span>Soil Quality:</span> ${data.soilQuality.toFixed(2)} / 10</div>`;
            resultText += `<div class="metric"><span>Vegetation Density:</span> ${data.vegetationDensity.toFixed(2)} / 10</div>`;

            resultDiv.innerHTML = resultText;

            // Update the chart with the new data
            const chartData = {
                labels: ['Humidity', 'Soil Quality', 'Vegetation Density'],
                datasets: [{
                    label: 'Current Environment',
                    data: [data.humidity, data.soilQuality, data.vegetationDensity],
                    backgroundColor: ['#36A2EB', '#4BC0C0', '#FF6384'],
                    borderColor: ['#36A2EB', '#4BC0C0', '#FF6384'],
                    borderWidth: 1
                }]
            };

            if (chart) {
                chart.destroy(); // Destroy the previous chart if it exists
            }

            chart = new Chart(resultsChart, {
                type: 'bar',
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10
                        }
                    }
                }
            });

            // Optimal environment data
            const optimalData = {
                labels: ['Humidity', 'Soil Quality', 'Vegetation Density'],
                datasets: [{
                    label: 'Optimal Environment',
                    data: [8, 9, 9], // Replace these values with the optimal metrics
                    backgroundColor: ['#FFCE56', '#FF6384', '#36A2EB'],
                    borderColor: ['#FFCE56', '#FF6384', '#36A2EB'],
                    borderWidth: 1
                }]
            };

            if (comparisonChartInstance) {
                comparisonChartInstance.destroy(); // Destroy the previous comparison chart if it exists
            }

            comparisonChartInstance = new Chart(comparisonChart, {
                type: 'bar',
                data: optimalData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.textContent = `Error: ${error.message}`;
        });
    });
});
