(function () {
  window.registerProject({
    id: 'freeview',
    title: 'FreeView',
    accentColor: '#45707A',
    darkAccentColor: '#597981',
    tagline: 'Tauri(Rust) 기반 Windows 로컬 프록시(127.0.0.1:8080) 심층 패킷 검사(DPI) 우회 유틸리티',
    summary: 'Tauri(Rust) 기반으로 구현되어 창을 닫고 백그라운드로 전환하면 WebView가 종료되며 컴퓨터 자원을 거의 소모하지 않고, PC 내부 로컬 프록시와 내부 DNS 캐시(최대 2,048개 도메인)로 회선 속도 저하 없이 DPI 차단을 우회하는 경량 유틸리티입니다.',
    links: {
      github: 'https://github.com/knoblab/freeview-sni',
      download: 'https://github.com/knoblab/freeview-sni/releases',
      docs: 'https://github.com/knoblab/freeview-sni#readme'
    },
    problem: {
      title: 'DPI 검열과 속도·지연 저하의 딜레마',
      desc: '기존의 많은 네트워크 차단 우회 수단(VPN, 원격 프록시)은 모든 트래픽을 제3자 원격 서버로 경유시키기 때문에 네트워크 지연(Latency) 증가, 대역폭 저하 및 개인정보 유출 위험이 발생합니다. 특히 실시간 게임이나 음성 통화(UDP)까지 원격 프록시를 거치면 체감 품질이 크게 떨어집니다.'
    },
    solution: {
      title: '로컬 프록시 중계 & 실시간 UDP 직통 우회',
      desc: 'FreeView는 외부 프록시 서버를 단 1바이트도 거치지 않고 PC 내부(127.0.0.1:8080)의 로컬 프록시로만 동작합니다. 적응형 로컬 버퍼(16 KB → 최대 128 KB)와 최대 2,048개 도메인을 저장하는 내부 DNS 캐시로 웹 트래픽의 DPI 차단을 매끄럽게 우회하며, 게임·통화 등 실시간 UDP 트래픽은 프록시를 거치지 않고 직통으로 전달해 본래의 속도와 반응성을 유지합니다.'
    },
    benchmark: {
      title: '네트워크 성능 벤치마크 (FreeView ON vs. Direct OFF)',
      subtitle: '공정한 비교를 위해 FreeView 사용과 미사용(Direct) 상태를 번갈아 교차 측정한 결과, 주요 속도·지연·통화 품질 지표에서 미사용과 동등하거나 소폭 우세한 성능을 유지했습니다.',
      overview: [
        {
          label: '테스트 방식',
          value: 'FreeView ON ↔ Direct OFF 교차 20라운드 (1·2차 총 40회 테스트 완료)',
          meta: 'cloudflare-speed-cli v1.0.12 · 서울 ICN 서버 기준'
        },
        {
          label: '집계 기준',
          value: '미사용(Direct) = 100.0% 기준 Hodges-Lehmann 비모수 지수 & 95% 신뢰구간',
          meta: '단일 이상치 왜곡 배제 · 버퍼블로트는 0 ms 포함 특성상 10% 절사평균 95% CI 적용'
        }
      ],
      highlights: [
        { label: '다운로드 속도', value: '101.0%', note: '95% CI 97.7~104.6% · 완전 동등' },
        { label: '업로드 속도', value: '103.5%', note: '95% CI 100.6~106.3% · +3.5% 우세' },
        { label: '실시간 UDP / MOS', value: '100.8% / 4.40', note: '프록시 미경유 직통 · 최상 등급' },
        { label: '버퍼블로트', value: '96.7%', note: '전 회차 A ~ A+ 쾌적 등급 유지' }
      ],
      rows: [
        {
          metric: '다운로드 속도',
          direction: '▲ 높을수록 좋음',
          direct: '100.0%',
          index: '101.0%',
          ci: '97.7% ~ 104.6%',
          assessment: '미사용과 완전히 동등',
          tone: 'neutral'
        },
        {
          metric: '업로드 속도',
          direction: '▲ 높을수록 좋음',
          direct: '100.0%',
          index: '103.5%',
          ci: '100.6% ~ 106.3%',
          assessment: '미사용 대비 소폭 우세 (+3.5%)',
          tone: 'positive'
        },
        {
          metric: '대기 반응속도 (Idle 핑)',
          direction: '▼ 낮을수록 좋음',
          direct: '100.0%',
          index: '102.3%',
          ci: '97.8% ~ 107.7%',
          assessment: '체감 차이 없음 (약 +1 ms)',
          tone: 'neutral'
        },
        {
          metric: '다운로드 중 반응속도',
          direction: '▼ 낮을수록 좋음',
          direct: '100.0%',
          index: '101.4%',
          ci: '98.0% ~ 103.4%',
          assessment: '미사용과 완전히 동등',
          tone: 'neutral'
        },
        {
          metric: '업로드 중 반응속도',
          direction: '▼ 낮을수록 좋음',
          direct: '100.0%',
          index: '100.8%',
          ci: '98.5% ~ 103.2%',
          assessment: '미사용과 완전히 동등',
          tone: 'neutral'
        },
        {
          metric: '혼잡 제어 (버퍼블로트)',
          direction: '▼ 낮을수록 좋음',
          direct: '100.0%',
          index: '96.7%',
          ci: '65.9% ~ 139.5%',
          assessment: '전 회차 A ~ A+ 쾌적 등급',
          tone: 'positive'
        },
        {
          metric: '초기 보안 연결 (TLS)',
          direction: '▼ 낮을수록 좋음',
          direct: '100.0%',
          index: '97.5%',
          ci: '85.8% ~ 109.4%',
          assessment: '체감 차이 없음',
          tone: 'neutral'
        },
        {
          metric: '실시간 UDP 지연 (게임·통화)',
          direction: '▼ 낮을수록 좋음',
          direct: '100.0%',
          index: '100.8%',
          ci: '95.7% ~ 107.5%',
          assessment: '미사용과 동등 (프록시 미경유 직통)',
          tone: 'neutral'
        },
        {
          metric: '실시간 통화 품질 (UDP MOS)',
          direction: '▲ 높을수록 좋음',
          direct: '100.0%',
          index: '100.0%',
          ci: '100.0% ~ 100.0%',
          assessment: '최상 등급 유지 (4.40)',
          tone: 'positive'
        },
        {
          metric: '첫 도메인 조회 (미캐시 DNS)',
          direction: '▼ 낮을수록 좋음',
          direct: '100.0%',
          index: '중앙값 998.4% (HL 1,386.0%)',
          ci: '884.8% ~ 2,021.6%',
          assessment: '첫 접속 시 약 +5~8 ms 추가 (이후 캐시 적중)',
          tone: 'note'
        },
        {
          metric: '업로드 속도 변동폭 (CV)',
          direction: '▼ 낮을수록 좋음',
          direct: '100.0%',
          index: '202.1%',
          ci: '171.4% ~ 231.5%',
          assessment: '로컬 버퍼 특성상 측정 그래프 진폭 확대',
          tone: 'note'
        }
      ],
      notes: [
        {
          title: '미캐시 DNS 998.4% — 실제 차이는 약 +5 ms (극소 기준값 0.55 ms의 영향)',
          points: [
            '분모가 극히 작은 비율 착시: Direct는 Windows OS 캐시(0.55 ms)를 즉시 읽어 기준값이 매우 작기 때문에, 외부 DNS 신규 조회 시간(5.51 ms, +5 ms 차이)이 비율상 약 10배로 커 보입니다.',
            '실사용 시 내부 DNS 캐시 적중: 벤치마크에서는 매 라운드 FreeView를 새로 켰다 꺼 항상 빈 캐시만 측정되었으나, 실사용 중에는 내부 DNS 캐시(최대 2,048개 도메인)가 동작해 재조회 지연이 거의 없습니다.'
          ]
        },
        {
          title: '업로드 변동폭(CV) 202.1% — 로컬 버퍼로 인한 그래프 진폭 (실제 업로드 103.5%)',
          points: [
            '로컬 버퍼 경유 구조: 로컬 프록시(127.0.0.1:8080)가 데이터를 보낼 때 OS 소켓 버퍼와 임시 중계 메모리(16 KB → 최대 128 KB 적응형 버퍼)를 한 번 거칩니다.',
            '구간 진폭만 확대: 외부 망보다 훨씬 빠른 PC 내부 버퍼에 데이터를 순식간에 채웠다가 비워지길 대기하는 리듬이 반복되어 CV 수치만 크게 측정될 뿐, 실제 전체 업로드 속도는 미사용 대비 +3.5% 더 빠릅니다.'
          ]
        }
      ]
    },
    resourceFootprint: {
      title: 'Tauri · Rust 기반 백그라운드 초경량 실행',
      desc: 'FreeView는 Tauri와 Rust 기반으로 구현되었습니다. 창을 닫아 백그라운드 상태로 전환하면 UI를 담당하는 WebView가 함께 종료되고 경량 Rust 코어만 유지되므로, 게임이나 다른 작업을 하는 동안에도 컴퓨터 자원을 거의 사용하지 않습니다.',
      image: 'img/freeview-resource.png',
      imageAlt: '창을 닫은 백그라운드 상태에서 확인한 Windows 작업 관리자 FreeView 프로세스 화면',
      caption: '창을 닫아 WebView가 종료된 백그라운드 동작 상태의 Windows 작업 관리자'
    },
    features: [
      {
        title: 'Rust Local Proxy (127.0.0.1:8080)',
        desc: 'Rust로 작성된 PC 내부 로컬 프록시로 동작하며, 창을 닫으면 WebView가 종료되어 시스템 자원을 거의 소비하지 않고 외부 원격 서버 경유 없이 회선 본래의 대역폭을 보존합니다.'
      },
      {
        title: 'Adaptive Local Buffer (16 KB → 128 KB)',
        desc: '연결 트래픽 흐름에 맞춰 16 KB에서 최대 128 KB까지 확장되는 적응형 임시 중계 버퍼를 사용해 안정적인 스트림 전송 효율을 확보합니다.'
      },
      {
        title: 'In-Memory DNS Cache (2,048 Domains)',
        desc: '최대 2,048개 도메인을 저장하는 내부 DNS 캐시를 탑재해 첫 조회 이후 반복 접속 시 추가 조회 지연 없이 즉각 주소를 반환합니다.'
      },
      {
        title: 'Direct UDP Passthrough',
        desc: '실시간 게임 및 음성 통화 등 지연에 민감한 UDP 트래픽은 로컬 프록시를 경유하지 않고 직통으로 전달해 미사용과 동등한 반응성과 통화 품질(MOS 4.40)을 유지합니다.'
      }
    ],
    architecture: [
      {
        title: 'Local Proxy Ingress',
        desc: '사용자 앱의 웹 연결 요청이 외부 서버가 아닌 PC 내부 로컬 프록시(127.0.0.1:8080)로 인입됩니다.'
      },
      {
        title: 'DNS Cache & Resolution',
        desc: '최대 2,048개 도메인을 보관하는 내부 DNS 캐시를 우선 조회하고, 미등록 도메인만 외부 DNS를 통해 새로 해석해 캐시에 저장합니다.'
      },
      {
        title: 'DPI Bypass & Adaptive Relay',
        desc: 'TLS/SNI 구간의 DPI 차단을 우회한 뒤, OS 소켓 버퍼 및 16~128 KB 적응형 로컬 버퍼를 통해 목적지 서버와 데이터를 안정적으로 중계합니다.'
      },
      {
        title: 'Direct UDP Bypass',
        desc: '실시간 UDP 패킷은 프록시 중계 경로를 거치지 않고 OS 기본 네트워크 경로로 직통 전달하여 지연 시간 증가를 원천 방지합니다.'
      }
    ],
    quickStart: {
      command: 'winget install knoblab.freeview',
      alternative: 'git clone https://github.com/knoblab/freeview-sni.git\ncd freeview-sni\ncargo tauri build',
      note: 'Tauri(Rust) 기반 데스크톱 앱으로, 창을 닫으면 WebView가 종료되고 경량 Rust 코어 및 로컬 프록시(127.0.0.1:8080)만 백그라운드에서 동작합니다.'
    }
  });
})();
