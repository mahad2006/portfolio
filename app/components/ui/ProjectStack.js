'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CARD_WIDTH = 380;
const AUTO_PLAY_INTERVAL = 4000; // 4 seconds per card

// Position configuration for Stacked Deck (Cover Flow)
// Strict 3-Layer System: Center (Layer 0), Immediate Left/Right (Layer 1), Far Left/Right (Layer 2)
const POSITIONS = {
  farRight: { index: 2, zIndex: 30, scale: 0.8, opacity: 0.7, x: 340 },
  right: { index: 1, zIndex: 40, scale: 0.9, opacity: 1, x: 160 },
  center: { index: 0, zIndex: 50, scale: 1, opacity: 1, x: 0 },
  left: { index: -1, zIndex: 40, scale: 0.9, opacity: 1, x: -160 },
  farLeft: { index: -2, zIndex: 30, scale: 0.8, opacity: 0.7, x: -340 },
  hidden: { index: 3, zIndex: 0, scale: 0, opacity: 0, x: 0 }, // Layer 3+ hidden
};

export const ProjectStack = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const router = useRouter();

  // Auto-play animation
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, projects.length]);

  // Get visible cards (5 cards: farLeft, left, center, right, farRight) - Strict 3-Layer System
  const getVisibleCards = () => {
    const cards = [];
    const positions = ['farLeft', 'left', 'center', 'right', 'farRight'];

    positions.forEach((pos) => {
      const config = POSITIONS[pos];
      const projectIndex = (currentIndex + config.index + projects.length) % projects.length;
      cards.push({
        project: projects[projectIndex],
        position: pos,
        config,
        key: `card-${projectIndex}-${currentIndex}-${pos}`,
      });
    });

    return cards;
  };

  const visibleCards = getVisibleCards();

  const handleCardClick = (position) => {
    if (position !== 'center') {
      // Calculate how many steps to move
      const positionMap = {
        farLeft: -2,
        left: -1,
        center: 0,
        right: 1,
        farRight: 2,
      };
      const steps = -positionMap[position];
      setCurrentIndex((prev) => (prev + steps + projects.length) % projects.length);
    }
  };

  return (
    <div
      className="relative h-[650px] overflow-visible mb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-full flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {visibleCards.map(({ project, position, config, key }) => (
            <ProjectCard
              key={key}
              project={project}
              position={position}
              config={config}
              isActive={position === 'center'}
              onClick={() => handleCardClick(position)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Dots - Moved up to avoid overlap */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary w-8'
                : 'bg-white/20 w-2 hover:bg-white/40'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project, position, config, isActive, onClick }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{
        x: config.x,
        scale: config.scale,
        opacity: config.opacity,
        zIndex: config.zIndex,
      }}
      animate={{
        x: config.x,
        scale: isHovered && isActive ? 1.05 : config.scale,
        opacity: config.opacity,
        zIndex: config.zIndex,
      }}
      exit={{
        scale: 0.5,
        opacity: 0,
      }}
      transition={{
        type: 'tween',
        ease: 'easeInOut',
        duration: 1.2,
      }}
      style={{
        position: 'absolute',
        width: CARD_WIDTH,
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="select-none"
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <motion.div
          className={`relative h-[600px] card-base rounded-2xl overflow-hidden transition-all duration-300 ${
            isActive && isHovered
              ? 'border-[var(--border-highlight)]'
              : ''
          }`}
          style={{
            boxShadow:
              isActive && isHovered
                ? `0 0 20px -3px var(--color-primary), var(--shadow-card-hover)`
                : 'var(--shadow-card)',
          }}
        >
          {/* Image/Thumbnail */}
          <div className="relative h-64 bg-gradient-to-br from-[#1a1a1a] to-black overflow-hidden">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="380px"
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
                className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center gap-4"
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
                  className="px-6 py-3 card-base text-white border border-white/30 font-bold rounded-lg text-sm hover:bg-white/10 transition-colors"
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
