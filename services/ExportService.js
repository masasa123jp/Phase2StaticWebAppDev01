// services/ExportService.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default {
  /**
   * 現在のレポートカードを PDF にしてダウンロード
   * @param {Element} element HTML 要素
   * @param {String} filename
   */
  exportPDF(element, filename = 'report.pdf') {
    const doc = new jsPDF('portrait', 'pt', 'a4');
    doc.html(element, {
      callback: () => {
        doc.save(filename);
      },
      x: 20, y: 40,
      html2canvas: { scale: 0.5 }
    });
  },

  /**
   * データを CSV 形式でダウンロード
   * @param {Array<Object>} data
   * @param {String} filename
   */
  exportCSV(data, filename = 'report.csv') {
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
};
