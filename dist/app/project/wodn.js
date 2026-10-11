(function() {
  window.registerProject({
    id: 'wodn',
    title: 'wodn.js',
    accentColor: '#A33A31',
    darkAccentColor: '#A65B51',
    tagline: '터미널에서 npx 한 줄로 즉시 실행되는 대화형 엔지니어링 콘솔',
    summary: '웹 브라우저를 켤 필요 없이 개발자의 터미널 환경에서 즉각적으로 Knoblab의 작업물과 개발 철학을 대화형으로 탐색할 수 있는 Node.js CLI 패키지입니다.',
    links: {
      github: 'https://github.com/knoblab',
      npm: 'https://www.npmjs.com/package/wodn.js'
    },
    problem: {
      title: '정적인 종이 명함과 링크 클릭의 번거로움',
      desc: '개발자 커뮤니티나 기술 콘퍼런스에서 일반적인 URL 링크나 PDF 이력서는 즉각적인 호기심을 유발하기 어렵습니다. 개발자가 가장 오래 머무는 작업 환경인 터미널 내에서 직접 실행되는 매체가 필요했습니다.'
    },
    solution: {
      title: 'npx 한 줄로 호출하는 대화형 터미널 인터페이스',
      desc: '터미널 창에 `npx wodn.js`를 입력하면 우아한 ASCII 아트와 함께 프로젝트 둘러보기, 깃허브 바로가기, 이메일 전송, 엔지니어링 철학 조회 메뉴가 키보드 방향키 조작으로 인터랙티브하게 펼쳐집니다.'
    },
    features: [
      {
        title: 'Zero-Installation Execution',
        desc: '로컬 환경을 오염시키는 전역 설치 없이 npx를 통해 언제 어디서나 단 1초 만에 최신 버전을 실행할 수 있습니다.'
      },
      {
        title: 'Keyboard-Driven Menu',
        desc: '화살표 키와 엔터키로 프로젝트 목록, 릴리스 노트, 연락처를 직관적으로 탐색할 수 있는 대화형 프롬프트를 제공합니다.'
      },
      {
        title: 'Truecolor ASCII Branding',
        desc: '터미널 24비트 색공간을 활용하여 Knoblab 고유의 단청 레드와 머그워트 그린 컬러 그라데이션을 섬세하게 표현합니다.'
      },
      {
        title: 'Direct System Open',
        desc: '메뉴 선택 시 시스템 기본 브라우저를 통해 관련 깃허브 리포지토리나 이메일 클라이언트를 즉시 띄워줍니다.'
      }
    ],
    architecture: [
      {
        title: 'CLI Entry Initialization',
        desc: '사용자가 명령어를 입력하면 npx가 npm 레지스트리에서 메타데이터를 확인하고 엔트리 스크립트를 즉시 실행합니다.'
      },
      {
        title: 'Terminal Capability Check',
        desc: '현재 터미널 창의 너비, 높이, 유니코드 지원 여부 및 ANSI 색상 심도(Truecolor vs 256color)를 자동 판별합니다.'
      },
      {
        title: 'ASCII Canvas & Layout Render',
        desc: 'Knoblab 로고 박스와 버전 정보를 렌더링하고 사용자 입력을 수신하는 키보드 이벤트 리스너를 바인딩합니다.'
      },
      {
        title: 'Action Dispatcher',
        desc: '사용자의 선택에 따라 세부 정보 출력, 웹 링크 호출 또는 터미널 세션의 깔끔한 종료를 수행합니다.'
      }
    ],
    quickStart: {
      command: 'npx wodn.js',
      alternative: 'npm install -g wodn.js\nwodn',
      note: 'Node.js 18 이상이 설치된 모든 운영체제의 터미널에서 동작합니다.'
    }
  });
})();
