import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

// ─── Route-based content map ───────────────────────────────────────────────
const PAGE_CONTENT = {
  "/Services": {
    breadcrumb: ["Home", "Services"],
    staticLine1: "What We",
    accentWord: "Build",
    staticLine2: "& Deliver",
    description: "Every service is a system — designed for scale, built for results, measured by impact.",
    stats: [
      { value: "6", label: "Core Services" },
      { value: "200+", label: "Projects Done" },
      { value: "98%", label: "Satisfaction" },
    ],
  },
  "/About": {
    breadcrumb: ["Home", "About Us"],
    staticLine1: "We're the Team",
    accentWord: "Behind the",
    staticLine2: "Results",
    description: "A group of builders, strategists, and designers who left big agencies to do things properly — for clients who care about quality.",
    stats: null,
  },
  "/Project": {
    breadcrumb: ["Home", "Projects"],
    staticLine1: "Work That",
    accentWord: "Speaks for",
    staticLine2: "Itself",
    description: "200+ projects shipped across web, mobile, cloud, and marketing. Every one built to move a metric that matters.",
    stats: [
      { value: "200+", label: "Projects Shipped" },
      { value: "30+", label: "Industries Served" },
      { value: "98%", label: "Satisfaction Rate" },
    ],
  },
  "/Contact": {
    breadcrumb: ["Home", "Contact"],
    staticLine1: "Let's Build",
    accentWord: "Something",
    staticLine2: "Together",
    description: "Ready to scale? Drop us a message and we'll get back to you within one business day.",
    stats: null,
  },
};

const FALLBACK = {
  breadcrumb: ["Home"],
  staticLine1: "Scale Smarter",
  accentWord: "with Azure",
  staticLine2: "",
  description: "Secure, scalable, and cost-efficient cloud infrastructure tailored for modern enterprises.",
  stats: null,
};

// ─── Count-up hook ─────────────────────────────────────────────────────────
function useCountUp(target, duration, triggered) {
  const [val, setVal] = useState(0);
  const numeric = parseInt(target?.replace(/\D/g, ""), 10) || 0;
  const suffix = target?.replace(/[0-9]/g, "") || "";

  useEffect(() => {
    if (!triggered || !numeric) return;
    let start = null;
    const raf = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * numeric));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [triggered, numeric, duration]);

  return numeric ? `${val}${suffix}` : target;
}

function StatItem({ stat, triggered, index }) {
  const display = useCountUp(stat.value, 1400 + index * 200, triggered);
  return (
    <div className="text-center lg:text-left">
      <div
        className="text-4xl lg:text-5xl font-black leading-none mb-1"
        style={{ fontFamily: "Syne, sans-serif", color: "#fff" }}
      >
        {display}
      </div>
      <div className="text-xs uppercase tracking-wider" style={{ color: "#8BA3C4" }}>
        {stat.label}
      </div>
    </div>
  );
}

