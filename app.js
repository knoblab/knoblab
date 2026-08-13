const { useState } = React;

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const { Sun, Moon, ArrowRight, Check, Overview, Projects, Specs, Contact } = window;
  const SunIcon = Sun || (() => null);
  const MoonIcon = Moon || (() => null);
  const ArrowRightIcon = ArrowRight || (() => null);
  const CheckIcon = Check || (() => null);
  const OverviewComp = Overview || (() => null);
  const ProjectsComp = Projects || (() => null);
  const SpecsComp = Specs || (() => null);
  const ContactComp = Contact || (() => null);


  const palette = {
    black: '#2B2B2E',
    white: '#F7F6F2',
    highlight: '#556042',
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
              <a href="#specifications" className="hover:opacity-70 transition-opacity">Specs</a>
              <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
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
            backgroundImage: `url('img/hero.jpg')`,
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
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-mono-custom tracking-wider"
              style={{
                border: `1px solid ${darkMode ? palette.grey9 : palette.grey1}`,
                color: darkMode ? palette.grey3 : palette.grey9,
                backgroundColor: darkMode ? `${palette.grey11}80` : `${palette.grey1}80`
              }}
            >
              <span className="w-1.5 h-1.5" style={{ backgroundColor: palette.highlight }}></span>
              Knoblab
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-snug mb-6">
              Tuning the Web to Your Frequency.
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
                href="#contact"
                className="px-6 py-3 border transition-colors hover:opacity-80"
                style={{
                  borderColor: darkMode ? palette.grey9 : palette.grey3,
                  color: darkMode ? palette.white : palette.black
                }}
              >
                <span>Contact Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 01. OVERVIEW */}
      <OverviewComp darkMode={darkMode} palette={palette} />

      {/* 02. PROJECTS */}
      <ProjectsComp darkMode={darkMode} palette={palette} />

      {/* 03. SPECS */}
      <SpecsComp darkMode={darkMode} palette={palette} />

      {/* HIGHLIGHT CARD & PRINCIPLES */}
      <section className="relative z-20 py-20" style={{ backgroundColor: darkMode ? palette.black : palette.white }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div
              className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between text-white selection:bg-[#F7F6F2] selection:text-[#556042]"
              style={{ backgroundColor: palette.highlight }}
            >
              <div>
                <span className="text-xs font-mono-custom block mb-2 opacity-80">ACCENT COLOR</span>
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight mb-4">knoblab Craftsmanship</h3>
                <p className="text-xs leading-relaxed font-light opacity-90">
                  시그니처 올리브 그린(#556042) 포인트 컬러처럼 핵심 기능과 가치에만 정밀하게 주목하도록 구현된 개발 방법론입니다.
                </p>
              </div>
              <div className="pt-8 font-mono-custom text-xs">
                <span>SWEDISH OLIVE #556042</span>
              </div>
            </div>

            <div
              className="lg:col-span-7 p-8 md:p-10 border flex flex-col justify-between"
              style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}
            >
              <div>
                <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>DEVELOPMENT PRINCIPLE</span>
                <h3 className="text-xl sm:text-2xl font-light mb-6">Purity, Progress, Performance</h3>

                <div className="space-y-3.5 text-xs font-light" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                  <div className="flex gap-3 items-start">
                    <CheckIcon size={16} className="mt-0.5 shrink-0" style={{ color: palette.highlight }} />
                    <span><strong>Pure:</strong> 시각적 소음과 무의미한 장식을 제거하고 인터랙션 본질에 집중합니다.</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckIcon size={16} className="mt-0.5 shrink-0" style={{ color: palette.highlight }} />
                    <span><strong>Progressive:</strong> 최신 웹 표준 기술과 반응형 성능 구조를 신속하게 도입합니다.</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <CheckIcon size={16} className="mt-0.5 shrink-0" style={{ color: palette.highlight }} />
                    <span><strong>Performance:</strong> 모든 인터랙션에서 프레임 저하 없는 쾌적함을 보장합니다.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t font-mono-custom text-xs" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1, color: palette.grey7 }}>
                STOCKHOLM DESIGN LAB INSPIRATION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. CONTACT */}
      <ContactComp darkMode={darkMode} palette={palette} />


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
                <li><a href="#contact" className="hover:opacity-80">Contact</a></li>
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
                <li>IBM Plex Sans</li>
                <li>Pretendard KR</li>
                <li>Highlight (#556042)</li>
                <li>Marking System Grid</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: darkMode ? palette.white : palette.black }}>Connect</div>
              <ul className="space-y-2" style={{ color: palette.grey7 }}>
                <li><a href="#" className="hover:opacity-80">GitHub</a></li>
                <li><a href="#" className="hover:opacity-80">LinkedIn</a></li>
                <li><a href="#" className="hover:opacity-80">Email</a></li>
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
              <span>knoblab © 2026. Inspired by Stockholm Design Lab & Polestar Brand Identity.</span>
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
