import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { floatingTechStack } from '../data/techStackFloating';

export default function TechStackFloating() {
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Staggered floating animation durations for natural asynchronous floating
  const floatDurations = [4.2, 5.1, 4.7, 5.5, 4.9, 5.3, 4.5, 5.8];

  return (
    <section id="tech-dock" className="relative py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section title & badge */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight"
          >
            Key Tech Stack & Environments
          </motion.h2>
        </div>

        {/* Modern Translucent Floating Grid */}
        <div className="tech-stack-grid max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {floatingTechStack.map((tech, index) => {
            const isHovered = activeTooltip === tech.name;
            const duration = floatDurations[index % floatDurations.length];

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="relative"
                onMouseEnter={() => setActiveTooltip(tech.name)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                {/* Floating Bobbing Wrapper */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="tech-stack-card group relative flex items-center gap-3 w-full h-full min-h-[4.5rem] px-3.5 py-3 rounded-2xl cursor-pointer transition-all duration-300 shadow-sm"
                  style={{
                    borderColor: tech.borderHover,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 12px 30px -10px ${tech.color}40`,
                    borderColor: tech.color,
                  }}
                >
                  {/* Glowing background hint on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${tech.accentBg} 0%, transparent 80%)`,
                    }}
                  />

                  {/* Icon Emblem */}
                  <div
                    className="tech-stack-icon relative z-10 w-10 h-10 shrink-0 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-transform duration-300 group-hover:scale-110 shadow-inner"
                    style={{
                      backgroundColor: tech.accentBg,
                      color: tech.color,
                      border: `1px solid ${tech.borderHover}`,
                    }}
                  >
                    <span>{tech.symbol}</span>
                  </div>

                  {/* Tech Name */}
                  <div className="relative z-10 min-w-0 flex-1">
                    <span className="block text-xs font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
                      {tech.name}
                    </span>
                    <span className="block text-[9px] text-slate-400 font-mono truncate mt-1">
                      {tech.subtitle}
                    </span>
                  </div>

                  <div
                    className="relative z-10 w-1.5 h-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150"
                    style={{ backgroundColor: tech.color }}
                  />
                </motion.div>

                {/* Floating Tooltip popover on hover */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="desktop-tooltip absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-xl bg-slate-950/95 border border-white/20 shadow-2xl z-30 pointer-events-none backdrop-blur-xl text-left"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{tech.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-cyan-300">
                        {tech.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-tight">
                      {tech.description}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
