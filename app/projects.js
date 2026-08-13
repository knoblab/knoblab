import { ArrowRight, Code2 } from './icons.js';

const ArrowRightComp = typeof ArrowRight !== 'undefined' ? ArrowRight : window.ArrowRight;
const Code2Comp = typeof Code2 !== 'undefined' ? Code2 : window.Code2;

export default function Projects({ darkMode, palette }) {
  return (
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
              <Code2Comp size={24} className="mr-3" style={{ color: palette.highlight }} />
              <span>INTERACTIVE MODULE ARCHITECTURE</span>
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 text-xs font-mono-custom mt-4 hover:opacity-80 transition-opacity"
              style={{ color: darkMode ? palette.white : palette.black }}
            >
              <div className="inline-flex items-center gap-2 transform group-hover:translate-x-2 transition-transform duration-300">
                <span>Learn more</span>
                <ArrowRightComp size={14} style={{ color: palette.highlight }} />
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
                <ArrowRightComp size={14} style={{ color: palette.highlight }} />
              </div>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

window.Projects = Projects;

