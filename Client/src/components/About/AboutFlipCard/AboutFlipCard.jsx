import React, { useState } from "react";

const cards = [
  {
    number: "01",
    icon: "🎯",
    label: "Mission",
    title: "Why We Exist",
    back: "To make world-class digital products accessible to ambitious companies of every size — not just the ones with the biggest budgets.",
    tag: "Our north star since 2018",
  },
  {
    number: "02",
    icon: "🔭",
    label: "Vision",
    title: "Where We're Headed",
    back: "To become the most trusted digital growth partner globally — where every project we touch becomes a category benchmark for quality and results.",
    tag: "The future we are building",
  },
  {
    number: "03",
    icon: "💎",
    label: "Values",
    title: "How We Work",
    back: "Radical transparency, obsessive quality, and genuine partnership. We do not take projects we cannot win. We do not promise what we cannot deliver.",
    tag: "Lived every single day",
  },
];

function FlipCard({ number, icon, label, title, back, tag }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative h-72 cursor-pointer"
      style={{ perspective: "900px" }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      role="button"
      tabIndex={0}
      aria-label={`${label} card — click to flip`}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transitionTimingFunction: "cubic-bezier(0.4,0.2,0.2,1)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-between overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "#121826",
            border: "1px solid #1E293B",
          }}
        >
          {/* Background decorative icon */}
          <span
            className="absolute top-2 right-3 text-7xl pointer-events-none select-none"
            style={{ opacity: 0.06, lineHeight: 1 }}
          >
            {icon}
          </span>

          <span
            className="text-xs font-semibold tracking-widest tabular-nums"
            style={{ color: "#22C55E" }}
          >
            {number}
          </span>

          <div>
            <div className="text-4xl mb-3">{icon}</div>
            <div
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{ color: "#4ADE80" }}
            >
              {label}
            </div>
            <div
              className="text-lg font-semibold leading-snug mb-3"
              style={{ color: "#F8FAFC" }}
            >
              {title}
            </div>
            <div
              className="text-xs flex items-center gap-1"
              style={{ color: "#94A3B8" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                className="flex-shrink-0"
              >
                <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" />
              </svg>
              Hover or tap to reveal
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "#0F172A",
            border: "1px solid #22C55E",
          }}
        >
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "#94A3B8" }}
          >
            {back}
          </p>
          <div
            className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-1"
            style={{
              color: "#22C55E",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.25)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                background: "#4ADE80",
                boxShadow: "0 0 8px #22C55E",
              }}
            />
            {tag}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutFlipCard() {
  return (
    <section
      id="mission"
      className="py-20 px-4"
      style={{ background: "#0B0F19" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1 mb-4"
            style={{
              color: "#22C55E",
              background: "rgba(34,197,94,0.12)",
              border: "1px solid rgba(34,197,94,0.25)",
            }}
          >
            Our Core
          </span>
          <h2
            className="text-3xl font-semibold leading-tight"
            style={{ color: "#F8FAFC" }}
          >
            What We Stand For
          </h2>
          <p className="text-sm mt-2" style={{ color: "#94A3B8" }}>
            Hover each card to reveal what drives us.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cards.map((card) => (
            <FlipCard key={card.number} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}