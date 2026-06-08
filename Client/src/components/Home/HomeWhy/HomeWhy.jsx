import React, { useState, useEffect, useRef } from "react";

import { TbWorldCode } from "react-icons/tb";
import { TfiStatsUp } from "react-icons/tfi";
import { TbTargetArrow } from "react-icons/tb";
import { MdStars } from "react-icons/md";
import { FaRecycle } from "react-icons/fa6";

import { FaTrophy } from "react-icons/fa";
import { TbDatabaseShare } from "react-icons/tb";
import { FaBoltLightning } from "react-icons/fa6";
import { FaHandshakeSimple } from "react-icons/fa6";


const stats = [
  { icon: <TbWorldCode className="text-green-500" />, title: "Web Projects", sub: "Delivered on time", val: "97%", num: 97, suffix: "%" },
  { icon: <TfiStatsUp className="text-green-500" />, title: "Traffic Growth", sub: "Avg. 6 months post-SEO", val: "+312%", num: 312, suffix: "%" },
  { icon: <TbTargetArrow className="text-green-500" />, title: "Ad ROI", sub: "Across PPC campaigns", val: "7×", num: 7, suffix: "×" },
  { icon: <MdStars className="text-green-500" />, title: "Clutch Rating", sub: "Based on 80+ reviews", val: "4.9/5", num: 4.9, suffix: "/5" },
  { icon: <FaRecycle className="text-green-500" />, title: "Client Retention", sub: "Continue with retainer", val: "86%", num: 86, suffix: "%" },
];

