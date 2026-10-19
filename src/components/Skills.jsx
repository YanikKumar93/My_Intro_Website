import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Cpu,
  Wrench,
  Palette,
  Terminal,
  Sparkles,
  Zap
} from 'lucide-react';
import { skillCategories } from '../data/skills';

const categoryIcons = {
  programming: Code,
  hardware: Cpu,
  tools: Wrench,
  'design-media': Palette
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-dots-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>MY TOOLKIT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight"
          >
            Tools I Work With
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-3"
          >
            Hands-on work across ESP32 systems, sensor data analysis, automation, AI agents, electronic circuits, and practical software development.
          </motion.p>

        </div>

        {/* Skill Groups */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            {skillCategories.map((category) => {
              const CategoryIcon = categoryIcons[category.id] || Terminal;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08]"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <CategoryIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-display font-bold text-white">
                          {category.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          {category.tagline}
                        </p>
                      </div>
                    </div>
                    <span className="hidden sm:inline-block text-xs font-mono text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                      {category.skills.length} competencies
                    </span>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ y: -3, scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                              {skill.name}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300/80 leading-relaxed mb-4">
                            {skill.description}
                          </p>
                        </div>

                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
