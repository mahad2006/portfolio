'use client';
import React from 'react';

export const JsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shaikh Mahad",
    "url": "https://shaikhmahad.vercel.app",
    "jobTitle": "Backend Systems Engineer",
    "sameAs": [
      "https://github.com/mahad2006",
      "https://www.linkedin.com/in/codewithmahad"
    ],
    "knowsAbout": ["Java", "Spring Boot", "PostgreSQL", "Distributed Systems", "System Design"]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
