"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { motion } from 'framer-motion';

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
    const palette = [new THREE.Color(0x3b82f6), new THREE.Color(0x6366f1), new THREE.Color(0x14b8a6), new THREE.Color(0x8b5cf6)];
    for (let i = 0; i < particleCount; i++) {
      positions[i*3]=(Math.random()-.5)*12; positions[i*3+1]=(Math.random()-.5)*12; positions[i*3+2]=(Math.random()-.5)*8;
      const c = palette[Math.floor(Math.random()*palette.length)];
      colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    const cv = document.createElement('canvas'); cv.width = 32; cv.height = 32;
    const cx = cv.getContext('2d');
    const gr = cx.createRadialGradient(16,16,0,16,16,16);
    gr.addColorStop(0,'rgba(255,255,255,1)'); gr.addColorStop(.4,'rgba(255,255,255,.6)'); gr.addColorStop(1,'rgba(255,255,255,0)');
    cx.fillStyle = gr; cx.fillRect(0,0,32,32);
    const mat = new THREE.PointsMaterial({ size:.04, vertexColors:true, map:new THREE.CanvasTexture(cv), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, opacity:.7 });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);
    const tr = { x:0, y:0 };
    const onMM = (e) => { tr.y=((e.clientX/window.innerWidth)*2-1)*.4; tr.x=(-(e.clientY/window.innerHeight)*2+1)*.2; };
    const onR  = () => { camera.aspect=mount.clientWidth/mount.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(mount.clientWidth,mount.clientHeight); };
    window.addEventListener('mousemove', onMM);
    window.addEventListener('resize', onR);
    let id;
    const animate = () => { id=requestAnimationFrame(animate); pts.rotation.y+=(tr.y-pts.rotation.y)*.04; pts.rotation.x+=(tr.x-pts.rotation.x)*.04; pts.rotation.y+=.0008; renderer.render(scene,camera); };
    animate();
    return () => { cancelAnimationFrame(id); window.removeEventListener('mousemove',onMM); window.removeEventListener('resize',onR); renderer.dispose(); geo.dispose(); mat.dispose(); if(mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement); };
  }, []);
  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

// --- VARIANTS ---
const fadeInUp = { initial:{opacity:0,y:20}, animate:{opacity:1,y:0}, transition:{duration:.5} };
const stagger  = { animate:{ transition:{ staggerChildren:.07 } } };

