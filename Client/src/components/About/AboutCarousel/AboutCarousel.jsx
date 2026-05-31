import React from "react";

const topRow = [
  "Remote-First Culture",
  "Async by Default",
  "Continuous Learning",
  "Data Over Opinion",
  "Client Success = Our Success",
  "Radical Transparency",
  "Deep Work Environment",
  "Build With Purpose",
];

const bottomRow = [
  "Code Reviews with Kindness",
  "Design Thinking",
  "Open Source Contributors",
  "Always Be Shipping",
  "Flat Hierarchy",
  "Psychological Safety",
  "Ownership Mentality",
  "High Trust Team",
];

function Pill({ text }) {
  return (
    <div className="group flex items-center gap-4 rounded-full border border-[#1E293B] bg-[#121826]/80 px-8 py-5 backdrop-blur-md transition-all duration-300 hover:border-[#4ADE80] hover:bg-[#0F172A] hover:shadow-[0_0_30px_rgba(74,222,128,0.18)]">
      {/* Dot */}
      <div className="h-3 w-3 rounded-full bg-[#22C55E] shadow-[0_0_14px_rgba(34,197,94,0.8)]" />

      {/* Text */}
      <span className="whitespace-nowrap text-xl font-semibold tracking-tight text-[#F8FAFC] transition-colors duration-300 group-hover:text-[#F8FAFC]">
        {text}
      </span>
    </div>
  );
}

export default function AboutCarousel() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] py-28">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22C55E]/5 blur-3xl" />

      {/* Top Gradient Fade */}
      <div className="absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-[#0B0F19] to-transparent" />
      <div className="absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-[#0B0F19] to-transparent" />

      <div className="relative z-10 mb-14 text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-[#4ADE80]">
          Our Culture & Values
        </p>

        <h2 className="text-4xl font-black tracking-tight text-[#F8FAFC] md:text-6xl">
          Built Around{" "}
          <span className="text-[#22C55E]">How Great Teams Work</span>
        </h2>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative flex flex-col gap-8">
        {/* TOP ROW - MOVING LEFT */}
        <div className="relative overflow-hidden">
          <div className="animate-marquee-left flex w-max gap-6">
            {[...topRow, ...topRow].map((item, index) => (
              <Pill key={index} text={item} />
            ))}
          </div>
        </div>

        {/* BOTTOM ROW - MOVING RIGHT */}
        <div className="relative overflow-hidden">
          <div className="animate-marquee-right flex w-max gap-6">
            {[...bottomRow, ...bottomRow].map((item, index) => (
              <Pill key={index} text={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }

        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }
      `}</style>
    </section>
  );
}