import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  Github,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { projectsData } from '../data/projects';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [activeModalProject, setActiveModalProject] = useState(null);
  const hardwareProject = {
    title: 'Quad Turn Mobility',
    category: 'Hardware & Mobility',
    tagline: 'Project details will be added soon',
    description: 'Project details will be added soon.',
    technologies: [],
    researchPaper: 'https://www.ijfmr.com/research-paper.php?id=35153'
  };

  const openRepository = (project) => {
    if (project.github) {
      window.open(project.github, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="projects-intro max-w-3xl mx-auto text-center mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>SELECTED WORK</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight"
            >
              Things I Have Worked On
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-4"
          >
            A selection of real repositories spanning AI security, productivity tools, data analysis, and software prototypes.
          </motion.p>
        </div>

        {/* Hardware Projects */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-cyan-400/30" />
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-300">
            Hardware Projects
          </h3>
          <span className="h-px flex-1 bg-cyan-400/30" />
        </div>
        <div className="project-card rounded-2xl glass-card p-6 sm:p-7 border border-white/10 mb-12">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                01 · Hardware & Mobility
              </span>
              <h3 className="mt-2 text-xl font-display font-bold text-white">
                Quad Turn Mobility
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Project details will be added soon.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveModalProject(hardwareProject)}
              className="shrink-0 p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition-colors"
              title="Inspect Specifications"
              aria-label="Inspect Quad Turn Mobility specifications"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Software Projects */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-violet-400/30" />
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-violet-300">
            Software Projects
          </h3>
          <span className="h-px flex-1 bg-violet-400/30" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                onClick={() => openRepository(project)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openRepository(project);
                  }
                }}
                role="link"
                tabIndex={0}
                layout
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="project-card group relative flex flex-col justify-between rounded-2xl glass-card p-6 sm:p-7 border border-white/10 hover:border-cyan-500/40 cursor-pointer min-h-[22rem]"
              >
                <div>
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
                        aria-hidden="true"
                      >
                        <Github className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400">0{index + 1}</span>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {project.category}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveModalProject(project);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition-colors"
                      title="Inspect Specifications"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-2">
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="hover:text-cyan-300 transition-colors"
                        aria-label={`Open ${project.title} GitHub repository`}
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>

                  {/* Project Tagline */}
                  <p className="text-xs font-mono text-cyan-400/80 mb-3 line-clamp-2">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-slate-300/85 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-800/50 text-slate-400">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>

                  {project.stats && (
                    <div className="grid grid-cols-3 gap-2 mb-5 pt-3 border-t border-white/10">
                      {Object.entries(project.stats).slice(0, 3).map(([label, value]) => (
                        <div key={label} className="min-w-0">
                          <span className="block text-[9px] uppercase tracking-wider text-slate-500 truncate">
                            {label.replace(/([A-Z])/g, ' $1')}
                          </span>
                          <span className="block text-[10px] font-mono text-slate-300 truncate mt-1">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bottom Action Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveModalProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors group/btn"
                    >
                      <span>View details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          aria-label={`Source code for ${project.title}`}
                          className="p-2 rounded-xl bg-slate-800/70 border border-white/5 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          aria-label={`Live demo for ${project.title}`}
                          className="p-2 rounded-xl bg-slate-800/70 border border-white/5 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Deep Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
