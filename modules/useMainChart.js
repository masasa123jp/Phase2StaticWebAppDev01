// modules/useMainChart.js
import { Chart, registerables } from 'https://esm.sh/chart.js@4.4.1';
Chart.register(...registerables);

export function useMainChart(chartCanvas) {
  let chartInstance = null;

  function initMainChart() {
    const ctx = chartCanvas.value?.getContext('2d');
    if (!ctx) return;
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['健康アドバイス', '地域情報', '教材提案'],
        datasets: [{
          label: '提案数',
          data: [0, 0, 0],
          backgroundColor: ['#0d6efd', '#198754', '#ffc107']
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true, max: 1 } }
      }
    });
  }

  function updateMainChart(values) {
    if (!chartInstance) return;
    chartInstance.data.datasets[0].data = values;
    chartInstance.update();
  }

  function destroyMainChart() {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  }

  return { initMainChart, updateMainChart, destroyMainChart };
}
