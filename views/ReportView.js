// views/ReportView.js

import { defineComponent, ref, nextTick } from 'vue';
import { useReport } from '../modules/useReport.js'; // ペット用のレポート生成フック
import { Chart, registerables } from 'https://esm.sh/chart.js@4.4.1';
Chart.register(...registerables); // Chart.jsで利用するモジュール群を登録

export default defineComponent({
  name: 'ReportView',
  setup() {
    // ─── useReport フックからフォーム状態と関数を取得（ペット対応版） ───
    const {
      petName, species, breed, age, email,
      reportHtml, sent, loading,
      generateReport
    } = useReport();

    // レポートとチャートの表示状態
    const showReport = ref(false);
    const showRadar  = ref(false);

    // ─── AIチャットモック用の状態 ───
    const aiInput      = ref('');
    const aiResponse   = ref('');
    const isAIThinking = ref(false);

    function sendToAI() {
      if (!aiInput.value.trim()) return;
      isAIThinking.value = true;
      const prompt = aiInput.value;
      aiResponse.value = '';
      // モック応答（AI未接続）
      setTimeout(() => {
        aiResponse.value = `AI応答(モック): 「${prompt}」についてです。`;
        isAIThinking.value = false;
      }, 800);
      aiInput.value = '';
    }

    // ─── 棒グラフ：メインチャート（活用度） ───
    const chartCanvas = ref(null);
    let mainChart = null;

    async function initMainChart(scores) {
      await nextTick();
      const ctx = chartCanvas.value?.getContext('2d');
      if (!ctx) return;
      if (mainChart) mainChart.destroy();

      mainChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['健康', '食事', '運動', '相談', '記録'],
          datasets: [{
            label: 'スコア',
            data: scores,
            backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#6f42c1', '#fd7e14']
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true, max: 100 } }
        }
      });
    }

    // ─── QC7レーダーチャート ───
    const radarCanvas = ref(null);
    let radarChart = null;

    async function renderRadar() {
      await nextTick();
      const ctx = radarCanvas.value?.getContext('2d');
      if (!ctx) return;
      if (radarChart) radarChart.destroy();

      radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['パレート図','ヒストグラム','管理図','散布図','チェックシート','層別','特性要因図'],
          datasets: [{
            label: 'QC活用度(%)',
            data: [70, 80, 55, 90, 65, 75, 85],
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

    // ─── レポート生成：POST送信とチャート描画 ───
    async function onGenerateReport() {
      await generateReport();      // レポート生成（API通信）
      showReport.value = true;     // 結果表示をONにする
      const sampleScores = [80, 75, 90, 60, 70]; // サンプルスコア
      await initMainChart(sampleScores);
    }

    // PDF印刷（ダウンロード代用）
    function downloadPDF() {
      window.print();
    }

    // メール送信モック
    function sendMailFn() {
      sent.value = true;
    }

    // QCチャートの表示制御
    function onShowRadar() {
      showRadar.value = true;
      renderRadar();
    }

    // テンプレートで利用する全状態・関数を返却
    return {
      // フォーム
      petName, species, breed, age, email,
      // レポート
      reportHtml, sent, loading, showReport, onGenerateReport,
      downloadPDF, sendMail: sendMailFn,
      // チャート
      chartCanvas, radarCanvas, showRadar, onShowRadar,
      // AIチャット
      aiInput, aiResponse, isAIThinking, sendToAI
    };
  },

  // ─── テンプレート：フォーム・出力・チャート・AIチャット ───
  template: `
    <div class="container py-4">
      <h3>ペット別レポート生成</h3>

      <!-- 入力フォーム -->
      <form class="row g-3" @submit.prevent="onGenerateReport" style="max-width:600px;">
        <div class="col-6">
          <label class="form-label">ペットの名前</label>
          <input class="form-control" v-model="petName" />
        </div>
        <div class="col-6">
          <label class="form-label">種別（犬・猫など）</label>
          <input class="form-control" v-model="species" />
        </div>
        <div class="col-6">
          <label class="form-label">品種</label>
          <input class="form-control" v-model="breed" />
        </div>
        <div class="col-6">
          <label class="form-label">年齢</label>
          <input type="number" class="form-control" v-model="age" />
        </div>
        <div class="col-12">
          <label class="form-label">メールアドレス（任意）</label>
          <input type="email" class="form-control" v-model="email" />
        </div>
        <div class="col-12 text-end">
          <button class="btn btn-primary" :disabled="loading">
            {{ loading ? '生成中...' : 'レポートを生成' }}
          </button>
        </div>
      </form>

      <!-- レポートとチャート -->
      <div v-if="showReport" class="mt-4">
        <canvas ref="chartCanvas" class="mb-3 w-100" height="150"></canvas>
        <div v-html="reportHtml" class="card p-3 mb-3"></div>
        <div class="text-end mb-4">
          <button class="btn btn-secondary me-2" @click="downloadPDF()">PDFダウンロード</button>
          <button class="btn btn-success" @click="sendMail" :disabled="!email || sent">メール送信</button>
          <span v-if="sent" class="text-success ms-2">送信完了！</span>
        </div>
      </div>

      <!-- AIチャットモック -->
      <div class="card my-4">
        <div class="card-header">AIによる追加説明チャット</div>
        <div class="card-body">
          <input
            v-model="aiInput"
            @keyup.enter="sendToAI"
            class="form-control mb-2"
            placeholder="AIに質問してみる…"
            :disabled="isAIThinking"
          />
          <button class="btn btn-outline-primary mb-3" @click="sendToAI" :disabled="isAIThinking">
            {{ isAIThinking ? 'AI応答中…' : '質問を送信' }}
          </button>
          <div v-if="aiResponse" class="border rounded p-3 bg-light">{{ aiResponse }}</div>
        </div>
      </div>

      <!-- QCレーダーチャート -->
      <div v-if="showReport" class="card my-4">
        <div class="card-header">QC7つ道具 活用度レーダーチャート</div>
        <div class="card-body text-center">
          <button class="btn btn-outline-success mb-3" @click="onShowRadar">
            レーダーチャートを表示
          </button>
          <div v-if="showRadar">
            <canvas ref="radarCanvas" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>
  `
});
