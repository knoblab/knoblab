const { useState } = React;

/* ----- 간단한 lucide 스타일 아이콘 (SVG, lucide-react 대체) ----- */
function Icon({ children, size = 16, style, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
    >
      {children}
    </svg>
  );
}

const Sun = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </Icon>
);

const Moon = (props) => (
  <Icon {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Icon>
);

const ArrowRight = (props) => (
  <Icon {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </Icon>
);

const ArrowUpRight = (props) => (
  <Icon {...props}>
    <path d="M7 17L17 7M7 7h10v10" />
  </Icon>
);

const Check = (props) => (
  <Icon {...props}>
    <path d="M20 6L9 17l-5-5" />
  </Icon>
);

const Code2 = (props) => (
  <Icon {...props}>
    <path d="M18 16l4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16" />
  </Icon>
);

/* ----- App ----- */
function App() {
  // Theme state: light mode as default
  const [darkMode, setDarkMode] = useState(false);

  // Strict Color Palette (#556042 highlight strictly applied)
  const palette = {
    black: '#2B2B2E',
    white: '#F7F6F2',
    highlight: '#556042', // User specified highlight color
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
      {/* --- MINIMAL HEADER --- */}
      <header
        className="sticky top-0 left-0 w-full z-50 px-6 md:px-12 py-4 flex justify-between items-center select-none backdrop-blur-md"
        style={{
          borderBottom: `1px solid ${darkMode ? palette.grey9 : palette.grey1}`,
          backgroundColor: darkMode ? `${palette.black}EE` : `${palette.white}EE`
        }}
      >
        <a href="#" className="flex items-center gap-3 font-semibold text-base tracking-tight">
          <img src="img/logo.svg" alt="knoblab logo" className="w-3.5 h-3.5" />
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
            {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            <span>{darkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative py-20 md:py-28 px-6 md:px-12 border-b" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
        <div className="max-w-7xl mx-auto">

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
              Web Developer & Creative Technologist
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-snug mb-6">
              Interactive Web & <br />
              UI Engineering
            </h1>

            <p className="text-sm sm:text-base font-light leading-relaxed max-w-lg mb-8" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
              스톡홀름 디자인 랩의 미학처럼 불필요한 레이어를 제거하고, 픽셀의 정밀함과 인터랙티브 미니멀리즘에 집중하는 프론트엔드 웹 포트폴리오입니다.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono-custom">
              <a
                href="#projects"
                className="px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90 flex items-center gap-2"
                style={{ backgroundColor: palette.highlight }}
              >
                <span>Explore Projects</span>
                <ArrowRight size={14} />
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

      {/* --- SECTION 01: LARGE ACTION LIST --- */}
      <section id="overview" className="relative z-20 py-16 border-b" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-xs font-mono-custom mb-6" style={{ color: palette.highlight }}>
            01 // Key Capabilities
          </div>

          <div className="divide-y" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
            {[
              { title: 'Interactive Web & Application Development', desc: 'React, TypeScript, Canvas 기반의 초정밀 웹 인터랙션 개발' },
              { title: 'Design System & Component Architecture', desc: '스칸디나비안 미니멀리즘과 재사용성이 결합된 컴포넌트 시스템 구축' },
              { title: 'Performance Optimization & Micro Motion', desc: '초당 60fps를 유지하는 인터랙티브 모션 및 로딩 최적화' }
            ].map((item, index) => (
              <a
                key={index}
                href="#projects"
                className="group py-6 flex flex-col md:flex-row md:items-center justify-between transition-colors hover:opacity-80 cursor-pointer"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono-custom mt-1.5" style={{ color: palette.grey7 }}>
                    {item.desc}
                  </p>
                </div>
                <div className="mt-3 md:mt-0 flex items-center gap-2 text-lg font-light">
                  <ArrowRight size={22} className="transform group-hover:translate-x-2 transition-transform duration-300" style={{ color: palette.highlight }} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 02: SPLIT PROJECT SHOWCASE CARDS --- */}
      <section id="projects" className="relative z-20 py-20" style={{ backgroundColor: darkMode ? palette.black : palette.white }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
                02 // Featured Projects
              </span>
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight">Project Spectrum</h2>
            </div>
            <p className="text-xs font-mono-custom mt-3 md:mt-0 max-w-xs" style={{ color: palette.grey7 }}>
              제품 본질에 집중한 웹 인터랙션 및 프론트엔드 시스템 작업물입니다.
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
                  <span>REACT / CANVAS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light mb-3">knoblab Control System</h3>
                <p className="text-xs leading-relaxed font-light mb-8" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                  회전형 하드웨어 컨트롤러를 웹 상에서 초정밀 수치 및 반응형 인터랙션으로 제어하는 가상 컴포넌트 라이브러리입니다.
                </p>
              </div>

              <div className="my-4 p-5 border flex items-center justify-center font-mono-custom text-xs" style={{ borderColor: darkMode ? palette.grey9 : palette.grey3 }}>
                <Code2 size={24} className="mr-3" style={{ color: palette.highlight }} />
                <span>INTERACTIVE MODULE ARCHITECTURE</span>
              </div>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 text-xs font-mono-custom mt-4 hover:opacity-80 transition-opacity"
                style={{ color: darkMode ? palette.white : palette.black }}
              >
                <div className="inline-flex items-center gap-2 transform group-hover:translate-x-2 transition-transform duration-300">
                  <span>Learn more</span>
                  <ArrowRight size={14} style={{ color: palette.highlight }} />
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
                  <span>TYPESCRIPT / TAILWIND</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light mb-3">Scandinavian Design Token UI</h3>
                <p className="text-xs leading-relaxed font-light mb-8" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                  스톡홀름 디자인 랩의 미감 가이드라인을 기반으로 정밀 디자인 토큰과 모노크롬 스펙트럼 팔레트를 체계화한 웹 프레임워크입니다.
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
                href="#contact"
                className="group inline-flex items-center gap-2 text-xs font-mono-custom mt-4 hover:opacity-80 transition-opacity"
                style={{ color: darkMode ? palette.white : palette.black }}
              >
                <div className="inline-flex items-center gap-2 transform group-hover:translate-x-2 transition-transform duration-300">
                  <span>Learn more</span>
                  <ArrowRight size={14} style={{ color: palette.highlight }} />
                </div>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* --- SECTION 03: MARKING SYSTEM BACKGROUND & TECH SPEC SHEET --- */}
      <section id="specifications" className="relative z-20 py-20 marking-grid-bg border-t border-b" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="mb-10">
            <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
              03 // Marking System & Specifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Developer Data Sheet</h2>
          </div>

          <div
            className="font-mono-custom text-xs divide-y"
            style={{
              border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`,
              backgroundColor: darkMode ? `${palette.black}F0` : `${palette.white}F0`
            }}
          >
            {[
              { key: 'Role / Expertise', val: 'Creative Front-end Engineer & Interactive Web Developer' },
              { key: 'Core Frameworks', val: 'React 19, TypeScript, Next.js, Tailwind CSS' },
              { key: 'Graphics & Motion', val: 'HTML5 Canvas, CSS Micro Interactions, WebGL, Framer Motion' },
              { key: 'Typography System', val: 'IBM Plex Sans (Latin) × Pretendard (Korean)' },
              { key: 'Official Color Tokens', val: 'White (#F7F6F2), Black (#2B2B2E), Highlight Olive (#556042)' },
              { key: 'Design Philosophy', val: 'Minimalism, Precision Marking Grid, Zero Decorative Noise' }
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-12 p-3.5">
                <div className="sm:col-span-4 font-normal" style={{ color: palette.grey7 }}>{row.key}</div>
                <div className="sm:col-span-8 font-medium mt-1 sm:mt-0" style={{ color: darkMode ? palette.white : palette.black }}>{row.val}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 04: HIGHLIGHT CARD SECTION --- */}
      <section className="relative z-20 py-20" style={{ backgroundColor: darkMode ? palette.black : palette.white }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Highlight Card with #556042 Accent */}
            <div
              className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between text-white"
              style={{ backgroundColor: palette.highlight }}
            >
              <div>
                <span className="text-xs font-mono-custom block mb-2 opacity-80">
                  ACCENT COLOR
                </span>
                <h3 className="text-2xl sm:text-3xl font-light tracking-tight mb-4">knoblab Craftsmanship</h3>
                <p className="text-xs leading-relaxed font-light opacity-90">
                  시그니처 올리브 그린(#556042) 포인트 컬러처럼 핵심 기능과 가치에만 정밀하게 주목하도록 구현된 개발 방법론입니다.
                </p>
              </div>

              <div className="pt-8 font-mono-custom text-xs">
                <span>SWEDISH OLIVE #556042</span>
              </div>
            </div>

            {/* Side Detail List */}
            <div
              className="lg:col-span-7 p-8 md:p-10 border flex flex-col justify-between"
              style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}
            >
              <div>
                <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
                  DEVELOPMENT PRINCIPLE
                </span>
                <h3 className="text-xl sm:text-2xl font-light mb-6">Purity, Progress, Performance</h3>

                <div className="space-y-3.5 text-xs font-light" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                  <div className="flex gap-3 items-start">
                    <Check size={16} className="mt-0.5 shrink-0" style={{ color: palette.highlight }} />
                    <span><strong>Pure:</strong> 시각적 소음과 무의미한 장식을 제거하고 인터랙션 본질에 집중합니다.</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Check size={16} className="mt-0.5 shrink-0" style={{ color: palette.highlight }} />
                    <span><strong>Progressive:</strong> 최신 웹 표준 기술과 반응형 성능 구조를 신속하게 도입합니다.</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Check size={16} className="mt-0.5 shrink-0" style={{ color: palette.highlight }} />
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

      {/* --- SECTION 05: CONTACT FORM --- */}
      <section id="contact" className="relative z-20 py-20 border-t" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-6">
              <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
                04 // Inquire
              </span>
              <h2 className="text-2xl sm:text-4xl font-light tracking-tight mb-4">Let's Build Together</h2>
              <p className="text-sm leading-relaxed font-light mb-8" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                웹 프로젝트 협업, 프론트엔드 개발 의뢰, 또는 미니멀 UI 인터랙션 설계 관련 문의를 위한 커뮤니케이션 채널입니다.
              </p>

              <div className="font-mono-custom text-xs space-y-2" style={{ color: palette.grey7 }}>
                <div>Email: contact@knoblab.dev</div>
                <div>Location: Seoul, Korea</div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="p-8 space-y-4 font-mono-custom text-xs"
                style={{
                  backgroundColor: darkMode ? palette.grey11 : palette.white,
                  border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`
                }}
              >
                <div>
                  <label className="block mb-2 font-normal" style={{ color: palette.grey7 }}>Your Name / Organization</label>
                  <input
                    type="text"
                    placeholder="홍길동 / 팀명"
                    className="w-full p-3 outline-none transition-colors font-mono-custom"
                    style={{
                      backgroundColor: darkMode ? palette.black : palette.grey1,
                      border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`,
                      color: darkMode ? palette.white : palette.black
                    }}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-normal" style={{ color: palette.grey7 }}>Contact Email</label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    className="w-full p-3 outline-none transition-colors font-mono-custom"
                    style={{
                      backgroundColor: darkMode ? palette.black : palette.grey1,
                      border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`,
                      color: darkMode ? palette.white : palette.black
                    }}
                  />
                </div>
                <div>
                  <label className="block mb-2 font-normal" style={{ color: palette.grey7 }}>Project Message</label>
                  <textarea
                    rows={3}
                    placeholder="프로젝트 주제 및 협업 요청 사항을 입력해 주세요."
                    className="w-full p-3 outline-none transition-colors font-sans"
                    style={{
                      backgroundColor: darkMode ? palette.black : palette.grey1,
                      border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`,
                      color: darkMode ? palette.white : palette.black
                    }}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 font-mono-custom font-semibold tracking-wider transition-opacity hover:opacity-90 flex items-center justify-center gap-2 text-white"
                  style={{
                    backgroundColor: palette.highlight
                  }}
                >
                  <span>Send Message</span>
                  <ArrowUpRight size={14} />
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer
        className="relative z-20 border-t py-14 text-xs font-mono-custom"
        style={{
          borderColor: darkMode ? palette.grey9 : palette.grey1,
          backgroundColor: darkMode ? palette.black : palette.grey1
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

            {/* Column 1 */}
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: darkMode ? palette.white : palette.black }}>knoblab</div>
              <ul className="space-y-2" style={{ color: palette.grey7 }}>
                <li><a href="#overview" className="hover:opacity-80">Overview</a></li>
                <li><a href="#projects" className="hover:opacity-80">Projects</a></li>
                <li><a href="#specifications" className="hover:opacity-80">Specifications</a></li>
                <li><a href="#contact" className="hover:opacity-80">Contact</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: darkMode ? palette.white : palette.black }}>Tech Stack</div>
              <ul className="space-y-2" style={{ color: palette.grey7 }}>
                <li>React 19</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>HTML5 Canvas</li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <div className="font-semibold mb-3 text-sm" style={{ color: darkMode ? palette.white : palette.black }}>Design System</div>
              <ul className="space-y-2" style={{ color: palette.grey7 }}>
                <li>IBM Plex Sans</li>
                <li>Pretendard KR</li>
                <li>Highlight (#556042)</li>
                <li>Marking System Grid</li>
              </ul>
            </div>

            {/* Column 4 */}
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

/* ----- Render ----- */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
