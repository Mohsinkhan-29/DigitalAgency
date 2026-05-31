import React, { useEffect, useState } from "react";

const stats = [
  {
    value: 42,
    suffix: "M+",
    label: "Revenue generated\nfor clients",
  },
  {
    value: 3.2,
    suffix: "M+",
    label: "End users served\nacross all products",
  },
  {
    value: 99.97,
    suffix: "%",
    label: "Average uptime\nmaintained",
  },
  {
    value: 58,
    suffix: "%",
    label: "Average load time\nimprovement",
  },
  {
    value: 4.8,
    suffix: "★",
    label: "Average app store\nrating",
  },
];

function CountUp({ end, duration = 2000, decimals = 0, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setCount(start);
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function ResultsProject() {
  return (
    <section className="bg-[#F0FDF4] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="flex justify-center mb-8">
          <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-[#16A34A]">
            Collective Results Across All Projects
          </span>
        </div>

        {/* Stats Container */}
        <div className="overflow-hidden rounded-[22px] border border-[#BBF7D0] bg-white shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col items-center justify-center px-6 py-8 text-center ${
                  index !== stats.length - 1
                    ? "border-b sm:border-b-0 lg:border-r border-[#DCFCE7]"
                    : ""
                }`}
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <div className="absolute inset-0 bg-[#86EFAC]/5" />
                </div>

                {/* Number */}
                <h3 className="relative z-10 text-3xl font-black tracking-tight text-[#16A34A] md:text-4xl">
                  {item.value % 1 !== 0 ? (
                    <CountUp
                      end={item.value}
                      decimals={2}
                      suffix={item.suffix}
                    />
                  ) : (
                    <CountUp
                      end={item.value}
                      decimals={0}
                      suffix={item.suffix}
                    />
                  )}
                </h3>

                {/* Label */}
                <p className="relative z-10 mt-3 whitespace-pre-line text-[13px] leading-5 text-[#166534]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}