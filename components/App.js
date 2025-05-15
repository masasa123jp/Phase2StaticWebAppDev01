// components/App.js

export default {
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">RORO</a>
        <!-- aria-controls と aria-label を追加 -->
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

        <!-- id を mainNav に変更 -->
        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item" v-for="l in links" :key="l.to.name">
              <router-link class="nav-link" :to="l.to">{{ l.label }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
    <footer class="text-center py-3 text-muted">© 2025 Project RORO</footer>
  `,
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
