import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const router = useRouter();
    const error = ref(null);

    onMounted(async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      try {
        const res = await fetch("/api/auth/google/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        if (!res.ok) throw new Error("認証失敗");
        const data = await res.json();
        localStorage.setItem("access_token", data.access_token);

        router.push("/home");
      } catch (err) {
        error.value = err.message;
      }
    });

    return { error };
  },
  template: `<div v-if="error">エラー: {{ error }}</div><div v-else>ログイン中...</div>`
};
