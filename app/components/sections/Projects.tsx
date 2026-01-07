'use client';
import React from 'react';
import Link from 'next/link';
import { projectsData } from '@/data/projects';
import { ProjectStack } from '@/components/ui/ProjectStack';
import { ROUTES } from '@/config/routes';
import { FadeUp, ScaleUp } from '@/components/ui/AnimatedSection';

export const Projects = () => {
  // Filter out console/C++ projects and DSA documentation from homepage
  const allProjects = projectsData.filter(project => 
    project.type !== 'console' && !project.title.toLowerCase().includes('dsa')
  );

  return (
    <section id="projects" className="py-16 md:py-32 relative bg-[#080808]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <FadeUp>
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              <span className="text-primary mono text-lg md:text-2xl">02.</span> Featured Projects
            </h2>
            <p className="text-gray-400 max-w-2xl text-sm md:text-lg mb-6 md:mb-8">
              A selection of native mobile applications and backend systems. I focus on <span className="text-white">solving real problems</span> with constraints, trade-offs, and scalability in mind.
            </p>
          </div>
        </FadeUp>

        {/* Infinite 3D Loop Animation */}
        <ScaleUp delay={0.2}>
          <div className="mb-8 md:mb-12">
            <ProjectStack projects={allProjects} />
          </div>
        </ScaleUp>
        
        {/* View All CTA */}
        <FadeUp delay={0.4}>
          <div className="flex justify-center mt-8 md:mt-12">
            <Link
            href={ROUTES.PROJECTS}
            className="group card-base rounded-xl md:rounded-2xl p-4 md:p-8 w-full max-w-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2 group-hover:text-primary transition-colors">
                  Explore Full Archive
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Browse all projects with filtering
                </p>
              </div>
              <div className="shrink-0 ml-4 md:ml-6">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-gray-400 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300"
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
        </FadeUp>
      </div>
    </section>
  );
};

