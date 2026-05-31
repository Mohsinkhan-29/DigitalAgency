import React, { useState, useEffect, useRef } from "react";

const services = [
  {
    id: "01",
    icon: "🌐",
    name: "Web Development",
    desc: "We engineer high-performance websites and web applications built with React, Next.js, and modern backend stacks — optimised for speed, SEO, and conversions from day one.",
    features: [
      "Custom React / Next.js frontend development",
      "RESTful API & GraphQL backend systems",
      "CMS integration (Sanity, Contentful, WordPress)",
      "Core Web Vitals & performance optimisation",
      "Accessibility (WCAG 2.1 AA) compliance",
    ],
    link: "Explore Web Dev",
  },
  {
    id: "02",
    icon: "📣",
    name: "Digital Marketing & SEO",
    desc: "Data-led SEO, PPC, and social campaigns that build sustainable pipelines. We connect your brand to the right audiences with measurable ROI at every touchpoint.",
    features: [
      "Technical & on-page SEO audits",
      "Google Ads & Meta Ads management",
      "Content strategy & copywriting",
      "Monthly analytics & ROI reporting",
      "Email marketing automation",
    ],
    link: "Explore Marketing",
  },
  {
    id: "03",
    icon: "📱",
    name: "Mobile App Development",
    desc: "Cross-platform iOS & Android apps with a native feel. From MVP to enterprise-scale — we ship products users love, with performance baked in from the first commit.",
    features: [
      "React Native & Flutter development",
      "App Store & Play Store deployment",
      "Push notifications & offline support",
      "Backend API & Firebase integration",
    ],
    link: "Explore Mobile",
  },
  {
    id: "04",
    icon: "☁️",
    name: "Cloud & DevOps",
    desc: "Scalable infrastructure on AWS, GCP, and Azure. We set up CI/CD pipelines, containerised deployments, and auto-scaling architecture so you never go down under load.",
    features: [
      "AWS / GCP / Azure architecture design",
      "Docker & Kubernetes orchestration",
      "CI/CD pipeline setup (GitHub Actions)",
      "Infrastructure as Code (Terraform)",
    ],
    link: "Explore Cloud",
  },
];

