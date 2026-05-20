"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as THREE from 'three';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

// --- THREE.JS PARTICLES ---
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
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    const palette   = [new THREE.Color(0x3b82f6), new THREE.Color(0x6366f1), new THREE.Color(0x14b8a6), new THREE.Color(0x8b5cf6)];
    for (let i = 0; i < count; i++) {
      positions[i*3]=(Math.random()-.5)*12; positions[i*3+1]=(Math.random()-.5)*12; positions[i*3+2]=(Math.random()-.5)*8;
      const c = palette[Math.floor(Math.random()*palette.length)];
      colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions,3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,3));
    const cv = document.createElement('canvas'); cv.width=32; cv.height=32;
    const cx = cv.getContext('2d');
    const gr = cx.createRadialGradient(16,16,0,16,16,16);
    gr.addColorStop(0,'rgba(255,255,255,1)'); gr.addColorStop(.4,'rgba(255,255,255,.6)'); gr.addColorStop(1,'rgba(255,255,255,0)');
    cx.fillStyle=gr; cx.fillRect(0,0,32,32);
    const mat = new THREE.PointsMaterial({ size:.04, vertexColors:true, map:new THREE.CanvasTexture(cv), transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, opacity:.6 });
    const pts = new THREE.Points(geo, mat);
    scene.add(pts);
    const tr={x:0,y:0};
    const onMM=(e)=>{tr.y=((e.clientX/window.innerWidth)*2-1)*.4;tr.x=(-(e.clientY/window.innerHeight)*2+1)*.2;};
    const onR=()=>{camera.aspect=mount.clientWidth/mount.clientHeight;camera.updateProjectionMatrix();renderer.setSize(mount.clientWidth,mount.clientHeight);};
    window.addEventListener('mousemove',onMM); window.addEventListener('resize',onR);
    let id;
    const animate=()=>{id=requestAnimationFrame(animate);pts.rotation.y+=(tr.y-pts.rotation.y)*.04;pts.rotation.x+=(tr.x-pts.rotation.x)*.04;pts.rotation.y+=.0008;renderer.render(scene,camera);};
    animate();
    return ()=>{cancelAnimationFrame(id);window.removeEventListener('mousemove',onMM);window.removeEventListener('resize',onR);renderer.dispose();geo.dispose();mat.dispose();if(mount.contains(renderer.domElement))mount.removeChild(renderer.domElement);};
  }, []);
  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

const CATEGORY_CONFIG = {
  "NEXT JS":            { color: "bg-black/40 text-white border-gray-700",                        dot: "bg-white" },
  "REACT JS":           { color: "bg-cyan-600/40 text-cyan-300 border-cyan-600/30",               dot: "bg-cyan-300" },
  "FULL STACK":         { color: "bg-emerald-600/40 text-emerald-300 border-emerald-600/30",      dot: "bg-emerald-300" },
  "PYTHON":             { color: "bg-yellow-600/40 text-yellow-300 border-yellow-600/30",         dot: "bg-yellow-300" },
  "ARCHITECTURE":       { color: "bg-violet-600/40 text-violet-300 border-violet-600/30",         dot: "bg-violet-300" },
  "PERFORMANCE":        { color: "bg-orange-600/40 text-orange-300 border-orange-600/30",         dot: "bg-orange-300" },
  "AUTOMATION":         { color: "bg-pink-600/40 text-pink-300 border-pink-600/30",               dot: "bg-pink-300" },
  "PROJECT SHOWCASE":   { color: "bg-indigo-600/40 text-indigo-300 border-indigo-600/30",         dot: "bg-indigo-300" },
  "API DEVELOPMENT":    { color: "bg-blue-600/40 text-blue-300 border-blue-600/30",               dot: "bg-blue-300" },
  "MOBILE DEVELOPMENT": { color: "bg-teal-600/40 text-teal-300 border-teal-600/30",               dot: "bg-teal-300" },
};
const getCat = (cat) => CATEGORY_CONFIG[cat?.toUpperCase()] || { color:"bg-slate-700/30 text-slate-300 border-slate-600/30", dot:"bg-slate-500" };

// --- READING PROGRESS BAR ---
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el  = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(Math.min(pct, 100));
    };
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 bg-slate-800/50">
      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-75" style={{ width: `${progress}%` }} />
    </div>
  );
};

