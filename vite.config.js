import { resolve } from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function copyStaticAssets() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      const dist = resolve(__dirname, 'dist');
      if (fs.existsSync('app')) {
        fs.cpSync('app', resolve(dist, 'app'), { recursive: true });
      }
      if (fs.existsSync('img')) {
        fs.cpSync('img', resolve(dist, 'img'), { recursive: true });
      }
      if (fs.existsSync('app.js')) {
        fs.copyFileSync('app.js', resolve(dist, 'app.js'));
      }
      if (fs.existsSync('style.css')) {
        fs.copyFileSync('style.css', resolve(dist, 'style.css'));
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), copyStaticAssets()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login/index.html')
      }
    }
  }
});
