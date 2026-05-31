import React, { useState, useRef, useEffect } from "react";

const PLANS = [
  {
    tier: "Starter",
    price: "1,299",
    period: "per month, billed annually",
    featured: false,
    features: [
      { text: "Up to 10 VMs managed", on: true },
      { text: "Basic Azure setup", on: true },
      { text: "CI/CD pipeline (1 project)", on: true },
      { text: "8×5 support", on: true },
      { text: "Multi-region deployment", on: false },
      { text: "Dedicated cloud architect", on: false },
    ],
    cta: "Get Started →",
    ctaStyle: "outline",
  },
  {
    tier: "Business",
    price: "3,499",
    period: "per month, billed annually",
    featured: true,
    badge: "Most Popular",
    features: [
      { text: "Up to 50 VMs managed", on: true },
      { text: "Full Azure infrastructure", on: true },
      { text: "Unlimited CI/CD pipelines", on: true },
      { text: "24×7 priority support", on: true },
      { text: "Multi-region deployment", on: true },
      { text: "Dedicated cloud architect", on: false },
    ],
    cta: "Get Started →",
    ctaStyle: "solid",
  },
  {
    tier: "Enterprise",
    price: null,
    customLabel: "Custom",
    period: "tailored to your scale",
    featured: false,
    features: [
      { text: "Unlimited VM fleet", on: true },
      { text: "Custom architecture design", on: true },
      { text: "Unlimited CI/CD pipelines", on: true },
      { text: "24×7 SLA-backed support", on: true },
      { text: "Multi-region + DR", on: true },
      { text: "Dedicated cloud architect", on: true },
    ],
    cta: "Contact Sales →",
    ctaStyle: "outline",
  },
];

function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function PlanCard({ plan, index, visible, setModalOpen }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const isActive = hovered || pressed;

  return (
    <div
      className="relative flex flex-col w-full"
      style={{
        padding: "clamp(20px, 4vw, 32px)",
        borderRadius: "18px",
        background: plan.featured ? "#121826" : "#0B0F19",
        border: `1px solid ${
          plan.featured
            ? isActive ? "#4ADE80" : "#1E293B"
            : isActive ? "#22C55E" : "#1E293B"
        }`,
        transform: visible
          ? plan.featured
            ? isActive ? "scale(1.04) translateY(-6px)" : "scale(1.03)"
            : isActive ? "translateY(-6px)" : "translateY(0)"
          : "translateY(32px)",
        opacity: visible ? 1 : 0,
        transition: `all 0.5s cubic-bezier(0.34,1.1,0.64,1) ${index * 100}ms`,
        boxShadow: isActive
          ? plan.featured
            ? `0 0 0 1px #4ADE80, 0 0 40px rgba(34,197,94,0.25), 0 20px 48px rgba(0,0,0,0.35)`
            : `0 0 0 1px #22C55E55, 0 0 24px rgba(34,197,94,0.18), 0 16px 40px rgba(0,0,0,0.3)`
          : plan.featured
            ? `0 0 0 1px #1E293B, 0 20px 48px rgba(0,0,0,0.25)`
            : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <div className="relative flex flex-col flex-1">

        {plan.badge && (
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full"
            style={{
              background: isActive
                ? "linear-gradient(90deg, #22C55E 0%, #4ADE80 100%)"
                : "#1E293B",
              color: "#F8FAFC",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {plan.badge}
          </div>
        )}

        <div className="text-xs font-semibold uppercase mb-2.5" style={{ color: "#94A3B8" }}>
          {plan.tier}
        </div>

        <div
          className="font-black text-white mb-1"
          style={{ fontSize: "clamp(32px,4vw,46px)" }}
        >
          {plan.price ? (
            <>
              <sup style={{ fontSize: "18px" }}>$</sup>
              {plan.price}
            </>
          ) : (
            plan.customLabel
          )}
        </div>

        <div className="text-xs mb-5" style={{ color: "#94A3B8" }}>
          {plan.period}
        </div>

        <div
          className="mb-5"
          style={{
            height: "1px",
            background: "#1E293B",
          }}
        />

        <ul className="flex flex-col gap-2.5 mb-8 flex-1 list-none m-0 p-0">
          {plan.features.map((f, i) => (
            <li
              key={i}
              className="flex items-center gap-2.5 text-sm"
              style={{
                color: f.on ? "#94A3B8" : "#475569",
              }}
            >
              <span style={{ color: f.on ? "#4ADE80" : "#64748B" }}>
                {f.on ? "✓" : "–"}
              </span>
              {f.text}
            </li>
          ))}
        </ul>

        <button
          className="w-full py-3 rounded-lg text-sm font-semibold"
          style={{
            background: plan.ctaStyle === "solid"
              ? "#22C55E"
              : "transparent",
            border: plan.ctaStyle === "solid"
              ? "none"
              : "1px solid #1E293B",
            color: plan.ctaStyle === "solid" ? "#0B0F19" : "#F8FAFC",
          }}
          onClick={() => setModalOpen(true)}
        >
          {plan.cta}
        </button>
      </div>
    </div>
  );
}

export default function ServicePrice() {
  const sectionRef = useRef(null);
  const visible = useInView(sectionRef, 0.1);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      style={{
        background: "#0B0F19",
        padding: "clamp(60px, 8vw, 100px) clamp(16px, 6vw, 80px)",
      }}
    >
      <div className="text-center mb-10 sm:mb-14">
        <h2 style={{ color: "#F8FAFC", fontWeight: 800 }}>
          Choose Your <span style={{ color: "#22C55E" }}>Cloud Plan</span>
        </h2>
        <p style={{ color: "#94A3B8" }}>
          No hidden fees. Scale up or down anytime.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "18px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {PLANS.map((plan, i) => (
          <PlanCard
            key={i}
            plan={plan}
            index={i}
            visible={visible}
            setModalOpen={setModalOpen}
          />
        ))}
      </div>
    </section>
  );
}