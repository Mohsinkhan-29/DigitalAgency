import React, { useState } from "react";

import { FcSearch } from "react-icons/fc";
import { GrAnnounce } from "react-icons/gr";
import { TbTargetArrow } from "react-icons/tb";
import { TbWorldCode } from "react-icons/tb";
import { FaPalette } from "react-icons/fa6";
import { MdAttachEmail } from "react-icons/md";



const services = [
  {
    icon: <FcSearch />,
    name: "SEO & Content",
    desc: "Rank higher, get found faster. Data-driven SEO that brings qualified traffic month after month.",
    delay: "0ms",
  },
  {
    icon: <GrAnnounce style={{ color: "yellow" }} />,
    name: "Social Media Marketing",
    desc: "Engage audiences across Instagram, Facebook, LinkedIn and TikTok with content that converts.",
    delay: "200ms",
  },
  {
    icon: <TbTargetArrow style={{ color: "red" }} />,
    name: "PPC / Paid Ads",
    desc: "Maximum ROI from Google Ads, Meta Ads, and LinkedIn — we don't burn budgets, we grow them.",
    delay: "400ms",
  },
  {
    icon: <TbWorldCode style={{ color: "blue" }} />,
    name: "Web Development",
    desc: "Fast, beautiful, conversion-optimised websites and web apps that work on every device.",
    delay: "600ms",
  },
  {
    icon: <FaPalette style={{ color: "brown" }} />,
    name: "Branding & Design",
    desc: "Logos, brand guidelines, and creative assets that make your brand impossible to forget.",
    delay: "800ms",
  },
  {
    icon: <MdAttachEmail style={{ color: "lightblue" }} />,
    name: "Email Marketing",
    desc: "Automated sequences and campaigns that nurture leads and turn subscribers into customers.",
    delay: "1000ms",
  },
];

function ServiceCard({ icon, name, desc, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      
      style={{
        animationDelay: delay,
        boxShadow: hovered
          ? "0 0 0 1px rgba(34,197,94,0.35), 0 0 32px 0 rgba(34,197,94,0.12), inset 0 1px 0 rgba(148,163,184,0.08)"
          : "0 0 0 1px rgba(148,163,184,0.18), inset 0 1px 0 rgba(148,163,184,0.05)",
        transition:
          "box-shadow 0.35s ease, transform 0.35s ease, background 0.35s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        background: hovered ? "#1E293B" : "#121826",
      }}
      className="relative flex flex-col gap-4 rounded-2xl p-7 cursor-default group "
    >

      {/* Icon */}
      <div
        style={{
          background: hovered
            ? "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(18,24,38,0.8))"
            : "rgba(34,197,94,0.08)",
          transition: "background 0.35s ease",
        }}
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 flex-1">
        <h3
          style={{
            color: "#F8FAFC",
            fontFamily: "'Poppins', sans-serif",
          }}
          className="text-lg font-bold leading-tight"
        >
          {name}
        </h3>

        <p
          style={{
            color: "#94A3B8",
            fontFamily: "'Poppins', sans-serif",
          }}
          className="text-sm leading-relaxed flex-1"
        >
          {desc}
        </p>
      </div>

      {/* Learn more link */}
      <a
        href="#/Services"
        style={{
          color: hovered ? "#4ADE80" : "#22C55E",
          fontFamily: "'Poppins', sans-serif",
          transition: "color 0.25s ease, gap 0.25s ease",
        }}
        className="text-sm font-semibold flex items-center gap-1 w-fit group/link"
      >
        Learn more
        <span
          style={{
            display: "inline-block",
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.25s ease",
          }}
        >
          →
        </span>
      </a>


    </div>
  );
}

export default function HomeService() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeUp {
          animation: fadeUp 0.6s ease both;
        }

        @keyframes tagPop {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }

        .animate-tagPop {
          animation: tagPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        .grid-texture {
          background-image:
            linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
        }
      `}</style>

      <section
        style={{
          background: "#0B0F19",
          fontFamily: "'Poppins', sans-serif",
        }}
        className="relative grid-texture overflow-hidden py-24 px-4"
      >
        <div
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 10% 30%, rgba(34,197,94,0.06) 0%, transparent 70%)",
          }}
          className="pointer-events-none absolute inset-0"
        />

        <div
          style={{
            background:
              "radial-gradient(ellipse 40% 50% at 90% 70%, rgba(74,222,128,0.04) 0%, transparent 70%)",
          }}
          className="pointer-events-none absolute inset-0"
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div data-aos="fade-up" className="flex flex-col gap-4 max-w-xl">
              <div
                className="animate-tagPop"
                style={{ animationDelay: "0ms" }}
              >
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: "#22C55E",
                    background: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.25)",
                    letterSpacing: "0.12em",
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase px-4 py-2 rounded-full"
                >
                  <span
                    style={{
                      background: "#22C55E",
                      boxShadow: "0 0 6px #22C55E",
                    }}
                    className="w-1.5 h-1.5 rounded-full"
                  />

                  What We Do
                </span>
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
                Services Built for{" "}
                <em
                  style={{
                    fontStyle: "normal",
                    color: "#22C55E",
                    textShadow: "0 0 40px rgba(34,197,94,0.25)",
                  }}
                >
                  Scale
                </em>
              </h2>

              <p
                className="animate-fadeUp"
                style={{
                  color: "#94A3B8",
                  fontSize: "1.05rem",
                  lineHeight: 1.65,
                  fontWeight: 300,
                  animationDelay: "160ms",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                End-to-end digital solutions — strategy, design,
                <br className="hidden md:block" /> development, and marketing.
              </p>
            </div>

            <a
              href="#/Services"
              data-aos="fade-up"
              className=" self-start md:self-end flex-shrink-0 group"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.02em",
                color: "#0F172A",
                background: "linear-gradient(135deg, #22C55E, #4ADE80)",
                padding: "0.75rem 1.75rem",
                borderRadius: "9999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                whiteSpace: "nowrap",
                boxShadow: "0 0 24px rgba(34,197,94,0.25)",
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 40px rgba(34,197,94,0.45)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 24px rgba(34,197,94,0.25)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              All Services

              <span
                style={{ transition: "transform 0.25s ease" }}
                className="group-hover:translate-x-1 inline-block"
              >
                →
              </span>
            </a>
          </div>

          <div
            data-aos="fade-up"
            className=" mb-12"
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, #1E293B, rgba(30,41,59,0.3) 60%, transparent)",

            }}
          />

          <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc) => (
              <ServiceCard key={svc.name} {...svc} />
            ))}
          </div>

          <div
            data-aos="fade-up"
            className=" mt-14 flex flex-wrap justify-center items-center gap-x-8 gap-y-3"
          >
            {[
              "Strategy",
              "Design",
              "Development",
              "Marketing",
              "Growth",
            ].map((label, i) => (
              <span
                key={label}
                style={{
                  color: i % 2 === 0 ? "#94A3B8" : "#4ADE80",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {label}

                {i < 4 && (
                  <span style={{ color: "#1E293B", marginLeft: "0.5rem" }}>
                    ✦
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}