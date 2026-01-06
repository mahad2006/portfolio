import { projectsData } from '@/data/projects';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { generateProjectMetadata } from '@/components/layout/pageMetadata';
import {
  PhoneMockupGallery,
  ArchitectureDiagram,
  DocumentationVisual,
  PlaceholderVisual,
  AppFeaturesGrid,
  TerminalMockup,
} from '@/components/projects/ProjectVisuals';

// This function tells Next.js which slugs to pre-render
export async function generateStaticParams() {
  if (!Array.isArray(projectsData)) {
    return [];
  }
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

// This function gets the project data for a given slug
function getProject(slug) {
  if (!Array.isArray(projectsData) || !slug) {
    return null;
  }
  return projectsData.find(p => p.slug === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  return generateProjectMetadata(project);
}

const ProjectPage = async ({ params }) => {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const projectType = project.type || 'backend';
  const isMobileApp = projectType === 'mobile-app';
  const isDocumentation = projectType === 'documentation';
  const isConsole = projectType === 'console';
  const isSystemDesign = projectType === 'system-design' || projectType === 'backend';

  return (
    <PageShell title={null} headerTag="CASE_STUDY">
      {/* Project Hero Section */}
      <header className="mb-10 md:mb-12">
        {/* Type Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium">
            {isConsole && (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Console App
              </>
            )}
            {isMobileApp && (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Mobile App
              </>
            )}
            {isDocumentation && (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Documentation
              </>
            )}
            {isSystemDesign && (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
                {projectType === 'system-design' ? 'System Design' : 'Backend'}
              </>
            )}
          </span>
          
          {/* Flagship Badge */}
          {project.isFlagship && (
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-medium">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Flagship Project
            </span>
          )}
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
          {project.title}
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 border-l-2 border-primary pl-6 max-w-2xl">
          {project.tagline}
        </p>
        
        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Repository
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </header>

      {/* ================================================================ */}
      {/* TYPE-SPECIFIC VISUAL SECTION */}
      {/* ================================================================ */}
      
      {/* Mobile App: Phone Mockups */}
      {isMobileApp && project.screens && (
        <section className="mb-12 md:mb-16 py-8 px-4 -mx-4 md:-mx-6 bg-linear-to-b from-white/2 to-transparent rounded-3xl border border-white/4">
          <PhoneMockupGallery screens={project.screens} />
        </section>
      )}
      
      {/* Console/CLI: Terminal Mockup */}
      {isConsole && (
        <section className="mb-12 md:mb-16">
          <TerminalMockup slug={project.slug} />
        </section>
      )}
      
      {/* Backend/System: Architecture Diagram */}
      {isSystemDesign && !isConsole && project.diagrams?.architecture && (
        <section className="mb-12 md:mb-16">
          <ArchitectureDiagram 
            title={project.diagrams.architecture.title}
            components={project.diagrams.architecture.components}
            projectType={projectType}
          />
        </section>
      )}
      
      {/* Documentation: Content Overview */}
      {isDocumentation && project.sections && (
        <section className="mb-12 md:mb-16">
          <DocumentationVisual sections={project.sections} title="Documentation Structure" />
        </section>
      )}
      
      {/* Fallback: Project Image (smaller) or Placeholder */}
      {!isMobileApp && !isConsole && !project.diagrams?.architecture && !project.sections && (
        <section className="mb-12 md:mb-16">
          {project.image ? (
            <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-black/30">
              <Image 
                src={project.image} 
                alt={project.title} 
                width={800} 
                height={420} 
                className="w-full h-auto object-cover"
              />
            </div>
          ) : (
            <PlaceholderVisual title={project.title} type={projectType} />
          )}
        </section>
      )}

      {/* ================================================================ */}
      {/* MAIN CONTENT GRID */}
      {/* ================================================================ */}
      
      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Tech Stack */}
          <div className="p-5 rounded-2xl bg-white/2 border border-white/6">
            <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Key Stats */}
          {project.stats && project.stats.length > 0 && (
            <div className="p-5 rounded-2xl bg-white/2 border border-white/6">
              <h3 className="text-sm font-bold text-white tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Key Metrics
              </h3>
              <ul className="space-y-2">
                {project.stats.map(stat => (
                  <li 
                    key={stat.label} 
                    className="flex justify-between items-center p-3 bg-black/30 rounded-xl border border-white/4"
                  >
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                    <span className="text-white font-bold">{stat.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outcome */}
          {project.caseStudy.outcome && (
            <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20">
              <h3 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Outcome
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">{project.caseStudy.outcome}</p>
            </div>
          )}
        </aside>

        {/* Main Article Content */}
        <article className="lg:col-span-2 space-y-10">
          {/* App Features - For Mobile Apps */}
          {isMobileApp && project.appFeatures && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </span>
                Key Features
              </h2>
              <AppFeaturesGrid features={project.appFeatures} />
            </section>
          )}
          
          {/* The Problem */}
          {project.caseStudy.problem && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </span>
                The Problem
              </h2>
              <p className="text-gray-400 leading-relaxed">{project.caseStudy.problem}</p>
            </section>
          )}
          
          {/* Approach & Architecture */}
          {project.caseStudy.approach && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </span>
                My Approach
              </h2>
              <p className="text-gray-400 leading-relaxed">{project.caseStudy.approach}</p>
              
              {project.caseStudy.architecture && (
                <div className="mt-4 p-4 rounded-xl bg-white/2 border border-white/6">
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Architecture Details
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{project.caseStudy.architecture}</p>
                </div>
              )}
            </section>
          )}
          
          {/* Technical Challenges */}
          {project.caseStudy.challenges && project.caseStudy.challenges.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                Technical Challenges
              </h2>
              <div className="space-y-3">
                {project.caseStudy.challenges.map((challenge, index) => (
                  <div 
                    key={challenge.title} 
                    className="group p-5 bg-white/2 border border-white/6 rounded-xl hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="shrink-0 w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">
                          {challenge.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{challenge.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {/* Lessons Learned */}
          <section className="pt-6 border-t border-white/6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
              Lessons Learned
            </h2>
            <div className="p-5 rounded-xl bg-linear-to-br from-white/3 to-transparent border border-white/6">
              <p className="text-gray-400 leading-relaxed italic">
                {project.caseStudy.lessons || 
                  "Every project teaches something new. This one reinforced the importance of thorough planning, iterative development, and keeping the end-user experience in mind."
                }
              </p>
            </div>
          </section>

          {/* Back Link */}
          <div className="pt-6">
            <Link 
              href="/projects"
              className="group inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to all projects
            </Link>
          </div>
        </article>
      </div>
    </PageShell>
  );
};

export default ProjectPage;