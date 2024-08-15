document.getElementById('menu-toggle').addEventListener('click', function () {
    document.querySelector('.navbar-icons').classList.toggle('show');
});


// valores fixos
const vagasDisponiveis = 200;
const preMatriculasConfirmadas = 150;
const matriculasConfirmadas = 100;


document.getElementById('vagas-disponiveis').innerText = vagasDisponiveis;
document.getElementById('pre-matriculas').innerText = preMatriculasConfirmadas;
document.getElementById('matriculas').innerText = matriculasConfirmadas;

//gráfico de barras para as matrículas
const ctx = document.getElementById('matriculasChart').getContext('2d');
const matriculasChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Vagas Disponíveis', 'Pré-Matrículas Confirmadas', 'Matrículas Confirmadas'],
        datasets: [{
            data: [vagasDisponiveis, preMatriculasConfirmadas, matriculasConfirmadas],
            backgroundColor: [
                'rgba(82, 100, 225, 0.6)',
                'rgba(211, 27, 230, 0.6)',
                'rgba(17, 210, 65, 0.6)'
            ],
            borderColor: [
                'rgba(82, 100, 225, 0.6)',
                'rgba(211, 27, 230, 0.6)',
                'rgba(17, 210, 65, 0.6)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false 
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw;
                        const label = tooltipItem.label;
                        return `${label}: ${value}`;
                    }
                }
            }
        }
    }
});

// Valores simulados para ao longo dos meses
const vagasDisponiveisData = [vagasDisponiveis + 190, vagasDisponiveis +30, vagasDisponiveis +15, vagasDisponiveis]; 
const preMatriculasData = [preMatriculasConfirmadas - 40, preMatriculasConfirmadas - 20, preMatriculasConfirmadas - 10, preMatriculasConfirmadas]; 
const matriculasData = [matriculasConfirmadas - 20, matriculasConfirmadas - 10, matriculasConfirmadas - 5, matriculasConfirmadas]; 

// gráfico de linha para matrículas ao longo dos meses
const ctl = document.getElementById('newLineChart').getContext('2d');
const newLineChart = new Chart(ctl, {
    type: 'line',
    data: {
        labels: ['Dezembro', 'Janeiro', 'Fevereiro', 'Março'],
        datasets: [
            {
                label: 'Vagas Disponíveis',
                data: vagasDisponiveisData,
                fill: false,
                borderColor: 'rgba(82, 100, 225, 1)',
                tension: 0.1
            },
            {
                label: 'Pré-Matrículas Confirmadas',
                data: preMatriculasData,
                fill: false,
                borderColor: 'rgba(211, 27, 230, 1)',
                tension: 0.1
            },
            {
                label: 'Matrículas Confirmadas',
                data: matriculasData,
                fill: false,
                borderColor: 'rgba(17, 210, 65, 1)',
                tension: 0.1
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw;
                        return `${tooltipItem.dataset.label}: ${value}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// gráfico em pizza
const cts = document.getElementById('totalsPieChart').getContext('2d');
const totalsPieChart = new Chart(cts, {
    type: 'pie',
    data: {
        labels: ['Vagas Disponíveis', 'Pré-Matrículas Confirmadas', 'Matrículas Confirmadas'],
        datasets: [{
            data: [vagasDisponiveis, preMatriculasConfirmadas, matriculasConfirmadas],
            backgroundColor: [
                'rgba(82, 100, 225, 0.7)',
                'rgba(211, 27, 230, 0.7)',
                'rgba(17, 210, 65, 0.7)'
            ],
            borderColor: [
                'rgba(120, 120, 120, 0.5)',
                'rgba(120, 120, 120, 0.5)',
                'rgba(120, 120, 120, 0.5)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw;
                        const label = tooltipItem.label;
                        return `${label}: ${value}`;
                    }
                }
            }
        }
    }
});