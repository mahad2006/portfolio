'use client';
import React from 'react';
import Link from 'next/link';
import { projectsData } from '@/data/projects';
import { ProjectStack } from '@/components/ui/ProjectStack';

export const Projects = () => {
  // Use all projects for the infinite loop
  const allProjects = projectsData;

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

        {/* Infinite 3D Loop Animation */}
        <div className="mb-12">
          <ProjectStack projects={allProjects} />
        </div>
        
        {/* View All CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href="/projects"
            className="group card-base rounded-2xl p-8 w-full max-w-2xl transition-all duration-300 hover:scale-[1.02]"
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

