import React,{ useState, useEffect, useRef } from "react";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "It depends on scope. A polished landing page takes 2–3 weeks. A full website with CMS takes 4–8 weeks. A custom web application or SaaS platform typically runs 3–6 months. We give you a detailed timeline in our first proposal so you're never left guessing.",
  },
  {
    q: "What does your pricing look like?",
    a: "We work on fixed-price project scopes — no hourly billing surprises. After an initial consultation we send a detailed proposal with a clear price. Most projects range from $5k for a landing page to $150k+ for a complex application. We never start work without an agreed budget.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "We love both. About half our clients are early-stage startups who need to move fast and look credible; the other half are established companies modernizing their digital presence. The work is different, the energy is the same.",
  },
  {
    q: "Can I see your process before committing?",
    a: "Absolutely. Our discovery sprint (1 week, fixed fee) produces a full project roadmap, technical specification, and hi-fi wireframes. Many clients say that sprint alone is worth the cost — you can take it to any agency.",
  },
  {
    q: "What happens after my project launches?",
    a: "All projects include a 30-day stabilization period at no extra charge. After that we offer flexible retainer plans for ongoing development, or you can use your internal team with our documentation. We don't lock you in.",
  },
];

function useTypewriter(text, active, speed = 18) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const rafRef = useRef(null);
  const indexRef = useRef(0);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      setDone(false);
      indexRef.current = 0;
      lastTimeRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    indexRef.current = 0;
    setDisplayed("");
    setDone(false);
    lastTimeRef.current = null;

    function tick(ts) {
      if (!lastTimeRef.current) lastTimeRef.current = ts;
      const elapsed = ts - lastTimeRef.current;

      if (elapsed >= speed) {
        lastTimeRef.current = ts;
        indexRef.current += 1;
        setDisplayed(text.slice(0, indexRef.current));
        if (indexRef.current >= text.length) {
          setDone(true);
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active, text, speed]);

  return { displayed, done };
}

function AccordionItem({ faq, index, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");
  const { displayed, done } = useTypewriter(faq.a, isOpen, 14);

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      const h = contentRef.current.scrollHeight;
      setHeight(h + "px");
      const t = setTimeout(() => setHeight("auto"), 340);
      return () => clearTimeout(t);
    } else {
      if (height === "auto") {
        const h = contentRef.current.scrollHeight;
        setHeight(h + "px");
        requestAnimationFrame(() => requestAnimationFrame(() => setHeight("0px")));
      } else {
        setHeight("0px");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !done && contentRef.current) {
      const h = contentRef.current.scrollHeight;
      setHeight(h + "px");
    }
  }, [displayed]);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: isOpen ? "1px solid #16A34A" : "1px solid #BBF7D0",
        background: isOpen ? "#DCFCE7" : "#FFFFFF",
        boxShadow: isOpen ? "0 4px 32px rgba(22,163,74,0.15)" : "none",
        animation: `fadeUp 0.4s ease-out ${index * 0.07}s both`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        <span
          className="font-semibold text-sm sm:text-base leading-snug transition-colors duration-200"
          style={{ color: isOpen ? "#16A34A" : "#052E16" }}
        >
          {faq.q}
        </span>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen ? "#16A34A" : "#DCFCE7",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg
            className="w-4 h-4"
            style={{ color: isOpen ? "#FFFFFF" : "#166534" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>

      <div
        ref={contentRef}
        style={{
          height,
          overflow: "hidden",
          transition: "height 0.32s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="px-6 pb-5">
          <div
            className="h-px mb-4"
            style={{
              background: "linear-gradient(to right, rgba(22,163,74,0.3), transparent)",
            }}
          />
          <p className="text-sm leading-relaxed" style={{ color: "#4B5563", minHeight: "1.4em" }}>
            {displayed}
            {isOpen && !done && (
              <span
                className="inline-block w-0.5 h-3.5 ml-0.5 align-middle"
                style={{
                  background: "#22C55E",
                  animation: "blink 0.7s step-end infinite",
                  borderRadius: "1px",
                }}
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  return (
    <div
      className="min-h-screen py-20 px-4"
      style={{ background: "#F0FDF4", fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Outfit:wght@700;800;900&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes headerIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .schedule-btn {
          background: #16A34A;
          transition: all 0.25s ease;
        }
        .schedule-btn:hover {
          background: #15803D;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(22,163,74,0.35);
        }
        .schedule-btn:active { transform: translateY(0); }
      `}</style>

      <div
        className="max-w-5xl mx-auto transition-all duration-700"
        style={{ opacity: mounted ? 1 : 0 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          <div className="lg:col-span-2 lg:sticky lg:top-10" style={{ animation: "headerIn 0.6s ease-out both" }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-6 h-px" style={{ background: "#16A34A" }} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#16A34A", letterSpacing: "4px" }}
              >
                FAQ
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
              style={{
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "-0.03em",
                color: "#052E16",
              }}
            >
              Common Questions,
              <br />
              <span style={{ color: "#166534", fontWeight: 300 }}>Honest</span>{" "}
              <span style={{ color: "#16A34A" }}>Answers</span>
            </h2>

            <p className="text-sm leading-relaxed mb-8" style={{ color: "#166534" }}>
              Still have questions? We're always happy to jump on a quick call and walk you through anything.
            </p>

            <button className="schedule-btn inline-flex items-center gap-2.5 text-white text-sm font-bold px-5 py-3 rounded-xl">
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "#86EFAC" }}
                />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#FFFFFF" }} />
              </span>
              Schedule a Call
            </button>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { n: "4h", label: "avg. response" },
                { n: "98%", label: "client satisfaction" },
                { n: "200+", label: "projects shipped" },
                { n: "30+", label: "countries" },
              ].map(({ n, label }) => (
                <div
                  key={n}
                  className="rounded-2xl p-4 text-center"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #BBF7D0",
                  }}
                >
                  <p
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Outfit', sans-serif", color: "#16A34A" }}
                  >
                    {n}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#4B5563" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(prev => prev === i ? null : i)}
              />
            ))}

            <div
              className="mt-4 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-5"
              style={{
                background: "#DCFCE7",
                border: "1px solid #BBF7D0",
                animation: "fadeUp 0.4s ease-out 0.42s both",
              }}
            >
              <div className="flex-1">
                <p className="text-sm font-semibold mb-1" style={{ color: "#052E16" }}>
                  Still have questions?
                </p>
                <p className="text-xs" style={{ color: "#166534" }}>
                  We typically respond within a few hours.
                </p>
              </div>
              <a
                href="#contact"
                className="flex-shrink-0 text-xs font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: "#16A34A", color: "#fff" }}
              >
                Get in Touch →
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}