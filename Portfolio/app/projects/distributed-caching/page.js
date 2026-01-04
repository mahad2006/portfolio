import { projectsData } from '../../data/projects';
import Link from 'next/link';
import Image from 'next/image';

// Find the specific project data
const project = projectsData.find(p => p.slug === 'distributed-caching');

export const metadata = {
  title: `Case Study: ${project.title}`,
  description: project.tagline,
};

const ProjectPage = () => {
  if (!project) {
    return <div>Project not found</div>; // Fallback
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-mono selection:bg-[#6DB33F] selection:text-black">
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="group text-xs text-gray-400 hover:text-[#6DB33F] transition-colors flex items-center gap-2 tracking-widest uppercase">
            <span className="text-green-400">root@mahad:~/projects/{project.slug}</span>
            <span className="text-gray-500">$</span>
            <span className="group-hover:text-orange-400 transition-colors">cd ..</span>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-none tracking-tighter">
            {project.title}
          </h1>
          <p className="text-xl text-gray-400 border-l-2 border-[#6DB33F] pl-6">
            {project.tagline}
          </p>
          <div className="mt-8 flex gap-4">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#6DB33F] text-black font-bold rounded-lg hover:bg-[#5aa035] transition-colors">View Repository</a>
          </div>
        </header>

        {project.image && (
          <div className="mb-16 rounded-2xl overflow-hidden border border-white/10">
            <Image src={project.image} alt={project.title} width={1200} height={630} className="w-full" />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-12">
          <aside className="md:col-span-1 space-y-8">
            <div>
              <h3 className="text-sm font-bold text-white tracking-[0.3em] uppercase opacity-70 mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-400 border border-white/10">{tag}</span>
                ))}
              </div>
            </div>
            {project.stats && (
              <div>
                <h3 className="text-sm font-bold text-white tracking-[0.3em] uppercase opacity-70 mb-4">Key Stats</h3>
                <ul className="space-y-3">
                  {project.stats.map(stat => (
                    <li key={stat.label} className="flex justify-between items-baseline p-3 bg-neutral-900 rounded-lg border border-neutral-800">
                      <span className="text-gray-400 text-xs">{stat.label}</span>
                      <span className="text-white font-bold text-lg">{stat.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          <article className="md:col-span-2 space-y-12">
            {project.caseStudy.problem && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">The Problem</h2>
                <p className="text-gray-400 leading-relaxed">{project.caseStudy.problem}</p>
              </div>
            )}
            {project.caseStudy.approach && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">My Approach & Architecture</h2>
                <p className="text-gray-400 leading-relaxed">{project.caseStudy.approach}</p>
                {project.caseStudy.architecture && <p className="text-gray-400 leading-relaxed mt-4">{project.caseStudy.architecture}</p>}
              </div>
            )}
            {project.caseStudy.challenges && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Technical Challenges</h2>
                <div className="space-y-6">
                  {project.caseStudy.challenges.map(challenge => (
                    <div key={challenge.title} className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
                      <h4 className="font-bold text-[#6DB33F] mb-2">{challenge.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{challenge.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
             <div>
              <h2 className="text-2xl font-bold text-white mb-4">Lessons Learned</h2>
              <p className="text-gray-400 leading-relaxed">This is a great place to reflect on the project. What would you do differently? What were the key takeaways?</p>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default ProjectPage;