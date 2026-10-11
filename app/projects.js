function Projects({ darkMode, palette }) {
  const { ArrowRight, Network, Download } = window;

  return (
    <section id="projects" className="relative z-20 py-20" style={{ backgroundColor: darkMode ? palette.black : palette.white }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight">Projects</h2>
          </div>
          <p className="text-xs font-mono-custom mt-3 md:mt-0 max-w-xs" style={{ color: palette.grey7 }}>
            웹 인터랙션 및 애플리케이션 컴포넌트 작업물입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Card 1 */}
          <div
            className="p-8 md:p-10 flex flex-col justify-between"
            style={{
              backgroundColor: darkMode ? palette.grey11 : palette.grey1,
              border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`
            }}
          >
            <div>
              <div className="flex justify-between items-center text-xs font-mono-custom mb-6" style={{ color: palette.grey7 }}>
                <span>PROJECT_01</span>
                <span>PC Application</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-normal mb-3">FreeView</h3>
              <p className="text-xs leading-relaxed font-normal" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                Windows 환경에서 심층 패킷 검사(DPI) 및 SNI 기반 네트워크 차단을 우회하여 네트워크 접근성과 DNS 보안을 제공하는 유저스페이스 터널링 프로그램입니다.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <a
                href="#/project/freeview"
                className="px-5 py-3 border inline-flex items-center gap-2 font-mono-custom text-xs group hover:opacity-80 transition-all font-medium"
                style={{
                  borderColor: darkMode ? palette.grey9 : palette.grey3,
                  color: palette.highlight,
                  backgroundColor: darkMode ? palette.black : palette.white
                }}
              >
                <div className="inline-flex items-center gap-2 transform group-hover:translate-x-1.5 transition-transform duration-300">
                  <span>자세히 보기</span>
                  {ArrowRight && <ArrowRight size={14} style={{ color: palette.highlight }} />}
                </div>
              </a>
              <a
                href="https://github.com/knoblab/freeview-sni"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono-custom hover:opacity-80 transition-opacity"
                style={{ color: palette.grey7 }}
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="p-8 md:p-10 flex flex-col justify-between"
            style={{
              backgroundColor: darkMode ? palette.grey11 : palette.grey1,
              border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`
            }}
          >
            <div>
              <div className="flex justify-between items-center text-xs font-mono-custom mb-6" style={{ color: palette.grey7 }}>
                <span>PROJECT_02</span>
                <span>PC Application</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-normal mb-3">qDown</h3>
              <p className="text-xs leading-relaxed font-normal" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                yt-dlp 툴을 누구나 쉽게 사용할 수 있도록 만든 직관적인 그래픽 유저 인터페이스 프로그램입니다.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <a
                href="#/project/qdown"
                className="px-5 py-3 border inline-flex items-center gap-2 font-mono-custom text-xs group hover:opacity-80 transition-all font-medium"
                style={{
                  borderColor: darkMode ? palette.grey9 : palette.grey3,
                  color: palette.highlight,
                  backgroundColor: darkMode ? palette.black : palette.white
                }}
              >
                <div className="inline-flex items-center gap-2 transform group-hover:translate-x-1.5 transition-transform duration-300">
                  <span>자세히 보기</span>
                  {ArrowRight && <ArrowRight size={14} style={{ color: palette.highlight }} />}
                </div>
              </a>
              <a
                href="https://github.com/knoblab/qdown/"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono-custom hover:opacity-80 transition-opacity"
                style={{ color: palette.grey7 }}
              >
                GitHub ↗
              </a>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="p-8 md:p-10 flex flex-col justify-between"
            style={{
              backgroundColor: darkMode ? palette.grey11 : palette.grey1,
              border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`
            }}
          >
            <div>
              <div className="flex justify-between items-center text-xs font-mono-custom mb-6" style={{ color: palette.grey7 }}>
                <span>PROJECT_03</span>
                <span>Design System</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-normal mb-3">KUDS</h3>
              <p className="text-xs leading-relaxed font-normal mb-6" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                Knoblab Universal Design System
              </p>
              <div className="flex gap-2 items-center flex-wrap">
                <span className="w-3.5 h-3.5 rounded-full" title={`Dancheong Red (${palette.dancheong})`} style={{ backgroundColor: palette.dancheong }}></span>
                <span className="w-3.5 h-3.5 rounded-full" title={`Ripe Persimmon (${palette.persimmon})`} style={{ backgroundColor: palette.persimmon }}></span>
                <span className="w-3.5 h-3.5 rounded-full" title={`Canola Yellow (${palette.canola})`} style={{ backgroundColor: palette.canola }}></span>
                <span className="w-3.5 h-3.5 rounded-full" title={`Mugwort Green (${palette.mugwort})`} style={{ backgroundColor: palette.mugwort }}></span>
                <span className="w-3.5 h-3.5 rounded-full" title={`Celadon Blue (${palette.celadon})`} style={{ backgroundColor: palette.celadon }}></span>
                <span className="w-3.5 h-3.5 rounded-full" title={`Indigo Blue (${palette.indigo})`} style={{ backgroundColor: palette.indigo }}></span>
                <span className="w-3.5 h-3.5 rounded-full" title={`Gromwell Violet (${palette.gromwell})`} style={{ backgroundColor: palette.gromwell }}></span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-start">
              <a
                href="#design"
                className="px-5 py-3 border inline-flex items-center gap-2 font-mono-custom text-xs group hover:opacity-80 transition-all font-medium"
                style={{
                  borderColor: darkMode ? palette.grey9 : palette.grey3,
                  color: palette.highlight,
                  backgroundColor: darkMode ? palette.black : palette.white
                }}
              >
                <div className="inline-flex items-center gap-2 transform group-hover:translate-x-1.5 transition-transform duration-300">
                  <span>자세히 보기</span>
                  {ArrowRight && <ArrowRight size={14} style={{ color: palette.highlight }} />}
                </div>
              </a>
            </div>
          </div>

          {/* Card 4 */}
          <div
            className="p-8 md:p-10 flex flex-col justify-between"
            style={{
              backgroundColor: darkMode ? palette.grey11 : palette.grey1,
              border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`
            }}
          >
            <div>
              <div className="flex justify-between items-center text-xs font-mono-custom mb-6" style={{ color: palette.grey7 }}>
                <span>PROJECT_04</span>
                <span>Service</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-normal mb-3">Knoblab 통합 login</h3>
              <p className="text-xs leading-relaxed font-normal" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                Knoblab 통합 로그인을 이용하면 Knoblab이 제공하는 서비스를 간편하게 이용할 수 있습니다.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-start">
              <a
                href="#/project/login"
                className="px-5 py-3 border inline-flex items-center gap-2 font-mono-custom text-xs group hover:opacity-80 transition-all font-medium"
                style={{
                  borderColor: darkMode ? palette.grey9 : palette.grey3,
                  color: palette.highlight,
                  backgroundColor: darkMode ? palette.black : palette.white
                }}
              >
                <div className="inline-flex items-center gap-2 transform group-hover:translate-x-1.5 transition-transform duration-300">
                  <span>자세히 보기</span>
                  {ArrowRight && <ArrowRight size={14} style={{ color: palette.highlight }} />}
                </div>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

window.Projects = Projects;


