import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, RefreshCw, Zap, Activity, Terminal } from 'lucide-react';
import { personalInfo } from '../data/personal';

export default function PixelOLEDDisplay({ onEngage }) {
  const [bootStep, setBootStep] = useState(2); // 0: booting, 1: init, 2: nominal
  const [displayMode, setDisplayMode] = useState('main'); // main, waveform, telemetry
  const [sinePhase, setSinePhase] = useState(0);

  // Animated sine wave on the OLED mini screen when in waveform mode
  useEffect(() => {
    const interval = setInterval(() => {
      setSinePhase((prev) => (prev + 0.3) % (Math.PI * 2));
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const triggerReboot = () => {
    setBootStep(0);
    setTimeout(() => setBootStep(1), 600);
    setTimeout(() => setBootStep(2), 1400);
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

          {/* OLED Content */}
          <div className="relative z-10 text-cyan-400 font-pixel">
            
            {/* Top Telemetry Header Bar */}
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] pb-2 mb-2 border-b border-cyan-500/20 tracking-wider">
              <span className="text-cyan-300 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                I2C:0x3C
              </span>
              <span className="text-cyan-400/70 font-mono text-[9px]">
                {displayMode.toUpperCase()} MODE
              </span>
              <span className="text-emerald-400">
                3.3V [OK]
              </span>
            </div>

            {/* Display Body */}
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
                  <p className="text-[10px] text-cyan-400 mt-1">LOADING DISPLAY DRIVER: SSD1306</p>
                </motion.div>
              )}

              {bootStep === 2 && displayMode === 'main' && (
                <motion.div
                  key="main"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="py-2 text-center"
                >
                  {/* Decorative pixel bracket border */}
                  <div className="text-[10px] text-cyan-500/80 tracking-widest mb-1.5">
                    ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
                  </div>

                  {/* PIXEL NAME */}
                  <h2 
                    className="text-lg sm:text-2xl md:text-3xl tracking-wider text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.7)] my-1"
                    style={{
                      fontFamily: '"Press Start 2P", "Silkscreen", monospace',
                      letterSpacing: '0.08em'
                    }}
                  >
                    YANIK KUMAR
                  </h2>

                  {/* Subtitle on OLED */}
                  <div className="text-[9px] sm:text-[11px] text-cyan-200/90 tracking-wide mt-2 font-mono">
                    [ B.TECH ECE • DEVELOPER & INNOVATOR ]
                  </div>

                  <div className="text-[10px] text-cyan-500/80 tracking-widest mt-1.5">
                    ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
                  </div>
                </motion.div>
              )}

              {bootStep === 2 && displayMode === 'waveform' && (
                <motion.div
                  key="waveform"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-1"
                >
                  <div className="h-16 w-full flex items-center justify-center relative">
                    <svg className="w-full h-14" viewBox="0 0 200 50">
                      <line x1="0" y1="25" x2="200" y2="25" stroke="rgba(34,211,238,0.2)" strokeDasharray="2 2" />
                      <line x1="100" y1="0" x2="100" y2="50" stroke="rgba(34,211,238,0.2)" strokeDasharray="2 2" />
                      <path
                        d={Array.from({ length: 40 }).map((_, i) => {
                          const x = (i / 39) * 200;
                          const y = 25 + Math.sin((i / 4) + sinePhase) * 18;
                          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="2"
                        className="drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-cyan-400/80 px-2 mt-1">
                    <span>FREQ: 1.00 kHz</span>
                    <span>VPP: 3.30 V</span>
                    <span>ADC: ACTIVE</span>
                  </div>
                </motion.div>
              )}

              {bootStep === 2 && displayMode === 'telemetry' && (
                <motion.div
                  key="telemetry"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-1 text-left font-mono text-[10px] space-y-1 text-cyan-300"
                >
                  <div className="flex justify-between">
                    <span>CORE_FREQ:</span>
                    <span className="text-emerald-400">240 MHz (DUAL-CORE)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SRAM_AVAIL:</span>
                    <span className="text-cyan-200">520 KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RF_TRANS:</span>
                    <span className="text-cyan-200">Wi-Fi + BLE 5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BUS_STATUS:</span>
                    <span className="text-emerald-400">UART0, SPI, I2C [UP]</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
        <div className="flex items-center justify-between mt-3 pt-2 text-[10px] font-mono">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setDisplayMode(displayMode === 'main' ? 'waveform' : displayMode === 'waveform' ? 'telemetry' : 'main')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-950 border border-white/10 hover:border-cyan-400/60 text-cyan-300 transition-colors flex items-center gap-1 active:scale-95"
              title="Cycle Display Screen Content"
            >
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>SCREEN MODE</span>
            </button>

            <button
              type="button"
              onClick={triggerReboot}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 border border-white/10 hover:border-cyan-400/60 text-slate-300 hover:text-cyan-300 transition-colors active:scale-95"
              title="Reboot OLED Screen"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
            <span>ECE HARDWARE OLED</span>
          </div>
        </div>

      </div>
    </div>
  );
}
