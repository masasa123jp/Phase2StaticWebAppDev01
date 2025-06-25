// views/AuthView.js

// 公式ブランドガイドラインの色・ロゴ（SVG）・テキストを指定
const providers = [
  {
    key: "line",
    label: "LINEでログイン",
    color: "#06C755",
    textColor: "#fff",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="#06C755"/><g><path fill="#fff" d="M20,12c-6.627,0-12,3.911-12,8.73c0,3.071,2.732,5.729,6.834,7.056l-0.444,3.059c-0.047,0.325,0.197,0.625,0.527,0.625 c0.085,0,0.172-0.02,0.256-0.063l3.576-1.887C19.217,29.788,19.601,29.84,20,29.84c6.627,0,12-3.911,12-8.73 S26.627,12,20,12z"/></g></svg>`,
  },
  {
    key: "apple",
    label: "Appleでサインイン",
    color: "#000000",
    textColor: "#fff",
    svg: `<svg width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M19.665 17.143c-.244.556-.535 1.084-.873 1.58-.462.662-.84 1.122-1.134 1.377-.454.409-.94.618-1.456.627-.37 0-.816-.107-1.34-.32-.525-.215-.968-.32-1.33-.32-.375 0-.827.104-1.357.32-.529.213-.963.321-1.295.327-.504.023-1.002-.197-1.491-.662-.32-.27-.711-.739-1.174-1.408-.502-.73-.918-1.579-1.25-2.546C4.672 13.952 4.5 13.064 4.5 12.246c0-1.002.243-1.837.73-2.506.486-.67 1.147-1.006 1.978-1.006.4 0 .922.144 1.567.432.645.288 1.06.432 1.242.432.15 0 .61-.166 1.382-.5.742-.324 1.372-.459 1.89-.405.997.08 1.747.418 2.245 1.012-.902.545-1.352 1.312-1.346 2.299.005.767.286 1.416.839 1.945.248.24.532.434.851.58.172.08.447.176.828.29-.064.178-.136.365-.218.56zM15.378 4.353c.005.274-.1.567-.314.881-.2.296-.443.526-.726.69-.203.123-.414.213-.63.268-.01-.02-.02-.048-.03-.082a1.824 1.824 0 0 1-.098-.544c0-.271.112-.566.33-.882.216-.311.464-.541.74-.691.193-.107.39-.176.59-.207.009.027.021.058.038.096.021.05.038.094.05.13z"/></svg>`,
  },
  {
    key: "yahoo",
    label: "ログイン",
    color: "#FF0033",
    textColor: "#fff",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="#FF0033"/><text x="8" y="28" font-family="Arial Black,Arial,sans-serif" font-weight="bold" font-size="22" fill="#fff">Y!</text></svg>`,
  },
  {
    key: "google",
    label: "Googleでログイン",
    color: "#4285F4",
    textColor: "#fff",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.4-5.7 7.5-11.3 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c2.8 0 5.4.97 7.4 2.6l6.6-6.6C34.5 6.2 29.5 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20c11.05 0 19.93-8.95 19.93-20 0-1.3-.13-2.7-.33-3.5z"/><path fill="#34A853" d="M6.6 14.9l6.6 4.8C15.3 16.3 19.3 14 24 14c2.8 0 5.4.97 7.4 2.6l6.6-6.6C34.5 6.2 29.5 4 24 4c-7.5 0-13.9 4.05-17.4 10.9z"/><path fill="#FBBC05" d="M24 44c5.5 0 10.5-1.8 14.4-4.8l-6.7-5.5C29.5 36.3 26.9 37 24 37c-5.6 0-10.4-3.6-12.2-8.6l-6.6 5.1C10.1 39.8 16.6 44 24 44z"/><path fill="#EA4335" d="M43.6 20.5H42V20H24v8h11.3c-0.7 2-2.1 3.7-4 4.8l6.7 5.5C41.7 41.3 44 36.4 44 24c0-1.3-.13-2.7-.33-3.5z"/></g></svg>`,
  },
  {
    key: "facebook",
    label: "Facebookでログイン",
    color: "#1877F2",
    textColor: "#fff",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#fff"/><path fill="#1877F2" d="M17.675 12H14.25V21H10.25V12H7.5V9H10.25V7.175C10.25 4.95 11.475 4 13.425 4C14.25 4 15.075 4.075 15.3 4.1V7H13.95C13.175 7 13.25 7.375 13.25 7.95V9H15.5L15.175 12Z"/></svg>`,
  },
  {
    key: "twitter",
    label: "Twitterでログイン",
    color: "#1DA1F2",
    textColor: "#fff",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 400 400"><circle cx="200" cy="200" r="200" fill="#fff"/><path fill="#1DA1F2" d="M153.6,301.6c94.3,0,146-78.1,146-145.8c0-2.2,0-4.3-0.2-6.4c10-7.2,18.7-16.1,25.6-26.3 c-9.3,4.1-19.2,6.9-29.6,8.1c10.6-6.4,18.7-16.6,22.5-28.8c-9.9,5.8-20.9,10.1-32.6,12.4c-9.3-9.9-22.6-16.1-37.3-16.1 c-28.3,0-51.3,22.9-51.3,51.2c0,4,0.4,7.8,1.3,11.4C102.6,175.5,59.8,153,33.2,120.3c-4.4,7.6-7,16.5-7,25.9 c0,17.9,9.1,33.6,23.1,42.9c-8.5-0.3-16.5-2.6-23.5-6.5c0,0.2,0,0.4,0,0.6c0,25,17.7,45.8,41.2,50.6c-4.3,1.2-8.8,1.8-13.5,1.8 c-3.3,0-6.5-0.3-9.6-0.9c6.5,20.3,25.3,35.2,47.6,35.6c-17.5,13.7-39.7,21.8-63.7,21.8c-4.1,0-8.1-0.2-12-0.7 C93.2,293.7,121.1,301.6,153.6,301.6"/></svg>`,
  }
];

const AuthView = {
  setup() {
    return { providers };
  },
  template: `
    <div class="container py-5 d-flex flex-column align-items-center" style="max-width:340px;">
      <h3 class="mb-2 fw-bold text-center">外部アカウントでログイン</h3>
      <div class="w-100">
        <button
          v-for="p in providers"
          :key="p.key"
          :style="{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '48px',
            marginBottom: '14px',
            borderRadius: '8px',
            background: p.color,
            color: p.textColor,
            border: 'none',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.07)',
            cursor: 'pointer',
            letterSpacing: '0.02em'
          }"
          @click="window.location.href=p.key==='twitter'? '/.auth/login/twitter': '/.auth/login/'+p.key"
        >
          <span v-html="p.svg" style="width:32px;display:flex;align-items:center;justify-content:center;"></span>
          <span style="flex:1;text-align:center;">{{ p.label }}</span>
        </button>
      </div>
      <router-link to="/" class="btn btn-link w-100 mt-2">← 戻る</router-link>
    </div>
  `
};

export default AuthView;
