import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStackFloating from './components/TechStackFloating';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className={`portfolio-shell ${isDark ? 'theme-dark' : 'theme-light'} relative min-h-screen selection:bg-cyan-500/20 selection:text-cyan-700 dark:selection:text-cyan-300 transition-colors duration-300`}>
      {/* Dynamic Circuit Particle Background */}
      <ParticleBackground />

      {/* Subtle Custom Cursor */}
      <CustomCursor />

      {/* Top Glass Navigation Bar with Theme Toggle */}
      <Navbar isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />

      {/* Main Content Flow */}
      <main className="relative z-10">
        {/* Pop-Out Cinematic Hero with Pixel OLED Screen & Floating ECE Navigation Portals */}
        <Hero />

        {/* Selected Work & Engineering Prototypes */}
        <Projects />

        {/* Core Toolchain & Media Dock */}
        <TechStackFloating />

        {/* Technical Capabilities */}
        <Skills />

        {/* Engineering Background & Bento Grid */}
        <About />

        {/* Communication & Contact Form */}
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}
