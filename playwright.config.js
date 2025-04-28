import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false, // Ubah ke true jika tidak ingin browser muncul
    screenshot: 'on', // Ambil screenshot ketika tes berjalan
    trace: 'on', // Aktifkan trace untuk debugging
  },
  reporter: [
    ['html', { outputFolder: 'reports/' }], // Simpan laporan dalam folder "reports/"
    ['json', { outputFile: 'reports/json/report.json' }], // Simpan laporan JSON
  ],
  outputDir: 'reports/screenshots/', // Simpan screenshot ke folder "reports/screenshots"
});
