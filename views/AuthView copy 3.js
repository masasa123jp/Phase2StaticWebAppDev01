// views/AuthView.js

const lineSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 40 40" style="display:block;vertical-align:middle;">
    <rect width="40" height="40" rx="8" fill="#06C755"/>
    <path fill="#fff" d="M20 11c-5.56 0-10.07 3.58-10.07 8 0 3.07 2.4 5.64 5.8 6.82.23.07.54.22.62.64l.15.59c.04.16.06.29-.01.46-.06.18-.16.25-.3.24a6.4 6.4 0 0 1-.48-.04c-2.93-.34-5.09-2.37-5.09-4.75C10.5 14.5 14.75 11 20 11s9.5 3.5 9.5 7.96c0 2.38-2.16 4.41-5.09 4.75-.16.02-.33.03-.48.04-.14.01-.23-.06-.3-.24a.6.6 0 0 1-.01-.46l.15-.59c.08-.42.39-.57.62-.64 3.4-1.18 5.8-3.75 5.8-6.82 0-4.42-4.51-8-10.07-8z"/>
  </svg>`;

const appleIcon = `<i class="bi bi-apple" style="font-size:1.5rem;vertical-align:middle;"></i>`;

const yahooSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32" style="display:block;vertical-align:middle;">
    <rect width="32" height="32" rx="8" fill="#FF0033"/>
    <text x="7" y="24" font-family="Arial Black,Arial,sans-serif" font-weight="bold" font-size="22" fill="#fff">Y!</text>
  </svg>`;

const googleSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48" style="display:block;vertical-align:middle;">
    <g>
      <path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.4-5.7 7.5-11.3 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c2.8 0 5.4.97 7.4 2.6l6.6-6.6C34.5 6.2 29.5 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20c11.05 0 19.93-8.95 19.93-20 0-1.3-.13-2.7-.33-3.5z"/>
      <path fill="#34A853" d="M6.6 14.9l6.6 4.8C15.3 16.3 19.3 14 24 14c2.8 0 5.4.97 7.4 2.6l6.6-6.6C34.5 6.2 29.5 4 24 4c-7.5 0-13.9 4.05-17.4 10.9z"/>
      <path fill="#FBBC05" d="M24 44c5.5 0 10.5-1.8 14.4-4.8l-6.7-5.5C29.5 36.3 26.9 37 24 37c-5.6 0-10.4-3.6-12.2-8.6l-6.6 5.1C10.1 39.8 16.6 44 24 44z"/>
      <path fill="#EA4335" d="M43.6 20.5H42V20H24v8h11.3c-0.7 2-2.1 3.7-4 4.8l6.7 5.5C41.7 41.3 44 36.4 44 24c0-1.3-.13-2.7-.33-3.5z"/>
    </g>
  </svg>`;

const facebookIcon = `<i class="bi bi-facebook" style="font-size:1.5rem;vertical-align:middle;"></i>`;

// X（旧Twitter）公式SVG（simpleicons.orgより）＋ "vertical-align"
const xSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 1200 1227" style="display:block;vertical-align:middle;">
    <path fill="#fff" d="M1143.5 0L727.2 505.6L1168.6 1227h-267.4L600.6 754.4L321.8 1227H40.2L477.5 500.6L34.1 0h268.1l281 400.8L871.8 0z"/>
  </svg>`;

const providers = [
  {
    key: "line",
    label: "LINEでログイン",
    icon: lineSVG,
    style: "background:#06C755;color:#fff;",
    url: "/.auth/login/line"
  },
  {
    key: "apple",
    label: "Appleでサインイン",
    icon: appleIcon,
    style: "background:#000;color:#fff;",
    url: "/.auth/login/apple"
  },
  {
    key: "yahoo",
    label: "Yahoo!でログイン",
    icon: yahooSVG,
    style: "background:#FF0033;color:#fff;",
    url: "/.auth/login/yahoo"
  },
  {
    key: "google",
    label: "Googleでログイン",
    icon: googleSVG,
    style: "background:#fff;color:#444;border:1px solid #e0e0e0;",
    url: "/.auth/login/google"
  },
  {
    key: "facebook",
    label: "Facebookでログイン",
    icon: facebookIcon,
    style: "background:#1877f2;color:#fff;",
    url: "/.auth/login/facebook"
  },
  {
    key: "x",
    label: "X（旧Twitter）でログイン",
    icon: xSVG,
    style: "background:#000;color:#fff;",
    url: "/.auth/login/twitter"
  }
];

export default {
  setup() {
    return { providers };
  },
  template: `
    <div class="container py-5 d-flex flex-column align-items-center" style="max-width:340px;">
      <h3 class="mb-2 fw-bold text-center">外部アカウントでログイン</h3>
      <p class="mb-3 small text-muted text-center">
        ID連携がはじめての方もこちらからどうぞ。<br>
        各サービスのアカウントで安全にログインできます。
      </p>
      <div class="w-100">
        <button
          v-for="p in providers"
          :key="p.key"
          class="btn w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
          :style="p.style"
          :onclick="'location.href=\\'' + p.url + '\\''"
          style="height:48px;font-size:1.1rem;"
        >
          <span v-html="p.icon" style="width:26px;min-width:22px;display:inline-block;"></span>
          <span style="flex:1;text-align:center;font-weight:500">{{ p.label }}</span>
        </button>
      </div>
      <router-link to="/" class="btn btn-link w-100 mt-2">← 戻る</router-link>
    </div>
  `
};
