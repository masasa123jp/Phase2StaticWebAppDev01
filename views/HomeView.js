// views/HomeView.js

import { defineComponent, reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  name: 'HomeView',
  components: { RouterLink },
  setup() {
    // KPI のダミーデータ
    const stats = reactive([
      { label: '登録ユーザー数', value: 75 },   // 75%
      { label: 'レポート生成数', value: 60 },   // 60%
      { label: 'アルバム作成数', value: 45 },   // 45%
      { label: 'リテンション率', value: 85 }    // 85%
    ]);

    // ニュースレター用メールアドレス
    const newsletterEmail = ref('');
    const subscribed      = ref(false);

    function subscribe() {
      if (!newsletterEmail.value) return;
      subscribed.value = true;
    }

    return {
      stats,
      newsletterEmail,
      subscribed,
      subscribe
    };
  },
  template: `
    <div>
      <!-- ヒーローセクション with 動画背景 -->
      <section class="position-relative overflow-hidden" style="height: 80vh;">
        <video autoplay muted loop playsinline 
               class="position-absolute w-100 h-100 object-fit-cover">
          <source 
            src="https://www.pexels.com/download/video/7982689/" 
            type="video/mp4" 
          />
        </video>
        <div class="position-relative text-center text-white d-flex flex-column justify-content-center align-items-center h-100 bg-dark bg-opacity-50">
          <h1 class="display-3 fw-bold">ようこそ、Project ROROへ</h1>
          <p class="lead mb-4">あなたのペットライフをAIでより豊かに</p>
          <RouterLink to="/chat" class="btn btn-lg btn-light">今すぐはじめる</RouterLink>
        </div>
      </section>

      <!-- 特徴ハイライト -->
      <section class="container my-5">
        <h2 class="text-center mb-4">特徴</h2>
        <div class="row gx-4 gy-4">
          <div
            class="col-md-3"
            v-for="(feat, i) in [
              { icon:'bi-chat-dots-fill', title:'AIチャット', desc:'対話でペットの健康相談' },
              { icon:'bi-bar-chart-fill', title:'データ分析', desc:'蓄積された行動ログを解析' },
              { icon:'bi-journal-album', title:'フォトアルバム', desc:'思い出を美しく形に' },
              { icon:'bi-gear-fill', title:'カスタマイズ', desc:'通知やテーマを自由に設定' }
            ]"
            :key="i"
          >
            <div class="card h-100 text-center p-3">
              <i :class="['bi', feat.icon, 'display-4', 'text-primary']"></i>
              <h5 class="mt-3">{{ feat.title }}</h5>
              <p class="small text-muted">{{ feat.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- KPI統計 -->
      <section class="bg-light py-5">
        <div class="container">
          <h2 class="text-center mb-4">実績</h2>
          <div class="row gx-4">
            <div class="col-md-3" v-for="(s, i) in stats" :key="i">
              <h5>{{ s.label }}</h5>
              <div class="progress" style="height: 1rem;">
                <div
                  class="progress-bar bg-success"
                  role="progressbar"
                  :style="{ width: s.value + '%' }"
                  :aria-valuenow="s.value"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {{ s.value }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- パートナーロゴ -->
      <section class="container my-5">
        <h2 class="text-center mb-4">協賛企業</h2>
        <div class="d-flex justify-content-around flex-wrap align-items-center">
          <img src="./assets/logos/logo1.png" alt="Logo1" class="m-2" />
          <img src="./assets/logos/logo2.png" alt="Logo2" class="m-2" />
          <img src="./assets/logos/logo3.png" alt="Logo3" class="m-2" />
          <img src="./assets/logos/logo4.png" alt="Logo4" class="m-2" />
        </div>
      </section>

      <!-- ユーザーテストimonial Carousel -->
      <section class="container my-5">
        <h2 class="text-center mb-4">声をお聞かせいただきました</h2>
        <div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div
              class="carousel-item text-center"
              v-for="(t, idx) in [
                { text:'「記録が簡単で毎日続けられます！」',    name:'ユーザーX' },
                { text:'「アルバムが届くのが楽しみです」',    name:'ユーザーY' },
                { text:'「通知設定が便利で助かります」',      name:'ユーザーZ' }
              ]"
              :class="{ active: idx === 0 }"
              :key="idx"
            >
              <p class="fs-5">{{ t.text }}</p>
              <p class="fw-bold">– {{ t.name }}</p>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>

      <!-- ニュースレター登録 -->
      <section class="bg-primary text-white py-5">
        <div class="container text-center">
          <h2 class="mb-3">最新情報をお届け</h2>
          <p class="mb-4">お得なキャンペーンや新機能リリース情報をメールでお知らせします。</p>
          <div class="row justify-content-center">
            <div class="col-md-6">
              <div class="input-group">
                <input
                  type="email"
                  class="form-control"
                  placeholder="メールアドレス"
                  v-model="newsletterEmail"
                />
                <button
                  class="btn btn-light"
                  @click="subscribe"
                  :disabled="subscribed"
                >
                  {{ subscribed ? '登録済み' : '登録する' }}
                </button>
              </div>
              <p v-if="subscribed" class="mt-2">ご登録をご検討ください！</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
});
