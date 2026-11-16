import { resolve, sep } from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function serveBabelScripts() {
  return {
    name: 'serve-babel-scripts',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlPath = (req.url || '').split('?')[0];
        if (urlPath === '/app.js' || (urlPath.startsWith('/app/') && urlPath.endsWith('.js'))) {
          const filePath = resolve(__dirname, urlPath.slice(1));
          if (
            filePath.startsWith(__dirname + sep) &&
            fs.existsSync(filePath) &&
            fs.statSync(filePath).isFile()
          ) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
            res.end(fs.readFileSync(filePath, 'utf-8'));
            return;
          }
        }
        next();
      });
    }
  };
}

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
  plugins: [serveBabelScripts(), react(), copyStaticAssets()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
});
