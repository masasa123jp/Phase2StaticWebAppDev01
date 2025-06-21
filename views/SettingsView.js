// views/SettingsView.js

import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  name: 'SettingsView',
  setup() {
    // ─── タブ状態管理 ───
    const activeTab = ref('profile'); // 初期タブ：プロフィール

    // ─── プロフィール情報（アバター、オーナー名、ペット名） ───
    const profile = reactive({
      owner: '',
      pet: '',
      avatar: ''
    });

    // ファイルアップロードイベントハンドラ（アバター画像を読み込み）
    function uploadAvatar(e) {
      const file = e.target.files[0];
      profile.avatar = file ? URL.createObjectURL(file) : '';
    }

    // ─── 通知設定（ニュースレター、アップデート） ───
    const notifications = reactive({
      newsletter: true,
      updates: false
    });

    // ─── テーマ選択（ライト / ダーク） ───
    const theme = ref('light');

    // ─── Webhook設定 ───
    const webhookUrl = ref('');
    const eventType  = ref('report_created'); // デフォルトイベント種別
    const result     = ref('');               // 成功メッセージ
    const error      = ref('');               // エラーメッセージ

    /**
     * Webhook登録処理：
     * ユーザーが入力した通知URLとイベント種別をAPIにPOST送信する
     */
    async function registerWebhook() {
      result.value = '';
      error.value = '';

      try {
        const res = await fetch('/api/webhooks/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: webhookUrl.value,
            event: eventType.value
          })
        });

        const data = await res.json();
        if (res.ok) {
          result.value = `登録成功：${data.url}`;
        } else {
          error.value = `登録失敗：${data.detail || '不明なエラー'}`;
        }
      } catch (err) {
        error.value = `[通信エラー] ${err.message}`;
      }
    }

    // ─── 外部公開 ───
    return {
      activeTab,
      profile,
      notifications,
      theme,
      uploadAvatar,
      webhookUrl,
      eventType,
      result,
      error,
      registerWebhook
    };
  },

  // ─── テンプレート ───
  template: `
    <div class="container py-4">
      <h3>設定</h3>

      <!-- タブナビゲーション -->
      <ul class="nav nav-tabs mb-3">
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'profile' }" @click.prevent="activeTab = 'profile'">
            プロフィール
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'notifications' }" @click.prevent="activeTab = 'notifications'">
            通知
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'theme' }" @click.prevent="activeTab = 'theme'">
            テーマ
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" :class="{ active: activeTab === 'webhook' }" @click.prevent="activeTab = 'webhook'">
            Webhook
          </a>
        </li>
      </ul>

      <!-- プロフィール設定 -->
      <div v-if="activeTab === 'profile'">
        <form class="row g-3">
          <div class="col-12 text-center">
            <img
              v-if="profile.avatar"
              :src="profile.avatar"
              class="rounded-circle mb-2"
              width="100"
              height="100"
            />
            <label class="btn btn-outline-secondary">
              アバターを変更
              <input type="file" hidden @change="uploadAvatar" />
            </label>
          </div>
          <div class="col-6">
            <label class="form-label">オーナー名</label>
            <input v-model="profile.owner" type="text" class="form-control" />
          </div>
          <div class="col-6">
            <label class="form-label">ペット名</label>
            <input v-model="profile.pet" type="text" class="form-control" />
          </div>
        </form>
      </div>

      <!-- 通知設定 -->
      <div v-if="activeTab === 'notifications'">
        <div class="form-check form-switch mb-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="newsletterSwitch"
            v-model="notifications.newsletter"
          />
          <label class="form-check-label" for="newsletterSwitch">ニュースレター</label>
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="updatesSwitch"
            v-model="notifications.updates"
          />
          <label class="form-check-label" for="updatesSwitch">アップデート情報</label>
        </div>
      </div>

      <!-- テーマ設定 -->
      <div v-if="activeTab === 'theme'">
        <div class="form-check">
          <input class="form-check-input" type="radio" id="lightTheme" value="light" v-model="theme" />
          <label class="form-check-label" for="lightTheme">ライトモード</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="darkTheme" value="dark" v-model="theme" />
          <label class="form-check-label" for="darkTheme">ダークモード</label>
        </div>
        <div class="mt-3">
          <small>プレビュー:</small>
          <div :class="theme === 'dark' ? 'bg-dark text-white p-3' : 'bg-white text-dark p-3'">
            {{ theme === 'dark' ? 'ダークテーマ適用中' : 'ライトテーマ適用中' }}
          </div>
        </div>
      </div>

      <!-- Webhook設定 -->
      <div v-if="activeTab === 'webhook'">
        <div class="mb-3">
          <label class="form-label">通知先URL</label>
          <input type="url" class="form-control" v-model="webhookUrl" placeholder="https://example.com/webhook" />
        </div>
        <div class="mb-3">
          <label class="form-label">イベントタイプ</label>
          <select class="form-select" v-model="eventType">
            <option value="report_created">レポート作成</option>
            <option value="user_registered">ユーザー登録</option>
          </select>
        </div>
        <div class="mb-3 text-end">
          <button class="btn btn-primary" @click="registerWebhook">Webhookを登録</button>
        </div>
        <div v-if="result" class="alert alert-success">{{ result }}</div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
      </div>
    </div>
  `
});
