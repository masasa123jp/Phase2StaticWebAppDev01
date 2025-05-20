// router.js

// ── 1) ブラウザで直接読み込む CDN 版の ESM ビルドを指定 ──
import {
  createRouter,
  createWebHashHistory
} from 'https://unpkg.com/vue-router@4/dist/vue-router.esm-browser.prod.js';

import HomeView    from './views/HomeView.js';
import ChatView    from './views/ChatView.js';
import AlbumView   from './views/AlbumView.js';
import SettingsView from './views/SettingsView.js';
import ReportView  from './views/ReportView.js';
import PrivacyView from './views/PrivacyView.js';

const routes = [
  { path: '/',        component: HomeView,      name: 'home'    },
  { path: '/chat',    component: ChatView,      name: 'chat'    },
  { path: '/album',   component: AlbumView,     name: 'album'   },
  { path: '/settings',component: SettingsView,  name: 'settings'},
  { path: '/report',  component: ReportView,    name: 'report'  },
  { path: '/privacy', component: PrivacyView,   name: 'privacy' }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
