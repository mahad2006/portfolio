'use client';
import React from 'react';

export const JsonLd = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shaikh Mahad",
    "url": "https://shaikhmahad.vercel.app",
    "jobTitle": "Backend Systems Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "UBIT"
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "University of Karachi",
      "sameAs": "https://uok.edu.pk/"
    },
    "sameAs": [
      "https://github.com/mahad2006",
      "https://www.linkedin.com/in/codewithmahad",
      "https://twitter.com/mahad2006"
    ],
    "knowsAbout": ["Java", "Spring Boot", "PostgreSQL", "Distributed Systems", "System Design", "Kotlin", "Android", "Backend Engineering"],
    "image": "https://shaikhmahad.vercel.app/profile.png"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://shaikhmahad.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://shaikhmahad.vercel.app/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};

