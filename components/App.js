// components/App.js
export default {
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">RORO</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-expanded="false">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="nav" class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto">
            <li class="nav-item" v-for="l in links" :key="l.to">
              <router-link class="nav-link" :to="l.to">{{l.label}}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
    <footer class="text-center py-3 text-muted">© 2025 Project RORO</footer>
  `,
  data() {
    return {
      links: [
        { label: 'ホーム', to: { name: 'home' } },
        { label: 'チャット', to: { name: 'chat' } },
        { label: 'アルバム', to: { name: 'album' } },
        { label: '設定', to: { name: 'settings' } }
      ]
    };
  }
};
