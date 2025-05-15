// router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from './views/HomeView.js';
import ChatView from './views/ChatView.js';
import AlbumView from './views/AlbumView.js';
import SettingsView from './views/SettingsView.js';
import ReportView from './views/ReportView.js';

const routes = [
  { path: '/', component: HomeView, name: 'home' },
  { path: '/chat', component: ChatView, name: 'chat' },
  { path: '/album', component: AlbumView, name: 'album' },
  { path: '/settings', component: SettingsView, name: 'settings' },
  { path: '/report', component: ReportView, name: 'report' }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
