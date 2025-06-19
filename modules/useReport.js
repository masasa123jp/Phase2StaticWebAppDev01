// modules/useReport.js

import { ref } from 'vue';

/**
 * useReport:
 * ユーザー入力に基づくカスタムレポートの送信・受信・表示処理を担うComposition APIフック。
 * ペット単位でのレポート生成に対応するよう拡張済み。
 */
export function useReport() {
  // ペットの入力状態（フォームバインディング用）
  const petName    = ref('');
  const species    = ref('');
  const breed      = ref('');
  const age        = ref('');
  const email      = ref('');

  // レポートの結果および状態管理
  const reportHtml = ref('');
  const sent       = ref(false);
  const loading    = ref(false);

  /**
   * generateReport:
   * APIに対してレポート生成リクエストをPOSTで送信。
   * 生成結果のダウンロードURLまたはエラーメッセージをHTMLで表示。
   */
  async function generateReport() {
    reportHtml.value = '';
    sent.value = false;
    loading.value = true;

    try {
      const res = await fetch('/api/reports/custom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pet_name: petName.value,
          species: species.value,
          breed: breed.value,
          age: age.value,
          email: email.value
        })
      });

      const data = await res.json();

      if (res.ok) {
        // レポート生成成功時
        reportHtml.value = `
          <h5>✔️ レポート生成完了</h5>
          <p>ダウンロードリンク: <a href="${data.download_url}" target="_blank">${data.download_url}</a></p>
        `;
      } else {
        // API側からのエラーを表示
        reportHtml.value = `<p class="text-danger">レポート生成に失敗しました: ${data.detail}</p>`;
      }
    } catch (err) {
      // 通信エラーなど
      reportHtml.value = `<p class="text-danger">エラーが発生しました: ${err.message}</p>`;
    } finally {
      loading.value = false;
    }
  }

  // 外部に公開する状態と関数
  return {
    petName, species, breed, age, email,
    reportHtml, sent, loading,
    generateReport
  };
}
