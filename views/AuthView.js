// views/AuthView.js
import { defineComponent } from "vue";

const providers = [
  {
    key: "google",
    name: "Google",
    icon: "bi-google",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    clientId: "YOUR_GOOGLE_CLIENT_ID",
    scope: "openid email profile"
  },
  {
    key: "line",
    name: "LINE",
    icon: "bi-line",
    authUrl: "https://access.line.me/oauth2/v2.1/authorize",
    clientId: "YOUR_LINE_CHANNEL_ID",
    scope: "profile openid email"
  },
  {
    key: "amazon",
    name: "Amazon",
    icon: "bi-amazon",
    authUrl: "https://www.amazon.com/ap/oa",
    clientId: "YOUR_AMAZON_CLIENT_ID",
    scope: "profile"
  },
  {
    key: "twitter",
    name: "X（Twitter）",
    icon: "bi-twitter-x", // 公式アイコンなければbi-twitterで代替
    authUrl: "https://twitter.com/i/oauth2/authorize",
    clientId: "YOUR_TWITTER_CLIENT_ID",
    scope: "tweet.read users.read offline.access"
  },
  {
    key: "facebook",
    name: "Facebook",
    icon: "bi-facebook",
    authUrl: "https://www.facebook.com/v17.0/dialog/oauth",
    clientId: "YOUR_FACEBOOK_APP_ID",
    scope: "email public_profile"
  }
];

export default defineComponent({
  name: "AuthView",
  setup() {
    const baseRedirectUri = "https://yourapp.azurewebsites.net/callback.html";
    function socialLogin(providerKey) {
      const provider = providers.find(p => p.key === providerKey);
      if (!provider) return;
      const redirectUri = encodeURIComponent(`${baseRedirectUri}?provider=${providerKey}`);
      const url = `${provider.authUrl}?response_type=code`
        + `&client_id=${provider.clientId}`
        + `&redirect_uri=${redirectUri}`
        + `&scope=${encodeURIComponent(provider.scope)}`
        + `&state=${crypto.randomUUID()}`;
      window.location.href = url;
    }
    return { providers, socialLogin };
  },
  template: `
    <div class="container py-5">
      <h1 class="mb-3">ログイン</h1>
      <p class="mb-4">お好きなサービスでログインしてください</p>
      <div class="d-flex flex-column gap-3">
        <button v-for="provider in providers" :key="provider.key"
          class="btn btn-outline-primary d-flex align-items-center gap-2"
          @click="socialLogin(provider.key)">
          <i :class="'bi ' + provider.icon"></i>
          {{ provider.name }}
        </button>
      </div>
    </div>
  `
});
