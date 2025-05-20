// main.js
import { createApp } from 'vue';
import router from './router.js';
import App from './components/App.js';

// アプリケーション生成
const app = createApp(App);

// Vue Router を組み込む
app.use(router);

// 全ページ共通の PrivacyFooter は App 内で定義しているため、ここで改めて登録不要

// マウント
app.mount('#app');
