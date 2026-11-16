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

      const routePages = [
        {
          paths: ['freeview', 'project/freeview'],
          hash: '#/project/freeview',
          title: 'FreeView — 인터넷 속도 저하 없이 차단된 웹 접속을 여는 Windows · Android용 경량 프로그램',
          desc: 'VPN처럼 외부 서버로 트래픽을 돌리지 않고 내 기기(PC·스마트폰) 안에서만 동작합니다. 버튼 하나로 켜고 끌 수 있으며, 창을 닫아도 백그라운드에서 가볍게 유지됩니다.',
          image: 'https://knoblab.github.io/knoblab/img/freeview-app.webp'
        },
        {
          paths: ['qdown', 'project/qdown'],
          hash: '#/project/qdown',
          title: 'qDown — yt-dlp 고성능 미디어 추출 엔진을 위한 직관적인 그래픽 유저 인터페이스',
          desc: '복잡한 커맨드라인 옵션 없이 URL 입력 한 번으로 최고 화질 비디오와 오디오 스트림을 고속 다운로드하는 데스크톱 미디어 도구입니다.',
          image: 'https://knoblab.github.io/knoblab/img/og.webp'
        }
      ];

      for (const page of routePages) {
        for (const relDir of page.paths) {
          const outDir = resolve(dist, relDir);
          fs.mkdirSync(outDir, { recursive: true });
          const depth = relDir.split('/').length;
          const rootRel = '../'.repeat(depth);
          const pageUrl = `https://knoblab.github.io/knoblab/${relDir}/`;
          const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${page.title}</title>
<meta name="description" content="${page.desc}" />
<meta property="og:site_name" content="Knoblab" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${pageUrl}" />
<meta property="og:title" content="${page.title}" />
<meta property="og:description" content="${page.desc}" />
<meta property="og:image" content="${page.image}" />
<meta property="og:image:secure_url" content="${page.image}" />
<meta property="og:locale" content="ko_KR" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${page.title}" />
<meta name="twitter:description" content="${page.desc}" />
<meta name="twitter:image" content="${page.image}" />
<link rel="icon" type="image/svg+xml" href="${rootRel}img/logo.svg" />
<script>window.location.replace("${rootRel}${page.hash}");</script>
</head>
<body></body>
</html>
`;
          fs.writeFileSync(resolve(outDir, 'index.html'), html, 'utf-8');
        }
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
