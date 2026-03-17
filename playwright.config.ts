import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/test/visual',
  snapshotPathTemplate: '{testDir}/__snapshots__/{testFilePath}/{arg}{ext}',
  use: {
    baseURL: 'http://127.0.0.1:61000',
    headless: true,
  },
  webServer: {
    command: 'npm run ladle:dev -- --host 127.0.0.1 --port 61000',
    url: 'http://127.0.0.1:61000',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
