import { notFound } from "next/navigation";
import Link from "next/link";
import { projectsData, projectsList } from "../data";
import ThreeParticles from "./threeParticles"; // separate "use client" file

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const project = projectsData[id];

  if (!project) notFound();

  const currentIndex = projectsList.findIndex((p) => p.id === id);
  const prevProject  = projectsList[currentIndex - 1] || null;
  const nextProject  = projectsList[currentIndex + 1] || null;

  return (
    <div className="relative">
      {/* Client component — renders Three.js particles without breaking server component */}
      <ThreeParticles />

      <div className="relative z-10 text-white pb-16">

        {/* ── HERO ── */}
        <section className="max-w-7xl mx-auto px-6 pt-6">
          <div className="relative h-[420px] rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl bg-[#0d1a2e]">
            <img
              src={project.heroImage}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-40"
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0b1220] via-[#0b1220]/75 to-transparent" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0b1220]/80 via-transparent to-transparent" />

            <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 space-y-4">
              <span className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 text-[10px] font-bold tracking-[0.2em] px-3 py-1.5 rounded-full w-fit border border-blue-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                {project.badge || project.category}
              </span>

              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight max-w-2xl">
                {project.title}
              </h1>

              <p className="text-gray-300 max-w-xl text-sm md:text-base leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {project.techStack?.slice(0, 5).map((t) => (
                  <span key={t.name} className="text-[10px] font-mono px-2.5 py-1 bg-slate-800/60 border border-slate-700/50 rounded-full text-gray-300">
                    {t.icon} {t.name}
                  </span>
                ))}
                {project.techStack?.length > 5 && (
                  <span className="text-[10px] font-mono px-2.5 py-1 bg-slate-800/60 border border-slate-700/50 rounded-full text-gray-400">
                    +{project.techStack.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── CHALLENGE & SOLUTION ── */}
        {project.challenge && (
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative overflow-hidden bg-gradient-to-br from-rose-600/10 to-[#111927] border border-rose-800/30 rounded-2xl p-8">
                <div className="absolute top-3 right-5 text-7xl font-black text-white/[0.03] select-none leading-none">?</div>
                <span className="inline-flex items-center gap-2 text-rose-400 text-[10px] font-bold tracking-[0.2em] uppercase bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> The Challenge
                </span>
                <h3 className="text-xl font-bold mb-3 text-white">{project.challenge.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{project.challenge.content}</p>
              </div>

              <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-[#111927] border border-blue-800/30 rounded-2xl p-8">
                <div className="absolute top-3 right-5 text-7xl font-black text-white/[0.03] select-none leading-none">!</div>
                <span className="inline-flex items-center gap-2 text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> The Solution
                </span>
                <h3 className="text-xl font-bold mb-3 text-white">{project.solution.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{project.solution.content}</p>
              </div>
            </div>
          </section>
        )}

        {/* ── TECH STACK ── */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-7 bg-blue-600 rounded-full" />
            <h3 className="text-2xl font-black">Tech Stack</h3>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {project.techStack?.map((tech) => (
              <div
                key={tech.name}
                className="bg-[#111927]/90 border border-slate-800 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-blue-500/50 hover:shadow-lg hover:-translate-y-1 transition-all group cursor-default"
              >
                <span className="text-4xl grayscale group-hover:grayscale-0 transition duration-300">{tech.icon}</span>
                <span className="text-[11px] font-semibold text-gray-400 group-hover:text-white transition text-center leading-tight">{tech.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── KEY FEATURES ── */}
        {project.features && (
          <section className="max-w-7xl mx-auto px-6 pb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 bg-blue-600 rounded-full" />
              <h3 className="text-2xl font-black">Key Features</h3>
            </div>
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0d1a2e] to-[#111927] border border-slate-800/80 rounded-2xl p-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
                {project.features.map((feature) => (
                  <div key={feature.title} className="flex gap-4 group cursor-default hover:translate-x-1 transition-transform">
                    <div className="mt-0.5 shrink-0 w-8 h-8 bg-blue-600/20 border border-blue-600/30 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <svg className="w-4 h-4 text-blue-400 group-hover:text-white transition" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{feature.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── IMPACT & RESULTS ── */}
        {project.impact && (
          <section className="max-w-7xl mx-auto px-6 pb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-7 bg-blue-600 rounded-full" />
              <h3 className="text-2xl font-black">Impact &amp; Results</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {project.impact.map((stat, i) => (
                <div
                  key={stat.label}
                  className="relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-[#111927] border border-blue-800/30 rounded-2xl p-8 text-center group hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(59,130,246,0.15)] transition-all"
                >
                  <div className="absolute top-2 right-4 text-6xl font-black text-white/[0.04] select-none leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-400 mb-2 leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mt-2">{stat.label}</div>
                  <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-500/50 to-indigo-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── PREV / NEXT ── */}
        {(prevProject || nextProject) && (
          <section className="max-w-7xl mx-auto px-6 pt-4">
            <div className="border-t border-slate-800/60 pt-8 grid grid-cols-2 gap-4">
              <div>
                {prevProject ? (
                  <Link href={`/projects/${prevProject.id}`}>
                    <div className="bg-[#111927]/80 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 transition-all group cursor-pointer hover:-translate-x-1">
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">← Previous</p>
                      <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{prevProject.title}</p>
                    </div>
                  </Link>
                ) : <div />}
              </div>
              <div>
                {nextProject ? (
                  <Link href={`/projects/${nextProject.id}`}>
                    <div className="bg-[#111927]/80 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 transition-all group cursor-pointer text-right hover:translate-x-1">
                      <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Next →</p>
                      <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{nextProject.title}</p>
                    </div>
                  </Link>
                ) : <div />}
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}