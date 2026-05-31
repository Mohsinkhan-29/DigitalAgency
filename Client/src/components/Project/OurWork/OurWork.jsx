import React, { useState, useMemo } from "react";

const projects = [
  {
    id: 1,
    year: 2025,
    category: "Web",
    featured: true,
    badge: "+312% Revenue",
    title: "GreenMart – Sustainable E-Commerce Platform",
    description:
      "A full stack eco-commerce platform with real-time inventory, AI-powered product recommendations, and sub-2-second load times globally. Scaled from 0 to 50,000 daily orders in 6 months.",
    tags: ["Next.js", "Node.js", "Stripe", "AWS"],
    gradient: "from-blue-500 via-blue-600 to-indigo-700",
    icon: "🛒",
    size: "large",
  },
  {
    id: 2,
    year: 2024,
    category: "SaaS",
    badge: "50K Daily Users",
    title: "DataPulse – B2B Analytics SaaS",
    description:
      "Real-time data dashboards for 50,000 daily active users with sub-100ms query response via Redis caching and PostgreSQL optimization.",
    tags: ["Vue.js", "Python", "Redis"],
    gradient: "from-indigo-600 via-blue-700 to-blue-900",
    icon: "📊",
    size: "medium",
  },
  {
    id: 3,
    year: 2024,
    category: "Mobile",
    badge: "4.9★ App Store",
    title: "MediTrack – Patient Health App",
    description:
      "HIPAA-compliant mobile health tracker connecting 10,000+ patients with care teams. Built with React Native and end-to-end encryption.",
    tags: ["React Native", "Firebase"],
    gradient: "from-emerald-500 via-teal-600 to-green-700",
    icon: "🏥",
    size: "medium",
  },
  {
    id: 4,
    year: 2023,
    category: "Web",
    badge: "+180% Leads",
    title: "PropLeaf – Real Estate Platform",
    description:
      "Property search and listing platform with map-based filters, virtual tours, and mortgage calculator. Increased qualified leads by 180% in 60 days.",
    tags: ["React", "Mapbox", "Node.js"],
    gradient: "from-orange-600 via-amber-700 to-yellow-800",
    icon: "🏠",
    size: "medium",
  },
  {
    id: 5,
    year: 2023,
    category: "SaaS",
    badge: "$8M Series A",
    title: "FinTrack – Financial SaaS Dashboard",
    description:
      "Personal finance SaaS with AI-categorized transactions, budget forecasting, and open banking integrations. Product that helped the startup raise $8M.",
    tags: ["Next.js", "Plaid API", "AI"],
    gradient: "from-violet-600 via-purple-700 to-indigo-800",
    icon: "💹",
    size: "medium",
  },
  {
    id: 6,
    year: 2023,
    category: "Mobile",
    badge: "200K Downloads",
    title: "Bloom – Wellness & Mindfulness App",
    description:
      "Guided meditation and daily wellness tracker with AI personalized content. Reached 200K downloads in 90 days with a 4.8-star rating.",
    tags: ["Flutter", "OpenAI", "Supabase"],
    gradient: "from-purple-500 via-violet-600 to-purple-800",
    icon: "🌿",
    size: "medium",
  },
  {
    id: 7,
    year: 2022,
    category: "Web",
    badge: "25K Students",
    title: "EduBridge – Learning Management System",
    description:
      "Custom LMS for a regional education authority serving 25,000 students with live classes, assessments, and progress tracking.",
    tags: ["React", "GraphQL", "WebRTC"],
    gradient: "from-sky-500 via-blue-600 to-cyan-700",
    icon: "🏫",
    size: "medium",
  },
  {
    id: 8,
    year: 2022,
    category: "Marketing",
    badge: "+420% Organic",
    title: "NovaBrand – SEO & Growth Campaign",
    description:
      "12-month SEO and content strategy that took NovaBrand from page 6 to position 1 for their 3 core keywords. Organic traffic up 420%.",
    tags: ["SEO", "Content", "Analytics"],
    gradient: "from-teal-500 via-cyan-600 to-sky-700",
    icon: "📈",
    size: "medium",
  },
  {
    id: 9,
    year: 2021,
    category: "Cloud",
    badge: "-67% Cloud Costs",
    title: "ScaleOps – AWS Infrastructure Migration",
    description:
      "Migrated a legacy monolith to microservices on AWS EKS. Reduced infrastructure costs by 67% and improved uptime from 99.2% to 99.98% SLA.",
    tags: ["AWS EKS", "Terraform", "Kubernetes"],
    gradient: "from-blue-400 via-sky-500 to-blue-600",
    icon: "☁️",
    size: "medium",
  },
];

const categories = ["All", "Web", "SaaS", "Mobile", "Marketing", "Cloud"];