// --- MARKDOWN COMPONENTS ---
const mdComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-black text-white mt-10 mb-4 leading-tight tracking-tight border-b border-slate-800 pb-3">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-black text-white mt-8 mb-3 leading-tight tracking-tight">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold text-white mt-6 mb-2">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-bold text-gray-200 mt-5 mb-2">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-gray-300 leading-[1.9] text-base md:text-[17px] mb-5">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-white">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-gray-300">{children}</em>
  ),
  ul: ({ children }) => (
    <ul className="list-none space-y-2 mb-5 pl-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-2 mb-5 pl-2 text-gray-300">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-gray-300 text-base md:text-[17px] flex items-start gap-2">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="relative border-l-4 border-blue-500 bg-blue-600/10 rounded-r-2xl px-6 py-4 my-6 text-gray-300 italic text-[17px] leading-relaxed">
      <span className="absolute top-2 left-4 text-4xl text-blue-500/20 font-serif leading-none select-none">"</span>
      <div className="pl-4">{children}</div>
    </blockquote>
  ),
  code: ({ inline, className, children }) => {
    if (inline) {
      return (
        <code className="bg-slate-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-700/50">
          {children}
        </code>
      );
    }
    return (
      <code className={`${className || ''} text-sm`}>{children}</code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-[#0d1117] border border-slate-700/50 rounded-xl p-5 overflow-x-auto my-6 text-sm leading-relaxed shadow-xl">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition">
      {children}
    </a>
  ),
  hr: () => <hr className="border-slate-800 my-8" />,
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm text-left border border-slate-700/50 rounded-xl overflow-hidden">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-slate-800/60 text-gray-300 font-bold">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-slate-800">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-slate-800/30 transition">{children}</tr>,
  th: ({ children }) => <th className="px-4 py-3 text-gray-300 font-semibold">{children}</th>,
  td: ({ children }) => <td className="px-4 py-3 text-gray-400">{children}</td>,
  img: ({ src, alt }) => (
    <img src={src} alt={alt} className="rounded-xl w-full my-6 border border-slate-800 object-cover" />
  ),
};

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied]   = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el  = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(Math.min(Math.round(pct), 100));
    };
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res  = await fetch('/api/blog');
        const data = await res.json();
        setPost(data.find(p => p._id === id) || null);
      } catch(e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // get author initials
  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-[#0b1220]">
        <ThreeParticles />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400 text-sm font-mono animate-pulse">Loading Article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="relative min-h-screen bg-[#0b1220]">
        <ThreeParticles />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-4 text-white">
          <div className="text-6xl mb-2">📭</div>
          <h2 className="text-2xl font-black">Article Not Found</h2>
          <p className="text-gray-500 text-sm">This post may have been removed or doesn't exist.</p>
          <Link href="/blog" className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2.5 rounded-xl font-bold text-sm transition">
            ← Return to Feed
          </Link>
        </div>
      </div>
    );
  }

  const cat = getCat(post.category);

  return (
    <div className="relative bg-[#0b1220] min-h-screen">
      <ThreeParticles />
      <ReadingProgress />

      <main className="relative z-10 text-white pb-20">

        {/* ── HERO ── */}
        <header className="relative w-full overflow-hidden">
          {post.image && (
            <img src={post.image} alt={post.title}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-60" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/60 to-[#0b1220]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/80 via-transparent to-transparent" />

          <div className="relative z-10 max-w-6xl mx-auto px-6 pt-10 pb-14">
            <Link href="/blog" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-semibold mb-8 transition group">
              <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
              Back to Insights
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full border ${cat.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                {post.category || "ENGINEERING"}
              </span>
              <span className="text-gray-500 text-sm">
                📅 {new Date(post.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata'
                })} · {new Date(post.createdAt).toLocaleTimeString('en-IN', {
                  hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata', hour12: true
                })} IST
              </span>
              <span className="text-gray-500 text-sm">⏱ {post.readTime || "8 min read"}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6 max-w-4xl">
              {post.title}
            </h1>

            {/* Dynamic author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 border border-blue-500/40 flex items-center justify-center text-sm font-black">
                {getInitials(post.author)}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{post.author || "Anonymous"}</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>
          </div>
        </header>

        {/* ── ARTICLE BODY ── */}
        <section className="max-w-6xl mx-auto px-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-12">

            {/* Main content */}
            <article>
              {post.summary && (
                <div className="relative bg-gradient-to-br from-blue-600/10 to-[#111927] border-l-4 border-blue-500 rounded-r-2xl px-7 py-6 mb-10">
                  <div className="absolute top-3 left-4 text-4xl text-blue-500/20 font-serif leading-none select-none">"</div>
                  <p className="text-gray-300 text-lg leading-relaxed italic pl-4">{post.summary}</p>
                </div>
              )}

              {/* Rendered Markdown */}
              <div className="min-w-0">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={mdComponents}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {post.tags?.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono px-3 py-1.5 bg-[#111927] border border-slate-700/50 rounded-full text-gray-400 hover:text-blue-400 hover:border-blue-500/40 transition cursor-default">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </article>

            {/* Sticky sidebar */}
            <aside className="hidden md:block">
              <div className="sticky top-12 space-y-5">

                <div className="bg-[#111927]/90 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
                  <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4">Share Article</h4>
                  <div className="flex flex-col gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-gray-400 hover:text-white text-sm transition px-3 py-2 rounded-xl hover:bg-slate-800"
                    >
                      <span className="text-base font-black">𝕏</span> Share on X
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-gray-400 hover:text-white text-sm transition px-3 py-2 rounded-xl hover:bg-slate-800"
                    >
                      <span className="text-base font-bold text-blue-500">in</span> Share on LinkedIn
                    </a>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2.5 text-gray-400 hover:text-white text-sm transition px-3 py-2 rounded-xl hover:bg-slate-800 w-full text-left"
                    >
                      <span className="text-base">{copied ? '✅' : '🔗'}</span>
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-[#111927] border border-blue-800/30 rounded-2xl p-5">
                  <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Newsletter</p>
                  <p className="text-sm font-bold text-white mb-1">Want more like this?</p>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">Subscribe for technical insights delivered to your inbox.</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 rounded-xl text-sm font-bold transition active:scale-95">
                    Join the List →
                  </button>
                </div>

                <div className="bg-[#111927]/90 border border-slate-800 rounded-2xl p-5">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Reading Progress</h4>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-600 mt-2 font-mono">{progress}% · {post.readTime || "8 min read"}</p>
                </div>

              </div>
            </aside>
          </div>
        </section>

        {/* ── FOOTER CTA ── */}
        <section className="max-w-4xl mx-auto px-6 mt-20">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0d1a2e] via-[#111927] to-[#0b1220] border border-slate-800/80 rounded-2xl px-10 py-9 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute top-0 left-0 w-56 h-56 bg-blue-600/5 blur-[70px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" /> More Articles
              </span>
              <h3 className="text-2xl font-black mb-1">Continue Reading</h3>
              <p className="text-gray-400 text-sm">Explore more architectural patterns and tutorials.</p>
            </div>
            <Link href="/blog" className="relative z-10 shrink-0 bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-blue-900/30 active:scale-95">
              Browse Feed →
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}