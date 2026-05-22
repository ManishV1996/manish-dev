"use client";

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// --- THREE.JS PARTICLES BACKGROUND ---
const ThreeParticles = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorOptions = [
      new THREE.Color(0x3b82f6),
      new THREE.Color(0x6366f1),
      new THREE.Color(0x14b8a6),
      new THREE.Color(0x8b5cf6),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(255,255,255,0.6)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      map: new THREE.CanvasTexture(canvas),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.7,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const targetRotation = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      targetRotation.y = ((e.clientX / window.innerWidth) * 2 - 1) * 0.4;
      targetRotation.x = (-(e.clientY / window.innerHeight) * 2 + 1) * 0.2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      particles.rotation.y += (targetRotation.y - particles.rotation.y) * 0.04;
      particles.rotation.x += (targetRotation.x - particles.rotation.x) * 0.04;
      particles.rotation.y += 0.0008;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};
const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, x: -40, transition: { duration: 0.25, ease: 'easeIn' } },
};

// --- WHATSAPP ---
const WA_NUMBER = "919074730029";
const WA_MESSAGE = encodeURIComponent("Hi Manish, I came across your portfolio and would love to connect!");
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

// --- PROJECTS ---
const projects = [
  { name: "SuprSales",        tech: "React Native, MERN Stack", desc: "Enterprise mobility CRM platform for managing sales operations and real-time reporting.",          color: "from-blue-600/10 to-blue-900/5",     border: "border-blue-800/30",   accent: "text-blue-400",   dot: "bg-blue-500"   },
  { name: "Q-Tags",           tech: "React.js, Next.js",        desc: "A QR-based product identification and tracking system for inventory management.",                  color: "from-teal-600/10 to-teal-900/5",     border: "border-teal-800/30",   accent: "text-teal-400",   dot: "bg-teal-500"   },
  { name: "Plant Management", tech: "MERN Stack",               desc: "Centralized system for managing plant operations, assets, and maintenance workflows.",             color: "from-indigo-600/10 to-indigo-900/5", border: "border-indigo-800/30", accent: "text-indigo-400", dot: "bg-indigo-500" },
  { name: "Aarogyam",         tech: "React.js",                 desc: "Healthcare platform for doctor appointment scheduling and patient management.",                    color: "from-emerald-600/10 to-emerald-900/5",border:"border-emerald-800/30",accent:"text-emerald-400", dot:"bg-emerald-500"},
  { name: "GatePass Go",      tech: "MERN Stack",               desc: "Gate pass management system for tracking entry-exit of visitors and material.",                   color: "from-violet-600/10 to-violet-900/5", border: "border-violet-800/30", accent: "text-violet-400", dot: "bg-violet-500" },
  { name: "Taskly",           tech: "MERN Stack",               desc: "Workflow management platform designed to improve team productivity and collaboration.",            color: "from-rose-600/10 to-rose-900/5",     border: "border-rose-800/30",   accent: "text-rose-400",   dot: "bg-rose-500"   },
];

