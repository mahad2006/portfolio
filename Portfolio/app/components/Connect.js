'use client';
import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

export const Connect = () => {
  const [state, handleSubmit] = useForm("meeonyao");
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('codewithmahad@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  if (state.succeeded) {
    return (
      <section id="connect" className="py-24 bg-gradient-to-t from-black to-gray-900/40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Message Sent!</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Thanks for your message! I'll get back to you soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="connect" className="py-24 bg-gradient-to-t from-black to-gray-900/40">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Engineer the Future.</h2><p className="text-xl text-gray-400 max-w-2xl mx-auto">Whether you have a question about backend scaling, want to collaborate on a project, or just want to say hi, I'll try my best to get back to you!</p></div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
              <h3 className="text-white font-bold text-xl mb-4">Connect Directly</h3>
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center gap-4 p-4 glass-panel rounded-lg hover:border-[#6DB33F] transition-all group hover:-translate-y-1 text-left relative overflow-hidden"
                aria-label="Copy email address to clipboard"
              >
                <div className={`p-3 rounded-full transition-colors ${emailCopied ? 'bg-green-500/20 text-green-500' : 'bg-white/5 group-hover:bg-[#6DB33F]/20 text-gray-400 group-hover:text-[#6DB33F]'}`}>
                  {emailCopied ? (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>) : (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>)}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email {emailCopied && <span className="text-green-500 text-xs ml-2 animate-fade-up">Copied!</span>}</p>
                  <p className="text-white font-mono text-sm group-hover:text-[#6DB33F] transition-colors">codewithmahad@gmail.com</p>
                </div>
              </button>
              <a
                href="https://www.linkedin.com/in/codewithmahad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-panel rounded-lg hover:border-[#6DB33F] transition-all group hover:-translate-y-1"
                aria-label="View LinkedIn profile"
              >
                <div className="p-3 bg-white/5 rounded-full group-hover:bg-[#6DB33F]/20 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 group-hover:text-[#6DB33F]"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">LinkedIn</p>
                  <p className="text-white font-mono text-sm group-hover:text-[#6DB33F] transition-colors">/in/codewithmahad</p>
                </div>
              </a>
              <div className="flex gap-4 pt-4">
                <a href="https://github.com/mahad2006" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors hover:underline" aria-label="View GitHub profile">GitHub</a>
                <a href="https://leetcode.com/u/mahad2006/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors hover:underline" aria-label="View LeetCode profile">LeetCode</a>
                <a href="https://codolio.com/profile/codewithmahad" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors hover:underline" aria-label="View Codolio profile">Codolio</a>
              </div>
          </div>
          <form className="glass-panel p-8 rounded-2xl space-y-4 relative" onSubmit={handleSubmit}>
            <h3 className="text-white font-bold text-xl mb-2">Send a Message</h3>
            <div>
              <input id="name" type="text" name="name" placeholder="Your Name" required className="input-field" />
              <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>
            <div>
              <input id="email" type="email" name="email" placeholder="Your Email" required className="input-field" />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>
            <div>
              <textarea id="message" name="message" rows="4" placeholder="Your Message" required className="input-field resize-none"></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>
            <button type="submit" disabled={state.submitting} className="w-full py-4 font-bold rounded-lg transition-all flex justify-center items-center gap-2 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-[#6DB33F] text-black hover:bg-[#5aa035]">
              {state.submitting ? <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span> Sending...</> : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};