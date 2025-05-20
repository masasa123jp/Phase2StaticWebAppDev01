// views/ReportView.js

import { defineComponent, ref, nextTick } from 'vue';
import { useReport }      from '../modules/useReport.js';
import { useMainChart }   from '../modules/useMainChart.js';
import { useAIChat }      from '../modules/useAIChat.js';
import { useQCChart }     from '../modules/useQCChart.js';

export default defineComponent({
  name: 'ReportView',
  setup() {
    // フォーム & レポート
    const {
      dogBreed, dogAge, address, concern, email,
      reportHtml, sent, generateReport
    } = useReport();

    // メインチャート
    const chartCanvas = ref(null);
    const { initMainChart, updateMainChart, destroyMainChart } = useMainChart(chartCanvas);

    // AIチャット
    const { aiInput, aiResponse, isAIThinking, sendToAI } = useAIChat();

    // QC7ツール レーダーチャート
    const visualCanvas = ref(null);
    const { generateVisual } = useQCChart(visualCanvas);

    // レポート生成時にチャートも更新
    async function onGenerateReport() {
      generateReport();
      await nextTick();
      destroyMainChart();
      initMainChart();
      updateMainChart([
        dogBreed.value ? 1 : 0,
        address.value   ? 1 : 0,
        concern.value   ? 1 : 0
      ]);
    }

    // 初期チャート
    initMainChart();

    function downloadPDF() { window.print(); }
    function sendMail()    { sent.value = true; }

    return {
      dogBreed, dogAge, address, concern, email,
      reportHtml, sent,
      onGenerateReport, downloadPDF, sendMail,
      chartCanvas,
      aiInput, aiResponse, isAIThinking, sendToAI,
      generateVisual, visualCanvas
    };
  },
  template: `
    <div class="container py-4">
      <h3>カスタムレポート生成 <span class="badge bg-info">AIチャット、画面部品モック追加版</span></h3>

      <!-- 入力フォーム -->
      <form class="row g-3" @submit.prevent="onGenerateReport" style="max-width:600px;">
        <div class="col-6">
          <label class="form-label">犬種</label>
          <select class="form-select" v-model="dogBreed">
            <option value="">選択してください</option>
            <option>トイプードル</option>
            <option>柴犬</option>
            <option>その他</option>
          </select>
        </div>
        <div class="col-6">
          <label class="form-label">年齢</label>
          <select class="form-select" v-model="dogAge">
            <option value="">選択してください</option>
            <option>3</option>
            <option>10</option>
            <option>15</option>
          </select>
        </div>
        <div class="col-12">
          <label class="form-label">住所（都道府県）</label>
          <input type="text" class="form-control" v-model="address" placeholder="例：東京都港区" />
        </div>
        <div class="col-12">
          <label class="form-label">気になっていること</label>
          <select class="form-select" v-model="concern">
            <option value="">選択してください</option>
            <option value="しつけ">しつけ</option>
            <option value="健康">健康</option>
            <option value="ダイエット">ダイエット</option>
          </select>
        </div>
        <div class="col-12 text-end">
          <button type="submit" class="btn btn-primary">レポートを生成</button>
        </div>
      </form>

      <!-- メインチャート -->
      <canvas ref="chartCanvas" class="my-4 w-100" height="100"></canvas>

      <!-- レポート結果 -->
      <div v-html="reportHtml" class="card p-3 mb-4"></div>

      <!-- 操作ボタン -->
      <div class="text-end mb-4">
        <button class="btn btn-secondary me-2" @click="downloadPDF()">PDFダウンロード</button>
        <button class="btn btn-success" @click="sendMail" :disabled="!email || sent">メール送信</button>
        <span v-if="sent" class="text-success ms-2">送信完了！</span>
      </div>

      <!-- AIチャットモック -->
      <div class="card my-4">
        <div class="card-header">AIによる追加説明チャット</div>
        <div class="card-body">
          <div class="mb-2">
            <input
              v-model="aiInput"
              @keyup.enter="sendToAI"
              class="form-control"
              placeholder="AIに質問してみる…"
              :disabled="isAIThinking"
            />
          </div>
          <button class="btn btn-outline-primary mb-3" @click="sendToAI" :disabled="isAIThinking">
            {{ isAIThinking ? 'AI応答中…' : '質問を送信' }}
          </button>
          <div v-if="aiResponse" class="border rounded p-3 bg-light">{{ aiResponse }}</div>
        </div>
      </div>

      <!-- QC7つ道具 レーダーチャートモック -->
      <div class="card my-4">
        <div class="card-header">QC7つ道具 活用度レーダーチャート</div>
        <div class="card-body text-center">
          <button class="btn btn-outline-success mb-3" @click="generateVisual">
            レーダーチャートを表示
          </button>
          <div v-if="visualCanvas">
            <canvas ref="visualCanvas" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>
  `
});
