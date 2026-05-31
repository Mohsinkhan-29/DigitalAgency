import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/Services" },
    { label: "About", to: "/About" },
    { label: "Projects", to: "/Project" },
    { label: "Contact", to: "/Contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav
        className={`top-4 left-1/2 -translate-x-1/2 z-50
  w-[min(calc(100%-2rem),72rem)]
  flex items-center justify-between
  px-6 py-3
  rounded-2xl
  border border-[#1E293B]
  bg-[#121826]
  backdrop-blur-xl
  shadow-[0_8px_32px_rgba(0,0,0,0.35),0_2px_8px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(248,250,252,0.08)]
  transition-all duration-300 ease-out
  ${scrolled
            ? "fixed top-2 scale-[0.98] shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
            : "absolute top-4"
          }`}
      >
        <div
          className={`w-full flex items-center justify-between transition-all duration-300 ease-out ${scrolled ? "gap-6" : "gap-8"
            }`}
        >
          {/* Brand */}
          <Link
            to="/"
            aria-label="Digital Agency — Home"
            className="flex items-center gap-2 shrink-0 no-underline"
          >
            <span className="text-[16px] font-bold tracking-[-0.3px] leading-none text-[#F8FAFC]">
              Digital <span className="text-[#22C55E]">Agency</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-[2px] list-none">
            {navItems.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `relative px-[14px] py-[7px] rounded-full text-[14px] font-medium tracking-[-0.1px] whitespace-nowrap transition-all duration-200 ${isActive
                      ? "text-[#22C55E] font-semibold after:content-[''] after:absolute after:bottom-[5px] after:left-1/2 after:-translate-x-1/2 after:w-4 after:h-[2.5px] after:bg-[#22C55E] after:rounded-full"
                      : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#121826]"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-2.5">
            {/* CTA */}
            <Link
              to="/contact"
              aria-label="Get a quote"
              className="hidden md:flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#22C55E] px-[18px] py-[9px] text-[13.5px] font-semibold text-[#0F172A] shadow-[0_2px_10px_rgba(0,0,0,0.25)] transition-all duration-200 hover:bg-[#4ADE80] hover:-translate-y-[1px] active:scale-95"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
              Get a Quote
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="md:hidden w-9 h-9 rounded-[10px] border border-[#1E293B] flex flex-col justify-center gap-[5px] px-[6px] hover:bg-[#121826] transition-all duration-200"
            >
              <span
                className={`block h-[1.8px] rounded bg-[#F8FAFC] transition-all duration-300 origin-center ${menuOpen ? "translate-y-[6.8px] rotate-45" : ""
                  }`}
              />

              <span
                className={`block h-[1.8px] rounded bg-[#F8FAFC] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
              />

              <span
                className={`block h-[1.8px] rounded bg-[#F8FAFC] transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[6.8px] -rotate-45" : ""
                  }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-[99] flex flex-col items-center justify-center gap-6
  bg-[#0B0F19]/90 backdrop-blur-2xl
  transition-all duration-500 ease-out
  ${menuOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 w-11 h-11 rounded-full border border-[#1E293B]
    flex items-center justify-center text-[#F8FAFC]
    bg-[#121826]/60 backdrop-blur-xl
    hover:bg-[#121826] hover:rotate-90
    transition-all duration-300"
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* Nav Links */}
        {navItems.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-[28px] font-semibold tracking-[-0.5px] px-[30px] py-[10px]
        rounded-xl transition-all duration-300 transform
        ${isActive
                ? "text-[#22C55E] bg-[#121826] scale-105"
                : "text-[#F8FAFC] hover:text-[#22C55E] hover:bg-[#121826] hover:scale-105"
              }`
            }
          >
            {label}
          </NavLink>
        ))}

        {/* CTA */}
        <Link
          to="/contact"
          onClick={() => setMenuOpen(false)}
          className="mt-5 rounded-full bg-[#22C55E]
    px-9 py-[13px] text-[#0F172A] text-[16px] font-semibold
    shadow-[0_4px_18px_rgba(0,0,0,0.35)]
    transition-all duration-300 hover:bg-[#4ADE80] hover:scale-105"
        >
          Get a Quote
        </Link>
      </div>
    </>
  );
};

export default Navbar;