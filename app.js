const { useState, useEffect } = React;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [route, setRoute] = useState(window.location.hash || '');

  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash;
      setRoute(currentHash);
      if (currentHash === '#design' || currentHash === '#/design' || currentHash === '' || currentHash === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const { Sun, Moon, ArrowRight, Check, Overview, Projects, Specs, Credit, Design } = window;
  const SunIcon = Sun || (() => null);
  const MoonIcon = Moon || (() => null);
  const ArrowRightIcon = ArrowRight || (() => null);
  const CheckIcon = Check || (() => null);
  const OverviewComp = Overview || (() => null);
  const ProjectsComp = Projects || (() => null);
  const SpecsComp = Specs || (() => null);
  const CreditComp = Credit || (() => null);
  const DesignComp = Design || (() => null);

  const isDesignPage = route.startsWith('#design') || route.startsWith('#/design');

  const palette = {
    black: '#2B2B2E',
    white: '#F7F6F2',
    highlight: '#556042',
    mugwort: '#556042',
    dancheong: '#A33A31',
    persimmon: '#C65D2B',
    canola: '#E0A93B',
    celadon: '#45707A',
    indigo: '#1F3A52',
    gromwell: '#5C3C58',
    grey11: '#3A3A3D',
    grey9: '#535356',
    grey7: '#888783',
    grey3: '#C2C1BB',
    grey1: '#E7E6E1'
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300 selection:bg-[#556042] selection:text-[#F7F6F2] font-sans"
      style={{
        backgroundColor: darkMode ? palette.black : palette.white,
        color: darkMode ? palette.white : palette.black
      }}
    >


      {/* HEADER */}
      <header
        className="sticky top-0 left-0 w-full z-50 px-6 md:px-12 py-4 select-none backdrop-blur-md"
        style={{
          borderBottom: `1px solid ${darkMode ? palette.grey9 : palette.grey1}`,
          backgroundColor: darkMode ? `${palette.black}EE` : `${palette.white}EE`
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 font-semibold text-base tracking-tight">
            <img src="img/logo.svg" alt="knoblab logo" className="w-6 h-6" />
            <span>knoblab</span>
          </a>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8 text-xs font-mono-custom">
              <a href="#overview" className="hover:opacity-70 transition-opacity">Overview</a>
              <a href="#projects" className="hover:opacity-70 transition-opacity">Projects</a>
              <a href="#design" className="hover:opacity-70 transition-opacity" style={{ color: isDesignPage ? palette.highlight : 'inherit' }}>Design</a>
              <a href="#specifications" className="hover:opacity-70 transition-opacity">Specs</a>
              <a href="#credit" className="hover:opacity-70 transition-opacity">Credit</a>
            </nav>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="transition-colors flex items-center gap-2 text-xs font-mono-custom hover:opacity-80"
              style={{ color: darkMode ? palette.grey3 : palette.black }}
            >
              {darkMode ? <SunIcon size={14} /> : <MoonIcon size={14} />}
              <span>{darkMode ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </header>

      {isDesignPage ? (
        /* DESIGN SUBPAGE */
        <DesignComp darkMode={darkMode} palette={palette} />
      ) : (
        /* MAIN LANDING VIEW */
        <>
          {/* HERO SECTION */}
          <section
            className="relative px-6 md:px-12 border-b overflow-hidden"
            style={{
              borderColor: darkMode ? palette.grey9 : palette.grey1,
              backgroundColor: darkMode ? palette.black : palette.white
            }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
              style={{
                backgroundImage: `url('img/hero.webp')`,
                opacity: darkMode ? 0.15 : 0.35
              }}
            />

            {/* Side Fade Overlay */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, 
                  ${darkMode ? palette.black : palette.white} 0%, 
                  transparent 15%, 
                  transparent 85%, 
                  ${darkMode ? palette.black : palette.white} 100%)`
              }}
            />

            <div className="max-w-7xl mx-auto w-full aspect-[16/10] min-h-[400px] flex items-center relative z-20">
              <div className="max-w-2xl">
                <div
                  className="text-xl sm:text-2xl font-medium font-mono-custom tracking-wider mb-3"
                  style={{ color: palette.highlight }}
                >
                  Knoblab
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-snug mb-6">
                  Tuning the Web<br></br>to Your Frequency.
                </h1>

                <p className="text-sm sm:text-base font-normal leading-relaxed max-w-lg mb-8" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                  0과 1, 흑과 백이라는 이분법을 넘어, 노브를 섬세하게 돌리듯 사용자의 취향과 환경에 가장 완벽하게 맞춘 연속적인 웹 경험을 제공해요.
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono-custom">
                  <a
                    href="#projects"
                    className="px-6 py-3 font-medium text-white transition-opacity hover:opacity-90 flex items-center gap-2"
                    style={{ backgroundColor: palette.highlight }}
                  >
                    <span>Explore Projects</span>
                    <ArrowRightIcon size={14} />
                  </a>
                  <a
                    href="#credit"
                    className="px-6 py-3 border transition-colors hover:opacity-80"
                    style={{
                      borderColor: darkMode ? palette.grey9 : palette.grey3,
                      color: darkMode ? palette.white : palette.black
                    }}
                  >
                    <span>View Credits</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 01. OVERVIEW */}
          <OverviewComp darkMode={darkMode} palette={palette} />

          {/* 02. PROJECTS */}
          <ProjectsComp darkMode={darkMode} palette={palette} />

          {/* 03. SPECS & CRAFTSMANSHIP */}
          <SpecsComp darkMode={darkMode} palette={palette} />

          {/* 04. CREDIT */}
          <CreditComp darkMode={darkMode} palette={palette} />
        </>
      )}


      {/* FOOTER */}
      <footer
        className="relative z-20 border-t py-14 text-xs font-mono-custom"
        style={{
          borderColor: darkMode ? palette.grey9 : palette.grey1,
          backgroundColor: darkMode ? palette.black : palette.grey1
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: darkMode ? palette.white : palette.black }}>knoblab</div>
              <ul className="space-y-2" style={{ color: palette.grey7 }}>
                <li><a href="#overview" className="hover:opacity-80">Overview</a></li>
                <li><a href="#projects" className="hover:opacity-80">Projects</a></li>
                <li><a href="#specifications" className="hover:opacity-80">Specifications</a></li>
                <li><a href="#credit" className="hover:opacity-80">Credit</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: darkMode ? palette.white : palette.black }}>Tech Stack</div>
              <ul className="space-y-2" style={{ color: palette.grey7 }}>
                <li>React 19</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>HTML5 Canvas</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: darkMode ? palette.white : palette.black }}>Design System</div>
              <ul className="space-y-2" style={{ color: palette.grey7 }}>
                <li><a href="#design" className="hover:opacity-80" style={{ color: palette.highlight }}>Design Spec // KUDS</a></li>
                <li>IBM Plex Sans</li>
                <li>Pretendard KR</li>
                <li>Mugwort Green (#556042)</li>
                <li>12px Marking Grid</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: darkMode ? palette.white : palette.black }}>Connect</div>
              <ul className="space-y-2" style={{ color: palette.grey7 }}>
                <li><a href="https://github.com/knoblab" target="_blank" rel="noreferrer" className="hover:opacity-80">GitHub</a></li>
                <li><a href="mailto:contact@knoblab.dev" className="hover:opacity-80">Email</a></li>
              </ul>
            </div>
          </div>

          <div
            className="pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]"
            style={{
              borderColor: darkMode ? palette.grey9 : palette.grey1,
              color: palette.grey7
            }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2" style={{ backgroundColor: palette.highlight }}></span>
              <span>knoblab © 2026.</span>
            </div>
            <div>Seoul, Korea</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
