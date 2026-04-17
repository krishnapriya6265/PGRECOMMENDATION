// Performance Logic
document.addEventListener("DOMContentLoaded", function() {
    const view = localStorage.getItem('compView') || 'chart';
    switchView(view);
});

function switchView(view) {
    const chartSection = document.querySelector(".chart-section");
    const analysisSection = document.getElementById("performanceSection");

    if (view === 'analysis') {
        if (chartSection) chartSection.style.display = "none";
        if (analysisSection) analysisSection.style.display = "block";
        localStorage.setItem('compView', 'analysis');
    } else {
        if (chartSection) chartSection.style.display = "block";
        if (analysisSection) analysisSection.style.display = "none";
        localStorage.setItem('compView', 'chart');
    }
}

// Keep showAnalysis for internal button compatibility
function showAnalysis() {
    switchView('analysis');
}

// Chart Data (Populated by global constants set in the template)
let knn = typeof KNN_ACC !== 'undefined' ? KNN_ACC : 0;
let rf = typeof RF_ACC !== 'undefined' ? RF_ACC : 0;

let best = (rf > knn) ? "Random Forest" : "KNN";
let acc = (rf > knn) ? rf : knn;


// Chart
let ctx = document.getElementById("chart").getContext("2d");

// Gradients
let gradKnn = ctx.createLinearGradient(0, 0, 0, 400);
gradKnn.addColorStop(0, '#3498db');
gradKnn.addColorStop(1, '#2980b9');

let gradRf = ctx.createLinearGradient(0, 0, 0, 400);
gradRf.addColorStop(0, '#e67e22');
gradRf.addColorStop(1, '#d35400');

new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["KNN", "Random Forest"],
        datasets: [{
            label: "Accuracy %",
            data: [knn, rf],
            backgroundColor: [gradKnn, gradRf],
            borderRadius: 15,
            borderWidth: 0,
            hoverBackgroundColor: ["#2980b9", "#d35400"]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                padding: 12,
                titleFont: { size: 16 },
                bodyFont: { size: 14 }
            }
        },
        layout: {
            padding: { top: 20, bottom: 20 }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: { color: 'rgba(0,0,0,0.05)' },
                ticks: { font: { size: 18, weight: 'bold' } }
            },
            x: {
                grid: { display: false },
                ticks: { font: { size: 22, weight: 'bold' } }
            }
        },
        // Centering logic
        barPercentage: 0.8,
        categoryPercentage: 0.9
    }
});


// Best Algorithm Display
document.getElementById("best").innerHTML =
    "Best Algorithm : <b>" + best + "</b> (" + acc + "%)";