const designSteps = [
  { n: "1", label: "Discover — Research & Empathise" },
  { n: "2", label: "Define — Problem Framing" },
  { n: "3", label: "Design — Wireframe to Prototype" },
  { n: "4", label: "Deliver — Handoff & Iterate" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function ServiceCard({ service, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group flex flex-col bg-white rounded-3xl border border-[#BBF7D0] p-8 overflow-hidden cursor-pointer"
      style={{
        transition: "transform 0.5s cubic-bezier(.22,1,.36,1), box-shadow 0.5s cubic-bezier(.22,1,.36,1), opacity 0.7s ease, translate 0s",
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered ? "translateY(-8px) scale(1.015)" : "translateY(0) scale(1)"
          : `translateY(48px)`,
        transitionDelay: inView ? `${index * 100}ms` : "0ms",
        boxShadow: hovered
          ? "0 24px 60px -10px rgba(22,163,74,0.18), 0 4px 16px rgba(22,163,74,0.08)"
          : "0 2px 12px rgba(22,163,74,0.06)",
      }}
    >
      {/* Animated gradient orb on hover */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #4ADE8040 0%, transparent 70%)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1.2)" : "scale(0.8)",
        }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{
            background: hovered ? "#16A34A" : "#DCFCE7",
            transition: "background 0.4s ease, transform 0.4s ease",
            transform: hovered ? "rotate(-6deg) scale(1.1)" : "rotate(0deg) scale(1)",
          }}
        >
          {service.icon}
        </div>
        <span
          className="font-black text-5xl leading-none select-none"
          style={{
            color: hovered ? "#BBF7D0" : "#DCFCE7",
            fontFamily: "'Georgia', serif",
            transition: "color 0.4s ease",
          }}
        >
          {service.id}
        </span>
      </div>

      {/* Name */}
      <h3
        className="text-xl font-bold mb-3 leading-tight"
        style={{ color: "#052E16", fontFamily: "'Georgia', serif" }}
      >
        {service.name}
      </h3>

      {/* Desc */}
      <p className="text-sm leading-relaxed mb-5" style={{ color: "#4B5563" }}>
        {service.desc}
      </p>

      {/* Features */}
      <ul className="flex flex-col gap-2 mb-7 flex-1">
        {service.features.map((f, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm"
            style={{
              color: "#166534",
              transition: `transform 0.4s ease ${i * 40}ms, opacity 0.4s ease ${i * 40}ms`,
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              opacity: inView ? 1 : 0,
            }}
          >
            <span
              className="mt-1 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[10px]"
              style={{ background: "#DCFCE7", color: "#16A34A" }}
            >
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* Link */}
      <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#16A34A" }}>
        <span>{service.link}</span>
        <span
          style={{
            display: "inline-block",
            transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
            transform: hovered ? "translateX(6px)" : "translateX(0)",
          }}
        >
          →
        </span>
      </div>

      {/* Bottom animated bar */}
      <div
        className="absolute bottom-0 left-0 h-[3px] rounded-b-3xl"
        style={{
          background: "linear-gradient(90deg, #16A34A, #4ADE80)",
          width: hovered ? "100%" : "0%",
          transition: "width 0.5s cubic-bezier(.22,1,.36,1)",
        }}
      />
    </div>
  );
}

function WideCard() {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div
      ref={ref}
      className="col-span-1 md:col-span-2 relative bg-white rounded-3xl border border-[#BBF7D0] p-8 overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(48px)",
        transition: "opacity 0.7s ease 0.3s, transform 0.7s cubic-bezier(.22,1,.36,1) 0.3s, box-shadow 0.4s ease",
        boxShadow: "0 2px 12px rgba(22,163,74,0.06)",
      }}
    >
      {/* Mesh background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse at 80% 20%, #4ADE8018 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, #16A34A10 0%, transparent 50%)`,
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left */}
        <div>
          <div className="flex items-start justify-between mb-5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: "#DCFCE7" }}
            >
              🎨
            </div>
            <span
              className="font-black text-5xl leading-none select-none"
              style={{ color: "#DCFCE7", fontFamily: "'Georgia', serif" }}
            >
              05
            </span>
          </div>

          <h3
            className="text-2xl font-bold mb-3"
            style={{ color: "#052E16", fontFamily: "'Georgia', serif" }}
          >
            UI/UX Design
          </h3>

          <p className="text-sm leading-relaxed mb-5" style={{ color: "#4B5563" }}>
            Research-backed design that converts. We go from user interviews to Figma prototypes to handoff-ready design systems — bridging the gap between what looks good and what works.
          </p>

          <ul className="flex flex-col gap-2 mb-7">
            {[
              "User research & journey mapping",
              "Wireframing & interactive prototyping",
              "Full design system creation",
              "Dev-ready Figma handoff",
            ].map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#166534" }}>
                <span
                  className="mt-1 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[10px]"
                  style={{ background: "#DCFCE7", color: "#16A34A" }}
                >
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#16A34A" }}>
            <span>Explore Design</span>
            <span>→</span>
          </div>
        </div>

        {/* Right: Design Process */}
        <div
          className="rounded-2xl p-6 border border-[#BBF7D0]"
          style={{ background: "#F0FDF4" }}
        >
          <div
            className="text-xs font-bold uppercase tracking-widest mb-5"
            style={{ color: "#4B5563" }}
          >
            Our Design Process
          </div>

          <div className="flex flex-col gap-3">
            {designSteps.map((step, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
                className="flex items-center gap-3 p-4 rounded-2xl border cursor-default"
                style={{
                  background: activeStep === i ? "#16A34A" : "white",
                  borderColor: activeStep === i ? "#16A34A" : "#BBF7D0",
                  transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
                  transform: activeStep === i ? "translateX(6px)" : "translateX(0)",
                  opacity: inView ? 1 : 0,
                  transitionDelay: `${0.4 + i * 0.1}s`,
                }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                  style={{
                    background: activeStep === i ? "rgba(255,255,255,0.2)" : "#DCFCE7",
                    color: activeStep === i ? "white" : "#16A34A",
                    transition: "all 0.3s ease",
                  }}
                >
                  {step.n}
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: activeStep === i ? "white" : "#052E16",
                    transition: "color 0.3s ease",
                  }}
                >
                  {step.label}
                </span>

                {/* Connector line */}
                {i < designSteps.length - 1 && (
                  <div className="hidden" />
                )}
              </div>
            ))}
          </div>

          {/* Animated progress line */}
          <div className="mt-5 h-1.5 rounded-full overflow-hidden" style={{ background: "#DCFCE7" }}>
            <div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #16A34A, #4ADE80)",
                width: inView ? "100%" : "0%",
                transition: "width 1.8s cubic-bezier(.22,1,.36,1) 0.8s",
              }}
            />
          </div>
          <div className="mt-2 text-xs text-right font-medium" style={{ color: "#16A34A" }}>
            End-to-end coverage
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingOrb({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        ...style,
        animation: "floatOrb 8s ease-in-out infinite alternate",
      }}
    />
  );
}

