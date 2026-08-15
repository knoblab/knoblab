function Design({ darkMode, palette }) {
  const { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy } = window;
  const ArrowLeftIcon = ArrowLeft || (() => null);
  const ArrowRightIcon = ArrowRight || (() => null);
  const ArrowUpRightIcon = ArrowUpRight || (() => null);
  const CheckIcon = Check || (() => null);
  const CopyIcon = Copy || (() => null);

  const [copiedInfo, setCopiedInfo] = React.useState(null);

  const copyHex = (hex, name) => {
    navigator.clipboard?.writeText(hex);
    setCopiedInfo({ hex, name });
    setTimeout(() => setCopiedInfo(null), 2200);
  };

  const heritageAccents = [
    {
      name: 'Dancheong Red',
      koreanName: '단청 레드',
      hex: '#A33A31',
      desc: '목조 건축과 인장의 깊고 고풍스러운 붉은색',
      isBase: false
    },
    {
      name: 'Ripe Persimmon',
      koreanName: '홍시 오렌지',
      hex: '#C65D2B',
      desc: '늦가을 볕에 알맞게 익은 감의 묵직하고 따스한 주황색',
      isBase: false
    },
    {
      name: 'Canola Yellow',
      koreanName: '유채꽃 옐로우',
      hex: '#E0A93B',
      desc: '봄날의 생기를 머금되 전체 톤에 맞춰 차분하게 정돈한 노란색',
      isBase: false
    },
    {
      name: 'Mugwort Green',
      koreanName: '머그워트 그린 (Base Anchor)',
      hex: '#556042',
      desc: '들풀의 생명력과 흙내음이 밴 절제된 녹색',
      isBase: true
    },
    {
      name: 'Celadon Blue',
      koreanName: '청자 블루',
      hex: '#45707A',
      desc: '맑은 고려비색 도자기와 깊은 계곡물에서 느껴지는 옥빛 파란색',
      isBase: false
    },
    {
      name: 'Indigo Blue',
      koreanName: '인디고 블루',
      hex: '#1F3A52',
      desc: '천연 쪽으로 여러 번 정성껏 물들인 단정하고 깊은 남색',
      isBase: false
    },
    {
      name: 'Gromwell Violet',
      koreanName: '자초 바이올렛',
      hex: '#5C3C58',
      desc: '전통 지치 뿌리로 염색한 그윽하고 우아한 보라색',
      isBase: false
    },
  ];

  // Default to Mugwort Green (#556042)
  const [selectedColor, setSelectedColor] = React.useState(heritageAccents[3]);

  const surfaceGrays = [
    { name: 'Base White', hex: '#F7F6F2', role: 'Light Surface' },
    { name: 'Base Black', hex: '#2B2B2E', role: 'Dark Surface' },
    { name: 'Grey 1', hex: '#E7E6E1', role: 'Border Light' },
    { name: 'Grey 3', hex: '#C2C1BB', role: 'Divider' },
    { name: 'Grey 7', hex: '#888783', role: 'Metadata' },
    { name: 'Grey 9', hex: '#535356', role: 'Border Dark' },
    { name: 'Grey 11', hex: '#3A3A3D', role: 'Card Dark' },
  ];

  return (
    <div className="py-16 md:py-24 font-sans relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Floating Copy Notification Toast */}
        {copiedInfo && (
          <div
            className="fixed bottom-8 right-6 md:right-12 z-50 px-5 py-3.5 border shadow-2xl flex items-center gap-3 text-xs font-mono-custom animate-bounce"
            style={{
              borderColor: palette.highlight,
              backgroundColor: darkMode ? '#1F241A' : '#F3F6F0',
              color: darkMode ? '#F7F6F2' : '#2B2B2E'
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: copiedInfo.hex }}></div>
            <div className="flex items-center gap-1.5">
              <CheckIcon size={14} style={{ color: palette.highlight }} />
              <span><strong>{copiedInfo.hex}</strong> ({copiedInfo.name}) 클립보드에 복사됨</span>
            </div>
          </div>
        )}

        {/* Top Navigation */}
        <div className="pb-8 mb-16 border-b flex justify-between items-center text-xs font-mono-custom" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
          <a
            href="#"
            className="inline-flex items-center gap-2 group hover:opacity-80 transition-opacity"
            style={{ color: palette.highlight }}
          >
            <ArrowLeftIcon size={14} className="transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span>RETURN TO OVERVIEW</span>
          </a>

          <div className="flex items-center gap-2" style={{ color: palette.grey7 }}>
            <span>SPEC-01</span>
            <span>//</span>
            <span>KUDS DESIGN SYSTEM</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-3xl mb-24">
          <span className="text-xs font-mono-custom block mb-3" style={{ color: palette.highlight }}>
            01 // Design Specification
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight mb-6 leading-tight">
            Knoblab Universal Design System
          </h1>
          <p className="text-base sm:text-lg font-normal leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
            아날로그 계측 기기의 물리적 촉각성과 정밀 데이터시트의 선형 구조를 디지털 인터페이스로 구현한 knoblab의 핵심 디자인 시스템입니다.
          </p>
        </div>


        {/* SECTION 01: COLOR SYSTEM */}
        <section className="mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
                01 // Color Tokens
              </span>
              <h2 className="text-2xl sm:text-4xl font-normal tracking-tight">Chromatic Architecture</h2>
            </div>
            <p className="text-xs font-mono-custom mt-3 md:mt-0" style={{ color: copiedInfo ? palette.highlight : palette.grey7 }}>
              {copiedInfo ? `✓ 복사 완료: ${copiedInfo.hex}` : '색상을 선택하여 상세 내용 확인 및 복사'}
            </p>
          </div>

          {/* Interactive Dual Panel: Large Preview Card + 7-Heritage Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
            
            {/* Left/Main: Large Active Color Display Card */}
            <div
              className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between text-white transition-all duration-300 relative overflow-hidden"
              style={{
                backgroundColor: selectedColor.hex,
                minHeight: '440px'
              }}
            >
              <div>
                <div className="flex justify-between items-center text-xs font-mono-custom mb-6 opacity-80">
                  <span>{selectedColor.isBase ? 'BASE ANCHOR COLOR' : 'HERITAGE ACCENT TONE'}</span>
                  <span>KUDS-COLOR</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-light tracking-tight mb-2">
                  {selectedColor.name}
                </h3>
                <div className="text-sm font-mono-custom mb-6 opacity-90">
                  {selectedColor.koreanName}
                </div>

                <p className="text-base sm:text-lg font-light leading-relaxed opacity-95 max-w-lg mt-6">
                  {selectedColor.desc}
                </p>
              </div>

              <div className="pt-8 border-t border-white/20 flex flex-wrap justify-between items-center gap-4 text-xs font-mono-custom">
                <div>
                  <span className="opacity-70 block text-[10px]">COLOR CODE</span>
                  <span className="text-sm font-medium">{selectedColor.hex}</span>
                </div>

                <button
                  onClick={() => copyHex(selectedColor.hex, selectedColor.name)}
                  className="px-5 py-2.5 bg-white/15 hover:bg-white/25 border border-white/30 transition-colors flex items-center gap-2 text-xs"
                >
                  {copiedInfo?.hex === selectedColor.hex ? (
                    <>
                      <CheckIcon size={14} />
                      <span>COPIED ✓</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon size={14} />
                      <span>COPY HEX</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: 7-Heritage Colors Selector List */}
            <div
              className="lg:col-span-6 p-6 md:p-8 border flex flex-col justify-between"
              style={{
                borderColor: darkMode ? palette.grey9 : palette.grey1,
                backgroundColor: darkMode ? palette.grey11 : palette.grey1
              }}
            >
              <div>
                <div className="flex justify-between items-center text-xs font-mono-custom pb-3 mb-4 border-b" style={{ borderColor: darkMode ? palette.grey9 : palette.grey3 }}>
                  <span style={{ color: palette.highlight }}>ACCENT SPECTRUM // 7 HERITAGE TONES</span>
                  <span style={{ color: palette.grey7 }}>SELECT TO PREVIEW</span>
                </div>

                <div className="space-y-2">
                  {heritageAccents.map((item, idx) => {
                    const isSelected = selectedColor.hex === item.hex;
                    const isCopied = copiedInfo?.hex === item.hex;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedColor(item)}
                        className="p-3 border flex items-center justify-between cursor-pointer transition-all hover:opacity-95 text-xs font-mono-custom"
                        style={{
                          borderColor: isSelected ? palette.highlight : (darkMode ? palette.grey9 : palette.grey3),
                          backgroundColor: isSelected ? (darkMode ? '#2B3324' : '#E9F0E5') : (darkMode ? palette.black : palette.white),
                          transform: isSelected ? 'translateX(4px)' : 'none'
                        }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className="w-4 h-4 rounded-full shrink-0 border"
                            style={{
                              backgroundColor: item.hex,
                              borderColor: darkMode ? palette.grey9 : palette.grey3
                            }}
                          ></span>
                          <div className="min-w-0">
                            <span className="font-medium truncate block" style={{ color: darkMode ? palette.white : palette.black }}>
                              {item.name}
                            </span>
                            <span className="text-[11px] font-sans truncate block" style={{ color: palette.grey7 }}>
                              {item.desc}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 ml-2">
                          <span style={{ color: item.hex }} className="font-medium">{item.hex}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyHex(item.hex, item.name);
                            }}
                            className="p-1 hover:opacity-80 transition-opacity"
                            title="Copy HEX"
                          >
                            {isCopied ? <CheckIcon size={12} style={{ color: palette.highlight }} /> : <CopyIcon size={12} style={{ color: palette.grey7 }} />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t text-[11px] font-mono-custom flex justify-between items-center" style={{ borderColor: darkMode ? palette.grey9 : palette.grey3, color: palette.grey7 }}>
                <span>Base Anchor: Mugwort Green (#556042)</span>
                <span>7 Spectrum Tokens</span>
              </div>
            </div>

          </div>

          {/* Grayscale & Surface Scale */}
          <div
            className="p-8 md:p-10 border"
            style={{
              borderColor: darkMode ? palette.grey9 : palette.grey1,
              backgroundColor: darkMode ? palette.grey11 : palette.grey1
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono-custom block mb-1" style={{ color: palette.highlight }}>
                  SURFACE & NEUTRAL SCALE
                </span>
                <h3 className="text-xl sm:text-2xl font-light">Off-Neutral Grayscale Palette</h3>
              </div>
              <p className="text-xs max-w-md" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                순백색과 완전한 블랙을 배제하고, 아날로그 장비 하우징의 질감을 구현하는 단계별 무채색 스펙트럼입니다.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {surfaceGrays.map((item, idx) => {
                const isCopied = copiedInfo?.hex === item.hex;
                return (
                  <div
                    key={idx}
                    onClick={() => copyHex(item.hex, item.name)}
                    className="p-3 border cursor-pointer hover:opacity-90 transition-all text-xs font-mono-custom"
                    style={{
                      borderColor: isCopied ? palette.highlight : (darkMode ? palette.grey9 : palette.grey3),
                      backgroundColor: isCopied ? (darkMode ? '#242D1C' : '#EEF4EB') : (darkMode ? palette.black : palette.white),
                      transform: isCopied ? 'scale(0.98)' : 'scale(1)'
                    }}
                  >
                    <div className="w-full h-4 border mb-2" style={{ backgroundColor: item.hex, borderColor: darkMode ? palette.grey9 : palette.grey3 }}></div>
                    <div className="text-[11px] truncate font-medium">{item.name}</div>
                    <div className="text-[10px] mt-0.5 flex justify-between items-center" style={{ color: isCopied ? palette.highlight : palette.highlight }}>
                      <span>{isCopied ? 'COPIED ✓' : item.hex}</span>
                      {isCopied && <CheckIcon size={10} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* SECTION 02: TYPOGRAPHY */}
        <section className="mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
                02 // Typography System
              </span>
              <h2 className="text-2xl sm:text-4xl font-normal tracking-tight">Unified Type Architecture</h2>
            </div>
            <p className="text-xs font-mono-custom mt-3 md:mt-0" style={{ color: palette.grey7 }}>
              Specimen // IBM Plex Sans & Pretendard
            </p>
          </div>

          <div className="divide-y border-t border-b" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
            
            {/* Specimen Row 1: Wordmark */}
            <div className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3 text-xs font-mono-custom" style={{ color: palette.grey7 }}>
                Wordmark
              </div>
              <div className="md:col-span-9">
                <div className="text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-none">
                  knoblab
                </div>
              </div>
            </div>

            {/* Specimen Row 2: Typography & Core Glyphs */}
            <div className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3 text-xs font-mono-custom" style={{ color: palette.grey7 }}>
                Typography (Latin)
              </div>
              <div className="md:col-span-9 space-y-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight">
                  IBM Plex Sans
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight leading-snug">
                  AaBbCcDdEeFfGgHhIiJjKk<br />
                  LlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight leading-snug">
                  0123456789 !?,.;:--&€$@%*
                </div>
              </div>
            </div>

            {/* Specimen Row 3: Multilingual Scripts (Korean, Japanese, Extended Latin) */}
            <div className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3 text-xs font-mono-custom" style={{ color: palette.grey7 }}>
                Multilingual CJK
              </div>
              <div className="md:col-span-9 space-y-8">
                {/* Korean */}
                <div>
                  <div className="text-xs font-mono-custom mb-1" style={{ color: palette.highlight }}>
                    KOREAN // 한국어
                  </div>
                  <div className="text-xl sm:text-2xl font-normal tracking-tight mb-1">
                    가나다라마바사아자차카타파하
                  </div>
                  <div className="text-lg sm:text-xl font-light tracking-tight mb-1" style={{ color: darkMode ? palette.white : palette.black }}>
                    참나무 타는 소리와 야경만큼 밤의 여유를 표현해 주는 것도 없다
                  </div>
                  <p className="text-sm font-light leading-relaxed mt-1" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                    0과 1, 흑과 백이라는 이분법을 넘어 사용자의 환경에 가장 완벽하게 맞춘 연속적인 웹 경험.
                  </p>
                </div>

                {/* Japanese */}
                <div className="pt-6 border-t" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
                  <div className="text-xs font-mono-custom mb-1" style={{ color: palette.highlight }}>
                    JAPANESE // 日本語 (Hiragana, Katakana & Kanji)
                  </div>
                  <div className="text-xl sm:text-2xl font-normal tracking-tight mb-1">
                    あいうえおかきくけこ アイウエオカキクケコ
                  </div>
                  <div className="text-lg sm:text-xl font-light tracking-tight mb-1" style={{ color: darkMode ? palette.white : palette.black }}>
                    いろはにほへと ちりぬるを わかよたれそ つねならむ (伊呂波歌)
                  </div>
                  <p className="text-sm font-light leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                    ノブを繊細に回すように、あなたの周波数に合わせた途切れのないウェブ体験を提供します。
                  </p>
                </div>

                {/* Extended Latin & Diacritics */}
                <div className="pt-6 border-t" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
                  <div className="text-xs font-mono-custom mb-1" style={{ color: palette.highlight }}>
                    EXTENDED LATIN // Diacritics & Accents
                  </div>
                  <div className="text-base sm:text-lg font-normal tracking-tight leading-relaxed break-all" style={{ color: darkMode ? palette.white : palette.black }}>
                    ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïñòóôõöøùúûüýÿ
                  </div>
                  <p className="text-sm font-light leading-relaxed mt-1" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                    Voix ambiguë d'un cœur qui au zéphir préfère les jattes de kiwis.
                  </p>
                </div>
              </div>
            </div>

            {/* Specimen Row 4: Role & Allocation */}
            <div className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3 text-xs font-mono-custom" style={{ color: palette.grey7 }}>
                Role & Allocation
              </div>
              <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
                    HEADINGS & DISPLAY // IBM PLEX SANS
                  </span>
                  <p className="text-xs font-sans leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                    단정하고 기계적인 조형미를 지닌 산세리프 글꼴로, 자간과 행간을 정밀하게 제어하여 헤드라인과 디스플레이 텍스트에 뛰어난 시각적 통일감을 제공합니다.
                  </p>
                  <div className="mt-3 text-xs font-mono-custom" style={{ color: palette.grey7 }}>
                    Weight: 300 / 400 / 500 / 600
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
                    BODY & TELEMETRY LABELS // MULTILINGUAL SANS
                  </span>
                  <p className="text-xs font-sans leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                    라벨과 메타데이터(`01 //`), 기술 파라미터부터 다국어 본문 단락까지 일관된 폰트 패밀리를 적용하여 전 세계 언어 환경에서 조화로운 판독성을 완성합니다.
                  </p>
                  <div className="mt-3 text-xs font-mono-custom" style={{ color: palette.grey7 }}>
                    Weight: 400 / 500
                  </div>
                </div>
              </div>
            </div>

            {/* Specimen Row 5: Weights & Hierarchy Scale */}
            <div className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-3 text-xs font-mono-custom" style={{ color: palette.grey7 }}>
                Weights & Hierarchy
              </div>
              <div className="md:col-span-9 space-y-5">
                <div>
                  <span className="text-[11px] font-mono-custom block mb-1" style={{ color: palette.highlight }}>300 Light // Display Subtitle</span>
                  <div className="text-xl sm:text-2xl font-light tracking-tight">Tuning the Web to Your Frequency.</div>
                </div>
                <div>
                  <span className="text-[11px] font-mono-custom block mb-1" style={{ color: palette.highlight }}>400 Regular // Body Paragraph</span>
                  <div className="text-base sm:text-lg font-normal leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                    노브를 섬세하게 돌리듯 사용자의 환경에 최적화된 연속적인 웹 인터랙션을 제공합니다.
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-mono-custom block mb-1" style={{ color: palette.highlight }}>500 Medium // Section Headings</span>
                  <div className="text-xl sm:text-2xl font-medium tracking-tight">Design System & Component Architecture</div>
                </div>
                <div>
                  <span className="text-[11px] font-mono-custom block mb-1" style={{ color: palette.highlight }}>600 SemiBold // Key Emphasis</span>
                  <div className="text-xl sm:text-2xl font-semibold tracking-tight">Purity, Progress, Performance</div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* SECTION 03: SURFACES & HAIRLINE PRIMITIVES */}
        <section className="mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
                03 // Structure & Primitives
              </span>
              <h2 className="text-2xl sm:text-4xl font-normal tracking-tight">Hairline & Marking Grid</h2>
            </div>
            <p className="text-xs font-mono-custom mt-3 md:mt-0 max-w-xs" style={{ color: palette.grey7 }}>
              장식적 요소를 배제한 엄격한 1px 보더 구조
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: Marking Grid Pattern */}
            <div
              className="p-8 md:p-10 border marking-grid-bg flex flex-col justify-between"
              style={{
                borderColor: darkMode ? palette.grey9 : palette.grey1,
                backgroundColor: darkMode ? palette.black : palette.white
              }}
            >
              <div>
                <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
                  SURFACE PATTERN
                </span>
                <h3 className="text-xl sm:text-2xl font-normal mb-3">12px Marking Grid</h3>
                <p className="text-xs leading-relaxed mb-8" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                  CSS linear-gradient를 활용한 12px 간격의 수평 헤어라인 배경으로 모눈종이나 계측기 화면의 질감을 구현합니다.
                </p>
              </div>

              <div className="pt-6 border-t font-mono-custom text-xs flex justify-between items-center" style={{ borderColor: darkMode ? palette.grey9 : palette.grey3, color: palette.grey7 }}>
                <span>Pattern: Linear Gradient</span>
                <span style={{ color: palette.highlight }}>12px Pitch</span>
              </div>
            </div>

            {/* Card 2: Interactive Tactile Primitives */}
            <div
              className="p-8 md:p-10 border flex flex-col justify-between"
              style={{
                borderColor: darkMode ? palette.grey9 : palette.grey1,
                backgroundColor: darkMode ? palette.grey11 : palette.grey1
              }}
            >
              <div>
                <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
                  CONTROL PRIMITIVES
                </span>
                <h3 className="text-xl sm:text-2xl font-normal mb-3">Tactile Triggers</h3>
                <p className="text-xs leading-relaxed mb-6" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                  그림자 없이 명확한 1px 경계선과 상태 전환 피드백을 제공하는 조작 컴포넌트입니다.
                </p>

                <div className="flex flex-wrap gap-4 items-center mb-6">
                  <button
                    className="px-6 py-3 font-medium text-white transition-opacity hover:opacity-90 flex items-center gap-2 text-xs font-mono-custom"
                    style={{ backgroundColor: palette.highlight }}
                  >
                    <span>Primary Action</span>
                    <ArrowRightIcon size={14} />
                  </button>
                  <button
                    className="px-6 py-3 border transition-colors hover:opacity-80 text-xs font-mono-custom"
                    style={{
                      borderColor: darkMode ? palette.grey9 : palette.grey3,
                      color: darkMode ? palette.white : palette.black
                    }}
                  >
                    Outlined Button
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t font-mono-custom text-xs flex justify-between items-center" style={{ borderColor: darkMode ? palette.grey9 : palette.grey3 }}>
                <span className="flex items-center gap-2" style={{ color: palette.highlight }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: palette.highlight }}></span>
                  Active Telemetry
                </span>
                <span style={{ color: palette.grey7 }}>Border: 1px Solid</span>
              </div>
            </div>
          </div>
        </section>


        {/* Bottom Return Bar */}
        <div className="pt-12 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono-custom" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
          <a
            href="#"
            className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
            style={{ color: palette.highlight }}
          >
            <ArrowLeftIcon size={14} />
            <span>RETURN TO MAIN OVERVIEW</span>
          </a>

          <div className="flex items-center gap-6" style={{ color: palette.grey7 }}>
            <a href="https://pdf-ds.qpi.digital/" target="_blank" rel="noreferrer" className="hover:opacity-80 flex items-center gap-1.5" style={{ color: palette.highlight }}>
              <span>KDDS Docs</span>
              <ArrowUpRightIcon size={12} />
            </a>
            <span>Knoblab © 2026</span>
          </div>
        </div>

      </div>
    </div>
  );
}

window.Design = Design;
