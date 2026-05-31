import React,{ useEffect, useRef, useState } from "react";

const benefits = [
  {
    icon: "⚡",
    label: "Faster Time-to-Market",
    desc: "Our agile process cuts average delivery time by 40% compared to traditional agencies.",
  },
  {
    icon: "🔒",
    label: "Enterprise-Grade Security",
    desc: "Every project includes security hardening, HTTPS, and OWASP Top 10 compliance as standard.",
  },
  {
    icon: "📊",
    label: "Transparent Reporting",
    desc: "Live dashboards, weekly standups, and honest progress updates — zero surprises.",
  },
  {
    icon: "🤝",
    label: "Long-Term Partnership",
    desc: "85% of our clients renew — because we think beyond the project and invest in your growth.",
  },
];

const metrics = [
  { label: "Page Speed", value: 95, color: "from-[#16A34A] to-[#4ADE80]" },
  { label: "SEO Score", value: 92, color: "from-[#15803D] to-[#86EFAC]" },
  { label: "Accessibility", value: 98, color: "from-[#052E16] to-[#22C55E]" },
  { label: "Best Practices", value: 100, color: "from-[#16A34A] to-[#4ADE80]" },
];

function AnimatedBar({ value, color, delay, trigger }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const timer = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(timer);
  }, [trigger, value, delay]);

  return (
    <div className="relative h-2 rounded-full bg-[#DCFCE7] overflow-hidden">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
        style={{ width: `${width}%` }}
      />
      <div
        className="absolute inset-0 rounded-full opacity-40"
        style={{
          background: "linear-gradient(90deg, transparent 60%, #86EFAC 100%)",
          width: `${width}%`,
          transition: "width 1000ms ease-out",
          transitionDelay: `${delay}ms`,
          filter: "blur(4px)",
        }}
      />
    </div>
  );
}

