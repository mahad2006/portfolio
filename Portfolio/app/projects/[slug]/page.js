import React from 'react';
import { projectsMap, projectsData } from '../../data/projects';
import { ArchitectureDiagram } from '../../components/ArchitectureDiagram';

/**
 * TECHNICAL DATA REGISTRY
 */
// Removed hardcoded projectsData


export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projectsMap[slug];

  if (!project) {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center font-mono p-4 text-center">
        <div className="w-16 h-16 border-2 border-red-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <span className="text-red-500 text-2xl">!</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white uppercase tracking-tighter">
          system_error: registry_miss
        </h1>
        <p className="text-gray-500 mb-8 max-w-md font-sans">
          The requested project identity <span className="text-[#6DB33F] font-mono">"{slug}"</span> could not be resolved in the technical database.
        </p>
        <a href="/" className="px-6 py-3 border border-[#6DB33F]/30 text-[#6DB33F] rounded hover:bg-[#6DB33F]/10 transition-all uppercase text-[10px] tracking-[0.2em] font-mono">
          Return to root_directory
        </a>
      </div>
    );
  }

  // Ensure content exists to prevent runtime errors during pre-rendering
  const content = project.caseStudy || {};

  return (
    <div className="min-h-screen text-gray-300 font-sans selection:bg-[#6DB33F] selection:text-black pb-24">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <a href="/#projects" className="text-xs font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-2 group tracking-widest">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK_TO_SYS
        </a>
        <div className="font-mono text-[9px] text-[#6DB33F] border border-[#6DB33F]/30 px-2 py-1 rounded tracking-[0.3em] bg-[#6DB33F]/5 uppercase">
          Case_Study_v2.1.0
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 animate-fade-up">
        {/* Header Section */}
        <div className="mb-20">
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-[9px] font-mono border border-white/10 rounded-full text-[#6DB33F] bg-[#6DB33F]/5 uppercase tracking-tighter">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-none font-mono tracking-tighter uppercase italic">
            {project.title.split(':').join('\n')}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl border-l-2 border-[#6DB33F] pl-8 font-light leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Technical Stats Visualization */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mb-20 border border-white/10 rounded-2xl overflow-hidden bg-white/[0.01]">
          {project.stats.map((stat, i) => (
            <div key={i} className={`p-8 text-center ${i !== 2 ? 'border-b sm:border-b-0 sm:border-r border-white/10' : ''}`}>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 font-mono tracking-tighter">{stat.value}</div>
              <div className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.4em]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Core Content Blocks */}
        <div className="space-y-28">
          
          {/* Section 01 */}
          <section className="relative">
            <div className="absolute -left-12 top-0 text-[#6DB33F]/10 text-6xl font-mono font-bold hidden lg:block">01</div>
            <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-4 font-mono tracking-[0.4em] uppercase">
              <span className="w-8 h-px bg-[#6DB33F]"></span>
              the_problem_statement
            </h2>
            <p className="text-lg leading-relaxed text-gray-400 font-light">
              {content.problem}
            </p>
          </section>

          {/* Section 02 */}
          <section className="relative">
            <div className="absolute -left-12 top-0 text-[#6DB33F]/10 text-6xl font-mono font-bold hidden lg:block">02</div>
            <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-4 font-mono tracking-[0.4em] uppercase">
              <span className="w-8 h-px bg-[#6DB33F]"></span>
              architectural_implementation
            </h2>
            
            {/* Architecture Diagram */}
            <div className="p-8 md:p-16 rounded-3xl bg-white/[0.02] border border-white/10 mb-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#6DB33F10_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] [background-size:40px_40px]"></div>

              <div className="relative z-10">
                <ArchitectureDiagram projectSlug={slug} />
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-400 font-light">
              {content.architecture}
            </p>
          </section>

          {/* Section 03 */}
          <section className="relative pb-10">
            <div className="absolute -left-12 top-0 text-[#6DB33F]/10 text-6xl font-mono font-bold hidden lg:block">03</div>
            <h2 className="text-sm font-bold text-white mb-10 flex items-center gap-4 font-mono tracking-[0.4em] uppercase">
              <span className="w-8 h-px bg-[#6DB33F]"></span>
              engineering_challenges
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {content.challenges?.map((challenge, i) => (
                <div key={i} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#6DB33F]/20 transition-all group">
                  <h3 className="text-xs font-bold text-[#6DB33F] mb-4 font-mono uppercase tracking-[0.2em] flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#6DB33F] rounded-full shadow-[0_0_8px_#6DB33F]"></span>
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans font-light group-hover:text-gray-300 transition-colors">
                    {challenge.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Footer Navigation */}
        <div className="mt-40 pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10 font-mono">
            <a href="/#projects" className="text-[10px] text-gray-500 hover:text-white transition-colors uppercase tracking-[0.5em] flex items-center gap-3 group">
              <span className="group-hover:-translate-x-2 transition-transform">←</span> return_to_sys_archive
            </a>
            <a 
              href={project.link}
              target="_blank" 
              rel="noopener noreferrer" 
              className="group px-10 py-5 bg-[#6DB33F] text-black font-bold rounded-xl hover:bg-white transition-all flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase shadow-[0_20px_40px_-15px_rgba(109,179,63,0.3)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              access_repository
            </a>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectsMap[slug];
  if (!project) return { title: 'Project' };
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: [
        {
          url: '/profile.png',
          width: 800,
          height: 600,
        },
      ],
    },
  };
}