// views/PrivacyView.js

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PrivacyView',
  setup() {
    // 特に状態を持たない静的コンポーネントのため、setup は空でOK
    return {};
  },
  template: `
    <div class="container py-4">
      <h3>プライバシーポリシー</h3>
      <p>私たちProject RORO（以下「当社」）は、個人情報の適切な取り扱いを社会的責務と考え、以下の通りプライバシー保護に努めます。</p>
      <h5>1. 法令遵守</h5>
      <p>個人情報保護法、GDPR、CCPA等、国内外の関連法令・ガイドラインを遵守します。</p>
      <h5>2. 収集目的</h5>
      <p>ユーザーの同意に基づき、サービス改善やレポート生成、災害支援等の目的でのみ個人情報を収集します。</p>
      <h5>3. 第三者提供</h5>
      <p>法令に定める場合を除き、ユーザーの同意なく第三者に提供しません。</p>
      <h5>4. 保管・安全管理措置</h5>
      <p>TLSによる通信暗号化、アクセス制限等で厳重に管理します。</p>
      <h5>5. お問い合わせ</h5>
      <p>個人情報に関するお問い合わせ・苦情は
        <a href="mailto:privacy@roro.example.com">
          privacy@roro.example.com
        </a>
        までご連絡ください。
      </p>
    </div>
  `
});
