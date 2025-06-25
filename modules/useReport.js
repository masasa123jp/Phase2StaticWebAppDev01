// modules/useReport.js
import { ref } from 'vue';
import { diseaseStats, regionShops, concernBooks } from './reportData.js';

export function useReport() {
  const dogBreed   = ref('');
  const dogAge     = ref('');
  const address    = ref('');
  const concern    = ref('');
  const email      = ref('');
  const reportHtml = ref('');
  const sent       = ref(false);

  function generateReport() {
    let html = '';

    if (dogBreed.value && dogAge.value) {
      const msg = (diseaseStats[dogBreed.value]?.[dogAge.value])
        || 'データがありませんが、定期健診をおすすめします。';
      html += `<h5>● 年齢・犬種別健康アドバイス</h5><p>${msg}</p>`;
    }

    if (address.value) {
      const pref = address.value.slice(0, 3);
      const shop = regionShops[pref] || '検索サイトでご確認ください。';
      html += `<h5>● 地域のお役立ち情報</h5><p>${shop}</p>`;
    }

    if (concern.value) {
      const book = concernBooks[concern.value] || 'お問い合わせください。';
      html += `<h5>● 教材のご提案</h5><p>${book}</p>`;
    }

    reportHtml.value = html || '<p>入力内容に応じたレポートを生成します。</p>';
    sent.value = false;
  }

  return {
    dogBreed, dogAge, address, concern, email,
    reportHtml, sent,
    generateReport
  };
}
