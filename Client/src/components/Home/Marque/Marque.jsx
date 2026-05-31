import React from "react";

const clients = [
  "Unilever",
  "Nestlé Pakistan",
  "Samsung",
  "Habib Bank",
  "Daraz",
  "Telenor",
  "Jazz",
  "Gul Ahmed",
  "Engro Corp",
  "Servis",
];

export default function Marque() {
  return (
    <section
      id="clients"
      className="relative overflow-hidden border-y border-[#1E293B] bg-[#0B0F19] py-10"
    >
      {/* Top Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-[#22C55E]/40 blur-sm" />

      <div className="mb-8 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#1E293B] bg-[#121826] px-5 py-2 text-sm font-medium tracking-wide text-[#94A3B8] shadow-[0_0_20px_rgba(0,0,0,0.25)]">
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
          Trusted by leading companies
        </p>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Fade Left */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#0B0F19] to-transparent" />

        {/* Fade Right */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#0B0F19] to-transparent" />

        <div className="animate-marquee flex w-max items-center gap-6 whitespace-nowrap">
          {[...clients, ...clients].map((client, index) => (
            <React.Fragment key={index}>
              <span
                className="
                  text-lg 
                  font-semibold 
                  tracking-wide 
                  text-[#F8FAFC]
                  transition-all 
                  duration-300
                  hover:text-[#4ADE80]
                  hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]
                "
              >
                {client}
              </span>

              <span className="h-2 w-2 rounded-full bg-[#22C55E]/70 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Tailwind Custom Animation */}
      <style jsx>{`
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}