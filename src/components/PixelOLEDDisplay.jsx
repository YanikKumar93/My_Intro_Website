import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Activity, Terminal, Code2, Briefcase, UserCheck } from 'lucide-react';
import { personalInfo } from '../data/personal';

const MODES = [
  { id: 'profile', label: 'ID', header: 'PROFILE', hint: 'Identity & Discipline' },
  { id: 'skills', label: 'SKILLS', header: 'TECH MATRIX', hint: 'Hardware & Software' },
  { id: 'projects', label: 'BUILDS', header: 'PROJECTS', hint: 'Featured Repositories' },
  { id: 'status', label: 'CAREER', header: 'STATUS', hint: 'Availability & Contact' },
];

export default function PixelOLEDDisplay() {
  const [bootStep, setBootStep] = useState(2); // 0: booting, 1: init, 2: nominal
  const [displayMode, setDisplayMode] = useState('profile');

  const currentModeIndex = MODES.findIndex((m) => m.id === displayMode);
  const activeModeObj = MODES[currentModeIndex] || MODES[0];

  const cycleDisplayMode = () => {
    const nextIndex = (currentModeIndex + 1) % MODES.length;
    setDisplayMode(MODES[nextIndex].id);
  };

  const triggerReboot = () => {
    setBootStep(0);
    setTimeout(() => setBootStep(1), 500);
    setTimeout(() => {
      setBootStep(2);
      setDisplayMode('profile');
    }, 1100);
  };

  return (
    <div className="relative mx-auto my-6 max-w-lg select-none">
      {/* Outer PCB Module Enclosure */}
      <div className="relative rounded-2xl bg-[#0f172a] dark:bg-[#070b12] p-4 sm:p-5 border-2 border-cyan-500/40 dark:border-cyan-400/30 shadow-glow-oled shadow-cyan-500/20 backdrop-blur-md">
        
        {/* PCB Mounting Holes in 4 Corners */}
        <div className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full border border-amber-500/50 bg-[#0a0f1d] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700"></div>
        </div>
        <div className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full border border-amber-500/50 bg-[#0a0f1d] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700"></div>
        </div>
        <div className="absolute bottom-2.5 left-2.5 w-3 h-3 rounded-full border border-amber-500/50 bg-[#0a0f1d] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700"></div>
        </div>
        <div className="absolute bottom-2.5 right-2.5 w-3 h-3 rounded-full border border-amber-500/50 bg-[#0a0f1d] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700"></div>
        </div>

        {/* 4 Gold Header Pins (I2C: GND, VCC, SCL, SDA) */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 pb-2 border-b border-white/10 font-mono text-[9px] sm:text-[10px] text-amber-300">
          <div className="flex flex-col items-center">
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-300 to-amber-600 rounded-sm mb-0.5 shadow-sm"></div>
            <span className="text-slate-400">GND</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-300 to-amber-600 rounded-sm mb-0.5 shadow-sm"></div>
            <span className="text-rose-400">VCC</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-300 to-amber-600 rounded-sm mb-0.5 shadow-sm"></div>
            <span className="text-cyan-400">SCL</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-300 to-amber-600 rounded-sm mb-0.5 shadow-sm"></div>
            <span className="text-emerald-400">SDA</span>
          </div>
          <div className="ml-4 pl-3 border-l border-white/10 flex items-center gap-1.5 text-[10px] text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="font-mono text-[10px] tracking-wider text-cyan-300">SSD1306 • 128x64</span>
          </div>
        </div>

        {/* The Glass OLED Display Screen */}
        <div className="relative overflow-hidden rounded-xl bg-[#02050b] p-4 sm:p-5 border border-cyan-500/30 shadow-inner">
          {/* Subtle phosphor pixel grid overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-25 z-20"
            style={{
              backgroundImage: 'radial-gradient(rgba(34, 211, 238, 0.4) 1px, transparent 0)',
              backgroundSize: '4px 4px'
            }}
          />

          {/* CRT / OLED scanline glow line */}
          <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 pointer-events-none animate-scanline z-20" />

          {/* OLED Content Container with stable min-height */}
          <div className="relative z-10 text-cyan-400 font-pixel min-h-[148px] flex flex-col justify-between">
            
            {/* Top Telemetry Header Bar */}
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] pb-2 mb-2 border-b border-cyan-500/20 tracking-wider">
              <span className="text-cyan-300 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                I2C:0x3C
              </span>
              <span className="text-cyan-300 font-mono text-[9px] font-bold tracking-wider">
                MODE: {activeModeObj.header} ({currentModeIndex + 1}/{MODES.length})
              </span>
              <span className="text-emerald-400">
                3.3V [OK]
              </span>
            </div>

            {/* Display Body (Animated per mode) */}
            <div className="flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {bootStep === 0 && (
                  <motion.div
                    key="boot0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-4 text-center font-mono text-xs text-cyan-300"
                  >
                    <p>&gt; ECE_BIOS v2.6.4 INITIALIZING...</p>
                    <p className="text-[10px] text-cyan-500 mt-1">CHECKING I2C BUS [SCL/SDA]...</p>
                  </motion.div>
                )}

                {bootStep === 1 && (
                  <motion.div
                    key="boot1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-4 text-center font-mono text-xs text-emerald-400"
                  >
                    <p>&gt; ADDR: 0x3C DETECTED</p>
                    <p className="text-[10px] text-cyan-400 mt-1">LOADING YANIK KUMAR PROFILE MODULE...</p>
                  </motion.div>
                )}

                {/* MODE 1: IDENTITY & PROFILE */}
                {bootStep === 2 && displayMode === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="py-1 text-center"
                  >
                    <div className="text-[10px] text-cyan-500/80 tracking-widest mb-1 font-pixel">
                      ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
                    </div>

                    <h2
                      className="text-lg sm:text-2xl md:text-3xl tracking-wider text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)] my-1"
                      style={{
                        fontFamily: '"Press Start 2P", "Silkscreen", monospace',
                        letterSpacing: '0.08em'
                      }}
                    >
                      YANIK KUMAR
                    </h2>

                    <div className="text-[10px] text-cyan-500/80 tracking-widest mt-1 font-pixel">
                      ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
                    </div>
                  </motion.div>
                )}

                {/* MODE 2: YANIK'S SKILLS MATRIX */}
                {bootStep === 2 && displayMode === 'skills' && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="py-1 text-left font-mono text-[9px] sm:text-[10px] space-y-1.5 text-cyan-200"
                  >
                    <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1 text-[9px]">
                      <span className="text-cyan-400 font-bold">&gt; YANIK_SKILLS_MATRIX</span>
                      <span className="text-emerald-400">[VERIFIED]</span>
                    </div>

                    <div className="space-y-1 pt-0.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-cyan-400 font-bold shrink-0">HARDWARE:</span>
                        <span className="text-slate-200 truncate">ESP32 • Arduino • FreeRTOS • Sensors</span>
                      </div>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-cyan-400 font-bold shrink-0">SOFTWARE:</span>
                        <span className="text-slate-200 truncate">Python • C • OpenCV • Streamlit</span>
                      </div>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-cyan-400 font-bold shrink-0">FOCUS:</span>
                        <span className="text-emerald-300 truncate">Applied AI • Automation • Embedded IoT</span>
                      </div>
                    </div>

                    <div className="text-[8px] sm:text-[9px] text-cyan-400/70 pt-1 border-t border-cyan-500/20 flex justify-between">
                      <span>BUS: UART / SPI / I2C</span>
                      <span className="text-emerald-400">STACK: READY</span>
                    </div>
                  </motion.div>
                )}

                {/* MODE 3: YANIK'S REAL PROJECTS */}
                {bootStep === 2 && displayMode === 'projects' && (
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="py-1 text-left font-mono text-[9px] sm:text-[10px] space-y-1 text-cyan-200"
                  >
                    <div className="flex items-center justify-between border-b border-cyan-500/20 pb-0.5 text-[9px]">
                      <span className="text-cyan-400 font-bold">&gt; YANIK_BUILDS (3 REPOS)</span>
                      <span className="text-emerald-400">GITHUB</span>
                    </div>

                    <div className="space-y-1 pt-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold">1. CaughtBot</span>
                        <span className="text-emerald-400 text-[8px]">[AI Security]</span>
                      </div>
                      <div className="text-[8px] text-slate-300 pl-3">
                        ↳ LLM Red-Teaming, Prompt Injection & Defense
                      </div>

                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-white font-bold">2. StudyMate</span>
                        <span className="text-cyan-300 text-[8px]">[Desktop AI]</span>
                      </div>
                      <div className="text-[8px] text-slate-300 pl-3">
                        ↳ Multi-tool RAG assistant with terminal & UI
                      </div>

                      <div className="flex items-center justify-between pt-0.5">
                        <span className="text-white font-bold">3. Placement Matrix</span>
                        <span className="text-amber-300 text-[8px]">[Analytics]</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* MODE 4: CAREER STATUS & CONNECT */}
                {bootStep === 2 && displayMode === 'status' && (
                  <motion.div
                    key="status"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="py-1 text-left font-mono text-[9px] sm:text-[10px] space-y-1.5 text-cyan-200"
                  >
                    <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1 text-[9px]">
                      <span className="text-cyan-400 font-bold">&gt; CANDIDATE_TELEMETRY</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                        AVAILABLE
                      </span>
                    </div>

                    <div className="space-y-1 pt-0.5">
                      <div className="flex justify-between gap-2">
                        <span className="text-cyan-400 font-bold shrink-0">DISCIPLINE:</span>
                        <span className="text-slate-200 truncate">B.Tech ECE (Electronics & Comm)</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-cyan-400 font-bold shrink-0">STATUS:</span>
                        <span className="text-emerald-300 truncate font-semibold">Open for Internships & Projects</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-cyan-400 font-bold shrink-0">LOCATION:</span>
                        <span className="text-slate-200 truncate">India (Remote / On-Site)</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-cyan-400 font-bold shrink-0">CONTACT:</span>
                        <span className="text-cyan-200 truncate">{personalInfo.socials.email}</span>
                      </div>
                    </div>

                    <div className="text-[8px] sm:text-[9px] text-cyan-400/70 pt-0.5 border-t border-cyan-500/20 flex justify-between">
                      <span>TELEMETRY: ONLINE</span>
                      <span className="text-emerald-400">READY TO CONTRIBUTE</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom OLED Status Bar */}
            <div className="flex items-center justify-between text-[8px] sm:text-[9px] pt-2 mt-2 border-t border-cyan-500/20 text-cyan-400/80 font-mono">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                RUNNING
              </span>
              <span>128x64px • SSD1306</span>
              <span className="text-cyan-300">CLK: 400kHz</span>
            </div>
          </div>
        </div>

        {/* Hardware Control Buttons Below Display */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 text-[10px] font-mono border-t border-white/5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={cycleDisplayMode}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-950 border border-white/10 hover:border-cyan-400/60 text-cyan-300 transition-colors flex items-center gap-1 active:scale-95 shadow-sm"
              title="Click to cycle through Yanik's Profile, Skills, Builds & Career Status"
            >
              <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>SCREEN MODE</span>
            </button>

            {/* Direct Mode Pills */}
            <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/10">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setDisplayMode(m.id)}
                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono transition-all ${
                    displayMode === m.id
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-cyan-300 hover:bg-white/5'
                  }`}
                  title={m.hint}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={triggerReboot}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 border border-white/10 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-300 transition-colors active:scale-95"
              title="Reboot OLED Screen"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          <div className="text-[9px] text-cyan-400/80 flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-400">ACTIVE:</span>
            <span className="text-cyan-300 font-bold">{activeModeObj.header}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
