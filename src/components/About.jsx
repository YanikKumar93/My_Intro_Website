import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Cpu,
  Sparkles,
  Target,
  BookOpen,
  Award,
  Layers,
  Code2,
  Clock,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { aboutData } from '../data/about';
import { portfolioStats } from '../data/stats';
import { personalInfo } from '../data/personal';

// Icon mapper helper
const iconMap = {
  User: User,
  Cpu: Cpu,
  Sparkles: Sparkles,
  Target: Target,
  BookOpen: BookOpen
};

const statIcons = [Layers, Code2, Award, Clock];

export default function About() {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>ENGINEERING BACKGROUND</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight"
          >
            About Me
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-3 text-gradient-cyan">
                {aboutData.intro.headline}
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4 text-base sm:text-lg">
                {aboutData.intro.paragraph1}
              </p>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                {aboutData.intro.paragraph2}
              </p>
            </div>

            {/* Quick Specs Pill Box */}
            <div className="lg:col-span-4 p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Quick Profile
              </span>
              <div className="flex items-center justify-between text-sm py-1.5 border-b border-white/5">
                <span className="text-slate-400">Name</span>
                <span className="text-white font-medium">{personalInfo.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1.5 border-b border-white/5">
                <span className="text-slate-400">Discipline</span>
                <span className="text-cyan-300 font-medium">B.Tech ECE</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1.5 border-b border-white/5">
                <span className="text-slate-400">Focus</span>
                <span className="text-white font-medium">Electronics & Agentic AI</span>
              </div>
              <div className="flex items-center justify-between text-sm py-1.5">
                <span className="text-slate-400">Status</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 max-w-5xl mx-auto">
          {portfolioStats.map((stat, index) => {
            const Icon = statIcons[index % statIcons.length];
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="relative p-5 sm:p-6 rounded-2xl glass-card border border-white/10 group hover:border-cyan-500/40"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                    {stat.value}
                  </span>
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-slate-200 mb-1">{stat.label}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{stat.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bento Grid Visual Cards: Who I am, What I work on, My interests, My approach, Current learning */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {aboutData.cards.map((card, index) => {
            const IconComponent = iconMap[card.icon] || User;
            const isLarge = index === 0 || index === 1; // Span larger on desktop

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className={`relative p-6 sm:p-7 rounded-2xl glass-card border border-white/[0.08] flex flex-col justify-between group ${
                  index === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:scale-105 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-cyan-400/80 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                      {card.subtitle}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h4>

                  <p className="text-slate-300/90 text-sm leading-relaxed font-normal">
                    {card.content}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-slate-500 group-hover:text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/70" />
                  <span>Engineering Perspective</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
