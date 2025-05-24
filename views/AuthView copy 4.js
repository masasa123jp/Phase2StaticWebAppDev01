// views/AuthView.js

// views/AuthView.js

// B2C認証プロバイダーへの誘導画面（モック）
// 実際のリダイレクト先URLはAzure B2C or Static Web Apps認証エンドポイントに変更してください

const AuthView = {
  setup() {
    // 各種IDプロバイダのロゴやラベル等を定義
    const providers = [
      {
        key: "google",
        label: "Googleでログイン",
        icon: "bi-google",
        url: "/.auth/login/google"
      },
      {
        key: "facebook",
        label: "Facebookでログイン",
        icon: "bi-facebook",
        url: "/.auth/login/facebook"
      },
      {
        key: "twitter",
        label: "X（旧Twitter）でログイン",
        icon: "bi-twitter-x", // Bootstrap Icons 1.11以降でXロゴに対応
        url: "/.auth/login/twitter"
      },
      {
        key: "microsoft",
        label: "Microsoftでログイン",
        icon: "bi-microsoft",
        url: "/.auth/login/microsoft"
      },
      {
        key: "apple",
        label: "Appleでログイン",
        icon: "bi-apple",
        url: "/.auth/login/apple"
      }
      // 他にもLINE、Yahoo等を追加可能
    ];
    return { providers };
  },
  template: `
    <div class="container py-5 d-flex flex-column align-items-center">
      <h3 class="mb-4">外部サービスでサインイン</h3>
      <p class="mb-4 text-muted text-center" style="max-width: 500px;">
        本サービスでは、お持ちの各種Webサービスアカウント（Google, Facebook, X, Microsoft, Appleなど）で簡単にログインできます。
        <br>
        アカウントを連携することで、よりパーソナライズされた機能を安心・安全にご利用いただけます。
      </p>
      <div class="w-100" style="max-width: 340px;">
        <button
          v-for="p in providers"
          :key="p.key"
          class="btn btn-outline-primary w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
          :onclick="'location.href=\\'' + p.url + '\\''"
          style="font-size:1.2rem;"
        >
          <i :class="['bi', p.icon, 'me-2']" style="font-size:1.5rem;"></i>
          {{ p.label }}
        </button>
      </div>
      <div class="mt-4">
        <router-link to="/" class="btn btn-link">← 戻る</router-link>
      </div>
      <div class="text-muted mt-3" style="font-size:0.9rem;">
        ※ ログインボタンをクリックすると外部認証画面に遷移します。
      </div>
    </div>
  `
};

export default AuthView;
