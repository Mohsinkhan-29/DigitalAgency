import React from "react";

const testimonials = [
  {
    id: 1,
    quote:
      "Our AWS costs dropped by 67% and uptime went from 99.2% to 99.98%. The ROI on this engagement was immediate and measurable.",
    name: "Tom Richards",
    role: "VP Engineering, ScaleOps",
    initials: "TR",
    color: "from-emerald-400 to-green-500",
  },
  {
    id: 2,
    quote:
      "Organic traffic up 420% in under a year. We’re now ranking #1 for every keyword that matters. The ROI speaks for itself.",
    name: "Nina Patel",
    role: "CMO, NovaBrand",
    initials: "NP",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 3,
    quote:
      "200,000 downloads in 90 days. The app quality and the speed of execution genuinely surprised us. We will not work with any other agency.",
    name: "Jamie Moore",
    role: "Founder, Bloom Co.",
    initials: "JM",
    color: "from-lime-400 to-green-500",
  },
];

export default function ClientFeedbackSection() {
  return (
    <section className="relative overflow-hidden bg-[#F0FDF4] py-24">
      {/* Background Rings */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#16A34A]" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#16A34A]" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#16A34A]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-[2px] w-10 bg-[#16A34A]" />

            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#16A34A]">
              Client Feedback
            </span>
          </div>

          <h2 className="max-w-3xl text-4xl font-black tracking-tight text-[#052E16] md:text-6xl">
            Heard Straight from the{" "}
            <span className="text-[#16A34A]">Source</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-7 lg:grid-cols-[1.55fr_0.95fr]">
          {/* Featured Card */}
          <div className="relative overflow-hidden rounded-[34px] bg-[#052E16] p-10 md:p-14 border border-[#15803D]">
            {/* Decorative Rings */}
            <div className="absolute -right-24 -top-20 h-[380px] w-[380px] rounded-full border border-[#4ADE80]/10" />
            <div className="absolute -right-12 top-0 h-[320px] w-[320px] rounded-full border border-[#4ADE80]/10" />
            <div className="absolute right-10 top-10 h-[240px] w-[240px] rounded-full border border-[#4ADE80]/10" />

            {/* Glow */}
            <div className="absolute left-0 top-0 h-52 w-52 rounded-full bg-[#4ADE80]/10 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              {/* Quote */}
              <div className="mb-10 text-7xl leading-none text-[#86EFAC]/30">
                “
              </div>

              {/* Main Text */}
              <p className="max-w-3xl text-xl font-light leading-relaxed text-white md:text-[2rem] md:leading-[1.7]">
                NexaWave didn’t just build us a platform — they handed us a{" "}
                <span className="font-semibold text-[#4ADE80]">
                  growth engine.
                </span>{" "}
                The team understood our business model better than most
                internal hires. Six months after launch, we closed our Series
                A. I genuinely believe the product quality is what made
                investors say yes.
              </p>

              {/* Bottom */}
              <div className="mt-14 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-5">
                  {/* Avatar */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#16A34A] to-[#15803D] text-lg font-bold text-white shadow-lg shadow-[#16A34A]/30">
                    SK
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white">
                      Sara Khan
                    </h4>

                    <p className="text-sm text-[#BBF7D0]">
                      Co-Founder & CTO, FinTrack — Series A, $8M
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="text-xl tracking-[3px] text-[#4ADE80]">
                  ★★★★★
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Cards */}
          <div className="flex flex-col gap-6">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="group rounded-[28px] border border-[#BBF7D0] bg-white p-8 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#16A34A] hover:shadow-2xl hover:shadow-[#86EFAC]/20"
              >
                <p className="text-[15px] leading-8 text-[#4B5563]">
                  “{item.quote}”
                </p>

                <div className="mt-7 flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${item.color} text-sm font-bold text-white shadow-lg shadow-[#16A34A]/20`}
                  >
                    {item.initials}
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#052E16]">
                      {item.name}
                    </h4>

                    <p className="text-sm text-[#166534]">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}