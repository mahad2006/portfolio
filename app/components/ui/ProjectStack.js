'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CARD_WIDTH = 400;
const CARD_GAP = 24;
const ANIMATION_DURATION = 0.6;
const AUTO_PLAY_INTERVAL = 4000; // 4 seconds per card

export const ProjectStack = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const router = useRouter();

  // Create infinite loop by duplicating projects
  const infiniteProjects = [...projects, ...projects, ...projects];

  // Auto-play animation
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, projects.length]);

  // Get visible cards (3 cards: previous, current, next)
  const getVisibleCards = () => {
    const cards = [];
    // Show previous, current, and next cards
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + projects.length) % projects.length;
      cards.push({
        project: projects[index],
        position: i,
        key: `card-${index}-${currentIndex}-${i}`, // Unique key for animation
      });
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <div
      className="relative h-[600px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-full flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {visibleCards.map(({ project, position, key }) => (
            <ProjectCard
              key={key}
              project={project}
              position={position}
              isActive={position === 0}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary w-8'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project, position, isActive }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  // Calculate position and animation variants
  const getVariants = () => {
    const baseX = position * (CARD_WIDTH + CARD_GAP);
    const baseZ = Math.abs(position) * -50;
    const baseScale = 1 - Math.abs(position) * 0.15;
    const baseOpacity = position === 0 ? 1 : 0.4;

    return {
      initial: {
        // Cards jump in from the right
        x: CARD_WIDTH * 3,
        y: 0,
        z: 0,
        scale: 0.8,
        opacity: 0,
      },
      animate: {
        x: baseX,
        y: 0,
        z: baseZ,
        scale: isHovered && isActive ? 1.05 : baseScale,
        opacity: baseOpacity,
      },
      exit: {
        // Cards pop out to the left
        x: -CARD_WIDTH * 3,
        y: 0,
        z: 0,
        scale: 0.8,
        opacity: 0,
      },
    };
  };

  const variants = getVariants();

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      style={{
        position: 'absolute',
        width: CARD_WIDTH,
        perspective: 1000,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <motion.div
          className={`relative h-[550px] glass-panel border rounded-2xl overflow-hidden bg-black/40 backdrop-blur-xl ${
            isActive && isHovered
              ? 'border-primary shadow-2xl'
              : 'border-white/10'
          }`}
          style={{
            boxShadow:
              isActive && isHovered
                ? `0 20px 60px -10px var(--color-primary)`
                : '0 4px 30px rgba(0, 0, 0, 0.2)',
          }}
        >
          {/* Image/Thumbnail */}
          <div className="relative h-64 bg-gradient-to-br from-[#1a1a1a] to-black overflow-hidden">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="400px"
                className="object-cover opacity-80 transition-opacity duration-500"
                style={{
                  opacity: isHovered && isActive ? 1 : 0.8,
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-6xl opacity-10 font-bold">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}

            {/* Hover Overlay */}
            {isActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center gap-4"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/projects/${project.slug}`);
                  }}
                  className="px-6 py-3 bg-white text-black font-bold rounded-lg text-sm hover:bg-gray-200 transition-colors shadow-xl"
                >
                  View Details
                </button>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-6 py-3 glass-panel text-white border border-white/30 font-bold rounded-lg text-sm hover:bg-white/10 transition-colors"
                >
                  Source Code
                </a>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col h-[calc(100%-16rem)]">
            {project.isFlagship && (
              <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">
                ⭐ Flagship
              </span>
            )}
            <h3
              className={`text-2xl font-bold mb-3 transition-colors ${
                isActive && isHovered ? 'text-primary' : 'text-white'
              }`}
            >
              {project.title}
            </h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-3 flex-grow">
              {project.tagline || project.caseStudy?.problem}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
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
      </Link>
    </motion.div>
  );
};

