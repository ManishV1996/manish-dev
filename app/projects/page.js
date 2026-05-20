"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { projectsList } from "./data";

// --- THREE.JS PARTICLES BACKGROUND (same as Experience page) ---
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
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const canvas = document.createElement("canvas");
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext("2d");
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,0.6)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
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
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

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
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// --- ANIMATION VARIANTS (same as Experience page) ---
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Web Apps", "Mobile", "Backend"];

  const filteredProjects =
    filter === "All"
      ? projectsList
      : projectsList.filter((p) => p.category === filter);

  return (
    <div className="relative">
      <ThreeParticles />

      <motion.main
        initial="initial"
        animate="animate"
        className="relative z-10 text-white pb-10"
      >
        <section className="max-w-6xl mx-auto px-6 pt-10">

          {/* --- HEADER --- */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1 h-10 bg-blue-600 rounded-full" />
              <h1 className="text-4xl font-bold text-white">My Projects</h1>
            </div>
            <motion.p
              variants={fadeInUp}
              className="text-gray-400 text-lg max-w-2xl leading-relaxed pl-5"
            >
              A collection of my recent work. Each project represents a unique
              challenge solved, from enterprise CRM solutions to healthcare
              platforms.
            </motion.p>
          </motion.div>

          {/* --- FILTERS --- */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-12">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className="relative px-6 py-2 rounded-lg text-sm font-medium transition overflow-hidden group"
              >
                {filter === tab ? (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-600 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#111927] border border-slate-800 rounded-lg group-hover:bg-slate-700/60 transition-colors" />
                )}
                <span
                  className={`relative z-10 transition-colors duration-300 ${
                    filter === tab
                      ? "text-white"
                      : "text-gray-400 group-hover:text-white"
                  }`}
                >
                  {tab}
                </span>
              </button>
            ))}
          </motion.div>

          {/* --- PROJECTS GRID --- */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  layout
                  key={project.id}
                  variants={fadeInUp}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                  className="bg-[#111927]/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-800 flex flex-col h-full shadow-xl"
                >
                  {/* Image Container */}
                  <div className="h-48 w-full overflow-hidden bg-slate-900/50 p-4">
                    <motion.img
                      src={project.heroImage}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-lg border border-white/10 shadow-md"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow relative">
                    {/* Decorative number */}
                    <span className="absolute top-2 right-4 text-6xl font-black text-white/[0.04] select-none leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack?.slice(0, 3).map((tech) => (
                        <motion.span
                          key={tech.name}
                          whileHover={{ scale: 1.1, backgroundColor: "#2563eb", color: "#fff" }}
                          className="text-[10px] font-bold text-blue-400/80 tracking-wider uppercase bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/10 transition-colors cursor-default"
                        >
                          {tech.name}
                        </motion.span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    <Link href={`/projects/${project.id}`} className="w-full mt-auto">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-lg transition shadow-lg shadow-blue-900/20"
                      >
                        View Details
                      </motion.button>
                    </Link>

                    {/* Bottom shimmer line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-blue-500"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* --- CONTACT CTA --- */}
          <motion.section
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="border-t border-slate-800 pt-20 text-center pb-10"
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-1 h-8 bg-blue-600 rounded-full" />
                <h2 className="text-3xl font-bold text-white">
                  Interested in working together?
                </h2>
                <div className="w-1 h-8 bg-blue-600 rounded-full" />
              </div>
              <p className="text-gray-400 mb-10 max-w-lg mx-auto">
                I'm currently available for freelance work and full-time
                positions. Let's build something amazing together.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Link href="/contact" className="inline-block group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-bold flex items-center gap-3 transition shadow-xl shadow-blue-900/40"
                >
                  Get In Touch
                  <span className="group-hover:translate-x-1 transition-transform">
                    ✈
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.section>

        </section>
      </motion.main>
    </div>
  );
}