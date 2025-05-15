// views/SettingsView.js

const SettingsView = {
  setup() {
    const activeTab = Vue.ref('profile');
    const profile = Vue.reactive({ owner:'', pet:'', avatar:'' });
    const notifications = Vue.reactive({ newsletter:true, updates:false });
    const theme = Vue.ref('light');

    function uploadAvatar(e) {
      const file = e.target.files[0];
      profile.avatar = file ? URL.createObjectURL(file) : '';
    }
    return { activeTab, profile, notifications, theme, uploadAvatar };
  },
  template: `
    <div class="container py-4">
      <h3>設定</h3>
      <!-- タブ -->
      <ul class="nav nav-tabs mb-3">
        <li class="nav-item"><a class="nav-link" :class="{active:activeTab==='profile'}"
              @click.prevent="activeTab='profile'">プロフィール</a></li>
        <li class="nav-item"><a class="nav-link" :class="{active:activeTab==='notifications'}"
              @click.prevent="activeTab='notifications'">通知</a></li>
        <li class="nav-item"><a class="nav-link" :class="{active:activeTab==='theme'}"
              @click.prevent="activeTab='theme'">テーマ</a></li>
      </ul>

      <div v-if="activeTab==='profile'">
        <form class="row g-3">
          <div class="col-12 text-center">
            <img v-if="profile.avatar" :src="profile.avatar" class="rounded-circle mb-2" width="100" height="100"/>
            <label class="btn btn-outline-secondary">
              アバターを変更<input type="file" hidden @change="uploadAvatar"/>
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

      <div v-if="activeTab==='notifications'">
        <div class="form-check form-switch mb-2">
          <input class="form-check-input" type="checkbox" id="news" v-model="notifications.newsletter">
          <label class="form-check-label" for="news">ニュースレター</label>
        </div>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="upd" v-model="notifications.updates">
          <label class="form-check-label" for="upd">アップデート情報</label>
        </div>
      </div>

      <div v-if="activeTab==='theme'">
        <div class="form-check">
          <input class="form-check-input" type="radio" id="light" value="light" v-model="theme">
          <label class="form-check-label" for="light">ライトモード</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="dark" value="dark" v-model="theme">
          <label class="form-check-label" for="dark">ダークモード</label>
        </div>
        <div class="mt-3">
          <small>プレビュー:</small>
          <div :class="theme==='dark' ? 'bg-dark text-white p-3' : 'bg-white text-dark p-3'">
            {{ theme==='dark' ? 'ダークテーマ適用中' : 'ライトテーマ適用中' }}
          </div>
        </div>
      </div>
    </div>`
};
