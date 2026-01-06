'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { projectsData } from '@/data/projects';

const ProjectCard = ({ title, tags, link, image, caseStudy, isFlagship, slug }) => {
  const router = useRouter();
  
  const cardContent = (
    <SpotlightCard className={`group rounded-2xl glass-panel border border-white/5 hover:border-primary transition-all duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-2 ${isFlagship ? 'md:col-span-2 md:flex-row' : ''}`}>
      
      <div className={`${isFlagship ? 'md:w-1/2 h-64 md:h-full' : 'h-52 w-full'} bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden`}>
        {image ? (
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
        ) : null}
        <div className={`${image ? 'hidden' : 'flex'} w-full h-full bg-gradient-to-br from-[#1a1a1a] to-black items-center justify-center`}>
          <span className="text-5xl opacity-10 group-hover:opacity-30 transition-opacity font-bold">{title.charAt(0)}</span>
        </div>
        
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-3 items-center justify-center backdrop-blur-[2px]">
            {slug && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/projects/${slug}`);
                    }}
                    className="px-6 py-2 bg-white text-black font-bold rounded-full text-xs transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-200 shadow-lg cursor-pointer"
                  >
                    Read Case Study
                  </button>
                )}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-6 py-2 glass-panel text-white border border-white/20 font-bold rounded-full text-xs transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:bg-white/10"
            >
              View Source
            </a>
        </div>
      </div>

      <div className={`p-8 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/40 ${isFlagship ? 'md:w-1/2' : ''}`}>
        <div className="flex justify-between items-start mb-6">
            <div>
                {isFlagship && <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">Flagship Project</span>}
                <h3 className={`${isFlagship ? 'text-3xl' : 'text-2xl'} font-bold text-white group-hover:text-primary transition-colors leading-tight`}>{title}</h3>
            </div>
        </div>
        <div className="space-y-4 mb-8 text-sm text-gray-400 leading-relaxed border-l-2 border-white/5 pl-4 group-hover:border-primary transition-colors">
            <div><span className="text-gray-200 font-semibold block mb-1 uppercase text-xs tracking-wider">Problem</span>{caseStudy.problem}</div>
            <div><span className="text-gray-200 font-semibold block mb-1 uppercase text-xs tracking-wider">Approach</span>{caseStudy.approach}</div>
            <div><span className="text-primary font-semibold block mb-1 uppercase text-xs tracking-wider">Outcome</span>{caseStudy.outcome}</div>
        </div>
        <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-[11px] uppercase tracking-wider font-mono rounded-full bg-white/5 text-gray-400 border border-white/5 group-hover:border-primary/50 group-hover:text-gray-200 transition-colors">{tag}</span>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );

  // Make entire card clickable if slug exists
  if (slug) {
    return (
      <Link href={`/projects/${slug}`} className="block h-full cursor-pointer">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export const Projects = () => {
  // Show only first 3 projects as featured preview
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <section id="projects" className="py-32 relative bg-[#080808]">
       <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-primary mono text-2xl">03.</span> Featured Projects
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg mb-8">
            A selection of native mobile applications and backend systems. I focus on <span className="text-white">solving real problems</span> with constraints, trade-offs, and scalability in mind.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
              <ProjectCard key={project.slug || index} {...project} />
          ))}
        </div>
        
        {/* View All CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href="/projects"
            className="group glass-panel border border-white/10 rounded-2xl p-8 w-full max-w-2xl hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  Explore Full Archive
                </h3>
                <p className="text-gray-400 text-sm">
                  Browse all projects with advanced filtering and search
                </p>
              </div>
              <div className="flex-shrink-0 ml-6">
                <svg
                  className="w-8 h-8 text-gray-400 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
       </div>
    </section>
  );
};

