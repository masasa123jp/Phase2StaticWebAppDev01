// views/ChatView.js

import { defineComponent, ref, reactive } from 'vue';

export default defineComponent({
  name: 'ChatView',
  setup() {
    const input = ref('');
    const isTyping = ref(false);
    const store = reactive({
      messages: [
        {
          who: 'ai',
          text: 'こんにちは！わんちゃんの様子はいかがですか？',
          avatar: 'https://i.pravatar.cc/40?img=12'
        }
      ],
      quickReplies: ['ご飯のおすすめ', '散歩の時間', '健康診断について']
    });

    function send() {
      if (!input.value.trim()) return;
      // ユーザーメッセージ追加
      store.messages.push({
        who: 'user',
        text: input.value,
        avatar: 'https://i.pravatar.cc/40?img=3'
      });
      const userText = input.value;
      input.value = '';
      // typing indicator
      isTyping.value = true;
      setTimeout(() => {
        // 疑似AI応答
        store.messages.push({
          who: 'ai',
          text: `「${userText}」についてですね。詳しく教えてください！`,
          avatar: 'https://i.pravatar.cc/40?img=12'
        });
        isTyping.value = false;
      }, 800);
    }

    function useQuick(reply) {
      input.value = reply;
      send();
    }

    return { store, input, send, isTyping, useQuick };
  },
  template: `
    <div class="container py-4">
      <h3>チャット</h3>
      <div id="chatScroll" class="chat-body mb-3 position-relative">
        <div
          v-for="(m, i) in store.messages"
          :key="i"
          class="d-flex mb-2"
          :class="m.who === 'user' ? 'justify-content-end' : 'justify-content-start'"
        >
          <img
            :src="m.avatar"
            class="rounded-circle me-2"
            width="40"
            height="40"
          />
          <div class="msg p-2" :class="m.who === 'user' ? 'user' : 'ai'">
            {{ m.text }}
          </div>
        </div>
        <div v-if="isTyping" class="d-flex align-items-center">
          <img
            src="https://i.pravatar.cc/40?img=12"
            class="rounded-circle me-2"
            width="40"
            height="40"
          />
          <div class="ai msg p-2"><i class="bi bi-three-dots"></i>…</div>
        </div>
      </div>

      <!-- クイックリプライ -->
      <div class="mb-3">
        <small class="text-muted">クイックリプライ:</small>
        <button
          v-for="(q, i) in store.quickReplies"
          :key="i"
          class="btn btn-sm btn-outline-secondary me-1 mb-1"
          @click="useQuick(q)"
        >
          {{ q }}
        </button>
      </div>

      <!-- 入力欄 -->
      <div class="input-group">
        <input
          v-model="input"
          @keyup.enter="send"
          class="form-control"
          placeholder="メッセージを入力…"
        />
        <button @click="send" class="btn btn-primary">
          <i class="bi bi-send"></i>
        </button>
        <label class="btn btn-outline-secondary mb-0 ms-1">
          <i class="bi bi-paperclip"></i>
          <input type="file" hidden @change="$emit('attach', $event)" />
        </label>
      </div>
    </div>
  `
});
