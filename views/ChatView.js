// views/ChatView.js
import { ref, onMounted } from 'vue';
import store from '../store.js';

export default {
  setup() {
    const input = ref('');
    function send() {
      if (!input.value.trim()) return;
      store.messages.push({ who: 'user', text: input.value });
      const echo = `「${input.value}」についてですね。詳しく教えてください！`;
      setTimeout(() => store.messages.push({ who: 'ai', text: echo }), 600);
      input.value = '';
    }
    onMounted(() => {
      const el = document.getElementById('chatScroll');
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
    return { store, input, send };
  },
  template: `
    <div class="container py-4">
      <h3>チャット</h3>
      <div id="chatScroll" class="chat-body mb-3">
        <div v-for="(m,i) in store.messages" :key="i"
             :class="['msg', m.who==='user' ? 'user' : 'ai']">
          {{m.text}}
        </div>
      </div>
      <div class="input-group">
        <input v-model="input" @keyup.enter="send" class="form-control" placeholder="メッセージを入力…" />
        <button @click="send" class="btn btn-primary"><i class="bi bi-send"></i></button>
      </div>
    </div>
  `
};
