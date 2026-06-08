import React from "react";

export default function HomeNext() {
  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        background: "#0B0F19",
        minHeight: "420px",
        padding: "80px 24px",
      }}
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(34,197,94,0.10) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 480,
          height: 480,
          top: "-160px",
          right: "-120px",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 320,
          height: 320,
          bottom: "-120px",
          left: "-80px",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Rings */}
      {[200, 300, 400].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size,
            height: size,
            top: -size / 2,
            right: -size / 2,
            border: "1px solid rgba(34,197,94,0.06)",
          }}
        />
      ))}

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ maxWidth: 760 }}
      >
        {/* Eyebrow */}
        <div data-aos="fade-up" className="flex items-center gap-3 mb-5">
          <span style={{ width: 32, height: 1, background: "#22C55E" }} />
          <span
            className="uppercase font-semibold tracking-widest"
            style={{
              fontSize: 11,
              color: "#22C55E",
              letterSpacing: "0.2em",
            }}
          >
            Your Project Next
          </span>
          <span style={{ width: 32, height: 1, background: "#22C55E" }} />
        </div>

        {/* Headline */}
        <h2 data-aos="fade-up"
          className="font-black leading-none mb-6"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.8rem, 7vw, 5.2rem)",
            color: "#F8FAFC",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          Ready to Join This
          <br />
          Portfolio?
        </h2>

        {/* Body */}
        <p
          data-aos="fade-up"
          className="mb-10 font-light leading-relaxed"
          style={{
            fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
            color: "#94A3B8",
            maxWidth: 560,
          }}
        >
          Every project here started with a single conversation. Let's have
          yours — no pitch, no pressure, just an honest chat about what you
          want to build.
        </p>

        {/* Buttons */}
        <div data-aos="fade-up" className="flex flex-wrap items-center justify-center gap-4">
          {/* Primary */}
          <a
            href="#/Contact">
            <button
              className="font-bold transition-all duration-200"
              style={{
                background: "#22C55E",
                color: "#0F172A",
                borderRadius: 100,
                padding: "16px 36px",
                fontSize: 15,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
                boxShadow: "0 0 28px rgba(34,197,94,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#4ADE80";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(34,197,94,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#22C55E";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 0 28px rgba(34,197,94,0.25)";
              }}
            >
              Start Your Project
            </button></a>


          {/* Secondary */}
          <a
            href="#/Services"><button
              className="font-medium transition-all duration-200"
              style={{
                background: "transparent",
                color: "#F8FAFC",
                border: "1.5px solid #1E293B",
                borderRadius: 100,
                padding: "15px 36px",
                fontSize: 15,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#22C55E";
                e.currentTarget.style.background = "#121826";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1E293B";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Explore Services
            </button></a>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
      `}</style>
    </section>
  );
}