import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    const [email, setEmail] = React.useState("");
    const [subscribed, setSubscribed] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const subscribe = async () => {
        if (!email) return;
        setLoading(true);
        try {
            const res = await fetch("https://digitalagency-pmrq.onrender.com/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            setSubscribed(true);
            setEmail("");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="bg-[#0B0F19] text-[#F8FAFC] pt-16 pb-8 px-6 md:px-12 lg:px-20 border-t border-[#1E293B]">
            <div className="max-w-7xl mx-auto">
                {/* ───── TOP GRID ───── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">

                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-black">
                            Digital<span className="text-[#22C55E]">Agency</span>
                        </h2>

                        <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed">
                            Strategy-led design and engineering for brands that want to grow.
                            200+ projects shipped across 30+ countries.
                        </p>

                        {/* Socials */}
                        <div className="flex gap-3 mt-6">
                            {["x", "in", "ig", "gh"].map((item) => (
                                <button
                                    key={item}
                                    className="w-9 h-9 rounded-lg border border-[#1E293B] bg-[#121826] hover:border-[#22C55E] transition flex items-center justify-center text-xs font-semibold hover:text-[#22C55E] text-[#94A3B8]"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#F8FAFC]">
                            Quick Links
                        </h3>
                        <ul className="space-y-3 text-sm text-[#94A3B8]">
                            <li><Link to="/" className="hover:text-[#22C55E] transition">Home</Link></li>
                            <li><Link to="/Services" className="hover:text-[#22C55E] transition">Services</Link></li>
                            <li><Link to="/About" className="hover:text-[#22C55E] transition">About</Link></li>
                            <li><Link to="/Project" className="hover:text-[#22C55E] transition">Projects</Link></li>
                            <li><Link to="/Contact" className="hover:text-[#22C55E] transition">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#F8FAFC]">
                            Services
                        </h3>
                        <ul className="space-y-3 text-sm text-[#94A3B8]">
                            <li><a href="#web-dev" className="hover:text-[#22C55E] transition">Web Development</a></li>
                            <li><a href="#digital-marketing" className="hover:text-[#22C55E] transition">Digital Marketing</a></li>
                            <li><a href="#cloud" className="hover:text-[#22C55E] transition">Cloud Solutions</a></li>
                            <li><a href="#uiux" className="hover:text-[#22C55E] transition">UI/UX Design</a></li>
                            <li><a href="#ai" className="hover:text-[#22C55E] transition">AI Integration</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#F8FAFC]">
                            Contact
                        </h3>
                        <div className="text-sm space-y-2 text-[#94A3B8]">
                            <p>hello@nexawave.io</p>
                            <p>+1 (555) 020-7000</p>
                            <p>San Francisco, CA</p>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#F8FAFC]">
                            Newsletter
                        </h3>

                        {subscribed ? (
                            /* ── Subscribed state ── */
                            <div className="flex flex-col items-start gap-2 py-3 px-4 rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/5">
                                <div className="flex items-center gap-2">
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#22C55E]">
                                        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                                            <path d="M1 4L4 7L10 1" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className="text-[#22C55E] font-semibold text-sm">You're subscribed!</span>
                                </div>
                                <p className="text-[#94A3B8] text-xs leading-relaxed">
                                    Thanks for joining. Expect weekly insights straight to your inbox.
                                </p>
                            </div>
                        ) : (
                            /* ── Default state ── */
                            <>
                                <p className="text-sm text-[#94A3B8] mb-4">
                                    Weekly insights on digital growth, design trends, and dev tips.
                                </p>
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && subscribe()}
                                        placeholder="your@email.com"
                                        className="bg-[#121826] border border-[#1E293B] text-[#F8FAFC] placeholder-[#475569] text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#22C55E] transition"
                                    />
                                    <button
                                        onClick={subscribe}
                                        disabled={loading || !email}
                                        className="bg-[#22C55E] hover:bg-[#4ADE80] disabled:opacity-50 disabled:cursor-not-allowed text-[#0F172A] px-6 py-3 rounded-xl transition font-medium shadow-lg shadow-black/30 flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                </svg>
                                                Subscribing…
                                            </>
                                        ) : (
                                            "Subscribe →"
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* ───── BOTTOM BAR ───── */}
                <div className="mt-14 pt-6 border-t border-[#1E293B] flex flex-col md:flex-row justify-between items-center text-sm text-[#94A3B8] gap-4">
                    <p>© 2025 NexaWave. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[#22C55E] transition">Privacy Policy</a>
                        <a href="#" className="hover:text-[#22C55E] transition">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;