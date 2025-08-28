document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('stressChart').getContext('2d');
    var stressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1 Jan', '7 Jan', '14 Jan', '21 Jan', '27 Jan', '3 Feb'],
            datasets: [{
                label: 'Pendidikan',
                data: [65, 59, 80, 81, 56, 55],
                borderColor: 'rgba(255, 255, 255, 0.7)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: 'white',
                pointBorderColor: 'white'
            }, {
                label: 'Media Sosial',
                data: [28, 48, 40, 19, 86, 27],
                borderColor: 'rgba(200, 255, 200, 0.7)',
                backgroundColor: 'rgba(200, 255, 200, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: 'white',
                pointBorderColor: 'white'
            }, {
                label: 'Keluarga',
                data: [40, 20, 60, 30, 70, 45],
                borderColor: 'rgba(255, 200, 200, 0.7)',
                backgroundColor: 'rgba(255, 200, 200, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: 'white',
                pointBorderColor: 'white'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'white'
                    }
                },
                title: {
                    display: false,
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: 'white'
                    }
                }
            }
        }
    });
});