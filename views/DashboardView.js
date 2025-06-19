import { ref, onMounted } from "vue";
import { authFetch } from "@/utils/http";

export default {
  name: "DashboardView",
  setup() {
    const stats = ref(null);
    const error = ref(null);

    // ダッシュボード統計を取得
    async function fetchStats() {
      try {
        const res = await authFetch("/api/admin/stats");
        if (!res.ok) throw new Error("統計取得に失敗しました");
        stats.value = await res.json();
      } catch (err) {
        error.value = err.message;
      }
    }

    onMounted(fetchStats);

    return { stats, error };
  },
  template: `
    <div class="container py-4">
      <h2>📊 管理ダッシュボード</h2>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-else-if="!stats">読み込み中...</div>
      <div v-else class="row">
        <div class="col-md-3" v-for="(value, key) in stats" :key="key">
          <div class="card text-white bg-primary mb-3">
            <div class="card-header">{{ key }}</div>
            <div class="card-body">
              <h5 class="card-title">{{ value }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
