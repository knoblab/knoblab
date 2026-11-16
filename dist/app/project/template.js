function ScrollResourceDiff({ data, darkMode, palette, projectAccent }) {
  const containerRef = React.useRef(null);
  const barRef = React.useRef(null);
  const valueRef = React.useRef(null);
  const targetRef = React.useRef(0);
  const displayRef = React.useRef(0);
  const isLockedRef = React.useRef(false);
  const lastTouchYRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastTimeRef = React.useRef(null);
  const accentRef = React.useRef(projectAccent);
  const textColorRef = React.useRef(darkMode ? palette.white : palette.black);

  accentRef.current = projectAccent;
  textColorRef.current = darkMode ? palette.white : palette.black;

  React.useEffect(() => {
    const lockScroll = () => {
      if (isLockedRef.current) return;
      const sbWidth = window.innerWidth - document.documentElement.clientWidth;
      if (sbWidth > 0) {
        document.documentElement.style.paddingRight = `${sbWidth}px`;
      }
      document.documentElement.style.overflow = 'hidden';
      isLockedRef.current = true;
    };

    const unlockScroll = () => {
      if (!isLockedRef.current) return;
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
      isLockedRef.current = false;
    };

    const applyVisual = (p) => {
      const val = Math.round(data.fromValue + (data.toValue - data.fromValue) * p);
      if (barRef.current) {
        barRef.current.style.width = `${val}%`;
      }
      if (valueRef.current) {
        valueRef.current.textContent = `${val}${data.unit}`;
        valueRef.current.style.color = p >= 0.99 ? accentRef.current : textColorRef.current;
      }
    };

    const mediaQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery && mediaQuery.matches) {
      targetRef.current = 1;
      displayRef.current = 1;
      applyVisual(1);
      return;
    }

    const tick = (now) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTimeRef.current) / 1000));
      lastTimeRef.current = now;

      const diff = targetRef.current - displayRef.current;
      if (Math.abs(diff) < 0.001) {
        displayRef.current = targetRef.current;
        applyVisual(displayRef.current);
        rafRef.current = null;
        lastTimeRef.current = null;
        return;
      }

      const factor = 1 - Math.exp(-dt * 14);
      displayRef.current += diff * factor;
      applyVisual(displayRef.current);
      rafRef.current = window.requestAnimationFrame(tick);
    };

    const startAnimation = () => {
      if (rafRef.current === null) {
        lastTimeRef.current = null;
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };

    const setTarget = (next, immediate = false) => {
      const clamped = Math.max(0, Math.min(1, next));
      targetRef.current = clamped;
      if (clamped <= 0 || clamped >= 1) {
        unlockScroll();
      }
      if (immediate) {
        displayRef.current = clamped;
        applyVisual(clamped);
      } else {
        startAnimation();
      }
    };

    const scrubSpanPx = 480;

    const handleDelta = (deltaY, event) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const centerY = rect.top + rect.height / 2;

      if (deltaY > 0 && targetRef.current < 1 && (isLockedRef.current || (centerY <= vh * 0.56 && centerY >= vh * 0.15))) {
        if (event.cancelable) event.preventDefault();
        lockScroll();
        setTarget(targetRef.current + deltaY / scrubSpanPx);
        return;
      }

      if (deltaY < 0 && targetRef.current > 0 && (isLockedRef.current || (centerY >= vh * 0.44 && centerY <= vh * 0.85))) {
        if (event.cancelable) event.preventDefault();
        lockScroll();
        setTarget(targetRef.current + deltaY / scrubSpanPx);
      }
    };

    const onWheel = (e) => {
      handleDelta(e.deltaY, e);
    };

    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        lastTouchYRef.current = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0 || lastTouchYRef.current === null) return;
      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchYRef.current - currentY;
      lastTouchYRef.current = currentY;
      handleDelta(deltaY, e);
    };

    const onScroll = () => {
      if (isLockedRef.current) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.bottom <= 0) {
        setTarget(1, true);
      } else if (rect.top >= vh) {
        setTarget(0, true);
      }
    };

    applyVisual(displayRef.current);

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      unlockScroll();
      window.removeEventListener('wheel', onWheel, { capture: true });
      window.removeEventListener('touchstart', onTouchStart, { capture: true });
      window.removeEventListener('touchmove', onTouchMove, { capture: true });
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [data.fromValue, data.toValue, data.unit]);

  return (
    <div
      ref={containerRef}
      className="p-5 md:p-6 border"
      style={{
        borderColor: darkMode ? palette.grey9 : palette.grey3,
        backgroundColor: darkMode ? palette.black : palette.white
      }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
        <div className="text-xs font-mono-custom" style={{ color: palette.grey7 }}>
          {data.baselineLabel}
        </div>
        <div
          ref={valueRef}
          className="text-2xl sm:text-3xl font-medium font-mono-custom tracking-tight"
          style={{
            color: darkMode ? palette.white : palette.black,
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {data.fromValue}{data.unit}
        </div>
      </div>

      <div
        className="w-full h-10 sm:h-12 border relative overflow-hidden"
        style={{
          borderColor: darkMode ? palette.grey9 : palette.grey3,
          backgroundColor: darkMode ? palette.grey11 : palette.grey1
        }}
      >
        <div
          ref={barRef}
          className="h-full"
          style={{
            width: `${data.fromValue}%`,
            backgroundColor: projectAccent,
            willChange: 'width'
          }}
        />
      </div>
    </div>
  );
}

function ScrollRustPerformance({ data, darkMode, palette, projectAccent }) {
  const sectionRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const mainBarRef = React.useRef(null);
  const mainValRef = React.useRef(null);
  const titleValRef = React.useRef(null);
  const subValRef = React.useRef(null);
  const waveRef = React.useRef(null);

  const progressRef = React.useRef(0);
  const snappedRef = React.useRef(false);
  const isLockedRef = React.useRef(false);
  const lastTouchYRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastTimeRef = React.useRef(null);
  const currentHRef = React.useRef(null);
  const velocityHRef = React.useRef(0);

  React.useEffect(() => {
    const threshold = 0.88;
    const scrubSpanPx = 1200;
    const baseTrackH = 208;
    const baseH = 24;
    const finalH = 164;

    const lockScroll = () => {
      if (isLockedRef.current) return;
      const sbWidth = window.innerWidth - document.documentElement.clientWidth;
      if (sbWidth > 0) {
        document.documentElement.style.paddingRight = `${sbWidth}px`;
      }
      document.documentElement.style.overflow = 'hidden';
      isLockedRef.current = true;
    };

    const unlockScroll = () => {
      if (!isLockedRef.current) return;
      document.documentElement.style.overflow = '';
      document.documentElement.style.paddingRight = '';
      isLockedRef.current = false;
    };

    const getMaxScreenH = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      return Math.max(460, Math.min(vh * 0.72, 680));
    };

    const formatMultiple = (valNum) => {
      if (valNum <= 1.04) return '1';
      if (valNum >= 171.55) return '171.6';
      return valNum.toFixed(1);
    };

    const applyVisual = (heightPx, valNum, waveOpacity, waveScaleY) => {
      const clampedBarH = Math.max(6, heightPx);
      const nextTrackH = Math.max(baseTrackH, Math.round(clampedBarH + 44));
      const formatted = formatMultiple(valNum);

      if (trackRef.current) {
        trackRef.current.style.height = `${nextTrackH}px`;
      }
      if (mainBarRef.current) {
        mainBarRef.current.style.height = `${Math.round(clampedBarH)}px`;
      }
      if (mainValRef.current) {
        mainValRef.current.textContent = `${formatted}x`;
      }
      if (titleValRef.current) {
        titleValRef.current.textContent = formatted;
      }
      if (subValRef.current) {
        subValRef.current.textContent = formatted;
      }
      if (waveRef.current) {
        waveRef.current.style.opacity = `${waveOpacity}`;
        waveRef.current.style.transform = `scaleY(${waveScaleY})`;
      }
    };

    const mediaQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery && mediaQuery.matches) {
      snappedRef.current = true;
      progressRef.current = 1;
      currentHRef.current = finalH;
      applyVisual(finalH, 171.6, 1, 1);
      return;
    }

    if (currentHRef.current === null) {
      currentHRef.current = baseH;
      applyVisual(baseH, 1.0, 0, 0.2);
    }

    const tick = (now) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const dt = Math.min(0.032, Math.max(0.001, (now - lastTimeRef.current) / 1000));
      lastTimeRef.current = now;

      const maxScreenH = getMaxScreenH();

      if (snappedRef.current) {
        // Underdamped spring physics snapping the stretched card & bar back to finalH
        const stiffness = 280;
        const damping = 13;
        const displacement = currentHRef.current - finalH;
        const springForce = -stiffness * displacement;
        const dampingForce = -damping * velocityHRef.current;
        const accel = springForce + dampingForce;

        velocityHRef.current += accel * dt;
        currentHRef.current += velocityHRef.current * dt;

        const settleRatio = Math.max(0, Math.min(1, 1 - Math.max(0, currentHRef.current - finalH) / Math.max(1, maxScreenH - finalH)));
        const waveOpacity = Math.min(1, Math.pow(settleRatio, 1.4) * 1.3);
        const waveScale = 0.3 + 0.7 * Math.min(1, settleRatio * 1.15);

        applyVisual(currentHRef.current, 171.6, waveOpacity, waveScale);

        if (Math.abs(displacement) < 0.4 && Math.abs(velocityHRef.current) < 2) {
          currentHRef.current = finalH;
          velocityHRef.current = 0;
          applyVisual(finalH, 171.6, 1, 1);
          rafRef.current = null;
          lastTimeRef.current = null;
          return;
        }

        rafRef.current = window.requestAnimationFrame(tick);
      } else {
        const normP = Math.max(0, Math.min(1, progressRef.current / threshold));
        const easedP = Math.pow(normP, 1.25);
        const targetH = baseH + (maxScreenH - baseH) * easedP;
        const diff = targetH - currentHRef.current;

        const factor = 1 - Math.exp(-dt * 10);
        currentHRef.current += diff * factor;
        velocityHRef.current = diff * 8;

        const displayRatio = Math.max(0, Math.min(1, (currentHRef.current - baseH) / Math.max(1, maxScreenH - baseH)));
        const valNum = 1 + 170.6 * displayRatio;

        applyVisual(currentHRef.current, valNum, 0, 0.2);

        if (Math.abs(diff) < 0.5) {
          currentHRef.current = targetH;
          applyVisual(targetH, 1 + 170.6 * easedP, 0, 0.2);
          rafRef.current = null;
          lastTimeRef.current = null;
          return;
        }

        rafRef.current = window.requestAnimationFrame(tick);
      }
    };

    const startAnimation = () => {
      if (rafRef.current === null) {
        lastTimeRef.current = null;
        rafRef.current = window.requestAnimationFrame(tick);
      }
    };

    const handleDelta = (deltaY, event) => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      if (deltaY > 0 && !snappedRef.current && (isLockedRef.current || (rect.top <= vh * 0.62 && rect.bottom >= vh * 0.25))) {
        if (event.cancelable) event.preventDefault();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        lockScroll();
        const nextP = Math.max(0, Math.min(1, progressRef.current + deltaY / scrubSpanPx));
        progressRef.current = nextP;

        if (nextP >= threshold) {
          snappedRef.current = true;
          velocityHRef.current = -460;
          unlockScroll();
        }
        startAnimation();
        return;
      }

      if (deltaY < 0 && !snappedRef.current && progressRef.current > 0 && isLockedRef.current) {
        if (event.cancelable) event.preventDefault();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        const nextP = Math.max(0, progressRef.current + deltaY / scrubSpanPx);
        progressRef.current = nextP;
        if (nextP <= 0) {
          unlockScroll();
        }
        startAnimation();
      }
    };

    const onWheel = (e) => {
      handleDelta(e.deltaY, e);
    };

    const onTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        lastTouchYRef.current = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0 || lastTouchYRef.current === null) return;
      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchYRef.current - currentY;
      lastTouchYRef.current = currentY;
      handleDelta(deltaY, e);
    };

    const onScroll = () => {
      if (isLockedRef.current) return;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top >= vh * 0.65) {
        if (snappedRef.current || progressRef.current > 0) {
          snappedRef.current = false;
          progressRef.current = 0;
          velocityHRef.current = 0;
          currentHRef.current = baseH;
          applyVisual(baseH, 1.0, 0, 0.2);
        }
      } else if (rect.bottom <= 0 && !snappedRef.current) {
        snappedRef.current = true;
        progressRef.current = 1;
        velocityHRef.current = 0;
        currentHRef.current = finalH;
        applyVisual(finalH, 171.6, 1, 1);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      unlockScroll();
      window.removeEventListener('wheel', onWheel, { capture: true });
      window.removeEventListener('touchstart', onTouchStart, { capture: true });
      window.removeEventListener('touchmove', onTouchMove, { capture: true });
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const renderAnimatedText = (text, refObj) => {
    if (!text || !text.includes('171.6')) return text;
    const parts = text.split('171.6');
    return (
      <>
        {parts[0]}
        <span ref={refObj} style={{ fontVariantNumeric: 'tabular-nums' }}>1</span>
        {parts.slice(1).join('171.6')}
      </>
    );
  };

  return (
    <section ref={sectionRef} className="mb-20 relative">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-normal tracking-tight mb-2">
          {renderAnimatedText(data.title, titleValRef)}
        </h2>
        {data.subtitle && (
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
            {renderAnimatedText(data.subtitle, subValRef)}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5">
          <div
            className="p-5 md:p-6 border h-full flex flex-col justify-between"
            style={{
              borderColor: darkMode ? palette.grey9 : palette.grey3,
              backgroundColor: darkMode ? palette.grey11 : palette.grey1
            }}
          >
            <div
              ref={trackRef}
              className="grid grid-cols-3 gap-3 sm:gap-6 items-end pt-6 px-4 border-b relative overflow-hidden"
              style={{
                height: '208px',
                borderColor: darkMode ? palette.grey9 : palette.grey3,
                gridTemplateColumns: `repeat(${data.bars.length}, minmax(0, 1fr))`,
                willChange: 'height'
              }}
            >
              <div className="absolute inset-x-0 top-1/3 border-t border-dashed pointer-events-none" style={{ borderColor: darkMode ? `${palette.grey9}80` : `${palette.grey3}90` }} />
              <div className="absolute inset-x-0 top-2/3 border-t border-dashed pointer-events-none" style={{ borderColor: darkMode ? `${palette.grey9}80` : `${palette.grey3}90` }} />
              {data.bars.map((bar, idx) => {
                const isAnimatedBar = Boolean(bar.scaleBreak);
                const staticHeightPx = Math.max(8, Math.round(bar.heightPct * 1.7));
                return (
                  <div key={idx} className="flex flex-col justify-end items-center relative z-10">
                    <span
                      ref={isAnimatedBar ? mainValRef : null}
                      className="text-xs sm:text-sm font-mono-custom font-medium mb-2 whitespace-nowrap"
                      style={{
                        color: bar.accent ? projectAccent : palette.grey7,
                        fontVariantNumeric: 'tabular-nums'
                      }}
                    >
                      {isAnimatedBar ? '1x' : bar.valueText}
                    </span>
                    <div
                      ref={isAnimatedBar ? mainBarRef : null}
                      className="w-full max-w-[56px] sm:max-w-[64px] relative shrink-0"
                      style={{
                        height: isAnimatedBar ? '24px' : `${staticHeightPx}px`,
                        minHeight: '6px',
                        backgroundColor: bar.accent ? projectAccent : palette.grey7,
                        willChange: isAnimatedBar ? 'height' : 'auto'
                      }}
                    >
                      {bar.scaleBreak && (
                        <svg
                          ref={waveRef}
                          viewBox="0 0 100 22"
                          preserveAspectRatio="none"
                          className="absolute left-[-4%] w-[108%] h-[18px] pointer-events-none"
                          style={{
                            top: '42%',
                            opacity: 0,
                            transform: 'scaleY(0.2)',
                            transformOrigin: 'center center'
                          }}
                        >
                          <path
                            d="M -4 7 C 16 1, 34 13, 50 7 C 66 1, 84 13, 104 7 L 104 15 C 84 21, 66 9, 50 15 C 34 21, 16 9, -4 15 Z"
                            fill={darkMode ? palette.grey11 : palette.grey1}
                          />
                          <path
                            d="M -2 7 C 16 1, 34 13, 50 7 C 66 1, 84 13, 102 7"
                            fill="none"
                            stroke={bar.accent ? projectAccent : palette.grey7}
                            strokeWidth="1.5"
                            vectorEffect="non-scaling-stroke"
                          />
                          <path
                            d="M -2 15 C 16 9, 34 21, 50 15 C 66 9, 84 21, 102 15"
                            fill="none"
                            stroke={bar.accent ? projectAccent : palette.grey7}
                            strokeWidth="1.5"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="grid grid-cols-3 gap-3 sm:gap-6 px-4 pt-3 text-center text-xs font-mono-custom"
              style={{
                gridTemplateColumns: `repeat(${data.bars.length}, minmax(0, 1fr))`
              }}
            >
              {data.bars.map((bar, idx) => (
                <span
                  key={idx}
                  className={bar.accent ? 'font-medium' : ''}
                  style={{ color: bar.accent ? (darkMode ? palette.white : palette.black) : palette.grey7 }}
                >
                  {bar.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="lg:col-span-7 p-6 md:p-8 border flex flex-col justify-between gap-6"
          style={{
            borderColor: darkMode ? palette.grey9 : palette.grey3,
            backgroundColor: darkMode ? palette.black : palette.white
          }}
        >
          <div>
            {data.cardTitle && (
              <h3 className="text-base sm:text-lg font-medium mb-3">
                {data.cardTitle}
              </h3>
            )}
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
              {data.desc}
            </p>
          </div>

          {data.highlights && data.highlights.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
              {data.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 border"
                  style={{
                    borderColor: darkMode ? palette.grey9 : palette.grey3,
                    backgroundColor: darkMode ? palette.grey11 : palette.grey1
                  }}
                >
                  <div className="text-[11px] font-mono-custom mb-1" style={{ color: projectAccent }}>
                    {item.label}
                  </div>
                  <div className="text-xs sm:text-sm font-medium">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {data.footnote && (
        <p className="mt-2.5 text-[11px] leading-relaxed" style={{ color: palette.grey7 }}>
          {data.footnote}
        </p>
      )}
    </section>
  );
}

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

  const [overviewTabIdx, setOverviewTabIdx] = React.useState(0);

  React.useEffect(() => {
    setOverviewTabIdx(0);
  }, [projectId]);

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

        {/* 2.5 PRODUCT INTRODUCTION (WHAT IT IS) */}
        {project.intro && (
          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight mb-8">
              {project.intro.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.intro.blocks.map((block, idx) => (
                <div
                  key={idx}
                  className="p-6 md:p-8 border"
                  style={{
                    borderColor: darkMode ? palette.grey9 : palette.grey3,
                    backgroundColor: darkMode ? palette.grey11 : palette.grey1
                  }}
                >
                  <h3 className="text-base sm:text-lg font-medium mb-3">
                    {block.heading}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 2.6 APP OVERVIEW & INSTALL FLOW */}
        {project.appOverview && (() => {
          const tabs = project.appOverview.tabs || null;
          const activeOverview = tabs ? (tabs[overviewTabIdx] || tabs[0]) : project.appOverview;

          return (
            <section className="mb-20">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-normal tracking-tight mb-2">
                    {project.appOverview.title}
                  </h2>
                  {activeOverview.subtitle && (
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                      {activeOverview.subtitle}
                    </p>
                  )}
                </div>

                {tabs && tabs.length > 1 && (
                  <div className="inline-flex self-start sm:self-auto border font-mono-custom text-xs" style={{ borderColor: darkMode ? palette.grey9 : palette.grey3 }}>
                    {tabs.map((tab, tIdx) => {
                      const isActive = tIdx === overviewTabIdx;
                      return (
                        <button
                          key={tab.key || tIdx}
                          type="button"
                          onClick={() => setOverviewTabIdx(tIdx)}
                          className="px-4 py-2 transition-colors"
                          style={{
                            backgroundColor: isActive ? projectAccent : (darkMode ? palette.black : palette.white),
                            color: isActive ? '#F7F6F2' : (darkMode ? palette.grey3 : palette.grey9),
                            borderLeft: tIdx > 0 ? `1px solid ${darkMode ? palette.grey9 : palette.grey3}` : 'none'
                          }}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {activeOverview.image ? (
                <div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    <div
                      className="lg:col-span-6 border overflow-hidden"
                      style={{
                        borderColor: darkMode ? palette.grey9 : palette.grey3,
                        backgroundColor: darkMode ? palette.black : palette.white
                      }}
                    >
                      <img
                        src={activeOverview.image}
                        alt={activeOverview.imageAlt || project.appOverview.title}
                        className="w-full h-full object-cover block"
                      />
                    </div>

                    <div className="lg:col-span-6 flex flex-col justify-between gap-4">
                      {activeOverview.cards.map((card, idx) => (
                        <div
                          key={idx}
                          className="p-5 md:p-6 border"
                          style={{
                            borderColor: darkMode ? palette.grey9 : palette.grey3,
                            backgroundColor: darkMode ? palette.black : palette.white
                          }}
                        >
                          <h3 className="text-sm sm:text-base font-medium mb-3.5 pb-2.5 border-b" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
                            {card.title}
                          </h3>
                          <div className="space-y-2.5">
                            {card.items.map((item, iIdx) => (
                              <div key={iIdx} className="grid grid-cols-12 gap-3 text-xs items-baseline">
                                <div className="col-span-4 font-medium" style={{ color: projectAccent }}>
                                  {item.label}
                                </div>
                                <div className="col-span-8 leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                                  {item.desc}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {activeOverview.caption && (
                    <div className="mt-2.5 text-[11px] font-mono-custom" style={{ color: palette.grey7 }}>
                      {activeOverview.caption}
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeOverview.cards.map((card, idx) => (
                    <div
                      key={idx}
                      className="p-6 md:p-8 border"
                      style={{
                        borderColor: darkMode ? palette.grey9 : palette.grey3,
                        backgroundColor: darkMode ? palette.black : palette.white
                      }}
                    >
                      <h3 className="text-base sm:text-lg font-medium mb-5 pb-3 border-b" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
                        {card.title}
                      </h3>
                      <div className="space-y-3.5">
                        {card.items.map((item, iIdx) => (
                          <div key={iIdx} className="grid grid-cols-12 gap-3 text-xs sm:text-sm items-baseline">
                            <div className="col-span-4 font-medium" style={{ color: projectAccent }}>
                              {item.label}
                            </div>
                            <div className="col-span-8 leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                              {item.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })()}

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

        {/* 3.45 RUST PERFORMANCE (VERTICAL BAR CHART) */}
        {project.rustPerformance && (
          <ScrollRustPerformance
            data={project.rustPerformance}
            darkMode={darkMode}
            palette={palette}
            projectAccent={projectAccent}
          />
        )}

        {/* 3.5 RESOURCE COMPARISON & BACKGROUND FOOTPRINT (UNIFIED FLOW) */}
        {(project.resourceComparison || project.resourceFootprint) && (
          <section className="mb-20">
            {project.resourceComparison && (
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-normal tracking-tight mb-2">
                  {project.resourceComparison.title}
                </h2>
                {project.resourceComparison.subtitle && (
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                    {project.resourceComparison.subtitle}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-6">
              {project.resourceComparison && (
                <ScrollResourceDiff
                  data={project.resourceComparison}
                  darkMode={darkMode}
                  palette={palette}
                  projectAccent={projectAccent}
                />
              )}

              {project.resourceFootprint && (
                <div
                  className="p-6 md:p-8 border"
                  style={{
                    borderColor: darkMode ? palette.grey9 : palette.grey3,
                    backgroundColor: darkMode ? palette.grey11 : palette.grey1
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                      <div>
                        <h3 className="text-base sm:text-lg font-medium mb-3">
                          {project.resourceFootprint.title}
                        </h3>
                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                          {project.resourceFootprint.desc}
                        </p>
                      </div>

                      {project.resourceFootprint.states && project.resourceFootprint.states.length > 0 && (
                        <div className="space-y-3">
                          {project.resourceFootprint.states.map((st, idx) => (
                            <div
                              key={idx}
                              className="p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-1.5"
                              style={{
                                borderColor: darkMode ? palette.grey9 : palette.grey3,
                                backgroundColor: darkMode ? palette.black : palette.white
                              }}
                            >
                              <span className="text-xs font-medium" style={{ color: idx === 1 ? projectAccent : palette.grey7 }}>
                                {st.label}
                              </span>
                              <span className="text-xs sm:text-sm" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                                {st.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-6">
                      <div
                        className="border overflow-hidden h-full"
                        style={{
                          borderColor: darkMode ? palette.grey9 : palette.grey3,
                          backgroundColor: darkMode ? palette.black : palette.white
                        }}
                      >
                        <img
                          src={project.resourceFootprint.image}
                          alt={project.resourceFootprint.imageAlt || project.resourceFootprint.title}
                          className="w-full h-full object-cover block"
                        />
                      </div>
                    </div>
                  </div>
                  {project.resourceFootprint.caption && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="hidden lg:block lg:col-span-6" />
                      <div className="lg:col-span-6 mt-2.5 text-[11px] font-mono-custom" style={{ color: palette.grey7 }}>
                        {project.resourceFootprint.caption}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* 4. BENCHMARK & PERFORMANCE COMPARISON */}
        {project.benchmark && (
          <section className="mb-20">
            <div className="mb-8">
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
                <table className="w-full text-left border-collapse min-w-[540px]">
                  <thead>
                    <tr
                      className="text-xs font-mono-custom border-b"
                      style={{
                        borderColor: darkMode ? palette.grey9 : palette.grey3,
                        backgroundColor: darkMode ? palette.grey11 : palette.grey1,
                        color: darkMode ? palette.grey3 : palette.grey9
                      }}
                    >
                      <th className="py-4 px-5 font-medium">항목</th>
                      <th className="py-4 px-5 font-medium">미사용 (기준)</th>
                      <th className="py-4 px-5 font-medium">FreeView 사용 시</th>
                      <th className="py-4 px-5 font-medium">비교 결과</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm">
                    {project.benchmark.rows.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-t transition-colors"
                        style={{
                          borderColor: darkMode ? palette.grey9 : palette.grey1
                        }}
                      >
                        <td className="py-4 px-5 font-medium whitespace-nowrap">
                          {row.metric}
                        </td>
                        <td className="py-4 px-5 font-mono-custom whitespace-nowrap" style={{ color: palette.grey7 }}>
                          {row.direct}
                        </td>
                        <td
                          className="py-4 px-5 font-mono-custom font-medium whitespace-nowrap"
                          style={{
                            color: row.tone === 'positive'
                              ? projectAccent
                              : (darkMode ? palette.white : palette.black)
                          }}
                        >
                          {row.index}
                        </td>
                        <td className="py-4 px-5" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                          {row.assessment}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {project.benchmark.footnote && (
              <p className="mt-3 text-xs leading-relaxed" style={{ color: palette.grey7 }}>
                {project.benchmark.footnote}
              </p>
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

        {/* 4.5 HOW IT WORKS */}
        {project.howItWorks && (
          <section className="mb-20">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-normal tracking-tight mb-2">
                {project.howItWorks.title}
              </h2>
              {project.howItWorks.subtitle && (
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                  {project.howItWorks.subtitle}
                </p>
              )}
            </div>

            <div className="divide-y border-t border-b" style={{ borderColor: darkMode ? palette.grey9 : palette.grey3 }}>
              {project.howItWorks.items.map((item, idx) => (
                <div
                  key={idx}
                  className="py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
                  style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}
                >
                  <div className="md:col-span-4 text-sm font-medium">
                    {item.title}
                  </div>
                  <div className="md:col-span-8 text-xs sm:text-sm leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
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