export default function ServiceMain() {
  const [headerRef, headerInView] = useInView(0.2);

  return (
    <section
      className="relative min-h-screen py-24 px-4 overflow-hidden"
      style={{ background: "#F0FDF4" }}
    >
      <style>{`
        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20px, -30px) scale(1.08); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes tagSlide {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes titleReveal {
          from { opacity: 0; transform: translateY(24px) skewY(1deg); }
          to { opacity: 1; transform: translateY(0) skewY(0deg); }
        }
      `}</style>

      {/* Background orbs */}
      <FloatingOrb
        style={{
          width: 480,
          height: 480,
          top: "-120px",
          right: "-80px",
          background: "radial-gradient(circle, #4ADE8022 0%, transparent 70%)",
          animationDelay: "0s",
        }}
      />
      <FloatingOrb
        style={{
          width: 320,
          height: 320,
          bottom: "80px",
          left: "-60px",
          background: "radial-gradient(circle, #16A34A18 0%, transparent 70%)",
          animationDelay: "3s",
        }}
      />

      {/* Rotating ring decoration */}
      <div
        className="absolute top-20 left-20 w-32 h-32 rounded-full border-2 opacity-20 pointer-events-none"
        style={{
          borderColor: "#16A34A",
          borderStyle: "dashed",
          animation: "spinSlow 20s linear infinite",
        }}
      />
      <div
        className="absolute bottom-32 right-24 w-20 h-20 rounded-full border opacity-15 pointer-events-none"
        style={{
          borderColor: "#4ADE80",
          borderStyle: "dashed",
          animation: "spinSlow 14s linear infinite reverse",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border"
            style={{
              background: "#DCFCE7",
              color: "#16A34A",
              borderColor: "#BBF7D0",
              animation: headerInView ? "tagSlide 0.6s cubic-bezier(.22,1,.36,1) both" : "none",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: "#16A34A",
                animation: "pulseGlow 2s ease-in-out infinite",
              }}
            />
            Our Services
          </div>

          <h2
            className="text-4xl md:text-6xl font-black leading-tight"
            style={{
              color: "#052E16",
              fontFamily: "'Georgia', serif",
              animation: headerInView ? "titleReveal 0.8s cubic-bezier(.22,1,.36,1) 0.15s both" : "none",
            }}
          >
            Everything You Need
            <br />
            <span
              className="relative inline-block"
              style={{ color: "#16A34A" }}
            >
              Under One Roof
              <span
                className="absolute -bottom-1 left-0 h-1 rounded-full w-full"
                style={{
                  background: "linear-gradient(90deg, #16A34A, #4ADE80)",
                  transform: headerInView ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 1s cubic-bezier(.22,1,.36,1) 0.6s",
                }}
              />
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
          <WideCard />
        </div>
      </div>
    </section>
  );
}
