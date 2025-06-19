// services/DataService.js
export default {
  _cache: null,

  /**
   * レポートに必要な統計データを取得
   * @returns {Promise<Object>} { healthStats, regionInfo, concernRecs }
   */
  async fetchReportData() {
    if (this._cache) {
      return this._cache;
    }
    // 実際は API コール：fetch('/api/report-data')
    const fakeResponse = new Promise(resolve => {
      setTimeout(() => resolve({
        healthStats: {
          'トイプードル': { '3': 120, '10': 80 },
          '柴犬':       { '3': 90,  '10': 110 }
        },
        regionInfo: {
          '東京都': ['世田谷動物病院','PECO'], 
          '大阪府': ['梅田動物クリニック','Coco']
        },
        concernRecs: {
          'しつけ': ['完全ガイド','アドバンス編'],
          '健康':   ['長生きごはん','フィットネス']
        }
      }), 300);
    });
    this._cache = await fakeResponse;
    return this._cache;
  }
};