// ─── Laptop Hero (home page only) ──────────────────────────────────────────
function LaptopHero({ mounted }) {
  return (
    <div
      className="hero-fade flex-shrink-0 hidden lg:flex items-center justify-center"
      style={{ animationDelay: "180ms", width: "460px" }}
    >
      {/* Outer glow */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: "-32px",
            background: "radial-gradient(ellipse at 50% 60%, rgba(74,222,128,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Laptop lid */}
        <div
          style={{
            width: "380px",
            background: "linear-gradient(160deg, #1a2e20 0%, #0d1a10 100%)",
            borderRadius: "14px 14px 0 0",
            padding: "10px",
            border: "1.5px solid rgba(74,222,128,0.25)",
            borderBottom: "none",
            boxShadow: "0 -4px 32px rgba(74,222,128,0.08), inset 0 1px 0 rgba(255,255,255,0.07)",
            position: "relative",
          }}
        >
          {/* Screen bezel */}
          <div
            style={{
              background: "#020B18",
              borderRadius: "8px",
              overflow: "hidden",
              height: "220px",
              position: "relative",
              border: "1px solid rgba(74,222,128,0.15)",
            }}
          >
            {/* Scanline overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />

            {/* Screen content — mock dashboard */}
            <div style={{ padding: "14px", fontFamily: "monospace", position: "relative", zIndex: 1 }}>
              {/* Top bar */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FEBC2E" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28C840" }} />
                <div
                  style={{
                    flex: 1,
                    marginLeft: 8,
                    height: 14,
                    background: "rgba(74,222,128,0.08)",
                    borderRadius: 4,
                    border: "1px solid rgba(74,222,128,0.15)",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 8,
                  }}
                >
                  <span style={{ fontSize: 8, color: "#4A6580" }}>https://dashboard.azure.io</span>
                </div>
              </div>

              {/* Metric cards row */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                {[
                  { label: "Uptime", value: "99.9%", color: "#4ADE80" },
                  { label: "Requests", value: "1.2M", color: "#60A5FA" },
                  { label: "Latency", value: "12ms", color: "#FBBF24" },
                ].map((m) => (
                  <div
                    key={m.label}
                    style={{
                      flex: 1,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 6,
                      padding: "6px 8px",
                    }}
                  >
                    <div style={{ fontSize: 7, color: "#4A6580", marginBottom: 2 }}>{m.label}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: m.color }}>{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Chart bars */}
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 6,
                  padding: "8px",
                  marginBottom: "10px",
                }}
              >
                <div style={{ fontSize: 7, color: "#4A6580", marginBottom: 6 }}>INFRASTRUCTURE LOAD</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 40 }}>
                  {[55, 70, 45, 88, 62, 75, 50, 90, 68, 80, 58, 72].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        borderRadius: "3px 3px 0 0",
                        background:
                          i === 7
                            ? "linear-gradient(180deg, #4ADE80 0%, #16A34A 100%)"
                            : "rgba(74,222,128,0.25)",
                        transition: "height 0.3s",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Terminal line */}
              <div
                style={{
                  background: "rgba(0,0,0,0.4)",
                  borderRadius: 4,
                  padding: "5px 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ color: "#4ADE80", fontSize: 9 }}>▶</span>
                <span style={{ color: "#4A6580", fontSize: 9 }}>Deploying to production...</span>
                <span
                  style={{
                    display: "inline-block",
                    width: 6,
                    height: 10,
                    background: "#4ADE80",
                    borderRadius: 1,
                    animation: "blink 1s step-end infinite",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Webcam dot */}
          <div
            style={{
              position: "absolute",
              top: 5,
              left: "50%",
              transform: "translateX(-50%)",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#1a2e20",
              border: "1px solid rgba(74,222,128,0.2)",
            }}
          />
        </div>

        {/* Laptop base */}
        <div
          style={{
            width: "380px",
            height: "18px",
            background: "linear-gradient(180deg, #152218 0%, #0a1510 100%)",
            borderRadius: "0 0 10px 10px",
            border: "1.5px solid rgba(74,222,128,0.2)",
            borderTop: "none",
            position: "relative",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          {/* Hinge line */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 60,
              height: 3,
              borderRadius: 2,
              background: "rgba(74,222,128,0.15)",
            }}
          />
        </div>

        {/* Bottom shadow / reflection */}
        <div
          style={{
            width: "420px",
            height: "15px",
            marginLeft: "-20px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(74,222,128,0.12) 0%, transparent 80%)",
            marginTop: 4,
          }}
        />
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}

// ─── Page Hero ─────────────────────────────────────────────────────────────
export default function PageHero() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const content = PAGE_CONTENT[pathname] || FALLBACK;
  const sectionRef = useRef(null);
  const [triggered, setTriggered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Re-trigger animations on route change
  useEffect(() => {
    setTriggered(false);
    setMounted(false);
    const t1 = setTimeout(() => setMounted(true), 30);
    const t2 = setTimeout(() => setTriggered(true), 200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [pathname]);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-fade { opacity: 0; animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) forwards; }
      `}</style>

      <section
        ref={sectionRef}
        className="relative flex items-center overflow-hidden"
        style={{
          minHeight: "340px",
          paddingTop: "120px",
          paddingBottom: "64px",
          background: "#020B18",
        }}
      >
        {/* Background Video */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "80% 20%", opacity: 0.4 }}
        >
          <source
            src="https://demo.awaikenthemes.com/assets/videos/artistic-video.mp4"
            type="video/mp4"
          />
        </video>



        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-12">

          {/* Breadcrumb */}
          {mounted && (
            <div
              className="hero-fade flex items-center gap-2 text-xs mb-6"
              style={{ animationDelay: "0ms", color: "#8BA3C4" }}
            >
              {content.breadcrumb.map((crumb, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span style={{ color: "#4A6580" }}>›</span>}
                  <span style={{ color: i === content.breadcrumb.length - 1 ? "#fff" : "#8BA3C4" }}>
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            {/* Left — Heading + description */}
            <div style={{ maxWidth: "680px" }}>
              {mounted && (
                <>
                  <h1
                    className="hero-fade font-black leading-[0.95] mb-5"
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "clamp(2.8rem, 6vw, 5rem)",
                      animationDelay: "60ms",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    <span className="text-white">{content.staticLine1} </span>

                    <span
                      style={{
                        background: "linear-gradient(135deg, #4ADE80 0%, #16A34A 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {content.accentWord}
                    </span>

                    {content.staticLine2 && (
                      <>
                        <br />
                        <span className="text-white">{content.staticLine2}</span>
                      </>
                    )}
                  </h1>

                  <p
                    className="hero-fade text-base leading-relaxed font-light"
                    style={{
                      color: "#8BA3C4",
                      maxWidth: "520px",
                      animationDelay: "130ms",
                    }}
                  >
                    {content.description}
                  </p>
                </>
              )}
            </div>

            {/* Right — Stats */}
            {content.stats && mounted && (
              <div
                className="hero-fade flex gap-10 lg:gap-14 flex-shrink-0"
                style={{ animationDelay: "200ms" }}
              >
                {content.stats.map((stat, i) => (
                  <StatItem key={i} stat={stat} triggered={triggered} index={i} />
                ))}
              </div>
            )}

            {/* Right — Laptop (home only) */}
            {isHome && mounted && <LaptopHero mounted={mounted} />}


          </div>

        </div>
      </section>
    </>
  );
}