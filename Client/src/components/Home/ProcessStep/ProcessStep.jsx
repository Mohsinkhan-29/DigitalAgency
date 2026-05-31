import React, { useState, useRef, useEffect } from "react";

/* ─── Data ───────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    title: "Discovery & Strategy",
    desc: "We learn your business, competitors, and audience to craft a tailored digital strategy with clear KPIs.",
    color: "#22C55E",
  },
  {
    num: "02",
    title: "Design & Build",
    desc: "Our designers and developers bring the strategy to life — beautifully and with obsessive attention to detail.",
    color: "#4ADE80",
  },
  {
    num: "03",
    title: "Launch & Execute",
    desc: "We launch campaigns, sites, and content with precision timing and a full QA checklist behind every release.",
    color: "#4ADE80",
  },
  {
    num: "04",
    title: "Measure & Optimise",
    desc: "We track every metric and continuously optimise to compound your results over time.",
    color: "#22C55E",
  },
];

/* ─── Timing ─────────────────────────────────────── */
const CIRCLE = 80;
const HALF = CIRCLE / 2;

const CIRCLE_DWELL = 600;
const LINE_TRAVEL = 900;
const TOTAL_LOOP =
  CIRCLE_DWELL * STEPS.length +
  LINE_TRAVEL * (STEPS.length - 1);

/* ─── Pulse Logic ───────────────────────────────── */
function getPulseState(elapsed) {
  let t = elapsed % TOTAL_LOOP;
  for (let i = 0; i < STEPS.length; i++) {
    if (t < CIRCLE_DWELL) return { type: "circle", index: i, progress: t / CIRCLE_DWELL };
    t -= CIRCLE_DWELL;
    if (i < STEPS.length - 1) {
      if (t < LINE_TRAVEL) return { type: "line", index: i, progress: t / LINE_TRAVEL };
      t -= LINE_TRAVEL;
    }
  }
}

/* ─── Hooks ─────────────────────────────────────── */
function useLoop(running) {
  const [t, setT] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    startRef.current = performance.now();
    const loop = (now) => {
      setT((now - startRef.current) % TOTAL_LOOP);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running]);

  return t;
}

function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setV(true);
    });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return v;
}

/* ─── Circle ────────────────────────────────────── */
function Circle({ step, index, pulse }) {
  const active = pulse?.type === "circle" && pulse.index === index;
  const glow = active ? pulse.progress : 0;

  return (
    <div style={{ width: CIRCLE, height: CIRCLE }} className="relative z-10 flex-shrink-0">
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "1px solid #22C55E",
          opacity: glow,
          transform: `scale(${1 + glow * 0.25})`,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#121826",
          border: "1px solid #1E293B",
          boxShadow: active ? `0 0 ${20 * glow}px rgba(34,197,94,0.6)` : "none",
        }}
      >
        <span
          style={{
            color: "#22C55E",
            fontFamily: "Syne, sans-serif",
            fontSize: "22px",
            fontWeight: 800,
          }}
        >
          {step.num}
        </span>
      </div>
    </div>
  );
}

/* ─── Desktop Line (FIXED) ──────────────────────── */
function DesktopLine({ index, pulse }) {
  const active = pulse?.type === "line" && pulse.index === index;
  const progress = active ? pulse.progress : 0;

  return (
    <div style={{ position: "relative", flex: 1, height: CIRCLE, display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "100%",
          height: 2,
          background: "#1E293B",
          position: "relative",
        }}
      >
        {active && (
          <div
            style={{
              position: "absolute",
              left: `${progress * 100}%`,
              transform: "translateX(-50%)",
              width: 20,
              height: 4,
              background: "#22C55E",
              borderRadius: 2,
              boxShadow: "0 0 10px #22C55E",
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Component ─────────────────────────────────── */
export default function ProcessSteps() {
  const sectionref = useRef(null);
  const visible = useInView(sectionref);
  const t = useLoop(visible);
  const pulse = visible ? getPulseState(t) : null;

  return (
    <section id="process" ref={sectionref} className="bg-[#0B0F19] py-24 px-20">
      <div data-aos="fade-up" className="text-center mb-16">
        <div
          className="flex items-center justify-center gap-3 mb-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: "all 0.6s ease",
          }}
        >
          <div className="h-px w-5" style={{ background: "#22C55E" }} />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#22C55E", fontFamily: "Syne, sans-serif" }}
          >
            How It Works
          </span>
          <div className="h-px w-5" style={{ background: "#22C55E" }} />
        </div>

        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(36px,4vw,58px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "#F8FAFC",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(18px)",
            transition: "all 0.65s ease 0.08s",
          }}
        >
          Our Proven{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#F8FAFC 0%,#22C55E 60%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            4 - steps
          </span>
          <br />
          Process
        </h2>
      </div>

      {/* DESKTOP */}
      <div data-aos="fade-right" className="hidden md:block max-w-5xl mx-auto">
        <div className="flex items-center">
          {STEPS.map((s, i) => (
            <>
              <div key={`circle-${i}`} className="flex flex-col items-center flex-shrink-0">
                <Circle step={s} index={i} pulse={pulse} />
              </div>
              {i < STEPS.length - 1 && (
                <DesktopLine key={`line-${i}`} index={i} pulse={pulse} />
              )}
            </>
          ))}
        </div>

        <div className="flex items-start mt-4">
          {STEPS.map((s, i) => (
            <>
              <div
                key={`label-${i}`}
                style={{ width: CIRCLE, flexShrink: 0 }}
                className="flex flex-col items-center"
              >
                <h3
                  className="text-base font-bold text-center mb-3"
                  style={{
                    fontFamily: "Syne, sans-serif",
                    color: "#F8FAFC",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm text-center mt-1 font-light"
                  style={{
                    minWidth: "180px",
                    lineHeight: "1.7",
                    color: "#94A3B8",
                  }}
                >
                  {s.desc}
                </p>
              </div>
              {i < STEPS.length - 1 && <div key={`spacer-${i}`} className="flex-1" />}
            </>
          ))}
        </div>
      </div>

      {/* MOBILE */}
      <div data-aos="fade-right" className="md:hidden relative max-w-md mx-auto">
        <div
          style={{
            position: "absolute",
            left: HALF,
            top: 0,
            bottom: 0,
            width: 2,
            background: "#1E293B",
          }}
        />
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-start gap-6 mb-12 relative">
            <Circle step={s} index={i} pulse={pulse} />
            <div className="pt-2">
              <h3 className="text-sm font-bold" style={{ color: "#F8FAFC" }}>
                {s.title}
              </h3>
              <p className="text-xs" style={{ color: "#94A3B8" }}>
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}