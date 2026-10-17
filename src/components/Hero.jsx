import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  X,
  ArrowRight,
  Sparkles,
  Terminal,
  Activity,
  ChevronDown
} from 'lucide-react';
import { personalInfo } from '../data/personal';
import PixelOLEDDisplay from './PixelOLEDDisplay';
import FloatingECENav from './FloatingECENav';

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showEmail, setShowEmail] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const emailContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % personalInfo.headlinePhrases.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emailContainerRef.current && !emailContainerRef.current.contains(e.target)) {
        setShowEmail(false);
      }
    };
    if (showEmail) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmail]);

  const handleCopyEmail = () => {
    const email = personalInfo.socials.email;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).catch(() => {
        fallbackCopy(email);
      });
    } else {
      fallbackCopy(email);
    }
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const handleScrollTo = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern"
    >
      {/* Sci-Fi Techfest-Inspired Radial Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-16 right-1/4 w-[460px] h-[460px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center w-full">

        {/* =========================================================================
            POPPED-OUT CINEMATIC HERO CARD (Techfest Style Pop-out Entry)
            User requirement: "At first when the webpage opens up the Name and intro part should pop out"
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.72, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            damping: 18,
            stiffness: 120,
            duration: 0.9
          }}
          className="relative w-full rounded-3xl p-6 sm:p-9 glass-panel border-2 border-cyan-500/40 shadow-glow-oled dark:shadow-cyan-500/25 backdrop-blur-2xl mb-8 overflow-hidden"
        >
          {/* Top Corner HUD Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-xl pointer-events-none"></div>

          {/* Top Telemetry Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-white/10 font-mono text-[10px] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-cyan-300 font-bold uppercase tracking-wider">
                CORE_TELEMETRY: ONLINE
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-emerald-400">STATUS: 240MHz XTENSA LX6</span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-400 font-semibold">I2C BUS: 0x3C</span>
            </div>
          </div>

          {/* =========================================================================
              AUTHENTIC HARDWARE OLED SCREEN PRESENTING NAME IN PIXEL FORMAT
              User requirement: "And I want my name to be presented in the pixel format 
              as we see when we connect a small screen to any module for displaying information"
              ========================================================================= */}
          <PixelOLEDDisplay />

          {/* Introduction Headline with Dynamic Continuation */}
          <div className="mt-4 max-w-3xl mx-auto">
            <h1 className="font-display font-extrabold text-xl sm:text-3xl md:text-4xl tracking-tight leading-tight text-slate-900 dark:text-white mb-4">
              <span>{personalInfo.headlinePrefix}</span>
              <span className="block mt-2 min-h-[1.4em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phraseIndex}
                    initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.04, filter: 'blur(4px)' }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 dark:from-cyan-300 dark:via-teal-200 dark:to-emerald-400 bg-clip-text text-transparent inline-block"
                  >
                    {personalInfo.headlinePhrases[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300/90 leading-relaxed max-w-2xl mx-auto mb-6">
              {personalInfo.bio}
            </p>

            {/* Direct Connect & Social Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3 border-t border-slate-200 dark:border-white/10">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 hover:border-cyan-500 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors shadow-sm"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 hover:border-blue-500 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* Mail Button with On-Click Reveal & Copy */}
              <div ref={emailContainerRef} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowEmail((prev) => !prev)}
                  className={`p-2.5 rounded-xl border transition-all shadow-sm ${
                    showEmail
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-300 ring-2 ring-emerald-500/30'
                      : 'bg-slate-100 dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 hover:border-emerald-500 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-300'
                  }`}
                  title={showEmail ? 'Hide email' : 'Click to view & copy email'}
                  aria-label="Toggle email display"
                >
                  <Mail className="w-4 h-4" />
                </button>

                {/* Revealed Email Badge with Copy Icon */}
                <AnimatePresence>
                  {showEmail && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, x: -6 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.9, x: -6 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-500/40 text-xs font-mono shadow-md"
                    >
                      <a
                        href={`mailto:${personalInfo.socials.email}`}
                        className="font-medium text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors select-all"
                        title="Open in email application"
                      >
                        {personalInfo.socials.email}
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-[11px] transition-all active:scale-95 shadow-sm"
                        title="Copy email to clipboard"
                      >
                        {copiedEmail ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowEmail(false)}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        title="Close"
                        aria-label="Close email info"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            FLOATING ELEMENTS FROM THE ECE DOMAIN (PRIMARY NAVIGATION BEACONS)
            User requirement: "the background to contain floating elements from the ece 
            domain of engineering and through those only the user should navigate and access
            the other parts of the website"
            ========================================================================= */}
        <FloatingECENav />

        {/* Scroll helper */}
        <div 
          onClick={() => handleScrollTo('projects')}
          className="mt-8 flex flex-col items-center gap-1 cursor-pointer group"
        >
          <span className="text-[11px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
            ENGAGE ORBITAL RADAR • SCROLL OR CLICK PORTALS
          </span>
          <ChevronDown className="w-4 h-4 text-slate-500 animate-bounce group-hover:text-cyan-400" />
        </div>

      </div>
    </section>
  );
}
