import React, { useState, useEffect, useRef } from "react";

const colors = {
  primary: "#16A34A",
  primaryHover: "#15803D",
  secondary: "#052E16",
  accent: "#4ADE80",
  background: "#F0FDF4",
  surface: "#FFFFFF",
  surfaceAlt: "#DCFCE7",
  border: "#BBF7D0",
  textPrimary: "#052E16",
  textSecondary: "#166534",
  textMuted: "#4B5563",
  success: "#22C55E",
  glow: "#86EFAC",
};

const milestones = [
  {
    year: "2018",
    title: "Founded in a San Francisco garage",
    desc: "Three ex-agency designers started NexaWave with one belief: great digital products should not require a Fortune 500 budget. First client signed within 30 days.",
    icon: "🏠",
    tags: ["Founded", "3 People", "1st Client"],
    stat: "Day 30",
    statLabel: "First Client",
  },
  {
    year: "2019",
    title: "First $1M in annual revenue",
    desc: "Grew to a team of 12 across design, engineering, and marketing. Launched our first SaaS product for a Series A fintech startup that raised $8M six months later.",
    icon: "💰",
    tags: ["$1M ARR", "12 People", "SaaS"],
    stat: "$1M",
    statLabel: "Annual Revenue",
  },
  {
    year: "2021",
    title: "Expanded to Cloud & DevOps",
    desc: "Brought AWS-certified engineers in-house after clients kept asking for infrastructure support. Added a full DevOps practice now serving 40+ enterprise clients.",
    icon: "☁️",
    tags: ["AWS", "DevOps", "40+ Clients"],
    stat: "40+",
    statLabel: "Enterprise Clients",
  },
  {
    year: "2023",
    title: "100+ active clients worldwide",
    desc: "Crossed the milestone of 100 active clients across 30 countries. Opened our London office and launched our AI integration practice.",
    icon: "🌍",
    tags: ["100 Clients", "30 Countries", "London"],
    stat: "30",
    statLabel: "Countries",
  },
  {
    year: "2025",
    title: "200+ projects & still growing",
    desc: "Today we are 60 people strong across 4 time zones, shipping products that generate real outcomes for brands that want to lead their categories.",
    icon: "🚀",
    tags: ["Today", "60 People", "4 Offices"],
    stat: "200+",
    statLabel: "Projects Shipped",
  },
];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  .story-root * { box-sizing: border-box; margin: 0; padding: 0; }

  .story-root {
    font-family: 'DM Sans', sans-serif;
    background: ${colors.background};
    padding: 5rem 2rem;
    min-height: 100vh;
  }

  .story-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .story-header {
    text-align: center;
    margin-bottom: 4rem;
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .story-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${colors.primary};
    background: ${colors.surfaceAlt};
    border: 1.5px solid ${colors.border};
    border-radius: 100px;
    padding: 6px 16px;
    margin-bottom: 1.25rem;
  }

  .story-tag::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.success};
    display: block;
    animation: pulse-dot 2s infinite;
  }

  .story-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 800;
    color: ${colors.textPrimary};
    line-height: 1.1;
    margin-bottom: 1rem;
    letter-spacing: -0.02em;
  }

  .story-title span {
    color: ${colors.primary};
    position: relative;
  }

  .story-subtitle {
    font-size: 1.05rem;
    color: ${colors.textMuted};
    font-weight: 300;
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .story-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.5rem;
    align-items: start;
  }

  @media (max-width: 900px) {
    .story-layout { grid-template-columns: 1fr; }
  }

  /* --- TIMELINE LEFT --- */
  .timeline-track {
    position: relative;
    padding-left: 2rem;
  }

  .timeline-line {
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, ${colors.border}, ${colors.primary}, ${colors.border});
    border-radius: 2px;
  }

  .timeline-line-fill {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: ${colors.primary};
    border-radius: 2px;
    transition: height 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .tl-item {
    position: relative;
    padding: 0 0 2.5rem 2rem;
    cursor: pointer;
    animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .tl-item:last-child { padding-bottom: 0; }

  .tl-dot-wrap {
    position: absolute;
    left: -2rem;
    top: 4px;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tl-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${colors.border};
    border: 2px solid ${colors.border};
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
  }

  .tl-dot-ring {
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid ${colors.primary};
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .tl-item:hover .tl-dot,
  .tl-item.active .tl-dot {
    background: ${colors.primary};
    border-color: ${colors.primary};
    transform: scale(1.2);
  }

  .tl-item.active .tl-dot-ring {
    opacity: 1;
    transform: scale(1);
    animation: ripple 2s infinite;
  }

  .tl-year {
    font-family: 'Syne', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: ${colors.primary};
    text-transform: uppercase;
    margin-bottom: 0.3rem;
    transition: color 0.2s;
  }

  .tl-item-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: ${colors.textPrimary};
    margin-bottom: 0.5rem;
    transition: color 0.2s;
    line-height: 1.3;
  }

  .tl-item:hover .tl-item-title,
  .tl-item.active .tl-item-title {
    color: ${colors.primary};
  }

  .tl-item-desc {
    font-size: 0.9rem;
    color: ${colors.textMuted};
    line-height: 1.7;
    font-weight: 300;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, opacity 0.4s ease;
    opacity: 0;
  }

  .tl-item.active .tl-item-desc {
    max-height: 120px;
    opacity: 1;
  }

  /* --- PANEL RIGHT --- */
  .tl-panel {
    position: sticky;
    top: 2rem;
    animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
  }

  .tl-card {
    background: ${colors.surface};
    border: 1.5px solid ${colors.border};
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 40px rgba(22, 163, 74, 0.08);
  }

  .tl-visual {
    background: ${colors.secondary};
    padding: 3rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    min-height: 220px;
  }

  .tl-visual-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 50%, rgba(74, 222, 128, 0.15) 0%, transparent 70%);
  }

  .tl-rings {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tl-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(134, 239, 172, 0.15);
    animation: spin-ring linear infinite;
  }

  .tl-ring-1 { width: 120px; height: 120px; animation-duration: 20s; }
  .tl-ring-2 { width: 180px; height: 180px; animation-duration: 30s; animation-direction: reverse; }
  .tl-ring-3 { width: 240px; height: 240px; animation-duration: 40s; }

  .tl-emoji {
    font-size: 4rem;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 20px rgba(74, 222, 128, 0.4));
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .tl-stat-badge {
    position: absolute;
    bottom: 1.25rem;
    right: 1.25rem;
    background: rgba(5, 46, 22, 0.6);
    border: 1px solid rgba(134, 239, 172, 0.3);
    border-radius: 12px;
    padding: 10px 16px;
    text-align: center;
    backdrop-filter: blur(8px);
  }

  .tl-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: ${colors.accent};
    display: block;
    line-height: 1;
  }

  .tl-stat-lbl {
    font-size: 0.7rem;
    color: rgba(134, 239, 172, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 2px;
    display: block;
  }

  .tl-content {
    padding: 2rem;
  }

  .tl-panel-year {
    font-family: 'Syne', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${colors.primary};
    margin-bottom: 0.5rem;
  }

  .tl-panel-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: ${colors.textPrimary};
    line-height: 1.25;
    margin-bottom: 0.75rem;
    letter-spacing: -0.01em;
  }

  .tl-panel-desc {
    font-size: 0.9rem;
    color: ${colors.textMuted};
    line-height: 1.75;
    font-weight: 300;
    margin-bottom: 1.25rem;
  }

  .tl-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 1.5rem;
  }

  .tl-tag {
    font-size: 0.75rem;
    font-weight: 500;
    color: ${colors.textSecondary};
    background: ${colors.surfaceAlt};
    border: 1.5px solid ${colors.border};
    border-radius: 100px;
    padding: 5px 12px;
  }

  .tl-nav {
    display: flex;
    gap: 6px;
    border-top: 1.5px solid ${colors.border};
    padding-top: 1.25rem;
  }

  .tl-nav-btn {
    flex: 1;
    padding: 8px 4px;
    font-family: 'Syne', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    border-radius: 10px;
    border: 1.5px solid ${colors.border};
    background: transparent;
    color: ${colors.textMuted};
    cursor: pointer;
    transition: all 0.25s ease;
    letter-spacing: 0.04em;
  }

  .tl-nav-btn:hover {
    background: ${colors.surfaceAlt};
    color: ${colors.textSecondary};
    border-color: ${colors.accent};
  }

  .tl-nav-btn.active {
    background: ${colors.primary};
    color: #fff;
    border-color: ${colors.primary};
    box-shadow: 0 4px 16px rgba(22, 163, 74, 0.3);
  }

  /* Progress bar */
  .tl-progress {
    display: flex;
    gap: 4px;
    margin-bottom: 1.75rem;
  }

  .tl-progress-seg {
    height: 3px;
    flex: 1;
    border-radius: 100px;
    background: ${colors.border};
    transition: background 0.4s ease, flex 0.4s ease;
  }

  .tl-progress-seg.done {
    background: ${colors.accent};
  }

  .tl-progress-seg.active {
    background: ${colors.primary};
    flex: 2;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  @keyframes ripple {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(2.2); opacity: 0; }
  }

  @keyframes spin-ring {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes icon-pop {
    0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
    60% { transform: scale(1.15) rotate(4deg); }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  @keyframes panel-in {
    from { opacity: 0; transform: scale(0.97) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  .panel-animate {
    animation: panel-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
`;

export default function AboutStory() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const prevActive = useRef(0);

  const handleSelect = (idx) => {
    if (idx === active) return;
    prevActive.current = active;
    setActive(idx);
    setAnimKey((k) => k + 1);
  };

  const m = milestones[active];
  const fillPct = ((active) / (milestones.length - 1)) * 100;

  return (
    <>
      <style>{style}</style>
      <section className="story-root">
        <div className="story-container">
          {/* Header */}
          <div className="story-header">
            <div className="story-tag">Our Story</div>
            <h2 className="story-title">
              Seven Years of<br /><span>Doing It Right</span>
            </h2>
            <p className="story-subtitle">
              Every milestone shaped who we are. Click any year to explore how we got here.
            </p>
          </div>

          <div className="story-layout">
            {/* Left: Timeline */}
            <div>
              <div className="timeline-track">
                <div className="timeline-line">
                  <div
                    className="timeline-line-fill"
                    style={{ height: `${fillPct}%` }}
                  />
                </div>

                {milestones.map((item, idx) => (
                  <div
                    key={item.year}
                    className={`tl-item${active === idx ? " active" : ""}`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                    onClick={() => handleSelect(idx)}
                  >
                    <div className="tl-dot-wrap">
                      <div className="tl-dot-ring" />
                      <div className="tl-dot" />
                    </div>
                    <div className="tl-year">{item.year}</div>
                    <div className="tl-item-title">{item.title}</div>
                    <div className="tl-item-desc">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Panel */}
            <div className="tl-panel">
              <div className="tl-card" key={animKey}>
                <div className="tl-visual">
                  <div className="tl-visual-bg" />
                  <div className="tl-rings">
                    <div className="tl-ring tl-ring-1" />
                    <div className="tl-ring tl-ring-2" />
                    <div className="tl-ring tl-ring-3" />
                  </div>
                  <div
                    className="tl-emoji panel-animate"
                    style={{ animation: "icon-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both" }}
                  >
                    {m.icon}
                  </div>
                  <div className="tl-stat-badge">
                    <span className="tl-stat-num">{m.stat}</span>
                    <span className="tl-stat-lbl">{m.statLabel}</span>
                  </div>
                </div>

                <div className="tl-content">
                  {/* Progress */}
                  <div className="tl-progress">
                    {milestones.map((_, i) => (
                      <div
                        key={i}
                        className={`tl-progress-seg${i < active ? " done" : ""}${i === active ? " active" : ""}`}
                      />
                    ))}
                  </div>

                  <div className="tl-panel-year">{m.year}</div>
                  <div className="tl-panel-title">{m.title}</div>
                  <div className="tl-panel-desc">{m.desc}</div>

                  <div className="tl-tags">
                    {m.tags.map((t) => (
                      <span key={t} className="tl-tag">{t}</span>
                    ))}
                  </div>

                  <div className="tl-nav">
                    {milestones.map((item, idx) => (
                      <button
                        key={item.year}
                        className={`tl-nav-btn${active === idx ? " active" : ""}`}
                        onClick={() => handleSelect(idx)}
                      >
                        {item.year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}