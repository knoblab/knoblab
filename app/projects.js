function Projects({ darkMode, palette }) {
  const { ArrowRight, Network } = window;

  return (
    <section id="projects" className="relative z-20 py-20" style={{ backgroundColor: darkMode ? palette.black : palette.white }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
              02 // Featured Projects
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal tracking-tight">Project Spectrum</h2>
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
              <p className="text-xs leading-relaxed font-normal mb-8" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                Windows 환경에서 심층 패킷 검사(DPI) 및 SNI 기반 네트워크 차단을 우회하여 네트워크 접근성과 DNS 보안을 제공하는 유저스페이스 터널링 프로그램입니다.
              </p>
            </div>

            <div className="my-4 p-5 border flex items-center justify-center font-mono-custom text-xs" style={{ borderColor: darkMode ? palette.grey9 : palette.grey3 }}>
              {Network && <Network size={22} className="mr-3" style={{ color: palette.highlight }} />}
              <span>PC Application</span>
            </div>

            <a
              href="https://github.com/knoblab/freeview-sni"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-xs font-mono-custom mt-4 hover:opacity-80 transition-opacity"
              style={{ color: darkMode ? palette.white : palette.black }}
            >
              <div className="inline-flex items-center gap-2 transform group-hover:translate-x-2 transition-transform duration-300">
                <span>GitHub</span>
                {ArrowRight && <ArrowRight size={14} style={{ color: palette.highlight }} />}
              </div>
            </a>
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
                <span>Design System</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-normal mb-3">KUDS</h3>
              <p className="text-xs leading-relaxed font-normal mb-8" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                Knoblab Universal Design System
              </p>
            </div>

            <div className="my-4 p-5 border flex items-center justify-center font-mono-custom text-xs" style={{ borderColor: darkMode ? palette.grey9 : palette.grey3 }}>
              <div className="flex gap-2 items-center">
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: palette.black }}></span>
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: palette.grey7 }}></span>
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: palette.white }}></span>
                <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: palette.highlight }}></span>
              </div>
            </div>

            <a
              href="#credit"
              className="group inline-flex items-center gap-2 text-xs font-mono-custom mt-4 hover:opacity-80 transition-opacity"
              style={{ color: darkMode ? palette.white : palette.black }}
            >
              <div className="inline-flex items-center gap-2 transform group-hover:translate-x-2 transition-transform duration-300">
                <span>Learn more</span>
                {ArrowRight && <ArrowRight size={14} style={{ color: palette.highlight }} />}
              </div>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

window.Projects = Projects;


