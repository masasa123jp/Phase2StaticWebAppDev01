// main.js

// 1) ルーター定義に PrivacyView を追加
const routes = [
  { path: '/',         component: HomeView,     name: 'home' },
  { path: '/chat',     component: ChatView,     name: 'chat' },
  { path: '/album',    component: AlbumView,    name: 'album' },
  { path: '/settings', component: SettingsView, name: 'settings' },
  { path: '/report',   component: ReportView,   name: 'report' },
  { path: '/privacy',  component: PrivacyView,  name: 'privacy' }  // ←追加
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

// 2) アプリ本体定義
const App = {
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">RORO</router-link>
        <button class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#nav"
                aria-controls="nav"
                aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="nav" class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto">
            <li class="nav-item" v-for="l in links" :key="l.to.name">
              <router-link class="nav-link" :to="l.to">{{ l.label }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- ここにビューが描画される -->
    <router-view></router-view>

    <!-- プライバシーフッター -->
    <PrivacyFooter />

    <!-- コピーライト -->
    <footer class="text-center py-3 text-muted">© 2025 Project RORO</footer>
  `,
  setup() {
    return {
      links: [
        { label: 'ホーム',   to: { name: 'home' } },
        { label: 'チャット', to: { name: 'chat' } },
        { label: 'アルバム', to: { name: 'album' } },
        { label: '設定',     to: { name: 'settings' } },
        { label: 'レポート', to: { name: 'report' } },
        { label: 'プライバシー', to: { name: 'privacy' } }  // ←追加
      ]
    };
  }
};

// 3) アプリケーションマウント時に PrivacyFooter をグローバル登録
const app = Vue.createApp(App);
app.component('PrivacyFooter', PrivacyFooter);
app.use(router);
app.mount('#app');