const cards = [
  { icon: <FaTrophy className="text-green-500" />, title: "Award Winning", text: "Recognised across Pakistan and South Asia for digital excellence." },
  { icon: <TbDatabaseShare className="text-green-500" />, title: "Data Driven", text: "Every decision backed by analytics, A/B tests, and real numbers." },
  { icon: <FaBoltLightning className="text-green-500" />, title: "Fast Delivery", text: "On-time delivery on 97% of projects. No surprises, no delays." },
  { icon: <FaHandshakeSimple className="text-green-500" />, title: "Dedicated Team", text: "You get a dedicated account manager — not a revolving door of reps." },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function CountUp({ target, suffix, active, decimals = 0 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start = null;
    const duration = 1600;

    const step = (ts) => {
      if (!start) start = ts;

      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplay(+(eased * target).toFixed(decimals));

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [active, target, decimals]);

  return (
    <span>
      {decimals > 0 ? display.toFixed(decimals) : Math.floor(display)}
      {suffix}
    </span>
  );
}

export default function HomeWhy() {
  const [sectionRef, sectionInView] = useInView(0.1);
  const [statsRef, statsInView] = useInView(0.2);

  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#0B0F19",
        fontFamily: "'Poppins', sans-serif",
      }}
      className="relative overflow-hidden py-24 px-4"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes tagPop {
          0% { opacity: 0; transform: scale(0.8) translateY(10px); }
          60% { transform: scale(1.05) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 16px 2px #22C55E22; }
          50% { box-shadow: 0 0 36px 8px #22C55E44; }
        }

        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-18px) scale(1.04); }
        }

        @keyframes scanLine {
          0% { top: 0; opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }

        @keyframes numberRise {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .why-tag {
          animation: ${sectionInView
          ? "tagPop 0.7s cubic-bezier(.22,1,.36,1) forwards"
          : "none"
        };
          opacity: 0;
        }

        .why-title {
          animation: ${sectionInView
          ? "fadeUp 0.75s cubic-bezier(.22,1,.36,1) 0.15s forwards"
          : "none"
        };
          opacity: 0;
        }

        .why-sub {
          animation: ${sectionInView
          ? "fadeUp 0.75s cubic-bezier(.22,1,.36,1) 0.28s forwards"
          : "none"
        };
          opacity: 0;
        }

        .wcard-0,
        .wcard-1,
        .wcard-2,
        .wcard-3 {
          animation: ${sectionInView
          ? "fadeUp 0.7s cubic-bezier(.22,1,.36,1) forwards"
          : "none"
        };
          opacity: 0;
        }

        .stats-panel {
          animation: ${statsInView
          ? "fadeLeft 0.85s cubic-bezier(.22,1,.36,1) 0.2s forwards"
          : "none"
        };
          opacity: 0;
        }

        .stat-num {
          background: linear-gradient(135deg, #22C55E, #4ADE80, #94A3B8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .orb-float {
          animation: floatOrb 7s ease-in-out infinite;
        }

        .orb-float-2 {
          animation: floatOrb 9s ease-in-out 2s infinite;
        }

        .scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #22C55E33, transparent);
          animation: scanLine 3.5s linear infinite;
          pointer-events: none;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="orb-float absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, #22C55E 0%, transparent 70%)",
          }}
        />

        <div
          className="orb-float-2 absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, #4ADE80 0%, transparent 70%)",
          }}
        />

        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#1E293B 1px, transparent 1px), linear-gradient(90deg, #1E293B 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT */}
          <div data-aos="fade-right">
            <div
              className="why-tag inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                background: "#121826",
                border: "1px solid #1E293B",
                color: "#4ADE80",
                letterSpacing: "0.2em",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: "#22C55E" }}
              />
              Why Digital Agency
            </div>

            <h2
              className="why-title text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
              style={{
                color: "#F8FAFC",
                fontFamily: "'Syne', sans-serif",
              }}
            >
              Not Just Another{" "}
              <em
                className="not-italic"
                style={{
                  background: "linear-gradient(135deg, #22C55E, #4ADE80)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Agency
              </em>
            </h2>

            <p
              className="why-sub text-lg mb-10 leading-relaxed"
              style={{ color: "#94A3B8", maxWidth: "480px" }}
            >
              We combine strategy, creativity, and technology to deliver
              results most agencies only promise.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map((c, i) => (
                <div
                  key={c.title}
                  className={`wcard-${i} rounded-2xl p-5`}
                  style={{
                    background:
                      hoveredCard === i ? "#1E293B" : "#121826",
                    border: `1px solid ${hoveredCard === i ? "#22C55E" : "#1E293B"
                      }`,
                    transform:
                      hoveredCard === i
                        ? "translateY(-4px)"
                        : "translateY(0)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="text-2xl mb-3">{c.icon}</div>

                  <div
                    className="font-bold text-sm mb-1"
                    style={{ color: "#F8FAFC" }}
                  >
                    {c.title}
                  </div>

                  <div
                    className="text-xs"
                    style={{ color: "#94A3B8" }}
                  >
                    {c.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div data-aos="fade-left" 
          ref={statsRef}>
            <div
              className="stats-panel relative rounded-3xl overflow-hidden"
              style={{
                background: "#121826",
                border: "1px solid #1E293B",
                boxShadow: "0 0 60px #22C55E10",
              }}
            >
              <div className="scan-line" />

              <div
                className="px-6 py-4 flex items-center gap-3"
                style={{
                  borderBottom: "1px solid #1E293B",
                  background: "#1E293B",
                }}
              >
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "#94A3B8" }}
                >
                  Live Performance Dashboard
                </span>
              </div>

              <div className="p-4 flex flex-col gap-2">
                {stats.map((s, i) => (
                  <div
                    key={s.title}
                    className="flex items-center gap-4 px-4 py-4 rounded-xl"
                    style={{
                      background:
                        hoveredStat === i
                          ? "#1E293B"
                          : "transparent",
                      border: `1px solid ${hoveredStat === i
                          ? "#22C55E33"
                          : "transparent"
                        }`,
                    }}
                    onMouseEnter={() => setHoveredStat(i)}
                    onMouseLeave={() => setHoveredStat(null)}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: "#121826",
                        border: "1px solid #1E293B",
                      }}
                    >
                      {s.icon}
                    </div>

                    <div className="flex-1">
                      <div
                        style={{ color: "#F8FAFC" }}
                        className="text-sm font-semibold"
                      >
                        {s.title}
                      </div>

                      <div
                        style={{ color: "#94A3B8" }}
                        className="text-xs"
                      >
                        {s.sub}
                      </div>
                    </div>

                    <div className="stat-num text-xl font-extrabold tabular-nums">
                      <CountUp
                        target={s.num}
                        suffix={s.suffix}
                        active={statsInView}
                        decimals={
                          s.title === "Clutch Rating" ? 1 : 0
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}