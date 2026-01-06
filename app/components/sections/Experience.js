'use client';
import React from 'react';
import Link from 'next/link';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { ROUTES } from '@/config/routes';
import { EXPERIENCE_ITEMS, EXPERIENCE_SECTION } from '@/data/experience';

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <span className="text-primary mono text-2xl">{EXPERIENCE_SECTION.sectionNumber}.</span> {EXPERIENCE_SECTION.title}
        </h2>
        <div className="relative border-l border-(--border-subtle) pl-8 ml-4 space-y-16">
          {EXPERIENCE_ITEMS.map((item, index) => (
            <div 
              key={item.id} 
              className="relative animate-fade-up" 
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`absolute -left-10.25 top-0 w-5 h-5 rounded-full ${item.isHighlighted ? 'bg-primary' : 'bg-gray-600'} border-4 border-black box-content`}></div>
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              <p className={`${item.isHighlighted ? 'text-primary' : 'text-gray-400'} mono text-sm mb-4`}>
                {item.organization} | {item.period}
              </p>
              
              {item.link ? (
                <Link href={item.link} passHref>
                  <SpotlightCard as="a" className="card-base p-8 rounded-xl block transition-colors group">
                    <p className="text-gray-400 mb-4">{item.description}</p>
                    {item.achievements.length > 0 && (
                      <ul className="space-y-2 text-sm text-gray-400 mb-6">
                        {item.achievements.map((achievement, i) => (
                          <li key={i} className="flex gap-2 items-start">
                            <span className="text-primary mt-1">▹</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="text-primary group-hover:opacity-80 transition-colors flex items-center gap-2">
                      {item.linkText}
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </SpotlightCard>
                </Link>
              ) : (
                <p className="text-gray-400 max-w-2xl">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

