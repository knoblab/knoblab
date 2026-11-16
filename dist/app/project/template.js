function ProjectDetail({ projectId, darkMode, palette }) {
  const {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Github,
    Download
  } = window;

  const ArrowLeftIcon = ArrowLeft || (() => null);
  const ArrowRightIcon = ArrowRight || (() => null);
  const ArrowUpRightIcon = ArrowUpRight || (() => null);
  const GithubIcon = Github || (() => null);
  const DownloadIcon = Download || (() => null);

  const projectsMap = window.projectsMap || {};
  const projectsList = window.projectsList || [];
  const project = projectsMap[projectId] || projectsList.find(p => p.id === projectId) || projectsList[0];

  if (!project) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-6 md:px-12 text-center font-mono-custom">
        <h2 className="text-2xl mb-4">Project Not Found</h2>
        <a href="#projects" className="underline hover:opacity-80">← Return to Projects</a>
      </div>
    );
  }

  const projectAccent = darkMode
    ? (project.darkAccentColor || (project.accentColor === '#A33A31' ? palette.dancheong : project.accentColor === '#45707A' ? palette.celadon : palette.highlight))
    : (project.accentColor || palette.highlight);

  return (
    <div className="min-h-screen py-10 md:py-16 font-sans relative">
      {/* Dynamic Selection Color according to Project Accent */}
      <style>{`
        ::selection, *::selection {
          background-color: ${projectAccent} !important;
          color: ${darkMode ? palette.black : '#F7F6F2'} !important;
        }
        ::-moz-selection, *::-moz-selection {
          background-color: ${projectAccent} !important;
          color: ${darkMode ? palette.black : '#F7F6F2'} !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* 1. TOP BREADCRUMB */}
        <div
          className="pb-6 mb-10 border-b text-xs font-mono-custom"
          style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}
        >
          <div className="flex items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
              style={{ color: darkMode ? palette.grey3 : palette.grey9 }}
            >
              <ArrowLeftIcon size={13} />
              <span>Projects</span>
            </a>
            <span style={{ color: palette.grey7 }}>/</span>
            <span>{project.title}</span>
          </div>
        </div>

        {/* 2. PROJECT HERO SECTION */}
        <section className="mb-16">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-tight mb-6">
              {project.title}
            </h1>

            {project.tagline && (
              <p
                className="text-base sm:text-lg font-normal leading-relaxed mb-6"
                style={{ color: darkMode ? palette.grey3 : palette.black }}
              >
                {project.tagline}
              </p>
            )}

            {project.summary && (
              <p
                className="text-xs sm:text-sm font-normal leading-relaxed mb-8"
                style={{ color: darkMode ? palette.grey7 : palette.grey9 }}
              >
                {project.summary}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono-custom">
              {project.links?.download && (
                <a
                  href={project.links.download}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 text-white flex items-center gap-2 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: projectAccent }}
                >
                  <DownloadIcon size={14} />
                  <span>Download Release</span>
                </a>
              )}

              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 border flex items-center gap-2 transition-colors hover:opacity-80"
                  style={{
                    borderColor: darkMode ? palette.grey9 : palette.grey3,
                    backgroundColor: darkMode ? palette.grey11 : palette.grey1,
                    color: darkMode ? palette.white : palette.black
                  }}
                >
                  <GithubIcon size={14} />
                  <span>GitHub Repository</span>
                  <ArrowUpRightIcon size={13} style={{ color: palette.grey7 }} />
                </a>
              )}

              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  className="px-5 py-3 border flex items-center gap-2 transition-colors hover:opacity-80"
                  style={{
                    borderColor: darkMode ? palette.grey9 : palette.grey3,
                    color: darkMode ? palette.white : palette.black
                  }}
                >
                  <span>Interactive Demo</span>
                  <ArrowRightIcon size={13} style={{ color: projectAccent }} />
                </a>
              )}

              {project.links?.npm && (
                <a
                  href={project.links.npm}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 border flex items-center gap-2 transition-colors hover:opacity-80"
                  style={{
                    borderColor: darkMode ? palette.grey9 : palette.grey3,
                    color: darkMode ? palette.white : palette.black
                  }}
                >
                  <span>npm Package</span>
                  <ArrowUpRightIcon size={13} style={{ color: palette.grey7 }} />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* 3. BACKGROUND & CHALLENGE VS SOLUTION */}
        {(project.problem || project.solution) && (
          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight mb-8">
              문제를 정의하고, 가장 순수한 방식으로 해결합니다.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.problem && (
                <div
                  className="p-8 border flex flex-col justify-between"
                  style={{
                    borderColor: darkMode ? palette.grey9 : palette.grey3,
                    backgroundColor: darkMode ? palette.grey11 : palette.grey1
                  }}
                >
                  <div>
                    <div className="text-xs font-mono-custom mb-4 flex items-center justify-between" style={{ color: palette.dancheong }}>
                      <span>[ THE CHALLENGE ]</span>
                      <span>기존 방식의 한계</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-normal mb-4">
                      {project.problem.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                      {project.problem.desc}
                    </p>
                  </div>
                </div>
              )}

              {project.solution && (
                <div
                  className="p-8 border flex flex-col justify-between relative"
                  style={{
                    borderColor: projectAccent,
                    backgroundColor: darkMode ? palette.black : palette.white
                  }}
                >
                  <div>
                    <div className="text-xs font-mono-custom mb-4 flex items-center justify-between" style={{ color: projectAccent }}>
                      <span>[ KNOBLAB APPROACH ]</span>
                      <span>기술적 솔루션</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-normal mb-4">
                      {project.solution.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                      {project.solution.desc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 4. BENCHMARK & PERFORMANCE COMPARISON */}
        {project.benchmark && (
          <section className="mb-20">
            <div className="mb-8">
              <div className="text-xs font-mono-custom mb-2" style={{ color: projectAccent }}>
                [ PERFORMANCE BENCHMARK ]
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight mb-3">
                {project.benchmark.title}
              </h2>
              {project.benchmark.subtitle && (
                <p className="text-xs sm:text-sm leading-relaxed max-w-3xl" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                  {project.benchmark.subtitle}
                </p>
              )}
            </div>

            {/* 4.1 Test Overview */}
            {project.benchmark.overview && project.benchmark.overview.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {project.benchmark.overview.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 border"
                    style={{
                      borderColor: darkMode ? palette.grey9 : palette.grey3,
                      backgroundColor: darkMode ? palette.grey11 : palette.grey1
                    }}
                  >
                    <div className="text-[11px] font-mono-custom mb-1.5" style={{ color: projectAccent }}>
                      {item.label}
                    </div>
                    <div className="text-xs sm:text-sm font-medium leading-relaxed mb-1">
                      {item.value}
                    </div>
                    {item.meta && (
                      <div className="text-[11px] font-mono-custom" style={{ color: palette.grey7 }}>
                        {item.meta}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 4.2 Highlight KPIs */}
            {project.benchmark.highlights && project.benchmark.highlights.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {project.benchmark.highlights.map((kpi, idx) => (
                  <div
                    key={idx}
                    className="p-5 border"
                    style={{
                      borderColor: darkMode ? palette.grey9 : palette.grey3,
                      backgroundColor: darkMode ? palette.black : palette.white
                    }}
                  >
                    <div className="text-[11px] font-mono-custom mb-2" style={{ color: palette.grey7 }}>
                      {kpi.label}
                    </div>
                    <div className="text-xl sm:text-2xl font-medium tracking-tight mb-1.5" style={{ color: projectAccent }}>
                      {kpi.value}
                    </div>
                    <div className="text-[11px] leading-snug" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                      {kpi.note}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 4.3 Core Comparison Table */}
            {project.benchmark.rows && project.benchmark.rows.length > 0 && (
              <div
                className="border overflow-x-auto"
                style={{
                  borderColor: darkMode ? palette.grey9 : palette.grey3,
                  backgroundColor: darkMode ? palette.black : palette.white
                }}
              >
                <table className="w-full text-left border-collapse min-w-[760px]">
                  <thead>
                    <tr
                      className="text-[11px] font-mono-custom border-b"
                      style={{
                        borderColor: darkMode ? palette.grey9 : palette.grey3,
                        backgroundColor: darkMode ? palette.grey11 : palette.grey1,
                        color: darkMode ? palette.grey3 : palette.grey9
                      }}
                    >
                      <th className="py-3.5 px-4 font-medium">항목</th>
                      <th className="py-3.5 px-4 font-medium">평가 기준</th>
                      <th className="py-3.5 px-4 font-medium">미사용 (Direct)</th>
                      <th className="py-3.5 px-4 font-medium">FreeView 사용 지수</th>
                      <th className="py-3.5 px-4 font-medium">95% 신뢰구간</th>
                      <th className="py-3.5 px-4 font-medium">체감 평가</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    {project.benchmark.rows.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-t transition-colors"
                        style={{
                          borderColor: darkMode ? palette.grey9 : palette.grey1,
                          backgroundColor: row.tone === 'note'
                            ? (darkMode ? `${palette.grey11}80` : `${palette.grey1}80`)
                            : 'transparent'
                        }}
                      >
                        <td className="py-3.5 px-4 font-medium whitespace-nowrap">
                          <span>{row.metric}</span>
                          {row.noteRef && (
                            <span
                              className="ml-2 px-1.5 py-0.5 text-[10px] font-mono-custom border"
                              style={{
                                borderColor: darkMode ? palette.grey9 : palette.grey3,
                                color: projectAccent
                              }}
                            >
                              {row.noteRef}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono-custom whitespace-nowrap" style={{ color: palette.grey7 }}>
                          {row.direction}
                        </td>
                        <td className="py-3.5 px-4 font-mono-custom whitespace-nowrap" style={{ color: palette.grey7 }}>
                          {row.direct}
                        </td>
                        <td
                          className="py-3.5 px-4 font-mono-custom font-medium whitespace-nowrap"
                          style={{
                            color: row.tone === 'positive'
                              ? projectAccent
                              : (darkMode ? palette.white : palette.black)
                          }}
                        >
                          {row.index}
                        </td>
                        <td className="py-3.5 px-4 font-mono-custom whitespace-nowrap" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                          {row.ci}
                        </td>
                        <td className="py-3.5 px-4" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                          {row.assessment}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 4.4 Anomaly Interpretation Notes */}
            {project.benchmark.notes && project.benchmark.notes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {project.benchmark.notes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-6 border"
                    style={{
                      borderColor: darkMode ? palette.grey9 : palette.grey3,
                      backgroundColor: darkMode ? palette.grey11 : palette.grey1
                    }}
                  >
                    {note.tag && (
                      <div className="text-[11px] font-mono-custom mb-2" style={{ color: projectAccent }}>
                        {note.tag}
                      </div>
                    )}
                    <h3 className="text-sm sm:text-base font-medium leading-snug mb-3">
                      {note.title}
                    </h3>
                    <ul className="space-y-2 text-xs leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                      {note.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex gap-2 items-start">
                          <span className="font-mono-custom shrink-0" style={{ color: projectAccent }}>·</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 4.5 SYSTEM RESOURCE FOOTPRINT */}
        {project.resourceFootprint && (
          <section className="mb-20">
            <div
              className="p-6 md:p-8 border grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              style={{
                borderColor: darkMode ? palette.grey9 : palette.grey3,
                backgroundColor: darkMode ? palette.grey11 : palette.grey1
              }}
            >
              <div className="lg:col-span-6">
                {project.resourceFootprint.tag && (
                  <div className="text-[11px] font-mono-custom mb-2" style={{ color: projectAccent }}>
                    {project.resourceFootprint.tag}
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-normal tracking-tight mb-3">
                  {project.resourceFootprint.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed mb-6" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                  {project.resourceFootprint.desc}
                </p>

                {project.resourceFootprint.metrics && project.resourceFootprint.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {project.resourceFootprint.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-4 border"
                        style={{
                          borderColor: darkMode ? palette.grey9 : palette.grey3,
                          backgroundColor: darkMode ? palette.black : palette.white
                        }}
                      >
                        <div className="text-[11px] font-mono-custom mb-1" style={{ color: palette.grey7 }}>
                          {m.label}
                        </div>
                        <div className="text-lg sm:text-xl font-medium font-mono-custom" style={{ color: projectAccent }}>
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-6">
                <div
                  className="border overflow-hidden"
                  style={{
                    borderColor: darkMode ? palette.grey9 : palette.grey3,
                    backgroundColor: darkMode ? palette.black : palette.white
                  }}
                >
                  <img
                    src={project.resourceFootprint.image}
                    alt={project.resourceFootprint.imageAlt || project.resourceFootprint.title}
                    className="w-full h-auto block"
                  />
                </div>
                {project.resourceFootprint.caption && (
                  <div className="mt-2.5 text-[11px] font-mono-custom" style={{ color: palette.grey7 }}>
                    {project.resourceFootprint.caption}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 5. KEY ENGINEERING FEATURES */}
        {project.features && project.features.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight mb-8">
              핵심 기능 및 설계 특장점
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-6 md:p-8 border transition-all hover:border-opacity-100"
                  style={{
                    borderColor: darkMode ? palette.grey9 : palette.grey3,
                    backgroundColor: darkMode ? palette.grey11 : palette.grey1
                  }}
                >
                  <h3 className="text-lg font-normal mb-3">
                    <span className="font-mono-custom font-medium mr-2" style={{ color: projectAccent }}>
                      {idx + 1}
                    </span>
                    <span>{feat.title}</span>
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. TECHNICAL ARCHITECTURE PIPELINE */}
        {project.architecture && project.architecture.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight mb-8">
              시스템 파이프라인 및 패킷 처리 메커니즘
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {project.architecture.map((arch, idx) => (
                <div
                  key={idx}
                  className="p-6 border flex flex-col justify-between"
                  style={{
                    borderColor: darkMode ? palette.grey9 : palette.grey3,
                    backgroundColor: darkMode ? palette.black : palette.white
                  }}
                >
                  <div>
                    <h4 className="text-base font-normal mb-3">
                      <span className="font-mono-custom font-medium mr-2" style={{ color: projectAccent }}>
                        {idx + 1}
                      </span>
                      <span>{arch.title}</span>
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: darkMode ? palette.grey7 : palette.grey9 }}>
                      {arch.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

window.ProjectDetail = ProjectDetail;
