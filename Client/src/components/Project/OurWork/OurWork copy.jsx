import React, { useMemo, useState } from "react";

const projects = [
    {
        id: 1,
        year: 2025,
        category: "Web",
        featured: true,
        badge: "+312% Revenue",
        title: "GreenMart – Sustainable E-Commerce",
        description:
            "AI-powered eco-commerce platform with global scaling and lightning-fast performance.",
        tags: ["Next.js", "Node.js", "AWS"],
        icon: "🛒",
    },
    {
        id: 2,
        year: 2024,
        category: "SaaS",
        badge: "50K Users",
        title: "DataPulse – Analytics SaaS",
        description:
            "Real-time dashboards optimized for large-scale enterprise data systems.",
        tags: ["Vue", "Python", "Redis"],
        icon: "📊",
    },
    {
        id: 3,
        year: 2024,
        category: "Mobile",
        badge: "4.9★ Rating",
        title: "MediTrack – Health App",
        description:
            "Secure healthcare platform connecting patients with care providers.",
        tags: ["React Native", "Firebase"],
        icon: "🏥",
    },
    {
        id: 4,
        year: 2023,
        category: "Marketing",
        badge: "+420% Organic",
        title: "NovaBrand – SEO Campaign",
        description:
            "SEO growth strategy that massively increased search visibility and leads.",
        tags: ["SEO", "Analytics"],
        icon: "📈",
    },
    {
        id: 5,
        year: 2023,
        category: "Cloud",
        badge: "-67% Costs",
        title: "ScaleOps – AWS Migration",
        description:
            "Migrated legacy infrastructure to scalable cloud-native architecture.",
        tags: ["AWS", "Kubernetes"],
        icon: "☁️",
    },
];

const categories = ["All", "Web", "SaaS", "Mobile", "Marketing", "Cloud"];

const sortOptions = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "A-Z", value: "az" },
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
        if (sortBy === "oldest") list.sort((a, b) => a.year - b.year);
        if (sortBy === "az") list.sort((a, b) => a.title.localeCompare(b.title));

        return list;
    }, [activeCategory, sortBy]);

    return (
        <section className="bg-[#f4f6f8] py-20 px-5 md:px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-5">
                            <span className="w-10 h-[2px] bg-[#16a34a]" />
                            <span className="text-sm tracking-[0.3em] uppercase font-semibold text-[#16a34a]">
                                Our Work
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black leading-none text-[#08112b]">
                            Selected <span className="text-[#16a34a]">Projects</span>
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-[#64748b]">
                            A collection of modern digital products, scalable platforms,
                            mobile apps, and cloud solutions crafted for ambitious brands.
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col gap-4">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2 rounded-full border text-sm font-medium transition ${activeCategory === cat
                                            ? "bg-[#16a34a] text-white border-[#16a34a]"
                                            : "bg-white text-[#475569] border-[#dbe2ea] hover:border-[#16a34a] hover:text-[#16a34a]"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Sort */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-[#64748b]">Sort by</span>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="h-11 px-4 rounded-xl border border-[#dbe2ea] bg-white text-sm text-[#08112b] outline-none focus:border-[#16a34a]"
                            >
                                {sortOptions.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filtered.map((project, index) => {
                        const featured =
                            project.featured &&
                            activeCategory === "All" &&
                            sortBy === "newest" &&
                            index === 0;

                        return (
                            <div
                                key={project.id}
                                className={`group overflow-hidden rounded-[30px] border border-[#e5e7eb] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${featured ? "md:col-span-2" : ""
                                    }`}
                            >
                                {/* Top */}
                                <div className="relative bg-[#eef2f5] p-8 flex items-center justify-between border-b border-[#edf1f4]">
                                    <div>
                                        <span className="inline-flex items-center rounded-full bg-[#16a34a]/10 px-3 py-1 text-xs font-semibold text-[#16a34a]">
                                            {project.category}
                                        </span>

                                        {project.featured && (
                                            <span className="ml-2 inline-flex items-center rounded-full bg-[#08112b] px-3 py-1 text-xs font-semibold text-white">
                                                Featured
                                            </span>
                                        )}
                                    </div>

                                    <span className="text-5xl">{project.icon}</span>
                                </div>

                                {/* Content */}
                                <div className="p-7">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-sm font-medium text-[#94a3b8]">
                                            {project.year}
                                        </span>

                                        <span className="rounded-full bg-[#eef7f1] px-3 py-1 text-xs font-semibold text-[#16a34a]">
                                            {project.badge}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold leading-tight text-[#08112b]">
                                        {project.title}
                                    </h2>

                                    <p className="mt-4 text-[15px] leading-7 text-[#64748b]">
                                        {project.description}
                                    </p>

                                    {/* Footer */}
                                    <div className="mt-6 flex items-end justify-between gap-4">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-medium text-[#475569]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-[#dbe2ea] text-[#08112b] transition group-hover:border-[#16a34a] group-hover:bg-[#16a34a] group-hover:text-white">
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
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
                </div>
            </div>
        </section>
    );
}