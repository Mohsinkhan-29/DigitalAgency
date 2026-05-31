import React, { useState, useEffect, useRef } from "react";

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;

    const raf = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * target));

      if (progress < 1) requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, [start, target, duration]);

  return count;
}

const STATS = [
  {
    target: 200,
    suffix: "+",
    label: "Projects Completed",
    aosDelay: 600,
  },
  {
    target: 150,
    suffix: "+",
    label: "Happy Clients",
    aosDelay: 400,
  },
  {
    target: 247,
    suffix: "%",
    label: "Average ROI Increase",
    aosDelay: 200,
  },
  {
    target: 30,
    suffix: "+",
    label: "Countries Reached",
    aosDelay: 0,
  },
];

export default function Stats() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const counts = [
    useCountUp(STATS[0].target, 2000, started),
    useCountUp(STATS[1].target, 1600, started),
    useCountUp(STATS[2].target, 1800, started),
    useCountUp(STATS[3].target, 1200, started),
  ];

  return (
    <div id="TrustBar" ref={sectionRef}>
      {/* ── Layer 1: Stats bar ── */}
      <div className="relative overflow-hidden py-10 px-6 md:px-12 bg-gradient-to-br from-[#0B0F19] via-[#121826] to-[#0B0F19] border-y border-[#1E293B]">

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_60%)] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-0">
          {STATS.map((s, i) => (
            <div
              data-aos="fade-up"
              data-aos-delay={s.aosDelay}
              key={s.label}
              className={`flex flex-col items-center justify-center py-6 px-4 text-center ${
                i < STATS.length - 1 ? "border-r border-[#1E293B]" : ""
              }`}
            >
              <span className="text-4xl md:text-5xl font-extrabold tabular-nums leading-none mb-3 text-[#22C55E] drop-shadow-[0_0_14px_rgba(34,197,94,0.45)]">
                {counts[i]}
                {s.suffix}
              </span>

              <span className="text-[13px] text-[#94A3B8] leading-snug max-w-[130px]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}