'use client';
import React from 'react';
import { 
  AUTHOR_NAME, 
  AUTHOR_TITLE, 
  SITE_URL, 
  PROFILE_IMAGE_URL,
  SAME_AS_URLS,
  ORGANIZATION 
} from '@/config/site';

export const JsonLd = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": AUTHOR_NAME,
    "url": SITE_URL,
    "jobTitle": AUTHOR_TITLE,
    "worksFor": {
      "@type": "Organization",
      "name": ORGANIZATION.name
    },
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": ORGANIZATION.fullName,
      "sameAs": ORGANIZATION.url
    },
    "sameAs": SAME_AS_URLS,
    "knowsAbout": ["Java", "Spring Boot", "PostgreSQL", "Distributed Systems", "System Design", "Kotlin", "Android", "Backend Engineering"],
    "image": PROFILE_IMAGE_URL
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${AUTHOR_NAME} - Backend Engineering Services`,
    "description": "Backend systems engineering services specializing in Java, Spring Boot, distributed systems, and scalable architectures.",
    "url": SITE_URL,
    "provider": {
      "@type": "Person",
      "name": AUTHOR_NAME
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide (Remote)"
    },
    "serviceType": ["Backend Development", "API Design", "System Architecture", "Database Optimization"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Backend Engineering Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "API Development",
            "description": "RESTful API design and implementation with Spring Boot"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "System Design",
            "description": "Scalable distributed system architecture design"
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
};

