import React, { useState, useEffect, useRef } from "react";

const stats = [
  {
    icon: "📦",
    target: 200,
    suffix: "+",
    label: "Projects Successfully\nDelivered",
    accent: "#4ADE80",
    ringOffset: 0,
  },
  {
    icon: "🌎",
    target: 30,
    suffix: "+",
    label: "Countries Served\nWorldwide",
    accent: "#86EFAC",
    ringOffset: 15,
  },
  {
    icon: "👥",
    target: 60,
    suffix: "",
    label: "Team Members Across\n4 Time Zones",
    accent: "#4ADE80",
    ringOffset: 30,
  },
  {
    icon: "⭐",
    target: 98,
    suffix: "%",
    label: "Client Satisfaction\nRate",
    accent: "#86EFAC",
    ringOffset: 45,
  },
];

function useCountUp(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return count;
}

function RingProgress({ progress, accent, size = 120, stroke = 5 }) {
  const radius = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className="absolute inset-0 -rotate-90"
      style={{ filter: `drop-shadow(0 0 6px ${accent}66)` }}
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#BBF7D0"
        strokeWidth={stroke}
      />
      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={accent}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </svg>
  );
}

function StatCard({ stat, index, started }) {
  const count = useCountUp(stat.target, 1800, started);
  const progress = started ? (count / stat.target) * 100 : 0;
  const [hovered, setHovered] = useState(false);

  const lines = stat.label.split("\n");

  return (
    <div
      className="group relative"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ background: `linear-gradient(135deg, #16A34A22, #4ADE8033)` }}
      />

      <div className="relative bg-white border border-[#BBF7D0] rounded-2xl p-8 flex flex-col items-center text-center overflow-hidden transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_24px_64px_-12px_rgba(22,163,74,0.15)]">

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(225deg, ${stat.accent}18, transparent)` }}
        />

        {/* Ring + Icon */}
        <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
          <RingProgress progress={progress} accent={stat.accent} size={112} stroke={4} />

          {/* Icon circle */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, #DCFCE7, #F0FDF4)`,
              boxShadow: hovered ? `0 0 20px ${stat.accent}44` : "none",
            }}
          >
            {stat.icon}
          </div>
        </div>

        {/* Number */}
        <div
          className="text-5xl font-black leading-none mb-3 tabular-nums"
          style={{
            fontFamily: "'Georgia', serif",
            letterSpacing: "-2px",
            color: "#052E16",
          }}
        >
          {count}
          <span style={{ color: stat.accent }}>{stat.suffix}</span>
        </div>

        {/* Divider */}
        <div
          className="w-8 h-0.5 rounded-full mb-3 transition-all duration-500 group-hover:w-16"
          style={{ background: `linear-gradient(90deg, #16A34A, ${stat.accent})` }}
        />

        {/* Label */}
        <div className="text-[#166534] text-sm font-medium leading-snug">
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </div>

        {/* Bottom sweep line */}
        <div
          className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700"
          style={{ background: `linear-gradient(90deg, #16A34A, ${stat.accent})` }}
        />
      </div>
    </div>
  );
}

export default function AboutStats() {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F0FDF4] py-24 px-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 opacity-30 blur-3xl pointer-events-none rounded-full" style={{ background: "radial-gradient(ellipse, #4ADE8033, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-72 h-72 opacity-15 blur-3xl pointer-events-none rounded-full" style={{ background: "radial-gradient(circle, #16A34A44, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-72 h-72 opacity-15 blur-3xl pointer-events-none rounded-full" style={{ background: "radial-gradient(circle, #4ADE8033, transparent 70%)" }} />

      <div className="max-w-5xl mx-auto relative">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#16A34A]" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#16A34A]">
              By the Numbers
            </span>
            <div className="h-px w-8 bg-[#16A34A]" />
          </div>

          <h2
            className="text-4xl sm:text-5xl font-black text-[#052E16] leading-none"
            style={{ fontFamily: "'Georgia', serif", letterSpacing: "-1.5px" }}
          >
            Impact at a{" "}
            <span className="relative inline-block">
              Glance
              <span
                className="absolute bottom-1 left-0 right-0 h-1 rounded-full"
                style={{ background: "linear-gradient(90deg, #16A34A, #4ADE80)" }}
              />
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}