function CountUp({ target, trigger, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    const duration = 1200;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [trigger, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function ServiceChoose() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#F0FDF4] overflow-hidden py-24 px-4"
      style={{ fontFamily: "'Georgia', 'Cambria', serif" }}
    >
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #4ADE80 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #16A34A 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Dot grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#052E16" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
        {/* Diagonal accent line */}
        <div
          className="absolute top-0 right-1/3 w-px h-full opacity-10"
          style={{ background: "linear-gradient(to bottom, transparent, #16A34A, transparent)" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT COLUMN */}
          <div
            className="transition-all duration-1000 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
            }}
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-[#16A34A]" />
              <span
                className="text-xs font-bold tracking-[0.25em] uppercase text-[#16A34A]"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                Why Choose Us
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-5xl md:text-6xl font-bold text-[#052E16] leading-[1.05] mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              Built{" "}
              <span className="relative inline-block">
                Different,
                <span
                  className="absolute -bottom-1 left-0 w-full h-1 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #16A34A, #4ADE80)",
                    transform: visible ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.8s ease-out 0.5s",
                  }}
                />
              </span>
              <br />
              <span className="text-[#16A34A]">By Design</span>
            </h2>

            <p className="text-[#4B5563] text-lg leading-relaxed mb-10 max-w-md">
              We're not the cheapest. We're the most effective. Here's why{" "}
              <span className="text-[#16A34A] font-semibold">200+ companies</span> chose NexaWave.
            </p>

            {/* Benefit list */}
            <div className="space-y-5">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-4 rounded-xl border cursor-default transition-all duration-300"
                  style={{
                    borderColor: hoveredBenefit === i ? "#16A34A" : "#BBF7D0",
                    background: hoveredBenefit === i ? "#DCFCE7" : "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(8px)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s ease-out ${0.3 + i * 0.1}s, transform 0.6s ease-out ${0.3 + i * 0.1}s, border-color 0.3s, background 0.3s`,
                    boxShadow: hoveredBenefit === i ? "0 4px 24px rgba(22,163,74,0.12)" : "none",
                  }}
                  onMouseEnter={() => setHoveredBenefit(i)}
                  onMouseLeave={() => setHoveredBenefit(null)}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-transform duration-300"
                    style={{
                      background: hoveredBenefit === i ? "#16A34A" : "#DCFCE7",
                      transform: hoveredBenefit === i ? "scale(1.1) rotate(-4deg)" : "scale(1)",
                    }}
                  >
                    {b.icon}
                  </div>
                  <div>
                    <div className="font-bold text-[#052E16] mb-1 text-sm tracking-wide">{b.label}</div>
                    <div className="text-[#4B5563] text-sm leading-relaxed">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — Card */}
          <div
            className="transition-all duration-1000 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
              transitionDelay: "0.25s",
            }}
          >
            <div
              className="relative rounded-2xl overflow-hidden border border-[#BBF7D0]"
              style={{
                background: "linear-gradient(145deg, #ffffff 0%, #F0FDF4 60%, #DCFCE7 100%)",
                boxShadow: "0 32px 80px rgba(22,163,74,0.12), 0 4px 16px rgba(5,46,22,0.06)",
              }}
            >
              {/* Card inner glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-30 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #86EFAC 0%, transparent 70%)",
                  filter: "blur(30px)",
                  transform: "translate(30%, -30%)",
                }}
              />

              <div className="relative z-10 p-8">
                {/* Card header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="relative w-3 h-3">
                    <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                    <div
                      className="absolute inset-0 rounded-full bg-[#22C55E] opacity-40"
                      style={{ animation: "ping 1.5s ease-in-out infinite" }}
                    />
                  </div>
                  <span
                    className="text-xs font-bold tracking-[0.2em] uppercase text-[#166534]"
                    style={{ fontFamily: "'Courier New', monospace" }}
                  >
                    Performance Benchmarks
                  </span>
                </div>

                {/* Metric bars */}
                <div className="space-y-6 mb-8">
                  {metrics.map((m, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className="text-sm font-semibold text-[#166534]"
                          style={{ fontFamily: "'Courier New', monospace", fontSize: "0.75rem", letterSpacing: "0.05em" }}
                        >
                          {m.label}
                        </span>
                        <span className="text-sm font-bold text-[#052E16]">{m.value}</span>
                      </div>
                      <AnimatedBar value={m.value} color={m.color} delay={300 + i * 120} trigger={visible} />
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-[#BBF7D0] to-transparent mb-8" />

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { num: 40, suffix: "%", label: "Faster Delivery" },
                    { num: 3, suffix: "×", label: "Avg. Traffic Lift" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="relative text-center p-5 rounded-xl border border-[#BBF7D0] overflow-hidden"
                      style={{ background: "rgba(240,253,244,0.8)" }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: "linear-gradient(135deg, #DCFCE7, transparent)" }}
                      />
                      <div
                        className="text-4xl font-black text-[#16A34A] mb-1 leading-none"
                        style={{ letterSpacing: "-0.04em" }}
                      >
                        <CountUp target={s.num} trigger={visible} suffix={s.suffix} />
                      </div>
                      <div
                        className="text-xs text-[#166534] font-semibold tracking-widest uppercase"
                        style={{ fontFamily: "'Courier New', monospace" }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom badge */}
                <div
                  className="mt-6 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#BBF7D0]"
                  style={{ background: "linear-gradient(90deg, #DCFCE7, #F0FDF4, #DCFCE7)" }}
                >
                  <svg className="w-4 h-4 text-[#16A34A]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs font-bold text-[#166534] tracking-widest uppercase" style={{ fontFamily: "'Courier New', monospace" }}>
                    200+ Companies Trust NexaWave
                  </span>
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl border border-[#BBF7D0] opacity-50"
              style={{ background: "#DCFCE7", transform: "rotate(12deg)" }}
            />
            <div
              className="absolute -top-4 -left-4 w-16 h-16 rounded-xl border border-[#4ADE80] opacity-30"
              style={{ background: "#F0FDF4", transform: "rotate(-8deg)" }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}