"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

// --- THREE.JS PARTICLES BACKGROUND (identical to Experience page) ---
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
    geometry.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

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

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

// --- SOCIAL LINKS ---
const socials = [
  {
    key: "github",
    label: "G",
    title: "GitHub",
    href: "https://github.com/",
    color: "hover:bg-gray-700",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "L",
    title: "LinkedIn",
    href: "https://linkedin.com/",
    color: "hover:bg-blue-700",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    key: "twitter",
    label: "T",
    title: "Twitter / X",
    href: "https://twitter.com/",
    color: "hover:bg-sky-600",
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

// --- WHATSAPP ---
const WA_NUMBER = "919074730029";
const WA_MESSAGE = encodeURIComponent("Hi Manish, I came across your portfolio and would love to connect!");
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputClass = (field) =>
    `w-full p-4 bg-[#111927] border rounded-lg focus:outline-none transition-all duration-300 resize-none ${
      focusedField === field
        ? "border-blue-500 shadow-[0_0_0_3px_rgba(59,130,246,0.15)]"
        : "border-slate-800 hover:border-slate-600"
    }`;

  return (
    <div className="relative">
      <ThreeParticles />

      <motion.main
        initial="initial"
        animate="animate"
        className="relative z-10 text-white pb-10"
      >
        <section className="max-w-7xl mx-auto px-6 pt-10">

          {/* ── PAGE HEADER ── */}
          <motion.div variants={fadeInUp} className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1 h-10 bg-blue-600 rounded-full" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Let&apos;s Build{" "}
                  <span className="text-blue-500">Something Together</span>
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  Available for freelance & full-time positions · Usually replies within 24 hours
                </p>
              </div>
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full mt-2"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Open to opportunities
              </span>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">

            {/* ────────────────── LEFT: FORM ────────────────── */}
            <motion.div variants={staggerContainer}>

              <motion.form
                variants={fadeInUp}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name + Email row */}
                <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      className={inputClass("name")}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      className={inputClass("email")}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </motion.div>

                {/* Subject */}
                <motion.div variants={fadeInUp} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry"
                    value={form.subject}
                    className={inputClass("subject")}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </motion.div>

                {/* Message */}
                <motion.div variants={fadeInUp} className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell me about your project..."
                    rows={6}
                    value={form.message}
                    className={inputClass("message")}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </motion.div>

                {/* Submit row */}
                <motion.div variants={fadeInUp} className="flex items-center gap-4">
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: status === "idle" ? 1.04 : 1 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative overflow-hidden bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-10 py-4 rounded-lg font-bold shadow-lg shadow-blue-600/20 transition-colors"
                  >
                    <AnimatePresence mode="wait">
                      {status === "idle" && (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2"
                        >
                          Send Message ✉️
                        </motion.span>
                      )}
                      {status === "sending" && (
                        <motion.span
                          key="sending"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2"
                        >
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending…
                        </motion.span>
                      )}
                      {status === "success" && (
                        <motion.span
                          key="success"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2"
                        >
                          ✅ Sent!
                        </motion.span>
                      )}
                      {status === "error" && (
                        <motion.span
                          key="error"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2"
                        >
                          ❌ Try again
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* WhatsApp shortcut */}
                  <motion.a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366] border border-[#25D366]/30 hover:border-[#25D366] text-[#25D366] hover:text-white px-5 py-4 rounded-lg text-sm font-bold transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </motion.a>
                </motion.div>
              </motion.form>
            </motion.div>

            {/* ────────────────── RIGHT: INFO ────────────────── */}
            <motion.div
              variants={staggerContainer}
              className="space-y-5"
            >
              {/* Contact info card */}
              <motion.div
                variants={fadeInUp}
                className="bg-[#111927]/80 backdrop-blur-sm border border-slate-800 p-4 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-blue-600 rounded-full" />
                  <h3 className="text-lg font-bold">Contact Information</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: "📧", label: "Email", value: "vermamanish098@gmail.com", accent: "blue" },
                    { icon: "📍", label: "Location", value: "Remote / Noida, India", accent: "blue" },
                  ].map(({ icon, label, value, accent }) => (
                    <motion.div
                      key={label}
                      whileHover={{ x: 6 }}
                      className="flex items-center gap-4 group cursor-default"
                    >
                      <div className={`w-12 h-12 bg-${accent}-600/10 rounded-lg flex items-center justify-center text-${accent}-500 group-hover:bg-${accent}-600 group-hover:text-white transition-all duration-300`}>
                        {icon}
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{label}</p>
                        <p className="text-gray-200 text-sm">{value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Google Map — Noida Sector 12 */}
              <motion.div
                variants={fadeInUp}
                className="relative rounded-xl overflow-hidden border border-slate-800"
                style={{ height: "200px" }}
              >
                <iframe
                  title="Noida Sector 12 Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0!2d77.3396212!3d28.5962491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce404052bd5a5%3A0xa0f00c5abf50def6!2sSector%2012%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      Available for remote work
                    </span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Sector+12,+Noida,+Uttar+Pradesh,+India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black/80 backdrop-blur-md px-3 py-2 rounded-full border border-white/10 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
                  >
                    Open Maps ↗
                  </a>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </section>
      </motion.main>
    </div>
  );
}