function Credit({ darkMode, palette }) {
  const { ArrowUpRight, Github, Mail, Globe, Terminal, Code2, Check } = window;

  const techCredits = [
    { name: 'React 18', desc: '컴포넌트 기반 UI 렌더링 엔진', role: 'UI Framework' },
    { name: 'Tailwind CSS', desc: '유틸리티 우선 스타일링 시스템', role: 'Styling' },
    { name: 'IBM Plex Sans & Pretendard', desc: '다국어 타이포그래피', role: 'Typography' },
    { name: 'Babel Standalone', desc: 'JSX 컴파일러', role: 'Compiler' }
  ];

  const focusAreas = [
    '웹 인터랙션 엔지니어링',
    '확장성을 갖춘 디자인 시스템 구축',
    '미니멀 사용자 경험 설계',
    '반응형 웹 설계'
  ];

  return (
    <section id="credit" className="relative z-20 py-20 border-t" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
              04 // Developer & Credits
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight">Credit & Developer Info</h2>
          </div>
          <p className="text-xs font-mono-custom mt-3 md:mt-0 max-w-sm" style={{ color: palette.grey7 }}>
            knoblab의 철학과 인터랙션을 설계·구현한 개발자 프로필
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Developer Profile Card */}
          <div
            className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-between"
            style={{
              backgroundColor: darkMode ? palette.grey11 : palette.grey1,
              border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`
            }}
          >
            <div>
              <div className="flex justify-between items-center text-xs font-mono-custom mb-6">
                <span className="flex items-center gap-2" style={{ color: palette.highlight }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: palette.highlight }}></span>
                  LEAD DEVELOPER
                </span>
                <span style={{ color: palette.grey7 }}>KOREA</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-normal mb-2">이재원</h3>
              <div className="text-xs font-mono-custom mb-6" style={{ color: palette.highlight }}>
                Creative Front-end & Interactive UI Developer
              </div>

              <p className="text-sm leading-relaxed font-normal mb-8" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                노브의 섬세한 회전에서 영감을 받아, 직관적이고 즐거운 웹 경험을 구현합니다.
              </p>

              <div className="border-t pt-6 mb-6" style={{ borderColor: darkMode ? palette.grey9 : palette.grey3 }}>
                <div className="space-y-2.5 text-xs font-light" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                  {focusAreas.map((item, idx) => (
                    <div key={idx} className="flex gap-2.5 items-center">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: palette.highlight }}></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Connect Links */}
            <div className="pt-6 border-t flex flex-wrap gap-3 font-mono-custom text-xs" style={{ borderColor: darkMode ? palette.grey9 : palette.grey3 }}>
              <a
                href="https://github.com/knoblab"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 border flex items-center gap-2 transition-all hover:opacity-80"
                style={{
                  borderColor: darkMode ? palette.grey9 : palette.grey3,
                  backgroundColor: darkMode ? palette.black : palette.white,
                  color: darkMode ? palette.white : palette.black
                }}
              >
                {Github && <Github size={14} />}
                <span>github.com/knoblab</span>
                {ArrowUpRight && <ArrowUpRight size={12} style={{ color: palette.highlight }} />}
              </a>
            </div>
          </div>

          {/* Credits & Tech Stack Card */}
          <div
            className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between"
            style={{
              backgroundColor: darkMode ? palette.grey11 : palette.grey1,
              border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`
            }}
          >
            <div>
              <div className="flex justify-between items-center text-xs font-mono-custom mb-6" style={{ color: palette.grey7 }}>
                <span>CREDITS</span>
                <span>SYSTEM STACK</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-normal mb-6">Tech Stack</h3>

              <div className="space-y-4 font-mono-custom text-xs">
                {techCredits.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 border transition-colors"
                    style={{
                      borderColor: darkMode ? palette.grey9 : palette.grey3,
                      backgroundColor: darkMode ? palette.black : palette.white
                    }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium" style={{ color: darkMode ? palette.white : palette.black }}>
                        {item.name}
                      </span>
                      <span className="text-[11px]" style={{ color: palette.highlight }}>
                        {item.role}
                      </span>
                    </div>
                    <p className="text-[11px] font-sans leading-normal" style={{ color: palette.grey7 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-8 pt-5 border-t font-mono-custom text-xs flex justify-between items-center"
              style={{ borderColor: darkMode ? palette.grey9 : palette.grey3, color: palette.grey7 }}
            >
              <span>knoblab</span>
              <span style={{ color: palette.highlight }}>2026</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

window.Credit = Credit;
