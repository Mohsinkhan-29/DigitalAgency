import React, { useEffect, useState } from "react";
import Map from "../../../assets/pngwing.com.png";

const offices = [
  {
    id: "sf",
    city: "San Francisco",
    country: "USA",
    address: "340 Pine Street, Suite 800",
    timezone: "PST (UTC-8)",
    x: 17.5,
    y: 46,
    color: "#22C55E",
  },
  {
    id: "london",
    city: "London",
    country: "UK",
    address: "1 Canada Square, Canary Wharf",
    timezone: "GMT (UTC+0)",
    x: 50,
    y: 35,
    color: "#4ADE80",
  },
];

function PulsingDot({ x, y, color, active, onClick }) {
  return (
    <g
      onClick={onClick}
      transform={`translate(${x}, ${y})`}
      className="cursor-pointer"
    >
      {active && (
        <>
          <circle r="10" fill={color} opacity="0.08">
            <animate attributeName="r" values="6;14;6" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.12;0.03;0.12" dur="2.5s" repeatCount="indefinite" />
          </circle>

          <circle r="6" fill={color} opacity="0.16">
            <animate attributeName="r" values="4;10;4" dur="2.5s" repeatCount="indefinite" begin="0.4s" />
            <animate attributeName="opacity" values="0.2;0.06;0.2" dur="2.5s" repeatCount="indefinite" begin="0.4s" />
          </circle>
        </>
      )}

      <circle
        r="4"
        fill={active ? color : "#94A3B8"}
        stroke="#0B0F19"
        strokeWidth="1.5"
        opacity={active ? 1 : 0.55}
      />

      <circle r="1.5" fill={active ? "#F8FAFC" : "#94A3B8"} />
    </g>
  );
}

export default function LocationMap() {
  const [activeOffice, setActiveOffice] = useState(offices[0]);
  const [cardVisible, setCardVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(timer);
  }, []);

  const selectOffice = (office) => {
    if (office.id === activeOffice?.id) return;

    setCardVisible(false);

    setTimeout(() => {
      setActiveOffice(office);
      setCardVisible(true);
    }, 220);
  };

  const pos = activeOffice
    ? { x: activeOffice.x, y: activeOffice.y }
    : { x: 50, y: 40 };

  const cardX = pos.x > 55 ? pos.x - 24 : pos.x + 2;
  const cardY = Math.max(pos.y - 34, 5);

  return (
    <div
      className="relative min-h-[420px] sm:min-h-[480px] w-full overflow-hidden font-sans"
      style={{ background: "#0B0F19" }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@700;800;900&display=swap');

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes cardIn {
            from { opacity: 0; transform: translateY(-8px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }

          .fade-up { animation: fadeUp 0.5s ease-out both; }
          .card-in { animation: cardIn 0.22s ease-out both; }
        `}
      </style>

      {/* Map */}
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-[0.13]"
        style={{
          backgroundImage: `url(${Map})`,
          filter: "brightness(1.2) contrast(0.75)",
        }}
      />

      {/* Glow */}
      <div
        className="pointer-events-none absolute h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle, ${activeOffice?.color}18, transparent 68%)`,
          left: `${pos.x}%`,
          top: `${pos.y}%`,
        }}
      />

      {/* Dots */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {offices.map((office) => (
          <PulsingDot
            key={office.id}
            x={office.x}
            y={office.y}
            color={office.color}
            active={activeOffice?.id === office.id}
            onClick={() => selectOffice(office)}
          />
        ))}
      </svg>

      {/* Card */}
      {activeOffice && (
        <div
          className={`${cardVisible ? "card-in" : ""} absolute z-10 w-[200px] sm:w-[220px]`}
          style={{
            left: `${cardX}%`,
            top: `${cardY}%`,
          }}
        >
          <div
            className="rounded-[18px] p-4 shadow-2xl backdrop-blur-sm"
            style={{
              background: "#121826",
              border: `1px solid #1E293B`,
              boxShadow: `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(34,197,94,0.08)`,
            }}
          >
            {/* Header */}
            <div className="mb-3 flex items-start gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: "#0F172A",
                  border: "1px solid #1E293B",
                }}
              >
                <svg width="16" height="16" fill="#22C55E" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <div>
                <p className="font-['Outfit'] text-sm font-bold" style={{ color: "#F8FAFC" }}>
                  {activeOffice.city}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed" style={{ color: "#94A3B8" }}>
                  {activeOffice.address}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                style={{
                  background: "#0F172A",
                  border: "1px solid #1E293B",
                  color: "#4ADE80",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ background: "#22C55E" }}
                />
                Open for Projects
              </div>

              <span className="text-[10px]" style={{ color: "#94A3B8" }}>
                {activeOffice.timezone}
              </span>
            </div>
          </div>

          {/* Arrow */}
          <div
            className="absolute bottom-[-6px] h-3 w-3 rotate-45"
            style={{
              background: "#121826",
              border: "1px solid #1E293B",
              borderTop: "none",
              borderLeft: "none",
              left: pos.x > 55 ? "180px" : "20px",
            }}
          />
        </div>
      )}

      {/* Bottom Nav */}
      <div className={`absolute bottom-0 left-0 right-0 flex justify-center p-4 ${mounted ? "fade-up" : ""}`}>
        <div
          className="flex items-center gap-1 rounded-2xl border p-1.5 backdrop-blur-xl"
          style={{
            background: "#121826",
            borderColor: "#1E293B",
          }}
        >
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs"
            style={{ color: "#94A3B8" }}
          >
            Two offices, one team
          </div>

          {offices.map((office) => {
            const isActive = activeOffice?.id === office.id;

            return (
              <button
                key={office.id}
                onClick={() => selectOffice(office)}
                className="rounded-xl px-4 py-2 text-xs transition-all"
                style={{
                  background: isActive ? "#0F172A" : "transparent",
                  border: isActive ? "1px solid #1E293B" : "1px solid transparent",
                  color: isActive ? "#22C55E" : "#94A3B8",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {office.city}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}