export default {
  setup() {
    const googleClientId = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
    const redirectUri = encodeURIComponent("http://localhost:3000/oauth/callback");
    const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&response_type=code&scope=openid%20email%20profile&redirect_uri=${redirectUri}`;

    function loginWithGoogle() {
      window.location.href = loginUrl;
    }

    return { loginWithGoogle };
  },
  template: `
    <div class="text-center py-5">
      <h2>ログイン</h2>
      <button class="btn btn-danger" @click="loginWithGoogle">
        Googleでログイン
      </button>
    </div>
  `
};
