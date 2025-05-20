// components/PrivacyFooter.js

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PrivacyFooter',
  template: `
    <footer class="text-center py-3 bg-light">
      <small class="text-muted">
        本サービスは「個人情報の保護に関する法律」をはじめ、
        EU一般データ保護規則（GDPR）、カリフォルニア消費者プライバシー法（CCPA）等の
        各種法令・ガイドラインを遵守します。  
        個人情報の取扱いについては
        <a href="#/privacy" target="_blank" class="text-decoration-none">
          プライバシーポリシー
        </a>
        をご覧ください。
      </small>
    </footer>
  `
});
