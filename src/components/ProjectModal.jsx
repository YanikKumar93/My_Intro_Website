import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Github,
  ExternalLink,
  Cpu,
  Layers,
  CheckCircle,
  Activity,
  Zap,
  ArrowRight
} from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="relative w-full max-w-3xl my-8 p-6 sm:p-8 rounded-3xl bg-[#0d121c] border border-white/15 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 pr-8">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 mb-3">
              {project.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm mt-1 font-mono">
              {project.tagline}
            </p>
          </div>

          {/* Description */}
          <div className="mb-6 p-4 rounded-2xl bg-slate-900/60 border border-white/5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              System Architecture & Overview
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.prototypeImage && (
            <div className="mb-6">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Latest Prototype
                </h4>
                <span className="text-[10px] font-mono text-cyan-400/80">VISUAL PREVIEW</span>
              </div>
              <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-900/80 shadow-lg shadow-cyan-500/5">
                <img
                  src={project.prototypeImage}
                  alt="Latest Quad Turn Mobility prototype"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}

          {/* Stats Bar */}
          {project.stats && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {Object.entries(project.stats).map(([key, val]) => (
                <div key={key} className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                  <span className="block text-xs font-mono text-slate-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-cyan-300 font-mono">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Hardware BOM Breakdown */}
          {project.hardware && project.hardware.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Hardware Components & Silicon
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.hardware.map((hw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs font-mono text-slate-200"
                  >
                    {hw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Engineering Features */}
          {project.features && (
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
                Key Engineering Highlights
              </h4>
              <ul className="space-y-2">
                {project.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Pills */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              Stack & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-glow-cyan hover:brightness-110 transition-all"
              >
                <span>Live Demo / Presentation</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.researchPaper && (
              <a
                href={project.researchPaper}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-glow-cyan hover:brightness-110 transition-all"
              >
                <span>View Research Paper</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.video && (
              <a
                href={project.video}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-500/20 hover:brightness-110 transition-all"
              >
                <span>View Video</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
