function ScrollResourceDiff({ data, darkMode, palette, projectAccent }) {
  const containerRef = React.useRef(null);
  const barRef = React.useRef(null);
  const valueRef = React.useRef(null);
  const reductionRef = React.useRef(null);
  const targetRef = React.useRef(0);
  const displayRef = React.useRef(0);
  const reachedEndTimeRef = React.useRef(0);
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
      const clampedP = Math.max(0, Math.min(1, p));
      const exactVal = data.fromValue + (data.toValue - data.fromValue) * clampedP;
      const roundedVal = Math.round(exactVal);
      const reductionVal = Math.max(0, data.fromValue - roundedVal);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.max(0, exactVal / 100).toFixed(5)})`;
      }
      if (valueRef.current) {
        valueRef.current.textContent = `${reductionVal}${data.unit}`;
        valueRef.current.style.color = clampedP >= 0.99 ? accentRef.current : textColorRef.current;
      }
      if (reductionRef.current) {
        reductionRef.current.textContent = `${reductionVal}${data.unit}`;
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

      const visualTarget = Math.min(1, targetRef.current / 0.78);
      const diff = visualTarget - displayRef.current;
      if (Math.abs(diff) < 0.001) {
        displayRef.current = visualTarget;
        applyVisual(displayRef.current);
        rafRef.current = null;
        lastTimeRef.current = null;
        return;
      }

      const factor = 1 - Math.exp(-dt * 8.5);
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

    const minHoldMs = 520;

    const setTarget = (next, immediate = false) => {
      let clamped = Math.max(0, Math.min(1, next));
      const prev = targetRef.current;
      if (prev < 0.78 && clamped >= 0.78) {
        reachedEndTimeRef.current = performance.now();
      }
      if (clamped >= 1 && !immediate) {
        const elapsed = performance.now() - reachedEndTimeRef.current;
        if (elapsed < minHoldMs) {
          clamped = 0.96;
        }
      }
      targetRef.current = clamped;
      if (clamped <= 0 || clamped >= 1) {
        unlockScroll();
      }
      if (immediate) {
        const vis = Math.min(1, clamped / 0.78);
        displayRef.current = vis;
        applyVisual(vis);
      } else {
        startAnimation();
      }
    };

    const scrubSpanPx = 980;

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

  const targetReductionStr = `${data.fromValue - data.toValue}${data.unit}`;
  const renderSubtitle = (text) => {
    if (!text || !text.includes(targetReductionStr)) return text;
    const parts = text.split(targetReductionStr);
    return (
      <>
        {parts[0]}
        <span ref={reductionRef} style={{ fontVariantNumeric: 'tabular-nums' }}>0{data.unit}</span>
        {parts.slice(1).join(targetReductionStr)}
      </>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-normal tracking-tight mb-2">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
            {renderSubtitle(data.subtitle)}
          </p>
        )}
      </div>

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
        <div className="flex items-baseline gap-1.5">
          <span
            ref={valueRef}
            className="text-2xl sm:text-3xl font-medium font-mono-custom tracking-tight"
            style={{
              color: darkMode ? palette.white : palette.black,
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            0{data.unit}
          </span>
          <span className="text-xs font-normal" style={{ color: palette.grey7 }}>
            감소
          </span>
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
          className="w-full h-full"
          style={{
            backgroundColor: projectAccent,
            transformOrigin: 'left center',
            transform: `scaleX(${data.fromValue / 100})`,
            willChange: 'transform'
          }}
        />
      </div>
      </div>
    </div>
  );
}

function ScrollRustPerformance({ data, darkMode, palette, projectAccent }) {
  const sectionRef = React.useRef(null);
  const bar0Ref = React.useRef(null);
  const bar1Ref = React.useRef(null);
  const mainBarRef = React.useRef(null);
  const mainValRef = React.useRef(null);
  const titleValRef = React.useRef(null);
  const subValRef = React.useRef(null);
  const waveRef = React.useRef(null);
  const gridPatternRef = React.useRef(null);
  const gridLineRef = React.useRef(null);

  const progressRef = React.useRef(0);
  const snappedRef = React.useRef(false);
  const isLockedRef = React.useRef(false);
  const lastTouchYRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastTimeRef = React.useRef(null);

  const currentVal3Ref = React.useRef(0);
  const springPosRef = React.useRef(0);
  const springVelRef = React.useRef(0);
  const snapTimeRef = React.useRef(0);

  React.useEffect(() => {
    const threshold = 0.72;
    const scrubSpanPx = 1500;
    const minHoldMs = 650;
    const maxBarH = 160;
    const dotUnitH = 2.2;
    const settledUnitH = 26;

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

    const formatMultiple = (valNum) => {
      if (valNum >= 171.55) return '171.6';
      return valNum.toFixed(1);
    };

    const applyVisual = (val3, springRatio) => {
      const clampedV3 = Math.max(0, Math.min(171.6, val3));
      const scaleMax = Math.max(1.39, clampedV3);

      // 1 unit (1.0x) height in pixels before scale-break snap
      const linearUnitH = Math.max(dotUnitH, (1.0 / scaleMax) * maxBarH);
      // Blend from squashed dot unit height to settled scale-break unit height (26px per 1x)
      const unitH = Math.max(2, linearUnitH + (settledUnitH - linearUnitH) * springRatio);

      const h0 = unitH * 1.0;
      const h1 = unitH * 1.39;
      const linearH2 = Math.max(2, (clampedV3 / scaleMax) * maxBarH);
      const snapDip = snappedRef.current ? (springRatio - 1) * 14 : 0;
      const h2 = Math.max(2, Math.min(maxBarH + 12, linearH2 - snapDip));

      if (bar0Ref.current) {
        bar0Ref.current.style.height = `${h0.toFixed(2)}px`;
      }
      if (bar1Ref.current) {
        bar1Ref.current.style.height = `${h1.toFixed(2)}px`;
      }
      if (mainBarRef.current) {
        mainBarRef.current.style.height = `${h2.toFixed(2)}px`;
      }

      // Update 1x-interval grid lines (anchored from bottom baseline, matching h0 = 1.0x exactly)
      const gridStepPx = Math.max(2.6, h0);
      if (gridPatternRef.current && gridLineRef.current) {
        const stepStr = gridStepPx.toFixed(2);
        gridPatternRef.current.setAttribute('height', stepStr);
        gridLineRef.current.setAttribute('y1', stepStr);
        gridLineRef.current.setAttribute('y2', stepStr);
      }

      const formatted = formatMultiple(clampedV3);
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
        const waveOpacity = Math.max(0, Math.min(1, springRatio * 1.15));
        const waveScale = Math.max(0.2, 0.2 + 0.8 * springRatio);
        waveRef.current.style.opacity = `${waveOpacity}`;
        waveRef.current.style.transform = `scaleY(${waveScale})`;
      }
    };

    const mediaQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery && mediaQuery.matches) {
      snappedRef.current = true;
      progressRef.current = 1;
      currentVal3Ref.current = 171.6;
      springPosRef.current = 1;
      applyVisual(171.6, 1);
      return;
    }

    applyVisual(currentVal3Ref.current, springPosRef.current);

    const tick = (now) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const dt = Math.min(0.032, Math.max(0.001, (now - lastTimeRef.current) / 1000));
      lastTimeRef.current = now;

      if (snappedRef.current) {
        currentVal3Ref.current = 171.6;
        // Underdamped spring driving 2.0 & 2.1 from dots (0) back up to abbreviated heights (1)
        const stiffness = 260;
        const damping = 12;
        const displacement = springPosRef.current - 1;
        const accel = -stiffness * displacement - damping * springVelRef.current;

        springVelRef.current += accel * dt;
        springPosRef.current += springVelRef.current * dt;

        applyVisual(171.6, springPosRef.current);

        if (Math.abs(displacement) < 0.004 && Math.abs(springVelRef.current) < 0.02) {
          springPosRef.current = 1;
          springVelRef.current = 0;
          applyVisual(171.6, 1);
          rafRef.current = null;
          lastTimeRef.current = null;
          return;
        }

        rafRef.current = window.requestAnimationFrame(tick);
      } else {
        const normP = Math.max(0, Math.min(1, progressRef.current / threshold));
        // First 22% of scroll climbs 0.0 -> 1.39 so user sees 3.3 catch up to 2.1, then 1.39 -> 171.6 crushes 2.0 & 2.1 into dots
        const targetVal3 = normP <= 0.22
          ? (normP / 0.22) * 1.39
          : 1.39 + Math.pow((normP - 0.22) / 0.78, 1.8) * (171.6 - 1.39);

        const diff = targetVal3 - currentVal3Ref.current;
        const factor = 1 - Math.exp(-dt * 11);
        currentVal3Ref.current += diff * factor;
        springPosRef.current = 0;
        springVelRef.current = 0;

        applyVisual(currentVal3Ref.current, 0);

        if (Math.abs(diff) < 0.02) {
          currentVal3Ref.current = targetVal3;
          applyVisual(targetVal3, 0);
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
      const centerY = rect.top + rect.height / 2;

      if (deltaY > 0 && progressRef.current < 1 && (isLockedRef.current || (!snappedRef.current && centerY <= vh * 0.52 && centerY >= vh * 0.18))) {
        if (event.cancelable) event.preventDefault();
        if (event.stopImmediatePropagation) event.stopImmediatePropagation();
        lockScroll();
        const nextP = Math.max(0, Math.min(1, progressRef.current + deltaY / scrubSpanPx));
        progressRef.current = nextP;

        if (!snappedRef.current && nextP >= threshold) {
          snappedRef.current = true;
          snapTimeRef.current = performance.now();
          currentVal3Ref.current = 171.6;
          springPosRef.current = 0;
          springVelRef.current = 3.2;
        }

        if (snappedRef.current && nextP >= 1) {
          const elapsed = performance.now() - snapTimeRef.current;
          if (elapsed >= minHoldMs) {
            unlockScroll();
          } else {
            progressRef.current = 0.96;
          }
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
      if (rect.top >= vh * 0.78) {
        if (snappedRef.current || progressRef.current > 0) {
          snappedRef.current = false;
          progressRef.current = 0;
          currentVal3Ref.current = 0;
          springPosRef.current = 0;
          springVelRef.current = 0;
          applyVisual(0, 0);
        }
      } else if (rect.bottom <= 0 && !snappedRef.current) {
        snappedRef.current = true;
        progressRef.current = 1;
        currentVal3Ref.current = 171.6;
        springPosRef.current = 1;
        springVelRef.current = 0;
        applyVisual(171.6, 1);
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
        <span ref={refObj} style={{ fontVariantNumeric: 'tabular-nums' }}>0.0</span>
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
              className="grid grid-cols-3 gap-3 sm:gap-6 items-end h-52 pt-6 px-4 border-b relative overflow-hidden"
              style={{
                borderColor: darkMode ? palette.grey9 : palette.grey3,
                gridTemplateColumns: `repeat(${data.bars.length}, minmax(0, 1fr))`
              }}
            >
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ transform: 'scaleY(-1)' }}
              >
                <defs>
                  <pattern
                    ref={gridPatternRef}
                    id="rust-unit-grid"
                    width="8"
                    height="115.11"
                    patternUnits="userSpaceOnUse"
                  >
                    <line
                      ref={gridLineRef}
                      x1="0"
                      y1="115.11"
                      x2="8"
                      y2="115.11"
                      stroke={darkMode ? `${palette.grey9}90` : `${palette.grey3}B0`}
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#rust-unit-grid)" />
              </svg>
              {data.bars.map((bar, idx) => {
                const isAnimatedBar = Boolean(bar.scaleBreak);
                const barRefToUse = idx === 0 ? bar0Ref : idx === 1 ? bar1Ref : mainBarRef;
                const initHeightPx = idx === 0 ? 115 : idx === 1 ? 160 : 2;
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
                      {isAnimatedBar ? '0.0x' : bar.valueText}
                    </span>
                    <div
                      ref={barRefToUse}
                      className="w-full max-w-[56px] sm:max-w-[64px] relative shrink-0"
                      style={{
                        height: `${initHeightPx}px`,
                        minHeight: '2px',
                        backgroundColor: bar.accent ? projectAccent : palette.grey7,
                        willChange: 'height'
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
