// main.js

// ルーターの作成
const routes = [
  { path: '/', component: HomeView, name: 'home' },
  { path: '/chat', component: ChatView, name: 'chat' },
  { path: '/album', component: AlbumView, name: 'album' },
  { path: '/settings', component: SettingsView, name: 'settings' },
  { path: '/report', component: ReportView, name: 'report' }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

// アプリケーションの作成
const App = {
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">RORO</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-expanded="false">
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
    <router-view></router-view>
    <footer class="text-center py-3 text-muted">© 2025 Project RORO</footer>`,
  setup() {
    return {
      links: [
        { label: 'ホーム', to: { name: 'home' } },
        { label: 'チャット', to: { name: 'chat' } },
        { label: 'アルバム', to: { name: 'album' } },
        { label: '設定', to: { name: 'settings' } },
        { label: 'レポート', to: { name: 'report' } }
      ]
    };
  }
};

// アプリケーションのマウント
Vue.createApp(App).use(router).mount('#app');
