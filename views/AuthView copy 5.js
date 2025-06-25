// views/AuthView.js
//
// 各社のブランドガイドラインを確認し、SVG ロゴをインライン化。
// ボタンは高さ 44px・角丸 6px・flex レイアウトで統一しています。
// Google だけはガイドラインに従い白背景＋グレー枠＋グレー文字です。
// そのほかはブランドカラー背景＋白文字（Apple は逆パターン可）
// X（旧Twitter）はガイドラインで推奨される「黒背景＋白 X」ボタン。
// クリック時は Static Web Apps の /.auth/login/{provider} へ遷移します。
// ------------------------------------------------------------

const providers = [
  {
    key: 'google',
    label: 'Googleでログイン',
    bg: '#FFFFFF',
    text: '#5F6368',
    border: '#DADCE0',
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3..."/>
        <path fill="#34A853" d="M6.6 14.9l6.6 4.8..."/>
        <path fill="#FBBC05" d="M24 44c5.5 0 10.5-1.8..."/>
        <path fill="#EA4335" d="M43.6 20.5H42V20H24v8h11.3..."/>
      </svg>`
  },
  {
    key: 'line',
    label: 'LINEでログイン',
    bg: '#06C755',
    text: '#FFFFFF',
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 40 40">
        <rect width="40" height="40" rx="8" fill="#06C755"/>
        <path fill="#fff" d="M20 11c-5.56 0-10.07 3.58-10.07 8..."/>
      </svg>`
  },
  {
    key: 'apple',
    label: 'Sign in with Apple',
    bg: '#000000',
    text: '#FFFFFF',
    svg: `
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path fill="#fff" d="M19.665 17.143c-.244.556-.535..."/>
      </svg>`
  },
  {
    key: 'yahoo',
    label: 'Yahoo!でログイン',
    bg: '#FF0033',
    text: '#FFFFFF',
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="8" fill="#FF0033"/>
        <text x="7" y="24" font-family="Arial Black,Arial,sans-serif"
              font-weight="bold" font-size="22" fill="#fff">Y!</text>
      </svg>`
  },
  {
    key: 'facebook',
    label: 'Facebookでログイン',
    bg: '#1877F2',
    text: '#FFFFFF',
    svg: `
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path fill="#fff" d="M22.675 0H1.325C.594 0 0 .594 0 1.326v21.348C0 23.406..."/>
      </svg>`
  },
  {
    key: 'x',
    label: 'X（旧Twitter）でログイン',
    bg: '#000000',
    text: '#FFFFFF',
    svg: `
      <!-- X brand toolkit white glyph -->
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 1200 1227">
        <path fill="#FFFFFF" d="M1143.5 0L727.2 505.6L1168.6 1227H901.2L600.6 754.4L321.8 1227H56.2L477.5 500.6L34.1 0h268.1
           L600.6 400.8 871.8 0z"/>
      </svg>`
  }
];

const AuthView = {
  setup() {
    return { providers };
  },
  template: `
  <div class="container py-5 d-flex flex-column align-items-center" style="max-width:340px;">
    <h3 class="mb-3 fw-bold text-center">外部アカウントでログイン</h3>

    <button
      v-for="p in providers"
      :key="p.key"
      @click="() => { window.location.href='/.auth/login/' + (p.key==='x' ? 'twitter' : p.key) }"
      :style="{
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start',
        width:'100%',
        height:'44px',
        marginBottom:'14px',
        borderRadius:'6px',
        background:p.bg,
        color:p.text,
        border: p.border ? '1px solid ' + p.border : 'none',
        fontWeight:'600',
        fontSize:'1rem',
        lineHeight:'1',
        cursor:'pointer',
        boxShadow:'0 1px 3px rgba(0,0,0,0.15)'
      }"
    >
      <span v-html="p.svg"
            style="width:22px;height:22px;margin-left:12px;display:inline-flex;align-items:center;"></span>
      <span style="flex:1;text-align:center;">{{ p.label }}</span>
      <span style="width:34px;"></span><!-- 右側の余白揃え -->
    </button>

    <router-link to="/" class="btn btn-link w-100 mt-2">← 戻る</router-link>
  </div>
  `
};

export default AuthView;
