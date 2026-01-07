'use client';
import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/config/site';
import { FadeUp, SlideInLeft, SlideInRight } from '@/components/ui/AnimatedSection';

export const Connect = () => {
  const [state, handleSubmit] = useForm(CONTACT_INFO.formspreeId);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  if (state.succeeded) {
    return (
      <section id="connect" className="py-24 bg-section-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Message Sent!</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Thanks for your message! I'll get back to you soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="connect" className="py-16 md:py-24 bg-section-gradient">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <FadeUp>
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">Let&apos;s Engineer the Future.</h2>
            <p className="text-sm md:text-xl text-gray-400 max-w-2xl mx-auto">Whether you have a question about backend scaling, want to collaborate, or just want to say hi!</p>
          </div>
        </FadeUp>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <SlideInLeft delay={0.2}>
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-white font-bold text-lg md:text-xl mb-3 md:mb-4">Connect Directly</h3>
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 card-base rounded-lg transition-all group text-left"
                aria-label="Copy email address to clipboard"
              >
                <div className={`p-2 md:p-3 rounded-full transition-colors ${emailCopied ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-400'}`}>
                  {emailCopied ? (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>) : (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>)}
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-gray-400">Email {emailCopied && <span className="text-primary text-xs ml-2">Copied!</span>}</p>
                  <p className="text-white font-mono text-xs md:text-sm truncate">{CONTACT_INFO.email}</p>
                </div>
              </button>
              <a
                href={SOCIAL_LINKS.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 card-base rounded-lg transition-all group"
                aria-label={`View ${SOCIAL_LINKS.linkedin.label} profile`}
              >
                <div className="p-2 md:p-3 bg-white/5 rounded-full">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </div>
                <div className="min-w-0">
                  <p className="text-xs md:text-sm text-gray-400">{SOCIAL_LINKS.linkedin.label}</p>
                  <p className="text-white font-mono text-xs md:text-sm truncate">{SOCIAL_LINKS.linkedin.display}</p>
                </div>
              </a>
              <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4 text-xs md:text-sm">
                <a href={SOCIAL_LINKS.github.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">{SOCIAL_LINKS.github.label}</a>
                <a href={SOCIAL_LINKS.leetcode.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">{SOCIAL_LINKS.leetcode.label}</a>
                <a href={SOCIAL_LINKS.codolio.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">{SOCIAL_LINKS.codolio.label}</a>
              </div>

              {/* Resume Download Button */}
              <a
                href="/resume.pdf"
                download
                className="relative flex items-center justify-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg transition-all group bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/30 hover:border-primary/50 mt-4 md:mt-6 overflow-hidden"
                aria-label="Download Resume"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <svg className="w-5 h-5 text-primary relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span className="text-white text-sm md:text-base font-semibold relative z-10">Download Resume</span>
                <svg className="w-4 h-4 text-primary/70 relative z-10 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
              </a>
            </div>
          </SlideInLeft>
          <SlideInRight delay={0.3}>
            <form className="card-base p-4 md:p-8 rounded-xl md:rounded-2xl space-y-3 md:space-y-4 relative" onSubmit={handleSubmit}>
            <h3 className="text-white font-bold text-lg md:text-xl mb-1 md:mb-2">Send a Message</h3>
            <div>
              <input id="name" type="text" name="name" placeholder="Your Name" required className="input-field text-sm md:text-base" />
              <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>
            <div>
              <input id="email" type="email" name="email" placeholder="Your Email" required className="input-field text-sm md:text-base" />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>
            <div>
              <textarea id="message" name="message" rows={3} placeholder="Your Message" required className="input-field resize-none text-sm md:text-base"></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>
            <button type="submit" disabled={state.submitting} className="w-full py-3 md:py-4 text-sm md:text-base font-bold rounded-lg transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-black">
              {state.submitting ? <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span> Sending...</> : 'Send Message'}
            </button>
          </form>
          </SlideInRight>
        </div>
      </div>
    </section>
  );
};

