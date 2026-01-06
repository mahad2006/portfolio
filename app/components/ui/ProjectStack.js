'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CARD_WIDTH = 340;
const AUTO_PLAY_INTERVAL = 6000; // 6 seconds per card (slower)

// Position configuration - responsive spread using percentage-based offsets
const POSITIONS = {
  farLeft:  { index: -2, zIndex: 10, scale: 0.75, opacity: 0.5, xPercent: -85 },
  left:     { index: -1, zIndex: 20, scale: 0.85, opacity: 0.8, xPercent: -45 },
  center:   { index: 0,  zIndex: 30, scale: 1,    opacity: 1,   xPercent: 0 },
  right:    { index: 1,  zIndex: 20, scale: 0.85, opacity: 0.8, xPercent: 45 },
  farRight: { index: 2,  zIndex: 10, scale: 0.75, opacity: 0.5, xPercent: 85 },
};

export const ProjectStack = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1200);
  const containerRef = useRef(null);
  const router = useRouter();
  
  // Touch/drag state
  const [dragStart, setDragStart] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Measure container width for responsive spread
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Auto-play animation - continuous loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [projects.length]);

  // Calculate x position based on container width
  const getXPosition = (xPercent) => {
    const maxSpread = Math.min(containerWidth * 0.4, 400); // Max 400px or 40% of container
    return (xPercent / 100) * maxSpread;
  };

  // Get visible cards
  const getVisibleCards = () => {
    const cards = [];
    const positions = ['farLeft', 'left', 'center', 'right', 'farRight'];

    positions.forEach((pos) => {
      const config = POSITIONS[pos];
      const projectIndex = (currentIndex + config.index + projects.length) % projects.length;
      cards.push({
        project: projects[projectIndex],
        position: pos,
        config: {
          ...config,
          x: getXPosition(config.xPercent),
        },
        projectIndex,
      });
    });

    return cards;
  };

  const visibleCards = getVisibleCards();

  // Navigation functions
  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleCardClick = (position) => {
    if (position === 'left' || position === 'farLeft') {
      goPrev();
    } else if (position === 'right' || position === 'farRight') {
      goNext();
    }
  };

  // Touch/Drag handlers
  const handleDragStart = (e) => {
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setDragStart(clientX);
    setIsDragging(true);
  };

  const handleDragEnd = (e) => {
    if (!isDragging || dragStart === null) return;
    
    const clientX = e.type === 'touchend' 
      ? e.changedTouches[0].clientX 
      : e.clientX;
    
    const diff = clientX - dragStart;
    const threshold = 50; // Minimum swipe distance
    
    if (diff > threshold) {
      goPrev(); // Swiped right, show previous
    } else if (diff < -threshold) {
      goNext(); // Swiped left, show next
    }
    
    setDragStart(null);
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-150 overflow-hidden mb-8 cursor-grab active:cursor-grabbing"
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      {/* Navigation Arrows */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-all hover:scale-110"
        aria-label="Previous project"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-all hover:scale-110"
        aria-label="Next project"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <div className="relative h-full flex items-center justify-center">
        {visibleCards.map(({ project, position, config, projectIndex }) => (
          <ProjectCard
            key={projectIndex}
            project={project}
            position={position}
            config={config}
            isActive={position === 'center'}
            onClick={() => handleCardClick(position)}
          />
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary/20'
                : 'bg-transparent hover:bg-white/10'
            }`}
            aria-label={`Go to project ${index + 1}`}
          >
            <span className={`block rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary w-8 h-3'
                : 'bg-white/30 w-3 h-3 hover:bg-white/50'
            }`} />
          </button>
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
      initial={false}
      animate={{
        x: config.x,
        scale: isHovered && isActive ? 1.02 : config.scale,
        opacity: config.opacity,
        zIndex: config.zIndex,
      }}
      transition={{
        x: { type: 'spring', stiffness: 200, damping: 30 },
        scale: { type: 'spring', stiffness: 300, damping: 25 },
        opacity: { duration: 0.4, ease: 'easeOut' },
      }}
      style={{
        position: 'absolute',
        width: CARD_WIDTH,
        cursor: isActive ? 'pointer' : 'grab',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        // If clicking on an interactive element inside, don't navigate
        if (e.target.closest('a, button')) return;
        if (isActive) {
          router.push(`/projects/${project.slug}`);
        } else {
          onClick();
        }
      }}
      className="select-none"
    >
      <div className="block h-full">
        <motion.div
          className={`relative h-137.5 card-base rounded-2xl overflow-hidden transition-all duration-300 ${
            isActive && isHovered
              ? 'border-(--border-highlight)'
              : ''
          }`}
          style={{
            boxShadow:
              isActive && isHovered
                ? `0 0 8px -2px var(--color-primary), var(--shadow-card-hover)`
                : 'var(--shadow-card)',
          }}
        >
          {/* Image/Thumbnail */}
          <div className="relative h-56 bg-linear-to-br from-surface to-black overflow-hidden">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="340px"
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
          <div className="p-6 flex flex-col h-[calc(100%-14rem)]">
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
            <p className="text-sm text-gray-400 mb-4 line-clamp-3 grow">
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
                <span className="px-2 py-1 text-[10px] text-gray-400">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
