"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, MapPin, Phone, ArrowUpRight, ExternalLink, Instagram } from "lucide-react";
import logo1 from "../public/logo1.png"
const WA_NUMBER = "919074730029";
const WA_MESSAGE = encodeURIComponent("Hi Manish, I came across your portfolio and would love to connect!");
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const navLinks = [
  { label: "Home",       href: "/" },
  { label: "Projects",   href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Blog",       href: "/blog" },
  { label: "Contact",    href: "/contact" },
];

const socials = [
  { icon: Github,   href: "https://github.com/ManishV1996",   label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/manish-verma-492107146/",  label: "LinkedIn" },
  { icon: Instagram,  href: "https://www.instagram.com/mr._silent_nature/",   label: "Instagram" },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#070d18] mt-20">

      {/* ── Dot-grid texture ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Top glow border ── */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #3b82f6 30%, #6366f1 60%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-0 left-1/4 right-1/4 h-20 blur-3xl opacity-20"
        style={{ background: "linear-gradient(180deg, #3b82f6, transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-0">

        {/* ── Giant display name ── */}
        
        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-slate-800/60">

          {/* Left — about blurb + socials */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-5 space-y-6"
          >
            <div className="flex gap-3">
             <img src="/logo1.png" alt="Manish Verma logo" className="w-13 h-10 rounded-lg" />            
             <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Building scalable, high-performance web and mobile applications.
              Always looking for challenging problems and great teams to work with.
            </p>
         </div>
            {/* Social icons */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg bg-[#111927] border border-slate-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500 hover:bg-blue-500/10 transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 text-xs font-semibold">
                Open to opportunities
              </span>
            </div>
          </motion.div>

          {/* Middle — nav links */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-3"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-200 text-blue-500">
                      →
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — contact info */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4 space-y-4"
          >
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">
              Get In Touch
            </h3>

            <a
              href="mailto:vermamanish098@gmail.com"
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#111927] border border-slate-700 flex items-center justify-center text-blue-400 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-colors shrink-0">
                <Mail size={14} />
              </div>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors break-all">
                vermamanish098@gmail.com
              </span>
            </a>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#111927] border border-slate-700 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500 group-hover:bg-emerald-500/10 transition-colors shrink-0">
                {/* WhatsApp icon */}
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                +91-9074730029
              </span>
            </a>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#111927] border border-slate-700 flex items-center justify-center text-gray-500 shrink-0">
                <MapPin size={14} />
              </div>
              <span className="text-sm text-gray-500">Noida, Uttar Pradesh, India</span>
            </div>

            {/* CTA button */}
             <motion.a
              href="mailto:vermamanish0296@gmail.com?subject=Hiring%20Opportunity&body=Hi%20Manish%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20opportunity."
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-2 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition shadow-lg shadow-blue-900/30"
            >
              Hire Me <ArrowUpRight size={13} />
            </motion.a>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-xs text-gray-600"
        >
          <span>© {new Date().getFullYear()} Manish Verma. All rights reserved.</span>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <span className="text-blue-500 mx-1">Next.js · Tailwind · Framer Motion</span>
          </div>
        </motion.div>
      </div>

      {/* ── Large watermark name ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-0 right-0 flex justify-center overflow-hidden"
      >
        <span
          className="font-black text-white select-none leading-none"
          style={{
            fontSize: "clamp(4rem, 10vw, 10rem)",
            opacity: 0.078,
            letterSpacing: "-0.04em",
            transform: "translateY(20%)",
          }}
        >
          MANISH VERMA
        </span>
      </div>
    </footer>
  );
}