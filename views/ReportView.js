// views/ReportView.js

// import 文や export default を使わず、Vueグローバルで実装
const ReportView = {
  setup() {
    // Composition API は Vue.xxx で取得
    const dogBreed = Vue.ref('');
    const dogAge = Vue.ref('');
    const address = Vue.ref('');
    const concern = Vue.ref('');
    const email = Vue.ref('');
    const reportHtml = Vue.ref('');
    const sent = Vue.ref(false);

    // 疾患統計データ例
    const diseaseStats = {
      'トイプードル': {
        '10': '膝蓋骨脱臼に注意。運動量とフードに気をつけましょう。',
        '3': 'アレルギーや皮膚疾患が増加。こまめなケアを。'
      },
      '柴犬': {
        '10': 'シニア期の腎臓ケアと定期健診が推奨されます。',
        '3': 'アトピー性皮膚炎のリスクあり。早期対策を。'
      }
    };

    // 地域データ例
    const regionShops = {
      '東京都': '世田谷動物病院、トリミングサロンPECO、カフェDogCafe123',
      '大阪府': '梅田動物クリニック、トリミングサロンCoco、カフェWanWan'
    };

    // 教材提案
    const concernBooks = {
      'しつけ': 'オススメ本：「犬のしつけ完全ガイド」',
      '健康': 'オススメ本：「長生き犬ごはん」',
      'ダイエット': 'オススメ本：「愛犬のための健康ダイエット」'
    };

    function generateReport() {
      let result = '';

      // 例①：保険会社データ×犬種年齢
      if (dogBreed.value && dogAge.value) {
        const breed = diseaseStats[dogBreed.value];
        let diseaseMsg = '';
        if (breed) {
          diseaseMsg = breed[dogAge.value] || 'データがありませんが、定期健診をおすすめします。';
        } else {
          diseaseMsg = '犬種データがありませんが、健康に気をつけてください。';
        }
        result += `<h5>● 年齢・犬種別健康アドバイス</h5><p>${diseaseMsg}</p>`;
        result += `<p><b>【推奨保険商品】</b> ペット健康サポート保険（${dogBreed.value}専用プラン）</p>`;
      }

      // 例②：地域×メーカー
      if (address.value) {
        let pref = address.value.substring(0, 3); // 簡易都道府県判定
        let regionMsg = regionShops[pref] || 'お近くの動物病院やカフェは検索サイトでご確認ください。';
        result += `<h5>● 地域のお役立ち情報</h5><p>${regionMsg}</p>`;
      }

      // 例③：気になっていること×教材提案
      if (concern.value) {
        let cMsg = concernBooks[concern.value] || '関連教材はお問い合わせください。';
        result += `<h5>● 教材のご提案</h5><p>${cMsg}</p>`;
      }

      if (!result) result = '入力内容に応じたレポートを生成します。';
      reportHtml.value = result;
      sent.value = false;
    }

    function sendMail() {
      // 本来はAPI経由で送信
      sent.value = true;
    }

    return {
      dogBreed, dogAge, address, concern, email, reportHtml, sent, generateReport, sendMail
    };
  },
  template: `
    <div class="container py-4">
      <h3>カスタムレポート生成</h3>
      <form class="row g-3" @submit.prevent="generateReport" style="max-width:600px">
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
          <input type="text" class="form-control" v-model="address" placeholder="例：東京都港区"/>
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
        <div class="col-12">
          <label class="form-label">メールアドレス</label>
          <input type="email" class="form-control" v-model="email" placeholder="example@domain.com"/>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">レポートを生成</button>
        </div>
      </form>

      <div v-if="reportHtml" class="my-4">
        <div class="card">
          <div class="card-header">あなたへのオリジナルレポート</div>
          <div class="card-body">
            <div v-html="reportHtml"></div>
          </div>
          <div class="card-footer">
            <button class="btn btn-success" @click="sendMail" :disabled="sent || !email">メールで送信</button>
            <span v-if="sent" class="text-success ms-3">メール送信しました！（モック）</span>
          </div>
        </div>
      </div>
    </div>
  `
};

// ルーターで使用するため、main.jsやrouter.jsで
// { path: '/report', component: ReportView, name: 'report' }
// として登録してください。
