import React, { useEffect, useRef, useState } from "react";

// ─── Icon SVG paths (Feather/Lucide style) ───────────────────────────────────
const ICONS = [
  { label: "HTML",    svg: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>' },
  { label: "CSS",     svg: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>' },
  { label: "Node",    svg: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>' },
  { label: "UI",      svg: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>' },
  { label: "SQL",     svg: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>' },
  { label: "API",     svg: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>' },
  { label: "Cloud",   svg: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>' },
  { label: "CI/CD",   svg: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/>' },
  { label: "Auth",    svg: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
  { label: "CDN",     svg: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>' },
  { label: "Scale",   svg: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>' },
  { label: "Monitor", svg: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>' },
];

const FINAL_ROWS = [
  { label: "Frontend",    pct: 95, svg: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>' },
  { label: "Azure Infra", pct: 92, svg: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>' },
  { label: "API Layer",   pct: 88, svg: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>' },
  { label: "Database",    pct: 84, svg: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>' },
  { label: "Security",    pct: 97, svg: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' },
];

// Radii for the concentric arc rings
const RING_RADII = [120, 210, 300, 390, 480, 570];
const SVG_SIZE   = 1200; // large enough to hold the outermost ring
const CX         = SVG_SIZE / 2;
const CY         = SVG_SIZE / 2;

// ─── Inline SVG helper ────────────────────────────────────────────────────────
function Icon({ paths, className = "", size = 22 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}

// ─── Scroll-driven green arc rings ───────────────────────────────────────────
function RingLayer({ progress }) {
  return (
    <svg
      viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
      width={SVG_SIZE}
      height={SVG_SIZE}
      style={{
        position: "absolute",
        pointerEvents: "none",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
      }}
    >
      <defs>
        {RING_RADII.map((_, i) => (
          <linearGradient key={i} id={`rg-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#16a34a" />
            <stop offset="50%"  stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        ))}
      </defs>

      {RING_RADII.map((r, i) => {
        const circumf = 2 * Math.PI * r;
        // Each ring starts filling in with a small stagger
        const stagger  = i * 0.06;
        const rawP     = Math.max(0, Math.min(1, (progress - stagger) / (1 - stagger * RING_RADII.length * 0.5)));
        const fill     = Math.min(1, rawP * 1.3);
        const dashOffset = circumf * (1 - fill);
        const opacity    = 0.20 + fill * 0.80;
        const strokeW    = i === RING_RADII.length - 1 ? 2.5 : 1.5;

        return (
          <g key={r}>
            {/* Track ring */}
            <circle
              cx={CX} cy={CY} r={r}
              fill="none"
              stroke="rgba(22,163,74,0.07)"
              strokeWidth="1.2"
            />
            {/* Animated arc */}
            <circle
              cx={CX} cy={CY} r={r}
              fill="none"
              stroke={`url(#rg-${i})`}
              strokeWidth={strokeW}
              strokeLinecap="round"
              strokeDasharray={circumf}
              strokeDashoffset={dashOffset}
              strokeOpacity={opacity}
              transform={`rotate(-90 ${CX} ${CY})`}
              style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1), stroke-opacity 0.6s ease" }}
            />
          </g>
        );
      })}
    </svg>
  );
}

// ─── Flying icon that animates from edge → screen ────────────────────────────
function FlyingIcon({ icon, fromLeft, targetRef, onLanded }) {
  const ref = useRef(null);

  useEffect(() => {
    const el     = ref.current;
    const target = targetRef?.current;
    if (!el || !target) return;

    const wrapRect = el.parentElement.getBoundingClientRect();
    const scrRect  = target.getBoundingClientRect();
    const destX    = scrRect.left - wrapRect.left + scrRect.width  / 2 - 30;
    const destY    = scrRect.top  - wrapRect.top  + scrRect.height / 2 - 30;
    const yOff     = (Math.random() - 0.5) * 140;
    const startX   = fromLeft ? -90 : wrapRect.width + 90;
    const startY   = wrapRect.height / 2 + yOff - 30;

    el.style.transition = "none";
    el.style.left       = `${startX}px`;
    el.style.top        = `${startY}px`;
    el.style.opacity    = "1";
    el.style.transform  = `scale(1) rotate(${fromLeft ? -8 : 8}deg)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition =
          "left 0.62s cubic-bezier(0.4,0,0.2,1), top 0.62s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease 0.42s, transform 0.62s ease";
        el.style.left      = `${destX}px`;
        el.style.top       = `${destY}px`;
        el.style.opacity   = "0";
        el.style.transform = "scale(0.35) rotate(0deg)";
      });
    });

    const t = setTimeout(() => onLanded?.(), 640);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={ref}
      className="absolute pointer-events-none flex flex-col items-center justify-center gap-1 rounded-xl opacity-0"
      style={{
        width: 60,
        height: 60,
        background: "#0d1a14",
        border: "1.5px solid #1a3d28",
        zIndex: 30,
      }}
    >
      <Icon paths={icon.svg} className="text-green-500" size={22} />
      <span className="text-green-600 font-semibold uppercase tracking-wide" style={{ fontSize: 7 }}>
        {icon.label}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Laptop() {
  const sceneRef  = useRef(null);
  const screenRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [revealedCount, setRevealedCount]   = useState(0);
  const [flyQueue, setFlyQueue]             = useState([]);
  const [screenIcons, setScreenIcons]       = useState([]);
  const [showHint, setShowHint]             = useState(true);
  const [showFinal, setShowFinal]           = useState(false);
  const [finalRowsIn, setFinalRowsIn]       = useState([]);
  const [fillWidths, setFillWidths]         = useState(FINAL_ROWS.map(() => 0));

  const lastRevealedRef = useRef(-1);
  const finalVisRef     = useRef(false);

  // ── Scroll handler ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scene = sceneRef.current;
      if (!scene) return;

      const rect     = scene.getBoundingClientRect();
      const sceneH   = scene.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / sceneH);

      setScrollProgress(progress);

      // Reset when scrolled back to top
      if (progress < 0.01 && lastRevealedRef.current >= 0) {
        lastRevealedRef.current = -1;
        finalVisRef.current     = false;
        setRevealedCount(0);
        setFlyQueue([]);
        setScreenIcons([]);
        setShowHint(true);
        setShowFinal(false);
        setFinalRowsIn([]);
        setFillWidths(FINAL_ROWS.map(() => 0));
        return;
      }

      // Icons appear in first 80% of scroll
      const iconProgress = Math.min(1, progress / 0.80);
      const toReveal     = Math.min(ICONS.length - 1, Math.floor(iconProgress * ICONS.length));

      if (toReveal > lastRevealedRef.current) {
        const newFlies = [];
        for (let i = lastRevealedRef.current + 1; i <= toReveal; i++) {
          newFlies.push({ icon: ICONS[i], fromLeft: i % 2 === 0, key: `fly-${i}-${Date.now()}`, idx: i });
        }
        lastRevealedRef.current = toReveal;
        setRevealedCount(toReveal + 1);
        setShowHint(false);
        setFlyQueue(prev => [...prev, ...newFlies]);
      }

      // Final dashboard at 88%+
      if (progress >= 0.88 && !finalVisRef.current) {
        finalVisRef.current = true;
        setShowFinal(true);
        FINAL_ROWS.forEach((row, i) => {
          setTimeout(() => {
            setFinalRowsIn(prev => [...prev, i]);
            setTimeout(() => {
              setFillWidths(prev => {
                const next = [...prev];
                next[i] = row.pct;
                return next;
              });
            }, 100);
          }, i * 155);
        });
      } else if (progress < 0.80 && finalVisRef.current) {
        finalVisRef.current = false;
        setShowFinal(false);
        setFinalRowsIn([]);
        setFillWidths(FINAL_ROWS.map(() => 0));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── When a flying icon lands ────────────────────────────────────────────────
  const handleLanded = (key, idx) => {
    setFlyQueue(prev => prev.filter(f => f.key !== key));
    setScreenIcons(prev => (prev.includes(idx) ? prev : [...prev, idx]));
  };

  return (
    <section ref={sceneRef} style={{ height: "500vh", position: "relative" }}>
      {/* ── Sticky stage ── */}
      <div
        className="flex items-center justify-center overflow-hidden"
        style={{ position: "sticky", top: 0, height: "100vh", background: "#080d14" }}
      >
        {/* ── Scroll-driven green arc rings ── */}
        <RingLayer progress={scrollProgress} />

        {/* Flying icons layer */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
          {flyQueue.map(({ icon, fromLeft, key, idx }) => (
            <FlyingIcon
              key={key}
              icon={icon}
              fromLeft={fromLeft}
              targetRef={screenRef}
              onLanded={() => handleLanded(key, idx)}
            />
          ))}
        </div>

        {/* ── Laptop ── */}
        <div
        data-aos="fade-up" 
        className="relative flex flex-col items-center" 
        style={{ zIndex: 10 }}
        >
          {/* Lid */}
          <div
            className="relative flex flex-col"
            style={{
              width: 460,
              background: "#101622",
              borderRadius: "14px 14px 0 0",
              border: "1.5px solid #1e2d3d",
              borderBottom: "none",
              padding: "12px 12px 0",
              boxShadow: "0 -2px 0 #090f1a, 0 20px 60px rgba(0,0,0,0.55)",
            }}
          >
            {/* Camera dot */}
            <div
              className="absolute rounded-full"
              style={{ top: 6, left: "50%", transform: "translateX(-50%)", width: 5, height: 5, background: "#1e2d3d" }}
            />

            {/* Screen */}
            <div
              ref={screenRef}
              className="relative overflow-hidden"
              style={{
                width: "100%",
                height: 280,
                background: "#090f18",
                borderRadius: "5px 5px 0 0",
                border: "1.5px solid #1e2d3d",
                borderBottom: "none",
              }}
            >
              {/* Idle hint */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-500"
                style={{ opacity: showHint ? 1 : 0, pointerEvents: "none" }}
              >
                <span className="uppercase tracking-widest font-medium" style={{ fontSize: 9, color: "#1a4d2e", letterSpacing: "0.2em" }}>
                  scroll to load
                </span>
                <span style={{ fontSize: 16, color: "#1a4d2e", animation: "az-bounce 1.8s ease-in-out infinite" }}>↓</span>
              </div>

              {/* Collected icon grid */}
              <div
                className="absolute inset-0 grid items-center"
                style={{
                  gridTemplateColumns: "repeat(6, 1fr)",
                  padding: 14,
                  opacity: showFinal ? 0 : 1,
                  transition: "opacity 0.3s",
                }}
              >
                {ICONS.map((ic, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center gap-1"
                    style={{
                      opacity: screenIcons.includes(i) ? 1 : 0,
                      transform: screenIcons.includes(i) ? "scale(1) rotate(0deg)" : "scale(0.3) rotate(15deg)",
                      transition: "opacity 0.42s cubic-bezier(0.34,1.56,0.64,1), transform 0.42s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                  >
                    <Icon paths={ic.svg} className="text-green-600" size={20} />
                    <span className="uppercase font-medium text-green-900" style={{ fontSize: 6, letterSpacing: "0.8px" }}>
                      {ic.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Final dashboard */}
              <div
                className="absolute inset-0 flex flex-col justify-center px-6 py-5 transition-opacity duration-700"
                style={{
                  background: "#090f18",
                  opacity: showFinal ? 1 : 0,
                  zIndex: 5,
                  pointerEvents: showFinal ? "auto" : "none",
                }}
              >
                <p className="uppercase font-semibold tracking-widest mb-3" style={{ fontSize: 8, color: "#16a34a", letterSpacing: "0.2em" }}>
                  Azure Stack — Build Score
                </p>
                {FINAL_ROWS.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 py-1"
                    style={{
                      borderBottom: "1px solid #0f1f2e",
                      opacity: finalRowsIn.includes(i) ? 1 : 0,
                      transform: finalRowsIn.includes(i) ? "translateX(0)" : "translateX(-6px)",
                      transition: "opacity 0.32s ease, transform 0.32s ease",
                    }}
                  >
                    <Icon paths={row.svg} className="text-green-600 flex-shrink-0" size={11} />
                    <span className="text-green-800 font-normal" style={{ fontSize: 9, minWidth: 72 }}>
                      {row.label}
                    </span>
                    <div className="flex-1 rounded-full overflow-hidden" style={{ height: 3, background: "#0f1f2e" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #16a34a, #22c55e)",
                          width: `${fillWidths[i]}%`,
                          transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
                        }}
                      />
                    </div>
                    <span className="text-green-500 font-semibold" style={{ fontSize: 8, minWidth: 24, textAlign: "right" }}>
                      {row.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Base / trackpad */}
          <div
            className="relative"
            style={{
              width: 500,
              height: 18,
              background: "#101622",
              borderRadius: "0 0 5px 5px",
              border: "1.5px solid #1e2d3d",
              borderTop: "1px solid #090f1a",
              boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
            }}
          >
            <div
              className="absolute rounded-sm"
              style={{ bottom: 4, left: "50%", transform: "translateX(-50%)", width: 64, height: 3, background: "#1e2d3d" }}
            />
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: showFinal ? 0 : 0.7, transition: "opacity 0.5s" }}
        >
          <div
            className="rounded-full"
            style={{
              width: 1,
              height: 36,
              background: "linear-gradient(to bottom, #16a34a, transparent)",
              animation: "az-grow 2s ease-in-out infinite",
            }}
          />
          <span className="uppercase tracking-widest" style={{ fontSize: 9, color: "#1a4d2e", letterSpacing: "0.2em" }}>
            scroll
          </span>
        </div>
      </div>

      <style>{`
        @keyframes az-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
        @keyframes az-grow {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50%       { transform: scaleY(0.5); opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}