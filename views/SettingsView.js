// views/SettingsView.js

const SettingsView = {
  template: `
    <div class="container py-4">
      <h3>設定</h3>
      <form class="row g-3" style="max-width:500px">
        <div class="col-12">
          <label class="form-label">オーナー名</label>
          <input type="text" class="form-control" placeholder="例: 田中 花子" />
        </div>
        <div class="col-12">
          <label class="form-label">ペット名</label>
          <input type="text" class="form-control" placeholder="例: ココ" />
        </div>
        <div class="col-12">
          <label class="form-label">通知</label>
          <select class="form-select">
            <option selected>ON</option>
            <option>OFF</option>
          </select>
        </div>
        <div class="col-12">
          <button class="btn btn-primary" type="button">保存</button>
        </div>
      </form>
    </div>`
};
