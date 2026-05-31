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

const tabs = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "⚛️",
    skills: [
      { name: "React / Next.js", pct: 97 },
      { name: "TypeScript", pct: 92 },
      { name: "Tailwind CSS", pct: 95 },
      { name: "Vue.js / Nuxt", pct: 85 },
      { name: "React Native", pct: 88 },
    ],
    tools: [
      { icon: "⚛️", name: "React" },
      { icon: "▲", name: "Next.js" },
      { icon: "🌊", name: "Tailwind" },
      { icon: "💚", name: "Vue.js" },
      { icon: "📱", name: "React Native" },
      { icon: "🔶", name: "TypeScript" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "🟩",
    skills: [
      { name: "Node.js / Express", pct: 95 },
      { name: "PostgreSQL / MySQL", pct: 90 },
      { name: "GraphQL / REST APIs", pct: 93 },
      { name: "Python / Django", pct: 82 },
      { name: "Firebase / Supabase", pct: 88 },
    ],
    tools: [
      { icon: "🟩", name: "Node.js" },
      { icon: "🐘", name: "PostgreSQL" },
      { icon: "▪", name: "GraphQL" },
      { icon: "🐍", name: "Python" },
      { icon: "🔥", name: "Firebase" },
      { icon: "🗄", name: "Redis" },
    ],
  },
  {
    id: "design",
    label: "Design",
    icon: "🎨",
    skills: [
      { name: "Figma / Prototyping", pct: 98 },
      { name: "Design Systems", pct: 94 },
      { name: "User Research", pct: 87 },
      { name: "Motion / Animation", pct: 82 },
      { name: "Brand Identity", pct: 89 },
    ],
    tools: [
      { icon: "🎨", name: "Figma" },
      { icon: "🖌", name: "Illustrator" },
      { icon: "📐", name: "Framer" },
      { icon: "💡", name: "Maze" },
      { icon: "🗺", name: "Miro" },
      { icon: "✏️", name: "Procreate" },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: "📊",
    skills: [
      { name: "Technical SEO", pct: 93 },
      { name: "Google / Meta Ads", pct: 90 },
      { name: "Content Strategy", pct: 86 },
      { name: "Email Marketing", pct: 88 },
      { name: "Analytics / CRO", pct: 91 },
    ],
    tools: [
      { icon: "📊", name: "GA4" },
      { icon: "🔍", name: "Ahrefs" },
      { icon: "📬", name: "Klaviyo" },
      { icon: "🗣", name: "Meta Ads" },
      { icon: "🔎", name: "Semrush" },
      { icon: "🔄", name: "HubSpot" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: "⛅",
    skills: [
      { name: "AWS / GCP", pct: 91 },
      { name: "Docker / Kubernetes", pct: 87 },
      { name: "CI/CD Pipelines", pct: 93 },
      { name: "Terraform / IaC", pct: 84 },
      { name: "Monitoring / Observability", pct: 88 },
    ],
    tools: [
      { icon: "⛅", name: "AWS" },
      { icon: "🐳", name: "Docker" },
      { icon: "⎈", name: "Kubernetes" },
      { icon: "🔄", name: "GitHub Actions" },
      { icon: "🏗", name: "Terraform" },
      { icon: "📡", name: "Datadog" },
    ],
  },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .exp-root * { box-sizing: border-box; margin: 0; padding: 0; }

  .exp-root {
    font-family: 'DM Sans', sans-serif;
    background: ${colors.background};
    padding: 5rem 2rem;
    min-height: 100vh;
  }

  .exp-container {
    max-width: 1100px;
    margin: 0 auto;
  }

  /* Header */
  .exp-header {
    text-align: center;
    margin-bottom: 3.5rem;
    animation: expFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .exp-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${colors.primary};
    background: ${colors.surfaceAlt};
    border: 1.5px solid ${colors.border};
    border-radius: 100px;
    padding: 6px 16px;
    margin-bottom: 1.1rem;
  }

  .exp-tag::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.success};
    animation: tagPulse 2s ease-in-out infinite;
  }

  .exp-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    font-weight: 800;
    color: ${colors.textPrimary};
    letter-spacing: -0.025em;
    line-height: 1.1;
  }

  .exp-title span { color: ${colors.primary}; }

  /* Tab Bar */
  .tab-bar {
    display: flex;
    gap: 6px;
    background: ${colors.surface};
    border: 1.5px solid ${colors.border};
    border-radius: 16px;
    padding: 6px;
    margin-bottom: 2.5rem;
    position: relative;
    overflow: hidden;
  }

  .tab-btn {
    flex: 1;
    padding: 10px 8px;
    font-family: 'Syne', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    border: none;
    border-radius: 10px;
    background: transparent;
    color: ${colors.textMuted};
    cursor: pointer;
    transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    z-index: 1;
    white-space: nowrap;
  }

  .tab-btn:hover:not(.active) {
    color: ${colors.textSecondary};
    background: ${colors.surfaceAlt};
  }

  .tab-btn.active {
    background: ${colors.primary};
    color: #fff;
    box-shadow: 0 4px 18px rgba(22,163,74,0.35);
  }

  /* Content card */
  .tab-content-card {
    background: ${colors.surface};
    border: 1.5px solid ${colors.border};
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 4px 40px rgba(22,163,74,0.07);
  }

  .tab-inner {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    gap: 0;
  }

  @media (max-width: 780px) {
    .tab-inner { grid-template-columns: 1fr; }
    .tab-right { border-left: none !important; border-top: 1.5px solid ${colors.border}; }
  }

  /* Left: Skills */
  .tab-left {
    padding: 2.25rem 2rem;
  }

  .tab-section-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${colors.primary};
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .tab-section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${colors.border};
  }

  .skill-list {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  .skill-row { }

  .skill-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 7px;
  }

  .skill-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${colors.textPrimary};
  }

  .skill-pct {
    font-family: 'Syne', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: ${colors.primary};
  }

  .skill-track {
    height: 7px;
    background: ${colors.surfaceAlt};
    border-radius: 100px;
    overflow: hidden;
    border: 1px solid ${colors.border};
  }

  .skill-fill {
    height: 100%;
    border-radius: 100px;
    background: linear-gradient(90deg, ${colors.primary} 0%, ${colors.accent} 100%);
    width: 0%;
    transition: width 0.9s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }

  .skill-fill::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 60%, rgba(255,255,255,0.3) 80%, transparent 100%);
    animation: shimmer 2s infinite;
  }

  /* Right: Tools */
  .tab-right {
    padding: 2.25rem 2rem;
    border-left: 1.5px solid ${colors.border};
    background: ${colors.background};
    display: flex;
    flex-direction: column;
  }

  .tool-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    flex: 1;
  }

  .tool-chip {
    background: ${colors.surface};
    border: 1.5px solid ${colors.border};
    border-radius: 14px;
    padding: 14px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: default;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    animation: chipIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  .tool-chip:hover {
    background: ${colors.surfaceAlt};
    border-color: ${colors.accent};
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(22,163,74,0.12);
  }

  .tool-chip-icon {
    font-size: 1.5rem;
    line-height: 1;
  }

  .tool-chip-name {
    font-size: 0.72rem;
    font-weight: 600;
    color: ${colors.textSecondary};
    text-align: center;
    letter-spacing: 0.01em;
  }

  /* Average score badge */
  .avg-badge {
    margin-top: 1.5rem;
    background: ${colors.secondary};
    border-radius: 14px;
    padding: 14px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .avg-label {
    font-size: 0.78rem;
    color: rgba(134,239,172,0.7);
    font-weight: 400;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .avg-score {
    font-family: 'Syne', sans-serif;
    font-size: 1.4rem;
    font-weight: 800;
    color: ${colors.accent};
  }

  .avg-bar-wrap {
    flex: 1;
    height: 4px;
    background: rgba(134,239,172,0.15);
    border-radius: 100px;
    overflow: hidden;
  }

  .avg-bar-fill {
    height: 100%;
    background: ${colors.accent};
    border-radius: 100px;
    transition: width 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Panel transition */
  .panel-fade-enter {
    animation: panelIn 0.38s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes expFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes tagPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.75); }
  }

  @keyframes shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }

  @keyframes panelIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes chipIn {
    from { opacity: 0; transform: scale(0.85) translateY(6px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
`;

function SkillBar({ name, pct, delay, animKey }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(0);
    const t = setTimeout(() => setWidth(pct), 60 + delay * 80);
    return () => clearTimeout(t);
  }, [pct, animKey]);

  return (
    <div className="skill-row">
      <div className="skill-top">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default function AboutExpertise() {
  const [activeTab, setActiveTab] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const handleTab = (idx) => {
    if (idx === activeTab) return;
    setActiveTab(idx);
    setAnimKey((k) => k + 1);
  };

  const tab = tabs[activeTab];
  const avg = Math.round(tab.skills.reduce((s, sk) => s + sk.pct, 0) / tab.skills.length);

  return (
    <>
      <style>{css}</style>
      <section className="exp-root">
        <div className="exp-container">
          {/* Header */}
          <div className="exp-header">
            <div className="exp-tag">Our Expertise</div>
            <h2 className="exp-title">
              Skills That <span>Ship Products</span>
            </h2>
          </div>

          {/* Tab Bar */}
          <div className="tab-bar">
            {tabs.map((t, i) => (
              <button
                key={t.id}
                className={`tab-btn${activeTab === i ? " active" : ""}`}
                onClick={() => handleTab(i)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Content Card */}
          <div className="tab-content-card" key={animKey}>
            <div className="tab-inner panel-fade-enter">
              {/* Left */}
              <div  className="tab-left">
                <div className="tab-section-label">Proficiency</div>
                <div className="skill-list">
                  {tab.skills.map((sk, i) => (
                    <SkillBar
                      key={sk.name}
                      name={sk.name}
                      pct={sk.pct}
                      delay={i}
                      animKey={animKey}
                    />
                  ))}
                </div>
              </div>

              {/* Right */}
              <div className="tab-right">
                <div className="tab-section-label">Tools & Stack</div>
                <div className="tool-grid">
                  {tab.tools.map((tool, i) => (
                    <div
                      className="tool-chip"
                      key={tool.name}
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      <div className="tool-chip-icon">{tool.icon}</div>
                      <div className="tool-chip-name">{tool.name}</div>
                    </div>
                  ))}
                </div>

                {/* Avg score */}
                <div className="avg-badge">
                  <span className="avg-label">Avg. score</span>
                  <div className="avg-bar-wrap">
                    <div className="avg-bar-fill" style={{ width: `${avg}%` }} />
                  </div>
                  <span className="avg-score">{avg}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}