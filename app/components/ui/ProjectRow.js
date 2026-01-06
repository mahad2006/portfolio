'use client';
import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const ProjectRow = ({ title, projects, index = 0 }) => {
  const rowRef = useRef(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(true);

  const checkScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeftFade(scrollLeft > 10);
    setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const row = rowRef.current;
    if (row) {
      row.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => row.removeEventListener('scroll', checkScroll);
    }
  }, []);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4 px-6">{title}</h2>
      <div className="relative">
        {/* Left Fade Gradient */}
        {showLeftFade && (
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-bg to-transparent z-10 pointer-events-none" />
        )}
        
        {/* Right Fade Gradient */}
        {showRightFade && (
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-bg to-transparent z-10 pointer-events-none" />
        )}

        {/* Scrollable Row */}
        <div
          ref={rowRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-6 snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
              className="shrink-0 w-100 snap-start"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative group"
    >
      <div className="card-base rounded-xl overflow-hidden h-full transition-all duration-300">
        {/* Image/Thumbnail */}
        <div className="relative h-56 bg-linear-to-br from-surface to-black overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="400px"
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
              className="px-6 py-3 card-base text-white border border-white/30 font-bold rounded-lg text-sm hover:bg-white/10 transition-colors"
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
              <span className="px-2 py-1 text-[10px] text-gray-400">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

