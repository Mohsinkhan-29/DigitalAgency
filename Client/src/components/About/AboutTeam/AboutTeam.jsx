import React, { useState } from "react";

const team = [
  {
    initials: "AK",
    name: "Alex Kim",
    role: "Founder & CEO",
    skills: ["Strategy", "Product", "Growth"],
    gradient: "from-[#052E16] to-[#16A34A]",
    accent: "#4ADE80",
    social: { x: "#", linkedin: "#", link: "#" },
  },
  {
    initials: "SR",
    name: "Sofia Reyes",
    role: "Head of Design",
    skills: ["UI/UX", "Figma", "Systems"],
    gradient: "from-[#052E16] to-[#15803D]",
    accent: "#86EFAC",
    social: { x: "#", linkedin: "#", link: "#" },
  },
  {
    initials: "JL",
    name: "James Liu",
    role: "Lead Engineer",
    skills: ["React", "Node.js", "AWS"],
    gradient: "from-[#052E16] to-[#166534]",
    accent: "#4ADE80",
    social: { x: "#", linkedin: "#", link: "#" },
  },
  {
    initials: "MA",
    name: "Maya Anand",
    role: "Marketing Director",
    skills: ["SEO", "PPC", "Analytics"],
    gradient: "from-[#052E16] to-[#16A34A]",
    accent: "#86EFAC",
    social: { x: "#", linkedin: "#", link: "#" },
  },
];

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
);

function TeamCard({ member, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative"
      style={{ animationDelay: `${index * 120}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow behind card */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ background: `linear-gradient(135deg, #16A34A33, #4ADE8044)` }}
      />

      <div className="relative bg-white border border-[#BBF7D0] rounded-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_60px_-12px_rgba(22,163,74,0.18)]">

        {/* Avatar block */}
        <div className="relative h-44 overflow-hidden">
          {/* Gradient bg */}
          <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient}`} />

          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Diagonal stripe accent */}
          <div
            className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10"
            style={{ background: member.accent }}
          />
          <div
            className="absolute -left-4 -top-4 w-20 h-20 rounded-full opacity-10"
            style={{ background: member.accent }}
          />

          {/* Initials */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-6xl font-black tracking-tighter select-none transition-all duration-500"
              style={{
                color: hovered ? member.accent : "rgba(255,255,255,0.12)",
                textShadow: hovered ? `0 0 40px ${member.accent}66` : "none",
                fontFamily: "'Georgia', serif",
                letterSpacing: "-4px",
              }}
            >
              {member.initials}
            </span>
          </div>

          {/* Social overlay */}
          <div className="absolute inset-0 flex items-end justify-center pb-4 gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            {[
              { icon: <XIcon />, label: "X / Twitter" },
              { icon: <LinkedInIcon />, label: "LinkedIn" },
              { icon: <LinkIcon />, label: "Website" },
            ].map(({ icon, label }) => (
              <button
                key={label}
                title={label}
                className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#16A34A] hover:border-[#16A34A] transition-all duration-200"
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/5 to-transparent" />
        </div>

        {/* Info block */}
        <div className="px-5 py-4">
          {/* Role pill */}
          <div className="inline-flex items-center gap-1.5 mb-2">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: member.accent }}
            />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#166534]">
              {member.role}
            </span>
          </div>

          <h3 className="text-[#052E16] text-lg font-bold leading-tight mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            {member.name}
          </h3>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5">
            {member.skills.map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] group-hover:border-[#4ADE80] transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
          style={{ background: `linear-gradient(90deg, #16A34A, ${member.accent})` }}
        />
      </div>
    </div>
  );
}

export default function AboutTeam() {
  return (
    <section className="bg-[#F0FDF4] py-24 px-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #4ADE8044, transparent 70%)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #16A34A33, transparent 70%)" }} />

      <div className="max-w-5xl mx-auto relative">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            {/* Tag */}
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#16A34A]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#16A34A]">
                The Team
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl font-black text-[#052E16] leading-none"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-1.5px" }}
            >
              People Who{" "}
              <span className="relative inline-block">
                Ship
                <span
                  className="absolute bottom-1 left-0 right-0 h-1 rounded-full"
                  style={{ background: "linear-gradient(90deg, #16A34A, #4ADE80)" }}
                />
              </span>
            </h2>
          </div>

          <p className="text-[#166534] text-sm leading-relaxed max-w-xs">
            No account managers in the loop. You work directly with the people building your product.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}