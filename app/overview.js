import { ArrowRight } from './icons.js';

export default function Overview({ darkMode, palette }) {
  const capabilities = [
    { title: 'Interactive Web & Application Development', desc: 'React, TypeScript, Canvas 기반의 초정밀 웹 인터랙션 개발' },
    { title: 'Design System & Component Architecture', desc: '스칸디나비안 미니멀리즘과 재사용성이 결합된 컴포넌트 시스템 구축' },
    { title: 'Performance Optimization & Micro Motion', desc: '초당 60fps를 유지하는 인터랙티브 모션 및 로딩 최적화' }
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
  );
}
