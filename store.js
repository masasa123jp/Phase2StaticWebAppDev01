// store.js
import { reactive } from 'vue';

const store = reactive({
  messages: [
    { who: 'ai', text: 'こんにちは！わんちゃんの様子はいかがですか？' }
  ]
});

export default store;
