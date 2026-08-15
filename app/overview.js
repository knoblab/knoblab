function Overview({ darkMode, palette }) {
  const ArrowRight = window.ArrowRight;
  const capabilities = [
    { title: 'Web Application Development', desc: 'React, TypeScript, Canvas 기반의 웹 인터랙션 개발', link: '#projects' },
    { title: 'Design System & Component Architecture', desc: '재사용성과 확장성이 결합된 컴포넌트 시스템 설계', link: '#design' },
    { title: 'Performance Optimisation', desc: '웹 페이지 성능 최적화 및 인터랙션 구현', link: '#specifications' }
  ];

  return (
    <section id="overview" className="relative z-20 py-16 border-b" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-xs font-mono-custom mb-6" style={{ color: palette.highlight }}>
          01 // Key Capabilities
        </div>

        <div className="divide-y" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
          {capabilities.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="group py-6 flex flex-col md:flex-row md:items-center justify-between transition-colors hover:opacity-80 cursor-pointer"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-normal tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-xs font-mono-custom mt-1.5" style={{ color: palette.grey7 }}>
                  {item.desc}
                </p>
              </div>
              <div className="mt-3 md:mt-0 flex items-center gap-2 text-lg font-normal">
                {ArrowRight && <ArrowRight size={22} className="transform group-hover:translate-x-2 transition-transform duration-300" style={{ color: palette.highlight }} />}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Overview = Overview;


