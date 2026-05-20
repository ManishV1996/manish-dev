"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import Link from "next/link";

// --- THREE.JS PARTICLES BACKGROUND ---
const ThreeParticles = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Particle geometry
    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorOptions = [
      new THREE.Color(0x3b82f6), // blue-500
      new THREE.Color(0x6366f1), // indigo-500
      new THREE.Color(0x14b8a6), // teal-500
      new THREE.Color(0x8b5cf6), // violet-500
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size",     new THREE.BufferAttribute(sizes, 1));

    // Circular sprite texture
    const canvas = document.createElement("canvas");
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,0.6)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      map: texture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.7,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotation.y = mouse.x * 0.4;
      targetRotation.x = mouse.y * 0.2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize handler
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      // Smooth follow
      particles.rotation.y += (targetRotation.y - particles.rotation.y) * 0.04;
      particles.rotation.x += (targetRotation.x - particles.rotation.x) * 0.04;
      // Gentle idle drift
      particles.rotation.y += 0.0008;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// --- ANIMATION VARIANTS ---
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

// --- TECH DATA ---
const techCategories = [
  {
    label: "Frontend",
    color: "from-blue-600/20 to-blue-900/10",
    border: "border-blue-800/40",
    accent: "text-blue-400",
    dot: "bg-blue-500",
    items: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 88 },
      { name: "React Native", level: 82 },
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Bootstrap", level: 85 },
      { name: "HTML / CSS", level: 95 },
    ],
  },
  {
    label: "Backend",
    color: "from-teal-600/20 to-teal-900/10",
    border: "border-teal-800/40",
    accent: "text-teal-400",
    dot: "bg-teal-500",
    items: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 87 },
      { name: "REST APIs", level: 90 },
      { name: "WebSocket / Socket.IO", level: 75 },
      { name: "Python", level: 65 },
    ],
  },
  {
    label: "Database & Tools",
    color: "from-indigo-600/20 to-indigo-900/10",
    border: "border-indigo-800/40",
    accent: "text-indigo-400",
    dot: "bg-indigo-500",
    items: [
      { name: "MongoDB", level: 87 },
      { name: "Redux / Context API", level: 85 },
      { name: "Git & GitHub", level: 90 },
      { name: "Dataflow", level: 70 },
    ],
  },
];

const stats = [
  { value: "4+", label: "Years Experience", icon: "⚡" },
  { value: "5+", label: "Apps Deployed", icon: "🚀" },
  { value: "3+", label: "Clients Served", icon: "🤝" },
  { value: "3+", label: "Industries Experienced", icon: "🏭" },
];

const certs = [
  {
    title: "MERN Stack Development",
    period: "Oct 2022 – Nov 2023",
    desc: "MongoDB, Express.js, React.js, Node.js full-stack development",
    icon: "🧩",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
    gradient: "from-blue-600/10 to-indigo-600/10",
    border: "border-blue-700/30",
    accentColor: "text-blue-400",
    badgeColor: "bg-blue-500/10 text-blue-300 border-blue-700/30",
    glowColor: "rgba(59,130,246,0.15)",
  },
  {
    title: "Information Security",
    period: "Feb 2019 – Jul 2019",
    desc: "Cybersecurity protocols, best practices, and risk management",
    icon: "🔐",
    tags: ["Cybersecurity", "Risk Management", "Best Practices"],
    gradient: "from-teal-600/10 to-emerald-600/10",
    border: "border-teal-700/30",
    accentColor: "text-teal-400",
    badgeColor: "bg-teal-500/10 text-teal-300 border-teal-700/30",
    glowColor: "rgba(20,184,166,0.15)",
  },
];

