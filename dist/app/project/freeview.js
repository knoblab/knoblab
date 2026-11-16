(function () {
  window.registerProject({
    id: 'freeview',
    title: 'FreeView',
    accentColor: '#45707A',
    darkAccentColor: '#597981',
    tagline: '인터넷 속도 저하 없이 차단된 웹 접속을 여는 Windows · Android용 경량 프로그램',
    summary: 'VPN처럼 외부 서버로 트래픽을 돌리지 않고 내 기기(PC·스마트폰) 안에서만 동작합니다. 버튼 하나로 켜고 끌 수 있으며, 창을 닫아도 백그라운드에서 가볍게 유지됩니다.',
    links: {
      github: 'https://github.com/knoblab/freeview-sni',
      download: 'https://github.com/knoblab/freeview-sni/releases',
      docs: 'https://github.com/knoblab/freeview-sni#readme'
    },
    intro: {
      title: 'FreeView는 어떤 프로그램인가요?',
      blocks: [
        {
          heading: '외부 서버를 거치지 않는 차단 우회',
          body: '일반적인 VPN이나 해외 프록시는 모든 트래픽을 제3자 서버로 보냈다가 받아오기 때문에 인터넷 속도가 떨어지고, 게임이나 음성 통화 반응속도까지 같이 느려집니다. FreeView는 내 PC나 스마트폰 내부에서만 웹 요청을 처리하므로 본래 인터넷 속도가 그대로 유지됩니다.'
        },
        {
          heading: '설치하고 버튼 하나만 누르면 끝',
          body: '복잡한 명령어나 설정 파일을 만질 필요가 없습니다. Windows 프로그램이나 Android 앱(APK)을 설치한 뒤 화면의 켜기 버튼을 누르면 바로 적용되고, 창을 닫아도 백그라운드에 남아 계속 동작합니다.'
        }
      ]
    },
    appOverview: {
      title: '화면 구성과 설치 과정',
      tabs: [
        {
          key: 'windows',
          label: 'Windows',
          subtitle: '꼭 필요한 조작만 남긴 작은 창(FreeView 3.3)으로 동작합니다.',
          image: 'img/freeview-app.webp',
          imageAlt: 'Windows 데스크톱에서 실행 중인 FreeView 3.3 화면',
          caption: 'Windows에서 실행 중인 FreeView 3.3 실제 화면',
          cards: [
            {
              title: '메인 창 (FreeView 3.3)',
              items: [
                { label: '켜기 / 끄기', desc: '우회 기능을 켜고 끄는 단일 메인 버튼' },
                { label: '로그 보기', desc: '현재 동작 상태와 처리 내역 확인' },
                { label: '깃허브', desc: '소스 코드 및 릴리스 저장소 바로가기' },
                { label: '업데이트 확인', desc: '새 버전 확인 및 업데이트' }
              ]
            },
            {
              title: '설치 과정 (4단계)',
              items: [
                { label: '1. 경로 지정', desc: '설치 위치(C:\\ProgramFiles\\...) 확인 또는 변경' },
                { label: '2. 시작 옵션', desc: '시작 시 자동 실행 · 바로가기 만들기 선택' },
                { label: '3. 설치 진행', desc: '설치 진행 상태 확인' },
                { label: '4. 완료', desc: '설치 완료 후 바로 실행 또는 닫기' }
              ]
            }
          ]
        },
        {
          key: 'android',
          label: 'Android',
          subtitle: 'Windows 버전과 동일한 구성의 Android 앱(FreeView 3.3)으로 동작합니다.',
          image: 'img/freeview-android.webp',
          imageAlt: 'Android에서 실행 중인 FreeView 3.3 화면',
          caption: 'Android에서 실행 중인 FreeView 3.3 실제 화면',
          cards: [
            {
              title: '앱 화면 (FreeView 3.3)',
              items: [
                { label: '켜기 / 끄기', desc: '우회 기능을 켜고 끄는 단일 메인 버튼' },
                { label: '로그 보기', desc: '현재 동작 상태와 처리 내역 확인' },
                { label: '깃허브', desc: '소스 코드 및 릴리스 저장소 바로가기' },
                { label: '업데이트 확인', desc: '새 버전 확인 및 업데이트' }
              ]
            },
            {
              title: '설치 과정 (GitHub APK)',
              items: [
                { label: '1. APK 다운로드', desc: 'GitHub Releases에서 최신 FreeView APK 파일 다운로드' },
                { label: '2. APK 설치', desc: '다운로드한 APK 파일을 열어 앱 설치 진행' },
                { label: '3. 권한 허용', desc: '첫 실행 시 로컬 VPN 연결 요청 허용' },
                { label: '4. 완료', desc: '켜기 버튼을 눌러 즉시 우회 시작' }
              ]
            }
          ]
        }
      ]
    },
    rustPerformance: {
      title: 'Rust로 다시 작성해 171.6배 빨라졌습니다',
      subtitle: '기존 파이썬 스크립트 기반 구조를 Rust로 전면 재작성해 FreeView 2.0 대비 스크립트 실행 속도가 171.6배 빨라졌습니다.',
      cardTitle: '인터프리터 없이 기계어로 즉시 실행',
      desc: '기존 버전처럼 무거운 런타임이나 인터프리터를 거쳐 스크립트를 해석하지 않고, 네이티브 기계어로 직접 컴파일되어 실행됩니다. 실행 대기 시간 없이 즉시 동작합니다.',
      highlights: [
        { label: '실행 구조', value: '네이티브 기계어 직접 실행' },
        { label: '스크립트 오버헤드', value: '인터프리터 해석 과정 제거' }
      ],
      bars: [
        { label: '2.0', valueText: '1x', heightPct: 14, accent: false },
        { label: '2.1', valueText: '1.39x', heightPct: 20, accent: false },
        { label: '3.3', valueText: '171.6x', heightPct: 100, accent: true, scaleBreak: true }
      ],
      footnote: '※ 동일 Windows PC에서 FreeView 2.0·2.1(Electron 초기화 및 시스템 조회 3회)과 FreeView 3.3(Rust 엔진 기동·2 MiB 로컬 릴레이 5회)의 실측 중앙값 비교 (트레이·WebView 창 표시 시간 제외)'
    },
    resourceComparison: {
      title: '더 가벼워진 자원 사용량',
      subtitle: 'Tauri + Rust 구조로 전환해 FreeView 2.0 대비 백그라운드 자원 사용량이 최대 95% 감소했습니다.',
      baselineLabel: 'FreeView 2.0 기준 100%',
      fromValue: 100,
      toValue: 5,
      unit: '%'
    },
    resourceFootprint: {
      title: '사용 중에도 메모리 최대 5.7 MB',
      desc: '켜기 버튼을 누른 뒤 창을 닫으면 화면을 그리는 프로그램은 완전히 종료되고, 우회 기능만 실제로 작동합니다. 대기 상태가 아니라 정상 사용 중인 상태에서도 메모리를 최대 5.7 MB만 사용해, 고사양 게임을 하거나 여러 작업을 동시에 해도 부담이 없습니다.',
      states: [
        { label: '창을 열어 둔 상태', value: '화면 표시 + 우회 기능 함께 실행' },
        { label: '창을 닫고 사용 중', value: '화면은 종료 · 우회 기능 정상 동작 중에도 최대 5.7 MB' }
      ],
      image: 'img/freeview-resource.png',
      imageAlt: '창을 닫고 우회 기능을 사용 중인 상태에서 확인한 Windows 작업 관리자 FreeView 프로세스 화면',
      caption: '창을 닫고 우회 기능을 사용 중인 상태의 Windows 작업 관리자 (CPU 0% · 메모리 5.7 MB)'
    },
    howItWorks: {
      title: '내부 동작 방식',
      subtitle: '속도와 반응속도를 해치지 않도록 웹 요청과 실시간 통신을 나누어 처리합니다.',
      items: [
        {
          title: 'PC 내부 로컬 프록시 (127.0.0.1:8080)',
          desc: '웹 브라우저의 요청을 외부 서버가 아닌 내 PC 안의 로컬 프록시로만 처리해 회선 대역폭 손실이 없습니다.'
        },
        {
          title: '내부 DNS 캐시 (최대 2,048개 도메인)',
          desc: '한 번 조회한 도메인 주소를 내부에 저장해 두어 같은 사이트에 다시 접속할 때 추가 지연을 줄입니다.'
        },
        {
          title: '적응형 로컬 버퍼 (16 KB → 최대 128 KB)',
          desc: '연결 속도에 맞춰 임시 중계 버퍼 크기를 조절해 업로드·다운로드 흐름을 안정적으로 유지합니다.'
        },
        {
          title: '실시간 UDP 직통 전달',
          desc: '게임이나 음성 통화처럼 지연에 민감한 UDP 통신은 프록시를 거치지 않고 바로 통과시킵니다.'
        }
      ]
    },
    benchmark: {
      title: '저하 없는 인터넷 속도',
      subtitle: 'FreeView 사용 여부에 따른 속도와 지연 시간을 40회 교차 측정해 비교한 결과입니다.',
      rows: [
        {
          metric: '다운로드 속도',
          direct: '100.0%',
          index: '101.0%',
          assessment: '미사용 시와 동등',
          tone: 'neutral'
        },
        {
          metric: '업로드 속도',
          direct: '100.0%',
          index: '103.5%',
          assessment: '미사용 시와 동등 (+3.5%)',
          tone: 'positive'
        },
        {
          metric: '웹 반응속도 (핑)',
          direct: '100.0%',
          index: '102.3% (약 +1 ms)',
          assessment: '체감 차이 없음',
          tone: 'neutral'
        },
        {
          metric: '실시간 게임 지연 (UDP)',
          direct: '100.0%',
          index: '100.8%',
          assessment: '미사용 시와 동등 (프록시 미경유)',
          tone: 'neutral'
        },
        {
          metric: '음성 통화 품질 (MOS)',
          direct: '4.40 / 5.0',
          index: '4.40 / 5.0',
          assessment: '통화 품질 저하 없음',
          tone: 'positive'
        }
      ],
      footnote: '※ Cloudflare Speedtest(서울 서버) 기준 총 40회 교차 측정한 결과입니다. 첫 도메인 조회 시 약 5 ms가 소요되며, 이후에는 내부 DNS 캐시(최대 2,048개)가 적용됩니다.'
    }
  });
})();
