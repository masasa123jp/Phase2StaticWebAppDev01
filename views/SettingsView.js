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

    return {
      activeTab,
      profile,
      notifications,
      theme,
      uploadAvatar
    };
  },

  // ─── テンプレート ───
  template: `
    <div class="container py-4">
      <h3>設定</h3>

      <!-- タブ -->
      <ul class="nav nav-tabs mb-3">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'profile' }"
            @click.prevent="activeTab = 'profile'"
          >プロフィール</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'notifications' }"
            @click.prevent="activeTab = 'notifications'"
          >通知</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: activeTab === 'theme' }"
            @click.prevent="activeTab = 'theme'"
          >テーマ</a>
        </li>
      </ul>

      <!-- プロフィールタブ -->
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

      <!-- 通知タブ -->
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

      <!-- テーマタブ -->
      <div v-if="activeTab === 'theme'">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            id="lightTheme"
            value="light"
            v-model="theme"
          />
          <label class="form-check-label" for="lightTheme">ライトモード</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            id="darkTheme"
            value="dark"
            v-model="theme"
          />
          <label class="form-check-label" for="darkTheme">ダークモード</label>
        </div>
        <div class="mt-3">
          <small>プレビュー:</small>
          <div :class="theme === 'dark' ? 'bg-dark text-white p-3' : 'bg-white text-dark p-3'">
            {{ theme === 'dark' ? 'ダークテーマ適用中' : 'ライトテーマ適用中' }}
          </div>
        </div>
      </div>
    </div>
  `
});
