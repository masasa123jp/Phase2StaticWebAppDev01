// components/App.js
import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import PrivacyFooter from './PrivacyFooter.js';

export default defineComponent({
  name: 'App',
  components: {
    RouterLink,
    RouterView,
    PrivacyFooter
  },
  setup() {
    const links = [
      { label: 'ホーム',       to: { name: 'home' } },
      { label: 'ログイン', to: { name: 'auth' } },
      { label: 'チャット',     to: { name: 'chat' } },
      { label: 'アルバム',     to: { name: 'album' } },
      { label: '設定',         to: { name: 'settings' } },
      { label: 'レポート',     to: { name: 'report' } },
      { label: 'プライバシー', to: { name: 'privacy' } }
    ];
    return { links };
  },
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">RORO</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              class="nav-item"
              v-for="link in links"
              :key="link.to.name"
            >
              <RouterLink class="nav-link" :to="link.to">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <RouterView />

    <!-- 各ページ下部にプライバシーフッターを表示 -->
    <PrivacyFooter />

    <footer class="text-center py-3 text-muted">
      © 2025 Project RORO
    </footer>
  `
});
