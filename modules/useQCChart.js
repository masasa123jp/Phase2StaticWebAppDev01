// modules/useQCChart.js
import { Chart, registerables } from 'https://esm.sh/chart.js@4.4.1';
import { nextTick } from 'vue';
Chart.register(...registerables);

export function useQCChart() {
  let visualChartInstance = null;

  async function renderRadar(canvas) {
    await nextTick();
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    if (visualChartInstance) visualChartInstance.destroy();
    visualChartInstance = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: [
          'パレート図', 'ヒストグラム', '管理図',
          '散布図', 'チェックシート', '層別', '特性要因図'
        ],
        datasets: [{
          label: '活用度（モック）',
          data: [65, 75, 50, 80, 90, 60, 70],
          fill: true,
          backgroundColor: 'rgba(13,110,253,0.2)',
          borderColor: '#0d6efd',
          pointBackgroundColor: '#0d6efd'
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: { color: '#ddd' },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: { stepSize: 20 }
          }
        }
      }
    });
  }

  return { renderRadar };
}