const categoryCount = (cat) =>
  cat === "All"
    ? projects.length
    : projects.filter((p) => p.category === cat).length;

const badgeColors = {
  Web: "bg-[#DCFCE7] text-[#166534]",
  SaaS: "bg-[#DCFCE7] text-[#166534]",
  Mobile: "bg-[#DCFCE7] text-[#166534]",
  Marketing: "bg-[#DCFCE7] text-[#166534]",
  Cloud: "bg-[#DCFCE7] text-[#166534]",
};

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "A–Z", value: "az" },
];

export default function SelectedProjects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = useMemo(() => {
    let list =
      activeCategory === "All"
        ? [...projects]
        : projects.filter((p) => p.category === activeCategory);

    if (sortBy === "newest") list.sort((a, b) => b.year - a.year);
    else if (sortBy === "oldest") list.sort((a, b) => a.year - b.year);
    else if (sortBy === "az") list.sort((a, b) => a.title.localeCompare(b.title));

    return list;
  }, [activeCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#F0FDF4] px-6 py-16 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-px bg-[#16A34A]"></span>
            <span className="text-xs font-semibold tracking-widest text-[#16A34A] uppercase">
              Our Work
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h1 className="text-4xl font-bold text-[#052E16] tracking-tight">
              Selected Projects
            </h1>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                    activeCategory === cat
                      ? "bg-[#16A34A] text-white border-[#16A34A] shadow-md shadow-[#86EFAC]/40"
                      : "bg-white text-[#166534] border-[#BBF7D0] hover:border-[#16A34A] hover:text-[#16A34A]"
                  }`}
                >
                  {cat}
                  <span
                    className={`ml-1.5 text-xs font-semibold ${
                      activeCategory === cat
                        ? "text-[#DCFCE7]"
                        : "text-[#4B5563]"
                    }`}
                  >
                    {categoryCount(cat)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort row */}
          <div className="flex items-center justify-between mt-5">
            <span className="text-sm text-[#4B5563]">
              <span className="font-semibold text-[#052E16]">
                {filtered.length}
              </span>{" "}
              projects found
            </span>

            <div className="flex items-center gap-2">
              <span className="text-sm text-[#166534]">Sort by</span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-[#BBF7D0] rounded-lg px-3 py-1.5 bg-white text-[#052E16] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#86EFAC]"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
          {filtered.map((project, i) => {
            const isLarge =
              project.featured &&
              activeCategory === "All" &&
              sortBy === "newest" &&
              i === 0;

            return (
              <div
                key={project.id}
                className={`group rounded-2xl overflow-hidden border border-[#BBF7D0] shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex flex-col ${
                  isLarge ? "sm:col-span-2" : ""
                }`}
              >
                {/* Image / Gradient Area */}
                <div
                  className={`relative bg-gradient-to-br ${project.gradient} flex items-center justify-center ${
                    isLarge ? "h-52" : "h-36"
                  } overflow-hidden`}
                >
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]" />

                  <span className="text-5xl drop-shadow-md z-10">
                    {project.icon}
                  </span>

                  {/* Category badge */}
                  <span
                    className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      badgeColors[project.category] ||
                      "bg-[#DCFCE7] text-[#166534]"
                    }`}
                  >
                    {project.category}
                  </span>

                  {/* Featured badge */}
                  {project.featured && (
                    <span className="absolute top-3 left-[80px] text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F59E0B]/20 text-[#F59E0B]">
                      ★ Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-[#4B5563] font-medium">
                      {project.year}
                    </span>

                    <span className="text-xs font-semibold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                      ✦ {project.badge}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-[#052E16] mb-2 leading-snug">
                    {project.title}
                  </h2>

                  <p className="text-sm text-[#166534] leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-[#166534] bg-[#DCFCE7] hover:bg-[#BBF7D0] transition-colors px-2.5 py-1 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="ml-3 flex-shrink-0 w-8 h-8 rounded-full border border-[#BBF7D0] flex items-center justify-center text-[#166534] group-hover:border-[#16A34A] group-hover:text-[#16A34A] group-hover:bg-[#DCFCE7] transition-all duration-200">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M7 7h10v10"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>{/* Bottom Text */}
        <div className="mt-20">
          <h3 className="max-w-5xl text-5xl font-black leading-none tracking-tight text-[#052E16] md:text-7xl">
            Work That{" "}
            <span className="text-[#16A34A]">Speaks for</span> Itself
          </h3>

          <p className="mt-8 max-w-4xl text-xl leading-relaxed text-[#166534]">
            200+ projects shipped across web, mobile, cloud, and marketing.
            Every one built to move a metric that matters.
          </p>
        </div>
      </div>
      
    </div>
  );
}