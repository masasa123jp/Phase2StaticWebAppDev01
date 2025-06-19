// api/report.js

import { apiRequest } from './client.js';

/**
 * カスタムレポートを生成するAPI呼び出し
 * @param {object} payload - ペット情報とメール、use_openai など
 * @returns {Promise<object>} - レポート生成結果（download_url含む）
 */
export async function generateCustomReport(payload) {
  return await apiRequest('/reports/custom', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}
