// modules/useAIChat.js

import { ref } from 'vue';

/**
 * useAIChat:
 * ユーザーの入力を管理し、APIを通じてAI応答を受け取るComposition APIフック。
 */
export function useAIChat() {
  const aiInput      = ref('');
  const aiResponse   = ref('');
  const isAIThinking = ref(false);

  /**
   * sendToAI:
   * チャットメッセージをAPIに送信して、OpenAIの応答を取得。
   */
  async function sendToAI() {
    if (!aiInput.value.trim()) return;

    isAIThinking.value = true;
    aiResponse.value = '';

    try {
      const res = await fetch('/api/chat/completion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: aiInput.value })
      });

      const data = await res.json();

      if (res.ok) {
        aiResponse.value = data.content;
      } else {
        aiResponse.value = `[エラー] ${data.detail || '応答取得に失敗しました'}`;
      }
    } catch (err) {
      aiResponse.value = `[通信エラー]: ${err.message}`;
    } finally {
      isAIThinking.value = false;
      aiInput.value = '';
    }
  }

  return {
    aiInput,
    aiResponse,
    isAIThinking,
    sendToAI
  };
}
