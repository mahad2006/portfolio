'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '@/data/projects';
import { ProjectRow } from '@/components/ui/ProjectRow';
import { PageShell } from '@/components/layout/PageShell';
import Image from 'next/image';

// Category mapping based on tags
const getCategory = (project) => {
  const tags = project.tags.map(t => t.toLowerCase());
  // Check for console/terminal projects first (C++ DSA projects)
  if (tags.some(t => t.includes('c++') || t.includes('console') || t.includes('terminal') || t.includes('cli'))) {
    return 'Console & DSA';
  }
  if (tags.some(t => t.includes('android') || t.includes('kotlin') || t.includes('mobile'))) {
    return 'Mobile Apps';
  }
  if (tags.some(t => t.includes('backend') || t.includes('api') || t.includes('spring') || t.includes('java'))) {
    return 'Backend Systems';
  }
  if (tags.some(t => t.includes('system') || t.includes('architecture') || t.includes('design'))) {
    return 'System Architecture';
  }
  if (tags.some(t => t.includes('documentation') || t.includes('education') || t.includes('dsa'))) {
    return 'Documentation & Guides';
  }
  return 'Other Projects';
};

// Filter options
const FILTERS = ['All', 'Mobile Apps', 'Backend Systems', 'System Architecture', 'Console & DSA', 'Documentation & Guides'];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Categorize projects
  const categorizedProjects = useMemo(() => {
    const categories = {};
    projectsData.forEach(project => {
      const category = getCategory(project);
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(project);
    });
    return categories;
  }, []);

  // Filter and search logic
  const filteredData = useMemo(() => {
    let filtered = projectsData;

    // Apply category filter
    if (activeFilter !== 'All') {
      filtered = filtered.filter(project => getCategory(project) === activeFilter);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.tagline?.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query)) ||
        project.caseStudy?.problem?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeFilter]);

  // Determine if we should show rows or grid
  const showGrid = searchQuery.trim() !== '' || activeFilter !== 'All';
  const showRows = !showGrid;

  return (
    <PageShell title={null} headerTag="PROJECT_ARCHIVE">
      {/* Hero Header */}
      <div className="relative pt-8 pb-16 -mt-12">
        {/* Spotlight Background Effect */}
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-heading-1 mb-8"
          >
            Project<span className="text-primary">_</span>Archive
          </motion.h1>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-base rounded-2xl p-4 mb-8"
        >
          {/* Search Input */}
          <div className="flex items-center gap-4 mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none text-white text-lg placeholder-gray-500 focus:outline-none"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-primary text-black shadow-lg shadow-primary/20'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          {showRows ? (
            <motion.div
              key="rows"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {Object.entries(categorizedProjects).map(([category, projects], index) => (
                <ProjectRow
                  key={category}
                  title={category}
                  projects={projects}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredData.length > 0 ? (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    {filteredData.length} {filteredData.length === 1 ? 'Result' : 'Results'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((project, index) => (
                      <motion.div
                        key={project.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        className="relative group"
                      >
                        <GridProjectCard project={project} />
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-24">
                  <p className="text-2xl text-gray-400 mb-4">No projects found</p>
                  <p className="text-gray-500">Try adjusting your search or filter</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}

// Grid View Card Component
const GridProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-panel border border-white/10 rounded-xl overflow-hidden h-full hover:border-primary/50 transition-all duration-300"
    >
      {/* Image/Thumbnail */}
      <div className="relative h-56 bg-linear-to-br from-surface to-black overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-10 group-hover:opacity-30 transition-opacity font-bold">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center gap-4"
        >
          {project.slug && (
            <Link
              href={`/projects/${project.slug}`}
              className="px-6 py-3 bg-white text-black font-bold rounded-lg text-sm hover:bg-gray-200 transition-colors shadow-xl"
            >
              View Details
            </Link>
          )}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 glass-panel text-white border border-white/30 font-bold rounded-lg text-sm hover:bg-white/10 transition-colors"
          >
            Source Code
          </a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        {project.isFlagship && (
          <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">
            ⭐ Flagship
          </span>
        )}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {project.tagline || project.caseStudy?.problem}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-[10px] uppercase tracking-wider font-mono rounded bg-white/5 text-gray-400 border border-white/5"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-[10px] text-gray-500">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

