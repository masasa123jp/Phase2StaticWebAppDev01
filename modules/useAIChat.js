// modules/useAIChat.js
import { ref } from 'vue';

export function useAIChat() {
  const aiInput      = ref('');
  const aiResponse   = ref('');
  const isAIThinking = ref(false);

  function sendToAI() {
    if (!aiInput.value.trim()) return;
    isAIThinking.value = true;
    const prompt = aiInput.value;
    aiResponse.value = '';
    setTimeout(() => {
      aiResponse.value = `AI: 「${prompt}」についての詳細情報です。（モック応答）`;
      isAIThinking.value = false;
    }, 1000);
    aiInput.value = '';
  }

  return {
    aiInput, aiResponse, isAIThinking, sendToAI
  };
}
