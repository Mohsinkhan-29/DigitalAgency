import React from "react";

export default function AboutNext() {
  return (
    <section className="relative w-full min-h-[420px] overflow-hidden flex items-center justify-center bg-[#0B0F19] py-[80px] px-6">
      
      {/* Dot grid background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(34,197,94,0.10)_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Glow orbs */}
      <div className="absolute pointer-events-none rounded-full w-[480px] h-[480px] top-[-160px] right-[-120px] bg-[radial-gradient(circle,rgba(74,222,128,0.10)_0%,transparent_70%)]" />
      <div className="absolute pointer-events-none rounded-full w-[320px] h-[320px] bottom-[-120px] left-[-80px] bg-[radial-gradient(circle,rgba(34,197,94,0.06)_0%,transparent_70%)]" />

      {/* Rings */}
      {[200, 300, 400].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none border border-[#1E293B]"
          style={{
            width: size,
            height: size,
            top: -size / 2,
            right: -size / 2,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[760px] font-poppins">
        
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-[#22C55E]" />
          <span className="uppercase font-semibold tracking-[0.2em] text-[11px] text-[#4ADE80]">
            Join Our Journey
          </span>
          <span className="w-8 h-px bg-[#22C55E]" />
        </div>

        {/* Headline */}
        <h2 className="font-black leading-[1.05] mb-6 text-[#F8FAFC] tracking-[-0.03em] text-5xl">
          Let's Build the Next
          <br />
          Great Thing
          <br />
          Together
        </h2>

        {/* Body */}
        <p className="mb-10 font-light leading-relaxed text-[#94A3B8] max-w-[560px] text-[clamp(0.9rem,1.5vw,1.05rem)]">
          Whether you are a potential client, a talented engineer, or just curious — we would love to hear from you.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">

          {/* Primary */}
          <button
            className="font-bold bg-[#22C55E] text-[#0F172A] rounded-full px-[36px] py-[16px] text-[15px] shadow-[0_0_28px_rgba(34,197,94,0.25)] transition-all duration-200 hover:bg-[#4ADE80] hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(74,222,128,0.4)]"
          >
            Start Your Project
          </button>

          {/* Secondary */}
          <button
            className="font-medium text-[#F8FAFC] border-[1.5px] border-[#1E293B] rounded-full px-[36px] py-[15px] text-[15px] transition-all duration-200 hover:border-[#4ADE80] hover:bg-[#121826] hover:-translate-y-0.5"
          >
            See Our Work
          </button>

        </div>
      </div>
    </section>
  );
}