import React, { useState } from "react";

import { FcMindMap } from "react-icons/fc";
import { FcInTransit } from "react-icons/fc";
import { FcCollaboration } from "react-icons/fc";
import { FcDepartment } from "react-icons/fc";

const features = [
  {
    icon: <FcMindMap />,
    title: "Strategy First",
    text: "We dig deep into your goals before designing a single pixel or writing a line of code.",
    delay: "160ms",
  },
  {
    icon: <FcInTransit />,
    title: "Fast Delivery",
    text: "Agile sprints with weekly updates — you always know exactly where your project stands.",
    delay: "240ms",
  },
  {
    icon: <FcCollaboration />,
    title: "Long-Term Partnership",
    text: "86% of our clients continue with a retainer. We grow with you beyond launch day.",
    delay: "320ms",
  },
];

function FeatureItem({ icon, title, text, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="animate-fadeUp flex items-start gap-4 p-5 rounded-2xl cursor-default"
      style={{
        animationDelay: delay,
        background: hovered ? "#DCFCE7" : "transparent",
        border: `1px solid ${hovered ? "#86EFAC" : "#BBF7D0"}`,
        transition: "all 0.3s ease",
        transform: hovered ? "translateX(6px)" : "translateX(0)",
      }}
    >
      <div
        style={{
          background: hovered
            ? "linear-gradient(135deg, #16A34A, #22C55E)"
            : "#DCFCE7",
          boxShadow: hovered ? "0 4px 16px rgba(22,163,74,0.25)" : "none",
          transition: "all 0.3s ease",
          flexShrink: 0,
        }}
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            color: "#052E16",
            fontWeight: 700,
            fontSize: "0.95rem",
            marginBottom: "0.25rem",
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#4B5563",
            fontSize: "0.875rem",
            lineHeight: 1.65,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

function StatBadge() {
  return (
    <div
      className="animate-fadeUp absolute -bottom-5 -right-5 flex flex-col items-center justify-center rounded-2xl px-6 py-4"
      style={{
        animationDelay: "200ms",
        background: "#FFFFFF",
        border: "1px solid #BBF7D0",
        boxShadow:
          "0 8px 32px rgba(22,163,74,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        minWidth: "130px",
      }}
    >
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          color: "#16A34A",
          fontWeight: 800,
          fontSize: "2.25rem",
          lineHeight: 1,
        }}
      >
        8<span style={{ color: "#4ADE80", fontSize: "1.5rem" }}>+</span>
      </div>

      <div
        style={{
          color: "#166534",
          fontWeight: 600,
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          marginTop: "4px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Years in Business
      </div>
    </div>
  );
}

export default function HomeAbout() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeUp {
          animation: fadeUp 0.55s ease both;
        }

        @keyframes tagSlide {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .animate-tagSlide {
          animation: tagSlide 0.45s cubic-bezier(0.34,1.4,0.64,1) both;
        }

        @keyframes floatSoft {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .float-anim {
          animation: floatSoft 4s ease-in-out infinite;
        }

        .dot-pattern {
          background-image: radial-gradient(circle, #BBF7D0 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .img-box-inner {
          background: linear-gradient(145deg, #DCFCE7, #F0FDF4);
          border: 1px solid #BBF7D0;
          position: relative;
          overflow: hidden;
        }

        .img-box-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(22,163,74,0.08) 0%, transparent 60%);
        }
      `}</style>

      <section
        style={{
          background: "#F0FDF4",
          fontFamily: "'Poppins', sans-serif",
        }}
        className="relative overflow-hidden py-24 px-4"
      >
        {/* Background decorations */}
        <div
          className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />

        <div
          className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(22,163,74,0.08) 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div
              data-aos="fade-right"
              className="relative "
            >
              <div
                className="img-box-inner float-anim relative rounded-3xl flex flex-col items-center justify-center"
                style={{ minHeight: "380px", padding: "2.5rem" }}
              >
                <div
                  style={{
                    fontSize: "6rem",
                    lineHeight: 1,
                    filter: "drop-shadow(0 8px 24px rgba(22,163,74,0.2))",
                  }}
                >
                  <FcDepartment />
                </div>

                <div
                  className="mt-6 px-5 py-2 rounded-full"
                  style={{
                    background: "rgba(22,163,74,0.1)",
                    border: "1px solid #BBF7D0",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#16A34A",
                    letterSpacing: "0.06em",
                  }}
                >
                  Digital Agency HQ
                </div>

                <div className="flex gap-8 mt-8">
                  {[
                    { num: "40+", lbl: "Team Members" },
                    { num: "200+", lbl: "Projects Delivered" },
                  ].map(({ num, lbl }) => (
                    <div key={lbl} className="text-center">
                      <div
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 800,
                          fontSize: "1.6rem",
                          color: "#16A34A",
                          lineHeight: 1,
                        }}
                      >
                        {num}
                      </div>

                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "#166534",
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                          marginTop: "3px",
                        }}
                      >
                        {lbl}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
                  style={{
                    background:
                      "linear-gradient(90deg, #16A34A, #86EFAC, #4ADE80)",
                  }}
                />
              </div>

              <StatBadge />

              <div
                className="animate-fadeUp absolute -bottom-10 left-4 px-4 py-2 rounded-full"
                style={{
                  animationDelay: "280ms",
                  background: "#052E16",
                  boxShadow: "0 4px 20px rgba(5,46,22,0.25)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: "#4ADE80",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                  }}
                >
                  ✦ Est. 2017
                </span>
              </div>
            </div>

            {/* Right */}
            <div data-aos="fade-left" className="flex flex-col gap-6 mt-8 lg:mt-0">
              <div
                className="animate-tagSlide"
                style={{ animationDelay: "80ms" }}
              >
                <span
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: "#16A34A",
                    background: "#DCFCE7",
                    border: "1px solid #86EFAC",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#16A34A",
                      display: "inline-block",
                    }}
                  />
                  About Digital Agency
                </span>
              </div>

              <h2
                className="animate-fadeUp"
                style={{
                  fontFamily: "'Syne', sans-serif",
                  color: "#052E16",
                  fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  animationDelay: "120ms",
                }}
              >
                A Team That{" "}
                <span
                  style={{
                    fontFamily: "'Syne', serif",
                    fontWeight: 800,
                    color: "#16A34A",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  Obsesses
                </span>{" "}
                Over Your Growth
              </h2>

              <div
                className="animate-fadeUp"
                style={{
                  animationDelay: "160ms",
                  height: "2px",
                  width: "auto",
                  background: "linear-gradient(90deg, #16A34A, #86EFAC)",
                  borderRadius: "999px",
                }}
              />

              <p
                className="animate-fadeUp"
                style={{
                  animationDelay: "200ms",
                  color: "#4B5563",
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  fontWeight: 400,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Founded in 2017, we grew from a two-person studio into a{" "}
                <strong
                  style={{
                    color: "#052E16",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  40+ member team
                </strong>{" "}
                delivering measurable digital results for startups and enterprise
                brands across Pakistan and globally.
              </p>

              <div className="flex flex-col gap-3 mt-2">
                {features.map((f) => (
                  <FeatureItem key={f.title} {...f} />
                ))}
              </div>

              <div
                className="animate-fadeUp flex flex-wrap items-center gap-4 mt-2"
                style={{ animationDelay: "380ms" }}
              >
                <a
                  href="#/About"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "#FFFFFF",
                    background:
                      "linear-gradient(135deg, #16A34A, #22C55E)",
                    padding: "0.75rem 1.75rem",
                    borderRadius: "9999px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    boxShadow: "0 4px 20px rgba(22,163,74,0.3)",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 6px 28px rgba(22,163,74,0.45)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(22,163,74,0.3)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Meet the Team →
                </a>

                <a
                  href="#/About"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "#166534",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    textDecoration: "none",
                    transition: "color 0.25s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#16A34A")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#166534")
                  }
                >
                  Our Story ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}