// --- CAREER HISTORY DATA ---
const careerHistory = [
  {
    title: "Junior Frontend Developer",
    company: "Crapplet Infotech Pvt. Ltd.",
    period: "Feb 2022 – Aug 2023",
    duration: "1 yr 7 mos",
    location: "Gwalior, Madhya Pradesh · Remote",
    type: "Full-time",
    accentClass: "text-blue-400",
    borderClass: "border-blue-500",
    bgAccent: "bg-blue-500",
    gradFrom: "from-blue-600/10",
    gradTo: "to-blue-900/5",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design", "Cross-browser Compatibility", "UI Components", "Performance Optimization", "Debugging"],
    overview:
      "Worked as a Junior Frontend Developer at Crapplet Infotech Pvt. Ltd., building responsive and visually appealing web interfaces. Focused on translating design mockups into functional pages while maintaining clean, reusable code and collaborating closely with the team to enhance user experience.",
    responsibilities: [
      "Developed responsive web pages using HTML, CSS, and JavaScript.",
      "Created user-friendly and visually appealing UI components.",
      "Worked on website layouts, styling, and cross-browser compatibility.",
      "Improved webpage responsiveness for both desktop and mobile devices.",
      "Converted design mockups into fully functional web interfaces.",
      "Maintained clean, reusable, and well-structured frontend code.",
      "Collaborated with team members to enhance user experience and interface design.",
      "Implemented interactive features using JavaScript.",
      "Optimized website performance and loading speed.",
      "Participated in testing and debugging of frontend issues.",
    ],
    highlights: [
      { label: "Duration", value: "1 yr 7 mos" },
      { label: "Type", value: "Full-time" },
      { label: "Mode", value: "Remote" },
      { label: "Location", value: "Gwalior" },
    ],
    projects: [
      { name: "Responsive UI Components", desc: "Built reusable, cross-browser compatible UI components used across multiple client projects." },
      { name: "Design-to-Code Pipelines", desc: "Converted Figma and PSD mockups into pixel-perfect, responsive web interfaces." },
      { name: "Performance Optimization", desc: "Identified and resolved frontend bottlenecks, improving page load speed and overall UX." },
    ],
  },
  {
    title: "Frontend Developer (Intern)",
    company: "Crapplet Infotech Pvt. Ltd.",
    period: "Nov 2021 – Feb 2022",
    duration: "4 mos",
    location: "Gwalior, Madhya Pradesh · Remote",
    type: "Internship",
    accentClass: "text-teal-400",
    borderClass: "border-teal-500",
    bgAccent: "bg-teal-500",
    gradFrom: "from-teal-600/10",
    gradTo: "to-teal-900/5",
    tech: ["HTML", "CSS", "JavaScript", "UI Design", "Debugging", "Web Styling"],
    overview:
      "Joined Crapplet Infotech as a Frontend Developer Intern, learning the foundations of professional web development. Assisted the core team in building and improving web pages while picking up best practices in frontend development, debugging, and UI design.",
    responsibilities: [
      "Assisted in developing responsive web pages using HTML, CSS, and JavaScript.",
      "Worked on UI design improvements and webpage styling.",
      "Learned frontend development best practices and debugging techniques.",
      "Supported the team in cross-browser testing and fixing layout issues.",
      "Gained exposure to real-world project workflows and version control practices.",
    ],
    highlights: [
      { label: "Duration", value: "4 mos" },
      { label: "Type", value: "Internship" },
      { label: "Mode", value: "Remote" },
      { label: "Converted To", value: "Full-time" },
    ],
    projects: [
      { name: "UI Styling Improvements", desc: "Contributed to improving the visual design and layout consistency across multiple web pages." },
      { name: "Debugging Support", desc: "Assisted senior developers in identifying and resolving frontend bugs and compatibility issues." },
    ],
  },
  {
    title: "ERP Software Support",
    company: "Globus Infotech",
    period: "2017 – 2018",
    duration: "1 yr",
    location: "Noida, U.P.",
    type: "Full-time",
    accentClass: "text-violet-400",
    borderClass: "border-violet-500",
    bgAccent: "bg-violet-500",
    gradFrom: "from-violet-600/10",
    gradTo: "to-violet-900/5",
    tech: ["ERP Systems", "SQL", "Technical Support", "Documentation", "Data Migration"],
    overview:
      "Handled end-to-end technical support and client onboarding for ERP software products. Served as the primary bridge between clients and the development team, ensuring smooth system operations.",
    responsibilities: [
      "Provided end-to-end technical support and troubleshooting for ERP software modules.",
      "Assisted clients with onboarding, data migration, and system configuration.",
      "Documented common issues and created support guides to reduce resolution time.",
      "Coordinated with the development team to escalate and resolve critical client-reported bugs.",
      "Conducted training sessions for new clients on ERP system features and workflows.",
      "Managed SQL queries for data extraction and reporting requirements.",
    ],
    highlights: [
      { label: "Clients Handled", value: "20+" },
      { label: "Avg Resolution", value: "< 24h" },
      { label: "Duration", value: "1 yr" },
      { label: "Uptime Maintained", value: "99%" },
    ],
    projects: [
      { name: "Client Onboarding System", desc: "Streamlined onboarding flow reducing setup time from 5 days to 2." },
      { name: "Issue Tracker KB", desc: "Internal knowledge base of 100+ resolved issues for faster future resolution." },
    ],
  },
];

