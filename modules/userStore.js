// modules/userStore.js

import { reactive, computed } from 'vue'
import axios from 'axios'

const state = reactive({
  user: null,             // ユーザー情報
  token: null,            // アクセストークン
  refreshToken: null,     // リフレッシュトークン
  settings: null,         // ユーザー設定情報
  loading: false,         // 通信中フラグ
  error: null             // 最後のエラー内容
})

// ログイン状態か？
const isAuthenticated = computed(() => !!state.token)
// 管理者か？
const isAdmin = computed(() => !!state.user?.is_admin)

/**
 * 認証付きaxiosインスタンスを生成
 */
function getAxios() {
  return axios.create({
    headers: {
      Authorization: `Bearer ${state.token}`
    }
  })
}

/**
 * ローカルストレージからトークンを復元
 */
function initAuth() {
  const token = localStorage.getItem('access_token')
  const refresh = localStorage.getItem('refresh_token')
  if (token && refresh) {
    state.token = token
    state.refreshToken = refresh
    fetchUserProfile()
    fetchUserSettings()
  }
}

/**
 * ユーザー情報を取得
 */
async function fetchUserProfile() {
  try {
    const client = getAxios()
    const res = await client.get('/api/users/me')
    state.user = res.data
  } catch (err) {
    console.error('ユーザー取得失敗', err)
    logout()
  }
}

/**
 * ユーザー設定を取得
 */
async function fetchUserSettings() {
  try {
    const client = getAxios()
    const res = await client.get('/api/user_settings/')
    state.settings = res.data
  } catch (err) {
    console.warn('ユーザー設定取得失敗', err)
    state.settings = null
  }
}

/**
 * ユーザー設定を更新
 */
async function updateUserSettings(payload) {
  try {
    const client = getAxios()
    const res = await client.put('/api/user_settings/', payload)
    state.settings = res.data
  } catch (err) {
    console.error('ユーザー設定更新失敗', err)
    throw err
  }
}

/**
 * アクセストークンを更新（refresh_tokenを使用）
 */
async function refreshAccessToken() {
  if (!state.refreshToken) return
  try {
    const res = await axios.post('/token/refresh', {
      refresh_token: state.refreshToken
    })
    state.token = res.data.access_token
    localStorage.setItem('access_token', state.token)
  } catch (err) {
    console.error('リフレッシュ失敗', err)
    logout()
  }
}

/**
 * ユーザー名＋パスワードでログイン
 */
async function loginWithCredentials(username, password) {
  try {
    state.loading = true
    state.error = null
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    const res = await axios.post('/token', params)

    state.token = res.data.access_token
    state.refreshToken = res.data.refresh_token // refresh_tokenもレスポンスに含める必要あり

    localStorage.setItem('access_token', state.token)
    localStorage.setItem('refresh_token', state.refreshToken)

    await fetchUserProfile()
    await fetchUserSettings()
  } catch (err) {
    console.error('ログイン失敗:', err)
    state.error = err.response?.data?.detail || 'ログインに失敗しました'
    throw err
  } finally {
    state.loading = false
  }
}

/**
 * トークンを使ってログインする（SWA/B2C用）
 */
function login(token, refresh = null) {
  state.token = token
  state.refreshToken = refresh
  localStorage.setItem('access_token', token)
  if (refresh) {
    localStorage.setItem('refresh_token', refresh)
  }
  fetchUserProfile()
  fetchUserSettings()
}

/**
 * ログアウト処理
 */
function logout() {
  state.token = null
  state.refreshToken = null
  state.user = null
  state.settings = null
  state.error = null
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export default {
  state,
  isAuthenticated,
  isAdmin,
  initAuth,
  login,
  logout,
  loginWithCredentials,
  fetchUserProfile,
  fetchUserSettings,
  updateUserSettings,
  refreshAccessToken
}
