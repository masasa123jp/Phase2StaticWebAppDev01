// components/ReportCharts.js
import { defineComponent, onMounted, ref, watch } from 'vue';
import { Chart } from 'chart.js/auto';

export default defineComponent({
  name: 'ReportCharts',
  props: {
    healthStats:  { type: Object, required: true },
    regionInfo:   { type: Object, required: true },
    concernRecs:  { type: Object, required: true }
  },
  setup(props) {
    const healthCtx = ref(null);
    const regionCtx = ref(null);
    const concernCtx = ref(null);
    let healthChart, regionChart, concernChart;

    onMounted(() => {
      // 年齢別健康アドバイス数（棒グラフ）
      healthChart = new Chart(healthCtx.value, {
        type: 'bar',
        data: {
          labels: Object.keys(props.healthStats),
          datasets: Object.entries(props.healthStats).map(([breed,data],i) => ({
            label: `${breed} (3歳 vs 10歳)`,
            data: [data['3']||0, data['10']||0],
            backgroundColor: i===0 ? '#0d6efd' : '#198754'
          }))
        },
        options: {
          responsive: true,
          scales: {
            x: { stacked: false },
            y: { beginAtZero: true }
          },
          plugins: {
            tooltip: { mode: 'index', intersect: false },
            title: { display: true, text: '年齢別健康アドバイス件数' }
          }
        }
      });

      // 地域情報（円グラフ：施設数）
      regionChart = new Chart(regionCtx.value, {
        type: 'pie',
        data: {
          labels: Object.keys(props.regionInfo),
          datasets: [{
            data: Object.values(props.regionInfo).map(arr => arr.length),
            backgroundColor: ['#ffc107','#dc3545']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: '地域ごとの施設数' }
          }
        }
      });

      // 教材提案数（円グラフ）
      concernChart = new Chart(concernCtx.value, {
        type: 'doughnut',
        data: {
          labels: Object.keys(props.concernRecs),
          datasets: [{
            data: Object.values(props.concernRecs).map(arr => arr.length),
            backgroundColor: ['#6610f2','#20c997','#fd7e14']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: '関心事別教材提案数' }
          }
        }
      });
    });

    // props が変わったら更新
    watch(() => props.healthStats, (ns) => {
      if (healthChart) {
        healthChart.data.datasets.forEach((ds,i) => {
          ds.data = [ns[Object.keys(ns)[i]]['3']||0, ns[Object.keys(ns)[i]]['10']||0];
        });
        healthChart.update();
      }
    });

    return { healthCtx, regionCtx, concernCtx };
  },
  template: `
    <div class="row gy-4">
      <div class="col-md-6">
        <canvas ref="healthCtx"></canvas>
      </div>
      <div class="col-md-6">
        <canvas ref="regionCtx"></canvas>
      </div>
      <div class="col-md-6">
        <canvas ref="concernCtx"></canvas>
      </div>
    </div>
  `
});
