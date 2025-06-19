// views/ReportView.js

import { defineComponent, ref, nextTick } from 'vue';
import { Chart, registerables } from 'https://esm.sh/chart.js@4.4.1';
Chart.register(...registerables);

export default defineComponent({
  name: 'ReportView',
  setup() {
    // ─── フォーム state ─────────────────────────────
    const dogBreed   = ref('トイプードル');
    const dogAge     = ref('10');
    const address    = ref('東京都世田谷区');
    const concern    = ref('ダイエット');
    const email      = ref('');
    const reportHtml = ref('');
    const sent       = ref(false);

    // 表示制御
    const showReport = ref(false);
    const showRadar  = ref(false);

    // ─── AIチャットモック state ───────────────────────
    const aiInput      = ref('');
    const aiResponse   = ref('');
    const isAIThinking = ref(false);
    function sendToAI() {
      if (!aiInput.value.trim()) return;
      isAIThinking.value = true;
      const prompt = aiInput.value;
      aiResponse.value = '';
      setTimeout(() => {
        aiResponse.value = `AI応答(モック): 「${prompt}」についてです。`;
        isAIThinking.value = false;
      }, 800);
      aiInput.value = '';
    }

    // ─── メインチャート state & ロジック ─────────────
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
          labels: [
            '健康アドバイス',
            '地域情報',
            '教材提案',
            'AIチャット',
            'アルバム利用'
          ],
          datasets: [{
            label: '活用度スコア',
            data: scores,
            backgroundColor: [
              '#0d6efd',
              '#198754',
              '#ffc107',
              '#6f42c1',
              '#fd7e14'
            ]
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true, max: 100 } }
        }
      });
    }

    // ─── QC7つ道具 レーダーチャート ────────────────────
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
          labels: [
            'パレート図','ヒストグラム','管理図',
            '散布図','チェックシート','層別','特性要因図'
          ],
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

    // ─── レポート生成イベント ─────────────────────────
    async function generateReport() {
      // モック用サンプルHTML
      // 例：setup 関数内などで代入
      reportHtml.value = `
        <ul style="line-height:1.6">
          <li>
            <b>● 年齢・犬種別健康アドバイス:</b><br />
            10&nbsp;歳のトイプードルはシニア期に入り、膝蓋骨脱臼や心臓疾患のリスクが高まります。
            半年ごとの血液検査・心電図に加えて体重と BCS を定期チェックし、
            高タンパク・低脂肪のシニア専用フードへ切り替えることで関節負担と体重増加を防ぎましょう。
            １日 20–30&nbsp;分の散歩や屋内トレッドミル運動を取り入れ、筋力と認知機能の低下を予防してください。
          </li>

          <li>
            <b>● 地域のお役立ち情報:</b><br />
            世田谷区近隣には英語対応の<strong>羽根木動物病院</strong>や日曜診療の<strong>アニマ動物病院</strong>など、
            シニア犬向け循環器検査や歯科ケアに強い施設があります。
            愛犬同伴 OK の<strong>Dog&nbsp;Cafe&nbsp;ABC</strong>（下北沢）では
            低脂肪メニューが充実しており、食事療法中でも安心して外出が楽しめます。
          </li>

          <li>
            <b>● 教材のご提案:</b><br />
            体重管理を学べる『<em>愛犬のための健康ダイエット</em>』は
            カロリー計算表と 30&nbsp;日メニュー例付きで栄養管理を自宅で実践できます。
            さらに『<em>究極のドッグフードガイド</em>』を併読し、
            AAFCO 基準や原材料表示を読み解く力を身につけるとフード選びに役立ちます。
          </li>

          <li>
            <b>● AI&nbsp;サマリー:</b><br />
            過去 3&nbsp;か月の活動ログ平均は 4,200&nbsp;歩／日で推奨値を下回っています。
            AI の提案では、水中トレッドミルとノーズワークを週 3&nbsp;回追加することで
            カロリー消費を 15&nbsp;% 向上できると推定されました。
            月 1&nbsp;回のオンライン健康相談でデータ共有すると、
            行動変化や食欲低下を早期に検知できます。
          </li>

          <li>
            <b>● アルバム利用:</b><br />
            直近 30&nbsp;日で 10 枚の写真がアップロードされ、
            うち 7 枚は屋外散歩中の笑顔写真でした。
            AI フォトアルバム機能が自動で「散歩」「トレーニング前」など
            ５カテゴリにタグ付け済みです。次回は「関節ストレッチ」タグ追加を推奨します。
          </li>
        </ul>
      `;

      showReport.value = true;

      // サンプルスコア配列（より多様に）
      const scores = [85, 65, 92, 78, 50];
      await initMainChart(scores);
    }

    function downloadPDF() { window.print(); }
    function sendMailFn()  { sent.value = true; }
    function onShowRadar() {
      showRadar.value = true;
      renderRadar();
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
      dogBreed, dogAge, address, concern, email,
      // レポート
      reportHtml, sent, showReport, generateReport,
      downloadPDF, sendMail: sendMailFn,
      // AIチャット
      aiInput, aiResponse, isAIThinking, sendToAI,
      // メインチャート
      chartCanvas,
      // レーダーチャート
      radarCanvas, showRadar, onShowRadar
    };
  },

  // ─── テンプレート：フォーム・出力・チャート・AIチャット ───
  template: `
    <div class="container py-4">
      <h3>カスタムレポート生成 <span class="badge bg-info">モック部品追加版</span></h3>

      <!-- 入力フォーム -->
      <form class="row g-3" @submit.prevent="generateReport" style="max-width:600px;">
        <div class="col-6">
          <label class="form-label">犬種</label>
          <select class="form-select" v-model="dogBreed">
            <option>トイプードル</option>
            <option>柴犬</option>
            <option>その他</option>
          </select>
        </div>
        <div class="col-6">
          <label class="form-label">年齢</label>
          <select class="form-select" v-model="dogAge">
            <option>3</option><option>10</option><option>15</option>
          </select>
        </div>
        <div class="col-12">
          <label class="form-label">住所（都道府県）</label>
          <input class="form-control" v-model="address" />
        </div>
        <div class="col-12">
          <label class="form-label">気になっていること</label>
          <select class="form-select" v-model="concern">
            <option>しつけ</option><option>健康</option><option>ダイエット</option>
          </select>
        </div>
        <div class="col-12 text-end">
          <button class="btn btn-primary">レポートを生成</button>
        </div>
      </form>

      <!-- レポート＆バーグラフ -->
      <div v-if="showReport" class="mt-4">
        <canvas ref="chartCanvas" class="mb-3 w-100" height="150"></canvas>
        <div v-html="reportHtml" class="card p-3 mb-3"></div>
        <div class="text-end mb-4">
          <button class="btn btn-secondary me-2" @click="downloadPDF()">PDFダウンロード</button>
          <button class="btn btn-success" @click="sendMail" :disabled="!email||sent">メール送信</button>
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

      <!-- QC7つ道具 レーダーチャート -->
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
