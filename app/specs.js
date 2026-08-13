function Specs({ darkMode, palette }) {
  const specRows = [
    { key: 'Role / Expertise', val: 'Creative Front-end Engineer & Interactive Web Developer' },
    { key: 'Core Frameworks', val: 'React 19, TypeScript, Next.js, Tailwind CSS' },
    { key: 'Graphics & Motion', val: 'HTML5 Canvas, CSS Micro Interactions, WebGL, Framer Motion' },
    { key: 'Typography System', val: 'IBM Plex Sans (Latin) × Pretendard (Korean)' },
    { key: 'Official Color Tokens', val: 'White (#F7F6F2), Black (#2B2B2E), Highlight Mugwort (#556042)' },
    { key: 'Design Philosophy', val: 'Minimalism, Precision Marking Grid, Zero Decorative Noise' }
  ];

  return (
    <section id="specifications" className="relative z-20 py-20 marking-grid-bg border-t border-b" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="mb-10">
          <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
            03 // Marking System & Specifications
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal tracking-tight">Developer Data Sheet</h2>
        </div>

        <div
          className="font-mono-custom text-xs divide-y"
          style={{
            border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`,
            backgroundColor: darkMode ? `${palette.black}F0` : `${palette.white}F0`
          }}
        >
          {specRows.map((row, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-12 p-3.5">
              <div className="sm:col-span-4 font-normal" style={{ color: palette.grey7 }}>{row.key}</div>
              <div className="sm:col-span-8 font-medium mt-1 sm:mt-0" style={{ color: darkMode ? palette.white : palette.black }}>{row.val}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

window.Specs = Specs;


