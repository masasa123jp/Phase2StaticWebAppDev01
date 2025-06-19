// api/client.js

/**
 * 共通APIクライアントモジュール。
 * fetch API をラップして、リクエストとレスポンスを共通管理する。
 * - ベースURL管理
 * - エラーハンドリング統一
 * - 認証ヘッダー付与（将来的に対応）
 */

const BASE_URL = '/api'; // APIの共通プレフィックス

/**
 * API呼び出し関数（GET / POST / PUT / DELETE に対応）
 * @param {string} path - APIパス（例: /reports/custom）
 * @param {object} options - fetchオプション（method, headers, bodyなど）
 * @returns {Promise<object>} - JSONレスポンスを返す（失敗時はthrow）
 */
export async function apiRequest(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const defaultHeaders = {
    'Content-Type': 'application/json'
    // 認証トークンを付与する場合:
    // 'Authorization': `Bearer ${getToken()}`
  };

  const res = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMessage = data.detail || res.statusText || 'API呼び出し失敗';
    throw new Error(errorMessage);
  }

  return data;
}
