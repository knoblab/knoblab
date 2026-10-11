(function () {
  window.registerProject({
    id: 'qdown',
    title: 'qDown',
    accentColor: '#A33A31',
    darkAccentColor: '#A65B51',
    tagline: 'yt-dlp 고성능 미디어 추출 엔진을 위한 직관적인 그래픽 유저 인터페이스',
    summary: '복잡한 커맨드라인 옵션 없이 URL 입력 한 번으로 최고 화질 비디오와 오디오 스트림을 고속 다운로드하는 데스크톱 미디어 도구입니다.',
    links: {
      github: 'https://github.com/knoblab/qdown/',
      download: 'https://github.com/knoblab/qdown/releases',
      docs: 'https://github.com/knoblab/qdown#usage'
    },
    problem: {
      title: '강력하지만 진입장벽이 높은 CLI 미디어 도구',
      desc: 'yt-dlp는 현존하는 가장 강력한 오픈소스 미디어 다운로더이지만, 수십 가지의 터미널 명령어와 포맷 셀렉터 옵션을 숙지해야 해 일반 사용자가 접근하기 어렵습니다. 시중의 상용 다운로더들은 광고나 악성코드, 과도한 유료 결제를 유도하는 문제가 있습니다.'
    },
    solution: {
      title: '클릭 한 번으로 끝나는 무손실 추출 파이프라인',
      desc: 'qDown은 클립보드의 URL을 자동 감지하고, 해당 미디어의 가용 해상도 및 오디오 비트레이트를 시각적 슬롯으로 펼쳐 보여줍니다. FFmpeg를 자체 내장하여 추가 설정 없이 단일 실행 파일로 모든 변환과 병합을 완결합니다.'
    },
    features: [
      {
        title: 'Smart Clipboard Sniffer',
        desc: '유튜브, 트위터 등의 URL을 복사하는 즉시 qDown이 백그라운드에서 감지하여 포맷 분석을 준비합니다.'
      },
      {
        title: 'Lossless FFmpeg Muxing',
        desc: '별도 분리된 고화질 비디오 스트림과 고음질 오디오 트랙을 재인코딩 없는 원본 무손실로 고속 결합합니다.'
      },
      {
        title: 'Batch Playlist Collector',
        desc: '재생목록이나 채널 전체의 동영상을 메타데이터와 함께 일괄 큐에 등록하여 순차 다운로드합니다.'
      },
      {
        title: 'KDDS Minimal Dashboard',
        desc: '불필요한 팝업과 광고를 일체 배제한 Knoblab 특유의 단정하고 콤팩트한 하드웨어 스타일 UI를 제공합니다.'
      }
    ],
    architecture: [
      {
        title: 'URL Ingestion & Tokenizer',
        desc: '입력된 미디어 주소의 유효성을 검증하고 yt-dlp 익스트랙터 엔진에 쿼리를 전송합니다.'
      },
      {
        title: 'Stream Matrix Probe',
        desc: '서버가 제공하는 모든 비디오/오디오 코덱, 해상도(4K/1080p), FPS, 비트레이트 목록을 파싱하여 UI에 바인딩합니다.'
      },
      {
        title: 'Multi-threaded Stream Fetch',
        desc: '선택된 스트림을 최대 16개 청크로 분할하여 병렬 수신함으로써 네트워크 최대 속도를 이끌어냅니다.'
      },
      {
        title: 'FFmpeg Mux & Tag Insertion',
        desc: '다운로드 완료된 청크들을 단일 컨테이너(MP4/MKV)로 패키징하고 챕터 마커와 앨범 아트 태그를 주입합니다.'
      }
    ],
    quickStart: {
      command: 'git clone https://github.com/knoblab/qdown.git\ncd qdown\npip install -r requirements.txt\npython main.py',
      alternative: 'https://github.com/knoblab/qdown/releases 에서 최신 qDown-setup.exe 설치',
      note: 'FFmpeg 바이너리가 빌드에 포함되어 있어 별도 코덱 설치가 필요 없습니다.'
    }
  });
})();
