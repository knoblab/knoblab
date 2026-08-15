function Specs({ darkMode, palette }) {
  const { Check } = window;
  const CheckIcon = Check || (() => null);

  return (
    <section
      id="specifications"
      className="relative z-20 py-20 marking-grid-bg border-t border-b"
      style={{
        borderColor: darkMode ? palette.grey9 : palette.grey1
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10">
          <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
            03 // Craftsmanship & Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight">Engineering Philosophy</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Accent / Craftsmanship Card */}
          <div
            className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between text-white selection:bg-[#F7F6F2] selection:text-[#556042]"
            style={{ backgroundColor: palette.highlight }}
          >
            <div>
              <span className="text-xs font-mono-custom block mb-2 opacity-80">ACCENT COLOR</span>
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight mb-4">knoblab Craftsmanship</h3>
              <p className="text-xs leading-relaxed font-light opacity-90">
                시그니처 머그워트 그린(#556042) 포인트 컬러처럼 핵심 기능과 가치에 집중하여, 불필요한 요소를 배제한 개발 방법론입니다.
              </p>
            </div>
            <div className="pt-8 font-mono-custom text-xs">
              <span>MUGWORT GREEN #556042</span>
            </div>
          </div>

          {/* Development Principle Card */}
          <div
            className="lg:col-span-7 p-8 md:p-10 border flex flex-col justify-between"
            style={{
              borderColor: darkMode ? palette.grey9 : palette.grey1,
              backgroundColor: darkMode ? palette.grey11 : palette.grey1
            }}
          >
            <div>
              <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>DEVELOPMENT PRINCIPLE</span>
              <h3 className="text-xl sm:text-2xl font-light mb-6">Purity, Progress, Performance</h3>

              <div className="space-y-3.5 text-xs font-light" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                <div className="flex gap-3 items-start">
                  <CheckIcon size={16} className="mt-0.5 shrink-0" style={{ color: palette.highlight }} />
                  <span><strong>Pure:</strong> 웹사이트의 본질에 집중합니다.</span>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckIcon size={16} className="mt-0.5 shrink-0" style={{ color: palette.highlight }} />
                  <span><strong>Progressive:</strong> 최신 웹 표준 기술과 반응형 웹을 제공합니다.</span>
                </div>
                <div className="flex gap-3 items-start">
                  <CheckIcon size={16} className="mt-0.5 shrink-0" style={{ color: palette.highlight }} />
                  <span><strong>Performance:</strong> 모든 인터랙션에 끊김없는 쾌적함을 제공합니다.</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t font-mono-custom text-xs" style={{ borderColor: darkMode ? palette.grey9 : palette.grey3, color: palette.grey7 }}>
              Knoblab Design Team
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Specs = Specs;
