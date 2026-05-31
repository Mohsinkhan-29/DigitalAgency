import React, { useEffect, useRef, useState } from "react";

const BAR_DATA = [
  { month: "Jan", value: 38 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 42 },
  { month: "Apr", value: 55 },
  { month: "May", value: 60 },
  { month: "Jun", value: 58 },
  { month: "Jul", value: 70 },
  { month: "Aug", value: 75 },
  { month: "Sep", value: 100 },
];

const STATS = [
  { value: "312%", label: "Revenue growth in 6 months" },
  { value: "1.4s", label: "Average page load time" },
  { value: "+89%", label: "Checkout conversion rate" },
];

const BOTTOM_METRICS = [
  { value: "$2.1M", sub: "This Month" },
  { value: "50K",   sub: "Daily Orders" },
  { value: "4.9★",  sub: "Rating" },
];

export default function DeepDive() {
  const sectionRef = useRef(null);
  const [visible, setVisible]   = useState(false);
  const [barHeights, setBarHeights] = useState(BAR_DATA.map(() => 0));

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setBarHeights(BAR_DATA.map(d => d.value));
    }, 300);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#0B0F19", padding: "88px 48px" }}
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(34,197,94,0.10) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* glow orb */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 500,
          top: -180,
          right: -140,
          background:
            "radial-gradient(circle, rgba(74,222,128,0.10) 0%, transparent 70%)",
        }}
      />

      <div
        className="relative z-10 mx-auto grid gap-16"
        style={{
          maxWidth: 1160,
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span style={{ width: 28, height: 1, background: "#22C55E", display: "block" }} />
            <span
              className="uppercase font-semibold tracking-widest"
              style={{ fontSize: 10, color: "#4ADE80", letterSpacing: "0.2em" }}
            >
              Deep Dive
            </span>
          </div>

          <h2
            className="font-black leading-tight mb-5"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "#F8FAFC",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            How We Grew GreenMart<br />by 312% in 6 Months
          </h2>

          <div className="flex items-center gap-2 mb-6">
            <div
              className="flex items-center gap-2 font-medium"
              style={{
                background: "#121826",
                border: "1.5px solid #1E293B",
                borderRadius: 100,
                padding: "5px 14px",
                fontSize: 12,
                color: "#F8FAFC",
              }}
            >
              <span style={{ fontSize: 14, color: "#22C55E" }}>◈</span>
              <span style={{ color: "#4ADE80", fontSize: 13 }}>★</span>
              Featured Case Study
            </div>
          </div>

          <p
            className="leading-relaxed mb-8"
            style={{ fontSize: 14, color: "#94A3B8", maxWidth: 460, lineHeight: 1.75 }}
          >
            Starting from a Shopify template, we rebuilt GreenMart's entire
            stack, redesigned the UX from scratch, and launched a data-driven
            marketing funnel that turned browsers into buyers.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  background: "#121826",
                  border: "1.5px solid #1E293B",
                  borderRadius: 12,
                  padding: "18px 16px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.5s ease ${0.2 + i * 0.1}s, transform 0.5s ease ${0.2 + i * 0.1}s`,
                }}
              >
                <div
                  className="font-black mb-1"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    color: "#22C55E",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.5 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <button
            className="font-semibold transition-all duration-200"
            style={{
              background: "transparent",
              color: "#F8FAFC",
              border: "1.5px solid #1E293B",
              borderRadius: 100,
              padding: "13px 28px",
              fontSize: 14,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#4ADE80";
              e.currentTarget.style.background = "#121826";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#1E293B";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Read Full Case Study →
          </button>
        </div>

        {/* RIGHT */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
          }}
        >
          <div className="relative">

            <div
              className="absolute flex items-center gap-2 font-semibold"
              style={{
                top: -14,
                right: 0,
                background: "#121826",
                border: "1.5px solid #1E293B",
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 12,
                color: "#4ADE80",
                zIndex: 20,
              }}
            >
              +312% Revenue
            </div>

            <div
              style={{
                background: "#121826",
                border: "1.5px solid #1E293B",
                borderRadius: 14,
                overflow: "hidden",
              }}
            >
              <div
                className="flex items-center justify-between px-4"
                style={{
                  height: 42,
                  background: "#0F172A",
                  borderBottom: "1px solid #1E293B",
                }}
              >
                <span style={{ fontSize: 11, color: "#94A3B8" }}>
                  greenmart.io — Analytics
                </span>
              </div>

              <div style={{ padding: "20px 20px 16px" }}>

                <div className="flex items-center justify-between mb-5">
                  <span style={{ fontSize: 13, color: "#F8FAFC", fontWeight: 600 }}>
                    Revenue Overview — Q1 to Q3 2025
                  </span>
                  <div
                    style={{
                      background: "#22C55E",
                      borderRadius: 100,
                      padding: "3px 10px",
                      fontSize: 10,
                      color: "#0F172A",
                      fontWeight: 700,
                    }}
                  >
                    Live
                  </div>
                </div>

                <div className="flex items-end gap-2 mb-4" style={{ height: 140 }}>
                  {BAR_DATA.map((d, i) => {
                    const isLast = i === BAR_DATA.length - 1;
                    const heightPct = (barHeights[i] / 100) * 140;

                    return (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                          style={{
                            width: "100%",
                            height: heightPct,
                            background: isLast
                              ? "linear-gradient(180deg, #4ADE80 0%, #22C55E 100%)"
                              : "rgba(74,222,128,0.22)",
                            transition: `height 0.9s ease ${i * 0.06}s`,
                            borderRadius: "6px 6px 0 0",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-3">
                  {BOTTOM_METRICS.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        borderRight: i < 2 ? "1px solid #1E293B" : "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        padding: "8px 0",
                      }}
                    >
                      <span style={{ color: "#F8FAFC", fontWeight: 700 }}>
                        {m.value}
                      </span>
                      <span style={{ color: "#94A3B8", fontSize: 12 }}>
                        {m.sub}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}