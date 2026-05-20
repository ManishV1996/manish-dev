"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#080e1a]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.5)]"
            : "py-5 bg-transparent"
        }`}
      >
        {/* Top edge glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* ── LOGO ── */}
          <Link href="/" className="relative group flex items-center gap-2.5">
            <img src="/logo.png" alt="Logo" className="w-36 h-9 object-contain" />
            {/* Subtle glow on hover */}
            <span className="absolute -inset-2 rounded-lg bg-blue-500/0 group-hover:bg-blue-500/5 transition-all duration-300 blur-sm" />
          </Link>

          {/* ── DESKTOP NAV ── */}
          <nav className="hidden md:flex items-center">
            {/* Pill container */}
            <div className={`flex items-center gap-1 px-2 py-2 rounded-2xl transition-all duration-500 ${
              scrolled ? "bg-white/[0.03] border border-white/[0.06]" : ""
            }`}>
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="relative px-4 py-2 text-sm font-medium rounded-xl group"
                  >
                    {/* Active background pill */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-xl bg-blue-500/15 border border-blue-500/25"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Text */}
                    <span className={`relative z-10 transition-colors duration-200 ${
                      isActive
                        ? "text-blue-300"
                        : "text-gray-400 group-hover:text-white"
                    }`}>
                      {link.name}
                    </span>

                    {/* Hover underline dot */}
                    {!isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500 scale-0 group-hover:scale-100 transition-transform duration-200" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Hire Me CTA */}
            <motion.div className="ml-4" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
              href="mailto:vermamanish0296@gmail.com?subject=Hiring%20Opportunity&body=Hi%20Manish%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity."
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden group"
              >
                {/* Gradient background */}
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl" />
                {/* Shimmer sweep */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700" />
                {/* Glow */}
                <span className="absolute inset-0 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow duration-300" />

                <span className="relative flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Hire Me
                </span>
              </Link>
            </motion.div>
          </nav>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 group"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-300 rounded-full transition-all duration-300 origin-center ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`} />
            <span className={`block h-0.5 bg-gray-300 rounded-full transition-all duration-300 ${
              mobileOpen ? "opacity-0 w-0" : "w-5"
            }`} />
            <span className={`block w-6 h-0.5 bg-gray-300 rounded-full transition-all duration-300 origin-center ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`} />
          </button>
        </div>
      </motion.header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[72px] left-4 right-4 z-50 md:hidden rounded-2xl bg-[#0d1626]/98 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              {/* Top glow strip */}
              <div className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

              <div className="p-3 space-y-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.05 }}
                    >
                      <Link
                        href={link.path}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-blue-500/15 border border-blue-500/20 text-blue-300"
                            : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile Hire Me */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.05 }}
                  className="pt-2 border-t border-white/[0.06]"
                >
                  <Link
              href="mailto:vermamanish0296@gmail.com?subject=Hiring%20Opportunity&body=Hi%20Manish%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity."
  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-900/30"
>
  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
  Hire Me
</Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}