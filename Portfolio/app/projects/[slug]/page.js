import Link from 'next/link';
import Image from 'next/image';

// --- DATA: Technical Case Studies ---
// In a real app, this might come from a database. 
// For a portfolio, storing it here is efficient and fast.
const projectsData = {
    "scalable-ecommerce": {
        title: "Scalable E-Commerce API",
        tagline: "Handling high-concurrency traffic with Spring Boot & PostgreSQL",
        tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Redis'],
        stats: [
            { label: "Latency Reduced", value: "45%" },
            { label: "Request Throughput", value: "10k/sec" },
            { label: "Test Coverage", value: "92%" },
        ],
        content: {
            problem: "During flash sales, traditional monolithic e-commerce architectures suffer from database bottlenecks and slow response times due to locking contentions.",
            architecture: "I implemented a vertical slicing architecture. The application is containerized using Docker. Redis is placed in front of PostgreSQL as a write-through cache for product details, while inventory updates use optimistic locking to prevent race conditions.",
            challenges: [
                { title: "The N+1 Query Problem", desc: "Initially, fetching orders with items caused massive DB thrashing. I solved this using JPQL fetch joins and Entity Graphs." },
                { title: "Inventory Race Conditions", desc: "Concurrent purchases allowed negative inventory. Implemented PESSIMISTIC_WRITE locks for checkout transactions." }
            ]
        }
    },
    "derivify-calculus": {
        title: "Derivify: Calculus Toolkit",
        tagline: "A custom Recursive Descent Parser for offline math solving",
        tags: ['Kotlin', 'Algorithms', 'Android', 'Parsers'],
        stats: [
            { label: "App Size", value: "<15MB" },
            { label: "Parse Time", value: "12ms" },
            { label: "Downloads", value: "500+" },
        ],
        content: {
            problem: "Existing math solvers required internet access or were too heavy for older Android devices used by students in developing regions.",
            architecture: "The core is a custom-built mathematical expression tokenizer and parser based on the Shunting-yard algorithm, written in pure Kotlin with zero external dependencies.",
            challenges: [
                { title: "Operator Precedence", desc: "Handling complex nested brackets and implicit multiplication (e.g., '2x') required a robust state machine in the lexer." },
                { title: "Rendering LaTeX", desc: "Built a custom view component to render the mathematical output natively without a heavy WebView." }
            ]
        }
    },
    // Add entries for other projects here...
};

export function generateStaticParams() {
    return Object.keys(projectsData).map((slug) => ({ slug }));
}

export default function ProjectPage({ params }) {
    const project = projectsData[params.slug];

    if (!project) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
                <Link href="/" className="text-[#6DB33F] hover:underline">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#6DB33F] selection:text-black pb-24">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 px-6 py-4 flex justify-between items-center">
                <Link href="/#projects" className="text-sm font-mono text-gray-400 hover:text-white transition-colors">
                    ← Back to Projects
                </Link>
                <div className="font-mono text-xs text-[#6DB33F]">CASE STUDY</div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 pt-32">
                {/* Header */}
                <div className="mb-16 animate-fade-up">
                    <div className="flex flex-wrap gap-3 mb-6">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 text-xs font-mono border border-white/10 rounded-full text-[#6DB33F] bg-[#6DB33F]/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {project.title}
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl border-l-2 border-[#6DB33F] pl-6">
                        {project.tagline}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-16 border-y border-white/10 py-8">
                    {project.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Content Body */}
                <div className="space-y-16">

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="text-[#6DB33F]">01.</span> The Problem
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-300">
                            {project.content.problem}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="text-[#6DB33F]">02.</span> System Architecture
                        </h2>
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 mb-6 flex items-center justify-center min-h-[200px]">
                            <p className="font-mono text-sm text-gray-500">[System Diagram Placeholder]</p>
                        </div>
                        <p className="text-lg leading-relaxed text-gray-300">
                            {project.content.architecture}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="text-[#6DB33F]">03.</span> Key Engineering Challenges
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {project.content.challenges.map((challenge, i) => (
                                <div key={i} className="p-6 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-[#6DB33F]/30 transition-colors">
                                    <h3 className="text-lg font-bold text-white mb-3">{challenge.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{challenge.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* Footer CTA */}
                <div className="mt-24 pt-12 border-t border-white/10 flex justify-between items-center">
                    <Link href="/#projects" className="text-gray-500 hover:text-white transition-colors">
                        Previous Project
                    </Link>
                    <a href="https://github.com/mahad2006" target="_blank" className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                        View Source on GitHub
                    </a>
                </div>
            </main>
        </div>
    );
}