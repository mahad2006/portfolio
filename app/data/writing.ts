export const allPosts = [
  {
    slug: 'why-every-student-needs-a-portfolio',
    title: 'Why Every CS Student Needs a Portfolio (Not Just a Resume)',
    description: 'Your resume is 1 page. Your portfolio is proof. Here\'s why building one early in your CS journey sets you apart from the crowd.',
    category: 'Career Advice',
    date: 'Jan 2025',
    readTime: '5 min read',
    isPopular: true,
    isFeatured: true,
    content: `
      <p class="text-gray-300 text-lg leading-relaxed mb-6">I'm in my 3rd semester, and I already have a portfolio. Not because I have tons of experience — I don't. But because I realized something early: <strong class="text-white">a resume tells recruiters what you claim to know; a portfolio shows them what you can actually build.</strong></p>
      
      <h3 class="text-2xl font-bold text-white mt-10 mb-4">The Problem with Resumes</h3>
      <p class="text-gray-300 leading-relaxed mb-6">Every CS student's resume looks the same. "Proficient in Java, Python, SQL." "Strong problem-solving skills." "Team player." How is a recruiter supposed to differentiate between 500 identical applications?</p>
      <p class="text-gray-300 leading-relaxed mb-6">The answer: <span class="text-primary">they can't.</span> Unless you give them something concrete to look at.</p>
      
      <h3 class="text-2xl font-bold text-white mt-10 mb-4">What a Portfolio Actually Proves</h3>
      <ul class="list-disc list-inside text-gray-300 space-y-3 mb-6 ml-4">
        <li><strong class="text-white">You can ship code.</strong> Not just write it in an IDE — actually deploy something that works.</li>
        <li><strong class="text-white">You understand structure.</strong> Clean URLs, responsive design, fast load times — these things matter.</li>
        <li><strong class="text-white">You're proactive.</strong> Most students wait until their final year to think about this stuff. You didn't.</li>
        <li><strong class="text-white">You can learn independently.</strong> Building a portfolio requires learning things outside your syllabus.</li>
      </ul>
      
      <h3 class="text-2xl font-bold text-white mt-10 mb-4">But I Don't Have Any Projects!</h3>
      <p class="text-gray-300 leading-relaxed mb-6">Yes, you do. That semester project you built? That's a project. That small app you made to solve your own problem? That counts. The key is to <strong class="text-white">present them well</strong> — explain the problem, your approach, what you learned, and what you'd do differently.</p>
      <p class="text-gray-300 leading-relaxed mb-6">A simple CRUD app with a good README and live demo is more impressive than a complex project buried in a private repo with no documentation.</p>
      
      <h3 class="text-2xl font-bold text-white mt-10 mb-4">Start Now, Iterate Later</h3>
      <p class="text-gray-300 leading-relaxed mb-6">Your portfolio doesn't need to be perfect. Mine certainly isn't. But having <em>something</em> out there — something you can point to in interviews, something that shows up when recruiters Google your name — that's the advantage.</p>
      <p class="text-gray-300 leading-relaxed mb-6">Start with a simple Next.js template, add your projects, write about what you learned. You can always improve it as you grow. The important thing is to <span class="text-primary font-bold">start now</span>.</p>
      
      <div class="bg-surface p-6 rounded-lg border border-white/10 mt-8">
        <p class="text-gray-300 text-sm"><strong class="text-white">💡 My recommendation:</strong> Pick one weekend, set up a basic portfolio, add 2-3 projects, and deploy it. Then iterate every few months as you build more things. Future you will thank present you.</p>
      </div>
    `
  },
  {
    slug: 'daily-coding-practice-guide',
    title: 'The Daily Coding Practice That Actually Works',
    description: 'Forget marathon study sessions. Here\'s the sustainable approach to improving as a developer — 30 minutes a day, every day.',
    category: 'Productivity',
    date: 'Jan 2025',
    readTime: '4 min read',
    isPopular: true,
    isFeatured: true,
    content: `
      <p class="text-gray-300 text-lg leading-relaxed mb-6">I used to think improvement meant binge-coding for 8 hours on weekends. I was wrong. The secret isn't intensity — it's <strong class="text-white">consistency</strong>.</p>
      
      <h3 class="text-2xl font-bold text-white mt-10 mb-4">Why 30 Minutes Beats 8 Hours</h3>
      <p class="text-gray-300 leading-relaxed mb-6">When you code for 8 hours straight, you're exhausted by hour 3. The remaining 5 hours are low-quality struggle. But 30 focused minutes? That's sustainable. That's something you can do every single day, even during exams.</p>
      <p class="text-gray-300 leading-relaxed mb-6">Over a month: 30 min × 30 days = <span class="text-primary font-bold">15 hours of focused practice</span>. And because it's spread out, you actually retain what you learn.</p>
      
      <h3 class="text-2xl font-bold text-white mt-10 mb-4">My Daily Practice Structure</h3>
      <p class="text-gray-300 leading-relaxed mb-4">Here's what my 30 minutes usually looks like:</p>
      <div class="bg-surface p-6 rounded-lg border border-white/10 mb-6">
        <ul class="text-gray-300 space-y-3">
          <li><strong class="text-primary">10 min:</strong> One LeetCode Easy/Medium (focus on understanding, not speed)</li>
          <li><strong class="text-primary">15 min:</strong> Work on a side project (even just one small feature)</li>
          <li><strong class="text-primary">5 min:</strong> Read documentation or a technical article</li>
        </ul>
      </div>
      <p class="text-gray-300 leading-relaxed mb-6">Some days I skip LeetCode and spend all 30 minutes on a project. The point isn't rigidity — it's showing up every day.</p>
      
      <h3 class="text-2xl font-bold text-white mt-10 mb-4">The Compound Effect</h3>
      <p class="text-gray-300 leading-relaxed mb-6">After 6 months of this, you'll have:</p>
      <ul class="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
        <li>~150 LeetCode problems solved</li>
        <li>2-3 completed side projects</li>
        <li>A reading habit that keeps you updated</li>
        <li>The <em>identity</em> of someone who codes daily</li>
      </ul>
      <p class="text-gray-300 leading-relaxed mb-6">That last point matters most. When coding becomes a daily habit, you stop negotiating with yourself about whether to do it.</p>
      
      <h3 class="text-2xl font-bold text-white mt-10 mb-4">How to Actually Start</h3>
      <ol class="list-decimal list-inside text-gray-300 space-y-3 mb-6 ml-4">
        <li><strong class="text-white">Pick a time.</strong> Morning before class works best for me. Find what works for you.</li>
        <li><strong class="text-white">Remove friction.</strong> Keep your IDE open. Have a LeetCode problem queued up the night before.</li>
        <li><strong class="text-white">Track it.</strong> I use a simple streak counter. Seeing "Day 47" makes me not want to break the chain.</li>
        <li><strong class="text-white">Forgive bad days.</strong> Did only 10 minutes today? That's fine. The goal is consistency, not perfection.</li>
      </ol>
      
      <div class="bg-surface p-6 rounded-lg border border-white/10 mt-8">
        <p class="text-gray-300 text-sm"><strong class="text-white">🎯 Challenge:</strong> Try this for just 2 weeks. 30 minutes a day, no excuses. If you don't see improvement in your confidence and skills, you can go back to weekend binges. But I bet you won't want to.</p>
      </div>
    `
  },
  {
    slug: 'recursive-descent-parser',
    title: 'Building a Math Parser: Why I Chose Recursive Descent',
    description: 'For my Derivify app, I needed to parse mathematical expressions. Here\'s why I went with recursive descent over the shunting-yard algorithm.',
    category: 'Technical Deep Dive',
    date: 'Dec 2024',
    readTime: '6 min read',
    isPopular: false,
    isFeatured: false,
    content: `
      <p class="text-gray-300 text-lg leading-relaxed mb-6">When building <strong class="text-white">Derivify</strong> — my calculus learning app — I needed a way to parse mathematical expressions like <code class="bg-surface px-2 py-1 rounded text-primary">3x^2 + 2x - 5</code> into a structure my app could manipulate.</p>
      
      <h3 class="text-2xl font-bold text-white mt-10 mb-4">The Two Main Approaches</h3>
      <p class="text-gray-300 leading-relaxed mb-4">There are two popular ways to parse mathematical expressions:</p>
      <ul class="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
        <li><strong class="text-white">Shunting-Yard Algorithm:</strong> Converts infix notation to postfix, then evaluates. Clean and efficient.</li>
        <li><strong class="text-white">Recursive Descent Parser:</strong> Hand-written parser that builds an AST directly from grammar rules.</li>
      </ul>
      
      <h3 class="text-2xl font-bold text-white mt-10 mb-4">Why Recursive Descent Won</h3>
      <p class="text-gray-300 leading-relaxed mb-6">For Derivify, I needed more than just evaluation — I needed to <em>symbolically manipulate</em> expressions. Take derivatives, simplify terms, display step-by-step solutions. An AST (Abstract Syntax Tree) makes this natural.</p>
      
      <pre class="bg-surface p-4 rounded-lg border border-white/10 text-sm text-gray-300 overflow-x-auto mb-6"><code>// With an AST, differentiation becomes tree manipulation:
// d/dx (3x^2) → 3 * 2 * x^(2-1) → 6x
sealed class Expr {
    data class Const(val value: Double) : Expr()
    data class Var(val name: String) : Expr()
    data class BinOp(val op: Op, val left: Expr, val right: Expr) : Expr()
    data class Power(val base: Expr, val exp: Expr) : Expr()
}</code></pre>

      <p class="text-gray-300 leading-relaxed mb-6">Recursive descent also gave me <strong class="text-white">better error messages</strong>. When a user types <code class="bg-surface px-2 py-1 rounded text-primary">3x + * 2</code>, I can point exactly to the unexpected <code class="text-primary">*</code> and explain why it's invalid.</p>
      
      <h3 class="text-2xl font-bold text-white mt-10 mb-4">The Trade-offs</h3>
      <p class="text-gray-300 leading-relaxed mb-6">Recursive descent requires more code and careful handling of operator precedence. But for an educational app where I need full control over the expression structure, it was the right choice.</p>
      
      <div class="bg-surface p-6 rounded-lg border border-white/10 mt-8">
        <p class="text-gray-300 text-sm"><strong class="text-white">📝 Lesson learned:</strong> Choose your parsing approach based on what you need to <em>do</em> with the result, not just how to <em>get</em> the result.</p>
      </div>
    `
  }
];