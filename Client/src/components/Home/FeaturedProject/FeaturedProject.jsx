import React from "react";

import { HiRocketLaunch } from "react-icons/hi2";
import { BiSolidShoppingBags } from "react-icons/bi";
import { IoBarChartSharp } from "react-icons/io5";

const PROJECTS = [
  {
    emoji: <HiRocketLaunch className="text-green-500" />,
    category: "SaaS · Web App",
    title: "LaunchPad CRM",
    description:
      "Full-stack CRM for 1,400+ sales teams with real-time pipeline analytics and AI lead scoring.",
    tags: ["React", "Node.js", "AWS"],
    thumbFrom: "from-[#0F172A]",
    thumbVia: "via-[#121826]",
    thumbTo: "to-[#166534]",
    tall: true,
  },
  {
    emoji: <BiSolidShoppingBags className="text-green-500" />,
    category: "E-commerce · Branding",
    title: "Velour Fashion",
    description:
      "Rebrand + Shopify store for a luxury label. 3× conversion rate increase post-launch.",
    tags: ["Shopify", "Branding", "SEO"],
    thumbFrom: "from-[#121826]",
    thumbVia: "via-[#1E293B]",
    thumbTo: "to-[#14532D]",
  },
  {
    emoji: <IoBarChartSharp className="text-green-500" />,
    category: "Analytics · Dashboard",
    title: "DataNest Platform",
    description:
      "BI dashboard aggregating 20+ data sources with custom chart builder and automated reports.",
    tags: ["Vue.js", "D3", "Python"],
    thumbFrom: "from-[#0B0F19]",
    thumbVia: "via-[#121826]",
    thumbTo: "to-[#166534]",
  },
];

const DOT_PATTERN = {
  backgroundSize: "22px 22px",
};

export default function FeaturedProjects() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
      `}</style>
      <section
        id="projects"
        className="relative overflow-hidden bg-[#0B0F19] py-16 px-8 "
      >
        {/* Header */}
        <div data-aos="fade-up" className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#121826] border border-[#1E293B] rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#4ADE80] mb-5">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              Featured Work
            </div>

            <h2
              className="animate-fadeUp"
              style={{
                fontFamily: "'Syne', sans-serif",
                color: "#F8FAFC",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                animationDelay: "80ms",
              }}
            >
              Projects We're{" "}
              <em
                style={{
                  fontStyle: "normal",
                  color: "#22C55E",
                  textShadow: "0 0 40px rgba(34,197,94,0.25)",
                }}
              >
                <br></br>
                Proud Of
              </em>
            </h2>

            <p className="text-[#94A3B8] text-[15px] leading-relaxed max-w-sm">
              Real clients, real results — a snapshot of what we've shipped.
            </p>
          </div>

          <a
            href="#/Project"
            className="
            inline-flex items-center gap-2
            bg-[#121826] border border-[#1E293B]
            rounded-[14px] px-5 py-2.5
            text-sm font-medium text-[#F8FAFC]
            transition-all duration-300
            hover:border-[#22C55E] hover:bg-[#1E293B] hover:text-[#4ADE80]
            self-start
          "
          >
            View All ↗
          </a>
        </div>

        {/* Grid */}
        <div data-aos="fade-up" className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
          {PROJECTS.map((project, index) => (
            <a
              href="#/Project">
              <div
                key={index}
                // data-aos="fade-up"
                className={`
            group flex flex-col
            bg-[#121826] border border-[#1E293B]
             rounded-3xl overflow-hidden
             hover: duration-300
             hoveer: transition-all ease-out
               hover:-translate-y-3
              hover:scale-[1.02]
             hover:border-[#22C55E]/20
                hover:shadow-[0_8px_40px_rgba(34,197,94,0.10)]
               ${project.tall ? "lg:row-span-2" : ""}
             `}
              >
                {/* Thumbnail */}
                <div
                  className={`
                relative flex items-center justify-center overflow-hidden
                bg-gradient-to-br ${project.thumbFrom} ${project.thumbVia} ${project.thumbTo}
                ${project.tall ? "h-[300px]" : "h-[180px]"}
              `}
                >
                  <div
                    className="absolute inset-0 opacity-[0.08] "
                    style={DOT_PATTERN}
                  />
                  <span className="relative z-10 text-6xl leading-none transition-transform duration-300 group-hover:scale-110">
                    {project.emoji}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 px-6 py-5">
                  {/* Category */}
                  <p className="text-[11px] font-semibold tracking-[0.07em] uppercase text-[#4ADE80] mb-2">
                    {project.category}
                  </p>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#F8FAFC] mb-0">
                    {project.title}
                  </h3>

                  {/* Accent divider */}
                  <div className="w-7 h-0.5 bg-[#22C55E] rounded-full my-3" />

                  {/* Description */}
                  <p className="text-sm text-[#94A3B8] leading-[1.65] flex-1 mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                      bg-[#0F172A] border border-[#1E293B]
                      rounded-full px-3.5 py-1
                      text-[11px] font-semibold tracking-[0.04em] text-[#4ADE80]
                    "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}