// =====================================================================
// CAREER DETAIL PAGE — replaces entire page content
// =====================================================================
const CareerDetailPage = ({ job, onBack }) => (
  <motion.div
    key="detail"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="relative z-10 text-white pb-16"
  >
    <section className="max-w-7xl mx-auto px-6 pt-10">

      {/* Back button */}
      <motion.button
        onClick={onBack}
        whileHover={{ x: -4 }}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10 group"
      >
        <span className="text-lg group-hover:text-blue-400 transition-colors">←</span>
        Back to Experience
      </motion.button>

      {/* Hero header card */}
      <div className={`bg-gradient-to-br ${job.gradFrom} ${job.gradTo} border ${job.borderClass} rounded-2xl p-8 mb-10`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`w-3 h-3 rounded-full ${job.bgAccent}`} />
              <span className={`text-xs font-bold uppercase tracking-widest ${job.accentClass}`}>{job.type}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-400">
              <span className="font-semibold text-gray-200">🏢 {job.company}</span>
              <span>📅 {job.period}</span>
              <span>📍 {job.location}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:min-w-[340px]">
            {job.highlights.map((h, i) => (
              <div key={i} className="bg-[#0d1520]/70 border border-slate-700/50 rounded-xl p-3 text-center">
                <div className={`text-xl font-black ${job.accentClass}`}>{h.value}</div>
                <div className="text-[10px] text-gray-500 mt-0.5 leading-tight">{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="md:col-span-2 space-y-12">

          {/* Overview */}
          <motion.section variants={fadeInUp} initial="initial" animate="animate">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-1 h-8 ${job.bgAccent} rounded-full`} />
              <h2 className="text-xl font-bold">Role Overview</h2>
            </div>
            <p className="text-gray-400 leading-relaxed">{job.overview}</p>
          </motion.section>

          {/* Responsibilities */}
          <motion.section variants={staggerContainer} initial="initial" animate="animate">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-1 h-8 ${job.bgAccent} rounded-full`} />
              <h2 className="text-xl font-bold">Key Responsibilities</h2>
            </div>
            <div className="space-y-3">
              {job.responsibilities.map((r, i) => (
                <motion.div key={i} variants={fadeInUp} className="flex items-start gap-4 group">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${job.bgAccent} opacity-70 group-hover:opacity-100 transition-opacity`} />
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">{r}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Notable Work */}
          <motion.section variants={staggerContainer} initial="initial" animate="animate">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-1 h-8 ${job.bgAccent} rounded-full`} />
              <h2 className="text-xl font-bold">Notable Work</h2>
            </div>
            <div className="space-y-3">
              {job.projects.map((p, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ x: 6 }}
                  className={`bg-gradient-to-br ${job.gradFrom} ${job.gradTo} border ${job.borderClass}/50 rounded-xl p-5 cursor-default`}
                >
                  <h4 className={`font-bold text-sm mb-1 ${job.accentClass}`}>{p.name}</h4>
                  <p className="text-gray-500 text-sm">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div variants={fadeInUp} initial="initial" animate="animate"
            className="bg-[#111927]/80 backdrop-blur-sm border border-slate-800 p-6 rounded-xl"
          >
            <h3 className="font-bold mb-5">🛠 Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {job.tech.map((t) => (
                <motion.span
                  key={t}
                  whileHover={{ scale: 1.08 }}
                  className={`px-3 py-1.5 text-xs rounded-md border ${job.borderClass} ${job.accentClass} bg-slate-900/50 cursor-default`}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} initial="initial" animate="animate"
            className="bg-[#111927]/80 backdrop-blur-sm border border-slate-800 p-6 rounded-xl"
          >
            <h3 className="font-bold mb-4">📋 Quick Info</h3>
            <div className="space-y-3">
              {[
                { label: "Company",  value: job.company },
                { label: "Period",   value: job.period },
                { label: "Duration", value: job.duration },
                { label: "Location", value: job.location },
                { label: "Type",     value: job.type },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center text-sm border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="text-gray-200 font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </motion.div>
);

// =====================================================================
// MAIN EXPERIENCE PAGE
// =====================================================================
const MainExperiencePage = ({ onCareerClick }) => (
  <motion.div
    key="main"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="relative z-10 text-white pb-10"
  >
    <section className="max-w-7xl mx-auto px-6 pt-10">

      {/* Header */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12"
      >
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="w-20 h-20 bg-[#111927] border border-slate-800 rounded-lg flex items-center justify-center p-1 shadow-xl"
        >
          <img src="/samishti_logo.jpg" alt="Logo" className="w-14 h-14 rounded-lg" />
        </motion.div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">
            Associate Consultant{' '}
            <span className="text-blue-500">(Full Stack Developer)</span>
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
            <Link href="https://samishti.com/">
              <span className="flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors cursor-pointer">
                🏢 Samishti Infotech Pvt. Ltd.
              </span>
            </Link>
            <span className="flex items-center gap-2">📅 Dec 2023 – Current</span>
            <span className="flex items-center gap-2">📍 Noida, U.P.</span>
          </div>
        </div>

        <div className="flex gap-3">
          <motion.a
            href="https://drive.google.com/file/d/1br4ZS6gsBhyXZK1rxYfzab1uRz_9zdDA/view?usp=sharing"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition shadow-lg shadow-blue-900/20"
          >
            <span>📥</span> Download Resume
          </motion.a>
          <motion.a
            href={WA_LINK}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="bg-[#25D366] hover:bg-[#1ebe5d] px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition border border-[#25D366]/50 shadow-lg shadow-green-900/20 text-white"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contact on WhatsApp
          </motion.a>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Left column */}
        <div className="md:col-span-2 space-y-16">
          <motion.section variants={fadeInUp}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1 h-8 bg-blue-600 rounded-full" />
              <h2 className="text-xl font-bold">Role Overview</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-md">
              Developed and maintained dynamic web and mobile applications using{' '}
              <span className="text-blue-400 font-semibold">React.js</span> and{' '}
              <span className="text-blue-400 font-semibold">React Native</span>, ensuring seamless
              user experiences. Collaborated with cross-functional teams to integrate APIs and manage
              state with <span className="text-blue-400 font-semibold">Redux</span> or{' '}
              <span className="text-blue-400 font-semibold">Context API</span>.
            </p>
          </motion.section>

          <motion.section variants={staggerContainer}>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-8 bg-blue-600 rounded-full" />
              <h2 className="text-xl font-bold">Core Responsibilities</h2>
            </div>
            <div className="space-y-4">
              {[
                { title: "Frontend Excellence", desc: "Proficient in creating responsive designs for agro-industry and corporate clients.", icon: "🎨" },
                { title: "State Management",    desc: "Expert implementation of Redux and Context API for complex project architectures.", icon: "🛠️" },
                { title: "System Efficiency",   desc: "Optimized operational efficiency and security workflows through custom features.", icon: "⚙️" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  className="flex gap-4 group cursor-default ml-6"
                >
                  <div className="text-2xl pt-1 opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-sm mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <motion.div variants={fadeInUp} className="bg-[#111927]/80 backdrop-blur-sm border border-slate-800 p-6 rounded-xl">
            <h3 className="font-bold mb-6 flex items-center gap-2">🚀 Tech Stack</h3>
            <motion.div variants={staggerContainer} className="flex flex-wrap gap-2">
              {["React.js","React Native","Redux","Next.js","Node.js","Express.js","JavaScript","Tailwind CSS","MongoDB","Git","Python"].map((tool) => (
                <motion.span
                  key={tool}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.1, backgroundColor: "#2563eb", color: "#fff" }}
                  className="px-3 py-1.5 bg-[#1e293b] text-gray-300 text-xs rounded-md border border-slate-700 cursor-default transition-colors"
                >
                  {tool}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Career History — each item is a clickable button that swaps the whole page */}
          <motion.div variants={fadeInUp} className="bg-[#111927]/80 backdrop-blur-sm border border-slate-800 p-6 rounded-xl">
            <h3 className="font-bold mb-1">Career History</h3>
            <p className="text-[10px] text-gray-600 mb-5">Click a role to view full details</p>
            <div className="space-y-4">
              {careerHistory.map((job, i) => (
                <motion.button
                  key={i}
                  onClick={() => onCareerClick(job)}
                  whileHover={{ x: 6 }}
                  className={`w-full text-left ${i > 0 ? "border-t border-slate-800 pt-4" : ""} pl-3 border-l-2 border-transparent hover:border-blue-500 transition-all group`}
                >
                  <h5 className="text-sm font-bold text-gray-200 group-hover:text-blue-400 transition-colors flex items-center justify-between">
                    {job.title}
                    <span className="text-gray-600 group-hover:text-blue-400 text-xs transition-colors">→</span>
                  </h5>
                  <p className="text-[10px] text-gray-500 mt-0.5">{job.company}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{job.period} · {job.duration}</p>
                  <span className={`inline-block mt-1 text-[8px] px-1.5 py-0.5 rounded border ${job.borderClass} ${job.accentClass} bg-slate-900/50`}>{job.type}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Projects */}
      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4 my-10">
          <div className="w-1 h-8 bg-blue-600 rounded-full" />
          <h2 className="text-2xl font-bold">Tenure Projects</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -8, boxShadow: `0 20px 40px rgba(0,0,0,0.3)` }}
              className={`relative overflow-hidden bg-gradient-to-br ${project.color} border ${project.border} rounded-xl transition-all group`}
            >
              <span className="absolute top-2 right-4 text-6xl font-black text-white/[0.04] select-none leading-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="p-6 relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-2 h-2 rounded-full ${project.dot}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${project.accent}`}>{project.tech}</span>
                </div>
                <h4 className={`font-bold text-lg mb-2 group-hover:${project.accent} transition-colors`}>{project.name}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{project.desc}</p>
              </div>
              <motion.div
                className={`absolute bottom-0 left-0 h-[2px] ${project.dot}`}
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

    </section>
  </motion.div>
);

// =====================================================================
// ROOT EXPORT
// =====================================================================
export default function Experience() {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="relative">
      <ThreeParticles />
      <AnimatePresence mode="wait">
        {selectedJob ? (
          <CareerDetailPage
            key="detail"
            job={selectedJob}
            onBack={() => setSelectedJob(null)}
          />
        ) : (
          <MainExperiencePage
            key="main"
            onCareerClick={setSelectedJob}
          />
        )}
      </AnimatePresence>
    </div>
  );
}