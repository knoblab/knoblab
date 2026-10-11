(function () {
  window.registerProject({
    id: 'freeview',
    title: 'FreeView',
    accentColor: '#45707A',
    darkAccentColor: '#597981',
    tagline: 'Windows 심층 패킷 검사(DPI) 우회 및 유저스페이스 보안 터널링 유틸리티',
    summary: 'ISP와 방화벽의 SNI 기반 패킷 차단 및 DNS 스푸핑을 로컬 머신에서 안전하게 우회하여, 속도 저하 없이 온전한 웹 접근성을 복원하는 초경량 네트워크 유틸리티입니다.',
    links: {
      github: 'https://github.com/knoblab/freeview-sni',
      download: 'https://github.com/knoblab/freeview-sni/releases',
      docs: 'https://github.com/knoblab/freeview-sni#readme'
    },
    problem: {
      title: 'DPI 검열과 속도 저하의 딜레마',
      desc: '기존의 많은 네트워크 차단 우회 수단(VPN, 프록시)은 모든 트래픽을 제3자 원격 서버로 경유시키기 때문에 심각한 네트워크 지연(Latency)이 발생하고, 개인정보 유출 및 대역폭 제한의 위험에 노출됩니다. 또한 일반적인 DNS 요청은 암호화되지 않아 ISP가 쉽게 패킷 헤더를 변조할 수 있습니다.'
    },
    solution: {
      title: '로컬 TCP 세그먼트 파편화 & 가짜 ClientHello',
      desc: 'FreeView는 외부 프록시 서버를 단 1바이트도 거치지 않습니다. 로컬 머신의 커널 드라이버에서 아웃바운드 TLS 핸드셰이크를 포획한 후, SNI 필드를 포함하는 TCP 패킷을 정밀하게 분할(Fragment)하고 특수 가짜 패킷(Out-of-order Fake Packet)을 주입합니다. DPI 방화벽 장비는 패킷을 조합하지 못해 차단 규칙을 적용하지 못하지만, 목적지 웹 서버는 표준 TCP 스택에 의해 온전하게 재조립하여 접속을 수락합니다.'
    },
    features: [
      {
        title: 'Zero-Proxy Local Splitting',
        desc: '트래픽을 제3자 서버로 라우팅하지 않고 로컬 TCP 스택에서 1바이트 단위로 패킷을 파편화하여, 회선 본래의 기가비트 대역폭을 100% 보존합니다.'
      },
      {
        title: 'DoH (DNS-over-HTTPS) Guard',
        desc: '표준 53번 포트 대신 Cloudflare 및 Google DoH 엔드포인트를 통해 쿼리를 HTTPS로 암호화하여 ISP의 DNS 하이재킹과 스푸핑을 원천 차단합니다.'
      },
      {
        title: 'Kernel WinDivert Driver',
        desc: '마이크로소프트 서명된 WinDivert 커널 드라이버를 통해 OS 네트워크 스택의 최하단에서 패킷을 캡처하므로 브라우저나 앱 설정 변경이 불필요합니다.'
      },
      {
        title: 'KUDS Tactile Control Panel',
        desc: '노브와 토글 스위치 형태의 KUDS 인터페이스를 통해 파편화 크기(Split Chunk Size)와 TTL 오프셋을 실시간으로 미세 조율(Tuning)할 수 있습니다.'
      }
    ],
    architecture: [
      {
        title: 'Outbound Packet Filter',
        desc: '사용자 프로그램(웹 브라우저 등)이 HTTPS 연결을 요청하면 WinDivert 드라이버가 TCP 포트 443으로 향하는 SYN 및 ClientHello 패킷을 즉각 감지합니다.'
      },
      {
        title: 'SNI Extension Analysis',
        desc: 'TLS 1.2 / 1.3 핸드셰이크 패킷 바이트를 검사하여 접속하려는 호스트네임(Server Name Indication) 필드의 위치와 바이트 오프셋을 추출합니다.'
      },
      {
        title: 'Fragmentation & TTL Manipulation',
        desc: 'SNI 문자열 중간에서 패킷을 2개 이상의 청크로 분할하고, DPI 검열 장비만을 속이기 위한 저TTL 가짜 헤더를 선행 주입합니다.'
      },
      {
        title: 'Bypass & End-to-End Handshake',
        desc: 'DPI 방화벽은 차단 패턴 매칭에 실패하고 통과시키며, 목적지 웹 서버는 정상적으로 조립하여 즉각적인 암호화 통신을 개시합니다.'
      }
    ],
    quickStart: {
      command: 'winget install knoblab.freeview',
      alternative: 'git clone https://github.com/knoblab/freeview-sni.git\ncd freeview-sni\ngo build -ldflags "-s -w" -o freeview.exe .',
      note: '관리자 권한(Administrator)으로 실행하여 WinDivert 드라이버를 로드합니다.'
    }
  });
})();