// --- CATEGORY CONFIG ---
const CATEGORY_CONFIG = {
  "NEXT JS": {
    color: "bg-black/40 text-white border-gray-700",
    dot: "bg-white",
  },

  "REACT JS": {
    color: "bg-cyan-600/40 text-cyan-800 border-cyan-600/30",
    dot: "bg-cyan-800",
  },

  "FULL STACK": {
    color: "bg-emerald-600/40 text-emerald-800 border-emerald-600/30",
    dot: "bg-emerald-800",
  },

  "PYTHON": {
    color: "bg-yellow-600/40 text-yellow-800 border-yellow-600/30",
    dot: "bg-yellow-800",
  },

  "ARCHITECTURE": {
    color: "bg-violet-600/40 text-violet-800 border-violet-600/30",
    dot: "bg-violet-800",
  },

  "PERFORMANCE": {
    color: "bg-orange-600/40 text-orange-800 border-orange-600/30",
    dot: "bg-orange-800",
  },

  "AUTOMATION": {
    color: "bg-pink-600/40 text-pink-800 border-pink-600/30",
    dot: "bg-pink-800",
  },

  "PROJECT SHOWCASE": {
    color: "bg-indigo-600/40 text-indigo-800 border-indigo-600/30",
    dot: "bg-indigo-800",
  },

  "API DEVELOPMENT": {
    color: "bg-blue-600/40 text-blue-800 border-blue-600/30",
    dot: "bg-blue-800",
  },

  "MOBILE DEVELOPMENT": {
    color: "bg-teal-600/40 text-teal-800 border-teal-600/30",
    dot: "bg-teal-800",
  },
};
const getCat = (cat) => CATEGORY_CONFIG[cat] || { color:"bg-slate-700/30 text-slate-300 border-slate-600/30", dot:"bg-slate-500" };
const filterMap = {
  "All Posts": null,
  "Next JS": "NEXT JS",
  "React JS": "REACT JS",
  "Full Stack": "FULL STACK",
  "Python": "PYTHON",
  "Architecture": "ARCHITECTURE",
  "Performance": "PERFORMANCE",
  "Automation": "AUTOMATION",
  "Project Showcase": "PROJECT SHOWCASE",
  "API Development": "API DEVELOPMENT",
  "Mobile Development": "MOBILE DEVELOPMENT",
};
export default function Blog() {
  const [posts, setPosts]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [currentPage, setCurrentPage]   = useState(1);
  const [showAll, setShowAll]           = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Posts");
  const postsPerPage = 4;

  // Add this state alongside your existing ones:
const [sortOrder, setSortOrder] = useState("newest"); // "newest" | "oldest"

// Replace your existing filteredPosts line with this:
const sortedPosts = [...posts].sort((a, b) => {
  const da = new Date(a.createdAt), db = new Date(b.createdAt);
  return sortOrder === "newest" ? db - da : da - db;
});
const filteredPosts  = activeFilter === "All Posts"
  ? sortedPosts
  : sortedPosts.filter(p => p.category === filterMap[activeFilter]);

  const totalPages     = Math.ceil(filteredPosts.length / postsPerPage);
  const displayedPosts = showAll
    ? filteredPosts
    : filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch('/api/blog');
        const data = await res.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch(e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="relative">
      <ThreeParticles />
      <main className="relative z-10 text-white pb-20">

        {/* ── HERO — compact horizontal layout ── */}
        <section className="max-w-7xl mx-auto px-6 pt-8 mb-2">
          <motion.div
            initial="initial" animate="animate" variants={stagger}
            className="relative rounded-2xl overflow-hidden border border-slate-800/80 px-10 py-7 bg-gradient-to-br from-[#0d1a2e] via-[#111927] to-[#0b1220] flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            {/* subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

            {/* Left */}
            <div className="relative z-10">
              <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 text-blue-400 font-bold text-[10px] tracking-[0.2em] uppercase mb-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" /> Featured Content
              </motion.span>
              <motion.h1 variants={fadeInUp} className="text-2xl md:text-3xl font-black mb-1.5 leading-tight tracking-tight">
                Technical Insights &amp;{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Articles</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-gray-400 text-sm leading-relaxed max-w-md">
                Deep dives into software engineering, system architecture, and modern web development.
              </motion.p>
            </div>

            {/* Right */}
            <motion.div variants={fadeInUp} className="relative z-10 flex flex-col gap-3 items-start md:items-end shrink-0">
              <div className="flex gap-3">
                <Link href="/blog/create" className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl font-bold text-sm transition shadow-lg shadow-blue-900/30 active:scale-95">
                  ✍️ Create Post
                </Link>
                <button className="bg-slate-800/60 hover:bg-slate-700 border border-slate-700 px-5 py-2 rounded-xl font-bold text-sm transition">
                  🔔 Subscribe
                </button>
              </div>
              <div className="flex gap-3">
                {[{ val: posts.length || "—", label:"Articles" }, { val:"2k+", label:"Readers" }].map(s => (
                  <div key={s.label} className="bg-slate-800/50 border border-slate-700/40 rounded-xl px-4 py-2 text-center">
                    <div className="text-base font-black text-white leading-none">{s.val}</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

       {/* ── FILTERS ── */}
<section className="max-w-7xl mx-auto px-6 py-4">
  <div className="flex items-center gap-3">

    {/* Scrollable filter pills */}
    <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1 min-w-0 pb-0.5">
      {Object.keys(filterMap).map((tab) => (
        <motion.button
          key={tab}
          whileTap={{ scale: 0.96 }}
          onClick={() => { setActiveFilter(tab); setCurrentPage(1); setShowAll(false); }}
          className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border whitespace-nowrap ${
            activeFilter === tab
              ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_0_3px_rgba(37,99,235,0.2)]"
              : "bg-[#0b1220]/60 border-slate-700/40 text-slate-400 hover:text-white hover:border-slate-600"
          }`}
        >
          {tab}
          {tab === "All Posts" && posts.length > 0 && (
            <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
              activeFilter === tab ? "bg-white/20" : "bg-slate-700/60"
            }`}>
              {posts.length}
            </span>
          )}
        </motion.button>
      ))}
    </div>

    {/* Sort toggle */}
    <div className="flex-shrink-0 flex items-center gap-1 bg-[#0b1220]/60 border border-slate-700/40 rounded-xl p-1">
      {["newest", "oldest"].map((order) => (
        <button
          key={order}
          onClick={() => { setSortOrder(order); setCurrentPage(1); }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
            sortOrder === order
              ? "bg-slate-700 text-white"
              : "text-slate-500 hover:text-slate-300"
          }`}
        >
          {order === "newest" ? "↓ Newest" : "↑ Oldest"}
        </button>
      ))}
    </div>

  </div>

  {/* Divider + meta */}
  <div className="mt-3 h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent" />
  <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-600">
    <span>{activeFilter}</span>
    <span className="w-1 h-1 rounded-full bg-slate-700" />
    <span>{filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}</span>
    <span className="w-1 h-1 rounded-full bg-slate-700" />
    <span>Sorted by {sortOrder}</span>
  </div>
</section>

        {/* ── BLOG GRID ── */}
        <section className="max-w-7xl mx-auto px-6 mb-8">
          {loading ? (
            <div className="grid md:grid-cols-4 gap-6">
              {Array.from({length:4}).map((_,i) => (
                <div key={i} className="bg-[#111927] border border-slate-800 rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-40 bg-slate-800/60" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-slate-700/60 rounded w-1/3" />
                    <div className="h-4 bg-slate-700/60 rounded w-full" />
                    <div className="h-3 bg-slate-700/60 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-lg font-semibold text-gray-400">No posts found for &quot;{activeFilter}&quot;</p>
              <p className="text-sm mt-1">Try a different category or check back later.</p>
            </div>
          ) : (
            <motion.div
              initial="initial" animate="animate" variants={stagger}
              className="grid md:grid-cols-4 gap-6"
            >
              {displayedPosts.map((post, idx) => {
                const cat = getCat(post.category || "ENGINEERING");
                return (
                  <motion.article
                    key={post._id || idx}
                    variants={fadeInUp}
                    whileHover={{ y:-6, boxShadow:"0 20px 40px rgba(0,0,0,0.4)" }}
                    className="bg-[#111927]/90 border border-slate-800/80 rounded-2xl overflow-hidden group hover:border-slate-600/60 transition-all flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                      <span className={`absolute top-3 shadow-xl left-2 z-10 flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${cat.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                        {post.category}
                      </span>
                      <button className="absolute top-3 right-3 z-10 w-7 h-7 bg-slate-900/70 hover:bg-slate-800 border border-slate-700/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition text-xs">
                        🔖
                      </button>
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111927]/50 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-grow flex flex-col">
                      <div className="flex items-center justify-between text-gray-600 text-[11px] mb-3">
<span>📅 {new Date(post.createdAt).toLocaleDateString('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'Asia/Kolkata'
})} · {new Date(post.createdAt).toLocaleTimeString('en-IN', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Kolkata',
  hour12: true
})} IST</span>                        <span>⏱ {post.readTime || "5 min read"}</span>
                      </div>
                      <h3 className="text-sm font-bold mb-2 group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {post.summary || post.desc}
                      </p>
                      <div className="flex justify-between items-center pt-3 border-t border-slate-800/60">
                        <Link href={`/blog/${post._id}`} className="text-blue-400 text-xs font-bold hover:text-blue-300 transition inline-flex items-center gap-1 group/link">
                          Read More <span className="group-hover/link:translate-x-1 transition-transform inline-block">→</span>
                        </Link>
                        <div className="flex items-center gap-1 text-[10px] text-gray-600">
                          <span>👁</span>
                          <span>{post.views || "—"}</span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </section>

        {/* ── SHOW ALL / PAGINATED TOGGLE ── */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-4">
            {!showAll ? (
              <motion.button whileHover={{scale:1.04}} whileTap={{scale:.96}}
                onClick={() => setShowAll(true)}
                className="px-6 py-2 border border-slate-700 rounded-xl text-sm text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition"
              >
                Show All ({filteredPosts.length} posts)
              </motion.button>
            ) : (
              <motion.button whileHover={{scale:1.04}} whileTap={{scale:.96}}
                onClick={() => { setShowAll(false); setCurrentPage(1); }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm text-white font-bold transition shadow-lg shadow-blue-900/30"
              >
                Show Paginated
              </motion.button>
            )}
          </div>
        )}

        {/* ── PAGINATION ── */}
        {!showAll && totalPages > 1 && (
          <section className="flex justify-center items-center gap-2 mb-12">
            <button
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 bg-[#111927] border border-slate-800 rounded-xl text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition text-sm"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl font-bold transition text-sm ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                    : "bg-[#111927] border border-slate-800 hover:border-slate-600 text-gray-400"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
              className="w-9 h-9 bg-[#111927] border border-slate-800 rounded-xl text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition text-sm"
            >
              →
            </button>
          </section>
        )}

        {/* ── NEWSLETTER CTA ── */}
        <section className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.5}}
            className="relative overflow-hidden bg-gradient-to-br from-[#0d1a2e] via-[#111927] to-[#0b1220] border border-slate-800/80 rounded-2xl px-10 py-9 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="absolute top-0 left-0 w-56 h-56 bg-blue-600/5 blur-[70px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="max-w-sm relative z-10">
              <span className="inline-flex items-center gap-2 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" /> Newsletter
              </span>
              <h2 className="text-2xl font-black mb-2">Stay in the loop</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get technical articles and engineering insights delivered to your inbox. No spam, ever.
              </p>
            </div>
            <div className="w-full md:w-auto relative z-10">
              <form className="flex flex-col md:flex-row gap-3" onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="bg-[#0b1220] border border-slate-700/60 px-5 py-3 rounded-xl md:w-72 focus:outline-none focus:border-blue-500 transition text-sm placeholder-gray-600"
                />
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-blue-900/30 active:scale-95">
                  Subscribe →
                </button>
              </form>
              <p className="text-[11px] text-gray-600 mt-2 text-center md:text-left">
                🔒 Join 2,000+ developers · Unsubscribe anytime
              </p>
            </div>
          </motion.div>
        </section>

      </main>
    </div>
  );
}