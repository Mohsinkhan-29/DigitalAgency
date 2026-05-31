import React, { useState, useEffect, useRef, useCallback } from "react";

const ITEMS = [
  { icon: "ti-code",     label: "Frontend",    pct: 95 },
  { icon: "ti-cloud",    label: "Azure Infra",  pct: 92 },
  { icon: "ti-hexagon",  label: "API Layer",    pct: 88 },
  { icon: "ti-database", label: "Database",     pct: 84 },
  { icon: "ti-shield",   label: "Security",     pct: 97 },
];

const AVG = Math.round(ITEMS.reduce((s, i) => s + i.pct, 0) / ITEMS.length);

function BarRow({ icon, label, pct, loaded, visible }) {
  return (
    <div
      className="grid items-center gap-x-3.5 mb-[18px]"
      style={{
        gridTemplateColumns: "22px 120px 1fr 46px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-8px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {/* Icon */}
      <i
        className={`ti ${icon} text-[15px] text-green-400 opacity-85`}
        aria-hidden="true"
      />

      {/* Label */}
      <span
        className="text-[11px] tracking-[0.06em] whitespace-nowrap"
        style={{ color: "#9bfab8", fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </span>

      {/* Bar track */}
      <div
        className="relative h-[5px] rounded-sm overflow-visible"
        style={{ background: "#0f2010", border: "1px solid #1e3a1e" }}
      >
        <div
          className="h-full rounded-sm relative overflow-visible"
          style={{
            width: loaded ? `${pct}%` : "0%",
            background: "#22c55e",
            transition: "width 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Glow dot */}
          <span
            className="absolute right-[-1px] top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full bg-green-400"
            style={{
              opacity: loaded ? 1 : 0,
              boxShadow: "0 0 8px #4ade80aa",
              transition: "opacity 0.3s ease 0.9s",
            }}
          />
        </div>
      </div>

      {/* Percentage */}
      <span
        className="text-[11px] text-right text-green-400 font-semibold tracking-[0.04em]"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {pct}%
      </span>
    </div>
  );
}

export default function AzureStackBuildScore() {
  const [states, setStates] = useState(
    ITEMS.map(() => ({ visible: false, loaded: false }))
  );
  const [showAvg, setShowAvg] = useState(false);
  const loopRef = useRef(null);
  const timersRef = useRef([]);

  const clearAll = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    if (loopRef.current) clearTimeout(loopRef.current);
  }, []);

  const reset = useCallback(() => {
    clearAll();
    setStates(ITEMS.map(() => ({ visible: false, loaded: false })));
    setShowAvg(false);
  }, [clearAll]);

  const animate = useCallback(() => {
    ITEMS.forEach((_, i) => {
      const t1 = setTimeout(() => {
        setStates((prev) => {
          const next = [...prev];
          next[i] = { ...next[i], visible: true };
          return next;
        });
        const t2 = setTimeout(() => {
          setStates((prev) => {
            const next = [...prev];
            next[i] = { ...next[i], loaded: true };
            return next;
          });
        }, 80);
        timersRef.current.push(t2);
      }, 180 + i * 140);
      timersRef.current.push(t1);
    });

    const tAvg = setTimeout(() => setShowAvg(true), 180 + ITEMS.length * 140 + 400);
    timersRef.current.push(tAvg);

    loopRef.current = setTimeout(() => {
      setStates(ITEMS.map((_, i) => ({ visible: true, loaded: false })));
      setShowAvg(false);
      setTimeout(animate, 500);
    }, 4200);
  }, []);

  useEffect(() => {
    animate();
    return clearAll;
  }, [animate, clearAll]);

  const handleReplay = () => {
    reset();
    setTimeout(animate, 120);
  };

  return (
    <>
      {/* Load JetBrains Mono & Tabler Icons */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap"
      />

      <div className="py-6">
        {/* Laptop frame */}
        <div
          className="relative max-w-[640px] mx-auto rounded-[14px] px-10 py-8 overflow-hidden"
          style={{
            background: "#0d1117",
            border: "1.5px solid #1e3a1e",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {/* Grid bg */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-[2px] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(74,222,128,0.18) 30%, rgba(74,222,128,0.35) 50%, rgba(74,222,128,0.18) 70%, transparent 100%)",
              animation: "scanMove 3.5s cubic-bezier(0.45,0,0.55,1) infinite",
            }}
          />

          {/* Corner decorations */}
          {[
            "top-[10px] left-[10px] border-t-[1.5px] border-l-[1.5px]",
            "top-[10px] right-[10px] border-t-[1.5px] border-r-[1.5px]",
            "bottom-[10px] left-[10px] border-b-[1.5px] border-l-[1.5px]",
            "bottom-[10px] right-[10px] border-b-[1.5px] border-r-[1.5px]",
          ].map((cls, i) => (
            <span
              key={i}
              className={`absolute w-3 h-3 border-green-400 opacity-50 ${cls}`}
            />
          ))}

          {/* Webcam */}
          <div className="relative w-[7px] h-[7px] rounded-full mx-auto mb-5 z-10" style={{ background: "#1e3a1e" }}>
            <span
              className="absolute inset-[2px] rounded-full"
              style={{
                background: "#4ade8033",
                animation: "blink 2.8s ease-in-out infinite",
              }}
            />
          </div>

          {/* Title */}
          <div className="flex items-center gap-2.5 mb-6 relative z-10">
            <span
              className="text-[10px] tracking-[0.18em] text-green-400 font-semibold"
            >
              AZURE STACK — BUILD SCORE
            </span>
            <span
              className="text-[9px] tracking-[0.1em] text-green-500"
              style={{ animation: "pulse 1.4s ease-in-out infinite" }}
            >
              ● LIVE
            </span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #4ade8044, transparent)" }} />
          </div>

          {/* Rows */}
          <div className="relative z-10">
            {ITEMS.map((item, i) => (
              <BarRow
                key={item.label}
                icon={item.icon}
                label={item.label}
                pct={item.pct}
                visible={states[i].visible}
                loaded={states[i].loaded}
              />
            ))}
          </div>

          {/* Footer */}
          <div
            className="flex justify-between items-center mt-5 pt-4 relative z-10"
            style={{ borderTop: "1px solid #1e3a1e" }}
          >
            <div
              className="text-[10px] tracking-[0.1em]"
              style={{ color: "#4ade8077", fontFamily: "'JetBrains Mono', monospace" }}
            >
              AVG SCORE{" "}
              <span
                className="text-green-400 font-semibold"
                style={{ fontSize: "16px", letterSpacing: 0 }}
              >
                {showAvg ? `${AVG}%` : "—"}
              </span>
            </div>
            <button
              onClick={handleReplay}
              className="text-[10px] tracking-[0.08em] bg-transparent rounded-sm px-2.5 py-1 cursor-pointer transition-colors"
              style={{
                color: "#4ade8066",
                border: "1px solid #1e3a1e",
                fontFamily: "'JetBrains Mono', monospace",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#4ade80";
                e.target.style.borderColor = "#4ade8055";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#4ade8066";
                e.target.style.borderColor = "#1e3a1e";
              }}
            >
              ↺ REPLAY
            </button>
          </div>
        </div>

        {/* Laptop base */}
        <div
          className="max-w-[640px] mx-auto h-[14px] flex items-center justify-center rounded-b-[14px]"
          style={{ background: "#0a0f0a", border: "1.5px solid #1e3a1e", borderTop: "none" }}
        >
          <div className="w-12 h-[5px] rounded-b-[5px]" style={{ background: "#1e3a1e" }} />
        </div>
      </div>

      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes scanMove {
          0%   { top: 5%;  opacity: 0; }
          6%   { opacity: 1; }
          88%  { opacity: 0.6; }
          100% { top: 94%; opacity: 0; }
        }
        @keyframes blink {
          0%, 90%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}