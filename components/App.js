// components/App.js
import { defineComponent } from 'vue';
import PrivacyFooter from './PrivacyFooter.js';

export default defineComponent({
  name: 'App',
  components: {
    PrivacyFooter
  },
  setup() {
    const links = [
      { label: 'ホーム',   to: { name: 'home' } },
      { label: 'チャット', to: { name: 'chat' } },
      { label: 'アルバム', to: { name: 'album' } },
      { label: '設定',     to: { name: 'settings' } },
      { label: 'レポート', to: { name: 'report' } },
      { label: 'プライバシー保護について', to: { name: 'privacy' } }
    ];
    return { links };
  },
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">RORO</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="メニュートグル"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-for="l in links" :key="l.to.name">
              <router-link class="nav-link" :to="l.to">{{ l.label }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view />

    <!-- 各ページ下部にプライバシーフッターを表示 -->
    <PrivacyFooter />

    <footer class="text-center py-3 text-muted">© 2025 Project RORO</footer>
  `
});