export default function Home() {
  return (
    <main className="relative selection:bg-blue-500/30">
      <ThreeParticles />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">

        {/* ── HERO ── */}
        <section className="flex flex-col md:flex-row items-center justify-between py-20 gap-12">
          <motion.div
            className="flex-1 space-y-8"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-4xl font-bold leading-[1.1] tracking-tight text-white"
            >
              Crafting digital <br />
              experiences with <br />
              <span className="text-blue-500">precision and passion</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-gray-400 text-lg max-w-lg">
              Full-Stack Developer specializing in Web and Mobile App development
              with React, Next.js, and Node.js.
            </motion.p>

            <motion.div variants={fadeIn} className="flex gap-4">
              <Link href="/projects" scroll={false}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                View My Work
              </button>
              </Link>
              <Link href="/contact" scroll={false}>
              <button className="border border-slate-700 hover:bg-slate-800 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Contact Me
              </button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-end justify-center">
              <motion.img
                src="/My_Banner.png"
                alt="Banner"
                className="w-4/4 h-3/4 bg-slate-300 rounded-lg shadow-2xl border border-white/10"
                whileHover={{ y: -10, rotateZ: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          </motion.div>
        </section>

        {/* ── STATS BAR ── */}
        <motion.section
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeIn}
              whileHover={{ y: -4, borderColor: "rgba(59,130,246,0.5)" }}
              className="bg-[#111927]/80 border border-slate-800 rounded-xl p-6 text-center transition-all"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
              <div className="text-xs text-gray-500 tracking-wide uppercase">{s.label}</div>
            </motion.div>
          ))}
        </motion.section>

        {/* ── ABOUT ── */}
        <motion.section
          className="py-6 grid md:grid-cols-3 gap-12 border-t border-slate-800/50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="md:col-span-2 space-y-6">
            <motion.h2 variants={fadeIn} className="text-3xl font-bold text-white">
              About Me
            </motion.h2>
            <motion.p variants={fadeIn} className="text-gray-400 leading-relaxed text-md">
              With over 4 years 6 months of hands-on experience, I build scalable web and mobile
              applications using modern technologies. My focus lies in crafting seamless
              user experiences and responsive designs, backed by solid backend development
              and database management skills. I thrive in collaborative environments,
              delivering high-quality solutions tailored to client needs — from agri-industry
              field tools to healthcare platforms and ERP systems.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-1 pt-4">
              {["React.js", "Next.js", "React Native", "JavaScript", "MongoDB", "Node.js", "Express.js", "Python"].map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.05, backgroundColor: "#1d283a", borderColor: "#3b82f6" }}
                  className="px-3 py-2 rounded-full bg-[#161f30] text-blue-400 text-sm border border-blue-900/30 cursor-default transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeIn}
            className="bg-[#111927]/80 backdrop-blur-sm p-8 rounded-lg border border-slate-800 space-y-8"
          >
            <StatItem icon={<ShieldIcon />} title="Full Stack Developer" subtitle="Active since 2022" />
            <StatItem icon={<BoxIcon />} title="5+ Deployments" subtitle="Production grade apps" />
            <StatItem icon={<UsersIcon />} title="3+ Clients Served" subtitle="Across industries" />
          </motion.div>
        </motion.section>

        {/* ── TECHNOLOGIES ── */}
        <motion.section
          className="py-6 border-t border-slate-800/50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Technologies</h2>
            <p className="text-gray-400">
              Tools and frameworks I work with daily to ship production-ready applications.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {techCategories.map((cat) => (
              <motion.div
                key={cat.label}
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className={`bg-gradient-to-br ${cat.color} border ${cat.border} rounded-xl p-6 space-y-5 transition-all`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                  <h3 className={`font-bold text-sm tracking-widest uppercase ${cat.accent}`}>
                    {cat.label}
                  </h3>
                </div>

                {cat.items.map((tech) => (
                  <div key={tech.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm font-medium">{tech.name}</span>
                      <span className="text-gray-500 text-xs">{tech.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${cat.dot}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── FULL TOOLKIT ── */}
        <motion.section
          className="py-6 border-t border-slate-800/50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Full Toolkit</h2>
            <p className="text-gray-400">Every technology I&apos;ve shipped with.</p>
          </motion.div>

          <motion.div variants={fadeIn} className="flex flex-wrap gap-3">
            {[
              "React.js", "Next.js", "React Native", "JavaScript", "ES6+",
              "HTML5", "CSS3", "Tailwind CSS", "Bootstrap",
              "Node.js", "Express.js", "REST API", "WebSocket", "Socket.IO",
              "MongoDB", "Redux", "Context API", "Git", "GitHub",
              "Python", "Dataflow", "JWT", "Postman",
            ].map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-4 py-2 rounded-lg bg-[#111927] border border-slate-700/50 text-gray-300 text-sm font-mono cursor-default hover:border-blue-500/50 hover:text-blue-300 transition-all"
              >
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </motion.section>

        {/* ── CERTIFICATIONS (redesigned) ── */}
        <motion.section
          className="py-6 border-t border-slate-800/50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Certifications</h2>
            <p className="text-gray-400">Formal training that backs the hands-on work.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {certs.map((cert, idx) => (
              <motion.div
                key={cert.title}
                variants={fadeIn}
                whileHover={{ y: -6, boxShadow: `0 20px 60px ${cert.glowColor}` }}
                className={`relative overflow-hidden bg-gradient-to-br ${cert.gradient} border ${cert.border} rounded-2xl p-7 transition-all group`}
              >
                {/* Decorative number */}
                <span className="absolute top-4 right-6 text-7xl font-black text-white/[0.03] select-none leading-none">
                  0{idx + 1}
                </span>

                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.gradient} border ${cert.border} flex items-center justify-center text-2xl shadow-lg`}>
                      {cert.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base leading-tight">{cert.title}</h3>
                      <span className={`text-xs font-mono mt-0.5 block ${cert.accentColor}`}>
                        📅 {cert.period}
                      </span>
                    </div>
                  </div>
                  {/* Verified badge */}
                  <span className={`shrink-0 flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${cert.badgeColor} font-semibold`}>
                    ✓ Certified
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{cert.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-3 py-1 rounded-full border font-mono ${cert.badgeColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom shimmer line */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${cert.gradient.replace("/10", "/60").replace("/10", "/60")}`}
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + idx * 0.2, ease: "easeOut" }}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── EDUCATION (redesigned) ── */}
        <motion.section
          className="py-6 border-t border-slate-800/50"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Education</h2>
            <p className="text-gray-400">The foundation behind the code.</p>
          </motion.div>

          <motion.div
            variants={fadeIn}
            whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(99,102,241,0.15)" }}
            className="relative overflow-hidden bg-gradient-to-br from-indigo-600/10 to-violet-600/10 border border-indigo-700/30 rounded-2xl p-8 transition-all group"
          >
            {/* Decorative BCA text */}
            <span className="absolute top-3 right-8 text-8xl font-black text-white/[0.03] select-none leading-none tracking-tighter">
              BCA
            </span>

            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Icon */}
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-700/40 flex items-center justify-center text-3xl shadow-lg">
                  🎓
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white text-xl leading-tight mb-1">
                      Bachelor of Computer Applications
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-indigo-400 font-semibold text-sm">Jiwaji University</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-gray-500 text-sm">Gwalior, Madhya Pradesh</span>
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="shrink-0 flex flex-col items-start md:items-end gap-1">
                    <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-700/30 text-indigo-300 text-xs font-mono px-3 py-1.5 rounded-full">
                      📅 Aug 2014 – May 2018
                    </span>
                    <span className="text-xs text-gray-600 font-mono">4 years · Full-time</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-wrap gap-2">
                  {["Computer Science", "Software Engineering", "Database Systems", "Algorithms", "Networking"].map((subject) => (
                    <span
                      key={subject}
                      className="text-xs px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/40 text-gray-400 font-mono"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom shimmer line */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500/60 to-violet-500/60"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            />
          </motion.div>
        </motion.section>

      </div>
    </main>
  );
}

// --- HELPER COMPONENTS ---
function StatItem({ icon, title, subtitle }) {
  return (
    <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4 group">
      <div className="p-2 bg-blue-600/20 rounded-lg text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-white">{title}</h4>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </motion.div>
  );
}

// --- ICONS ---
const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);
const BoxIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);
const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);