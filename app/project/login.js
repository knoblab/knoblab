(function () {
  window.registerProject({
    id: 'login',
    title: 'Knoblab 통합 login',
    accentColor: '#556042',
    darkAccentColor: '#717A63',
    tagline: 'Knoblab 생태계 전반을 연결하는 보안 중심의 통합 계정 및 인증 서비스',
    summary: 'Knoblab 통합 로그인을 이용하면 단일 계정으로 Knoblab이 제공하는 서비스와 도구들을 안전하고 간편하게 이용할 수 있습니다.',
    links: {
      github: 'https://github.com/knoblab'
    },
    problem: {
      title: '분절된 계정 체계와 파편화된 인증 경험',
      desc: '서비스와 툴마다 서로 다른 인증 체계를 적용하면 계정 파편화가 발생하고 사용자 인증 상태를 안전하게 동기화하기 어렵습니다. 또한 과도한 외부 OAuth 종속성은 개인정보 통제권과 독립성을 저해할 수 있습니다.'
    },
    solution: {
      title: '단일 엔드포인트 세션 & 경량화된 보안 토큰',
      desc: 'Knoblab 통합 로그인은 현대적인 암호화 표준을 기반으로 설계되어 단 한 번의 인증으로 Knoblab의 모든 웹 서비스, CLI, 데스크톱 도구 간의 세션을 안전하고 매끄럽게 연결합니다.'
    },
    features: [
      {
        title: 'Unified Single Sign-On (SSO)',
        desc: '단일 인증 토큰으로 웹, 데스크톱 유틸리티, 터미널 CLI 환경 전반에서 끊김 없는 접근성을 제공합니다.'
      },
      {
        title: 'Modern Cryptographic Security',
        desc: 'Argon2id 기반의 안전한 자격 증명 관리와 단기 유효 JWT 및 회전형 리프레시 토큰 아키텍처를 적용했습니다.'
      },
      {
        title: 'Zero-Telemetry & Privacy First',
        desc: '불필요한 트래킹 데이터나 행동 로그를 일체 수집하지 않으며, 최소한의 계정 정보만을 강력하게 암호화하여 보관합니다.'
      },
      {
        title: 'KUDS Consistent Experience',
        desc: 'KUDS 디자인 시스템을 엄격히 준수하여 불필요한 장식을 배제하고 절제된 하드웨어 감성의 UI를 제공합니다.'
      }
    ],
    architecture: [
      {
        title: 'Auth Request Dispatch',
        desc: '클라이언트 애플리케이션에서 암호화된 인증 요청을 수신하고 오리진 도메인과 서명을 엄격히 검증합니다.'
      },
      {
        title: 'Credential Verification',
        desc: '안전한 단방향 해시 대조를 통해 사용자 자격 증명을 검증하고 다중 인증 요건을 처리합니다.'
      },
      {
        title: 'Token & Session Generation',
        desc: '서명된 세션 토큰을 발급하여 HttpOnly 쿠키 및 보안 컨텍스트에 안전하게 바인딩합니다.'
      },
      {
        title: 'Ecosystem Session Sync',
        desc: 'Knoblab 생태계 내의 각 서비스 및 툴로 인증 상태를 동기화하여 연속적인 사용자 경험을 완성합니다.'
      }
    ]
  });
})();
