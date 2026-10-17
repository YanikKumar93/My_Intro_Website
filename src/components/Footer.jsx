import React, { useState } from 'react';
import { ArrowUp, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/personal';

export default function Footer() {
  const [showEmail, setShowEmail] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="portfolio-footer relative border-t border-white/10 bg-[#07090e] px-4 py-5 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[100px] bg-cyan-500/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-3">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm text-white">
              {personalInfo.name}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              ECE • Software • Embedded Systems
            </span>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-400">
            <a href="#tech-dock" className="hover:text-cyan-300 transition-colors">Stack</a>
            <a href="#projects" className="hover:text-cyan-300 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-cyan-300 transition-colors">Skills</a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">Contact</a>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-xl bg-slate-900/60 border border-white/5 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-xl bg-slate-900/60 border border-white/5 text-slate-400 hover:text-white hover:border-blue-500/40 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <div className="relative flex items-center gap-2">
              {showEmail && (
                <div className="absolute bottom-full right-0 mb-2 flex items-center gap-2 p-2 rounded-xl bg-slate-950/95 border border-emerald-500/30 shadow-xl backdrop-blur-xl whitespace-nowrap">
                  <a
                    href={`mailto:${personalInfo.socials.email}`}
                    className="text-[10px] font-mono text-emerald-300 hover:text-white transition-colors"
                  >
                    {personalInfo.socials.email}
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(personalInfo.socials.email);
                      setCopiedEmail(true);
                      setTimeout(() => setCopiedEmail(false), 2200);
                    }}
                    aria-label="Copy email address"
                    title="Copy email address"
                    className="text-slate-400 hover:text-emerald-300 transition-colors"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowEmail((prev) => !prev)}
                aria-label={showEmail ? 'Hide email' : 'Show email'}
                title={showEmail ? 'Hide email' : 'View and copy email'}
                className={`p-2 rounded-xl bg-slate-900/60 border border-white/5 text-slate-400 hover:text-white hover:border-emerald-500/40 transition-colors ${
                  showEmail ? 'text-emerald-300 border-emerald-500/40' : ''
                }`}
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 hover:scale-105 transition-all ml-2"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
            <span>© {new Date().getFullYear()} {personalInfo.name}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Built with React & Vite</span>
          </div>
      </div>
    </footer>
  );
}
