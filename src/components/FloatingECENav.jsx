import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Radio,
  Layers,
  Zap,
  ArrowRight,
  Compass,
  Sparkles,
  Maximize2
} from 'lucide-react';

export const eceNavElements = [
  {
    id: 'projects',
    targetId: 'projects',
    title: 'ESP32 Microcontroller IC',
    navLabel: 'Projects & Firmware',
    code: 'MCU_CORE_01',
    specs: 'Dual-Core Xtensa LX6 • 240MHz',
    pins: 'GPIO 0..39 • I2C • SPI',
    accent: '#06b6d4',
    bgLight: 'rgba(6, 182, 212, 0.12)',
    border: 'rgba(6, 182, 212, 0.4)',
    icon: Cpu,
    positionClass: 'top-8 left-4 sm:top-14 sm:left-12',
    description: 'Autonomous environmental stations, robotics firmware & IoT prototypes'
  },
  {
    id: 'skills',
    targetId: 'skills',
    title: 'Logic Gate & Silicon Array',
    navLabel: 'Skills & Architecture',
    code: 'LOGIC_74HC00',
    specs: 'Digital Gates • NAND / XOR',
    pins: 'C / C++ • Python • Hardware',
    accent: '#10b981',
    bgLight: 'rgba(16, 185, 129, 0.12)',
    border: 'rgba(16, 185, 129, 0.4)',
    icon: Layers,
    positionClass: 'top-10 right-4 sm:top-16 sm:right-12',
    description: 'Low-level embedded C, register operations & hardware debugging toolchains'
  },
  {
    id: 'contact',
    targetId: 'contact',
    title: 'RF Telemetry & Antenna',
    navLabel: 'Communications / Contact',
    code: 'RF_TRANS_2.4G',
    specs: 'Wi-Fi / BLE • MQTT Broker',
    pins: 'TX / RX • Sub-GHz Link',
    accent: '#8b5cf6',
    bgLight: 'rgba(139, 92, 246, 0.12)',
    border: 'rgba(139, 92, 246, 0.4)',
    icon: Radio,
    positionClass: 'bottom-20 right-6 sm:bottom-28 sm:right-16',
    description: 'Establish direct communication channel, internship inquiries & project collabs'
  },
  {
    id: 'about',
    targetId: 'about',
    title: '555 Timer & RLC Resonator',
    navLabel: 'Engineering Mindset',
    code: 'RLC_ANALOG_555',
    specs: 'Astable Oscillator • Time Base',
    pins: 'VCC • DIS • THR • OUT',
    accent: '#3b82f6',
    bgLight: 'rgba(59, 130, 246, 0.12)',
    border: 'rgba(59, 130, 246, 0.4)',
    icon: Zap,
    positionClass: 'top-1/2 -translate-y-1/2 right-2 sm:right-8 hidden lg:block',
    description: 'Background, foundational engineering principles, and current learning areas'
  }
];

export default function FloatingECENav() {
  const [activeHover, setActiveHover] = useState(null);
  const [shockwaveId, setShockwaveId] = useState(null);

  const handleNavigate = (targetId, eceId) => {
    setShockwaveId(eceId);
    setTimeout(() => setShockwaveId(null), 1000);

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Temporary highlight pulse on target section
      el.classList.add('ring-2', 'ring-cyan-500/50');
      setTimeout(() => el.classList.remove('ring-2', 'ring-cyan-500/50'), 2200);
    }
  };

  return (
    <div className="relative w-full py-6 select-none">
      
      {/* Floating Instructions Banner */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-400 tracking-wider">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          <span>ECE SPATIAL NAVIGATION • CLICK ANY ELEMENT TO ENGAGE SECTION</span>
        </span>
      </div>

      {/* Floating Orbital Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-5xl mx-auto px-4">
        {eceNavElements.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = activeHover === item.id;
          const isFired = shockwaveId === item.id;
          const delays = [0, 0.4, 0.8, 1.2, 1.6];

          return (
            <motion.div
              key={item.id}
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 4.5 + idx * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: delays[idx]
              }}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNavigate(item.targetId, item.id)}
              onMouseEnter={() => setActiveHover(item.id)}
              onMouseLeave={() => setActiveHover(null)}
              className="group relative cursor-pointer rounded-2xl p-4 transition-all duration-300"
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: `1.5px solid ${isHovered ? item.accent : 'rgba(255, 255, 255, 0.1)'}`,
                boxShadow: isHovered ? `0 12px 28px -6px ${item.accent}50` : '0 4px 20px -2px rgba(0,0,0,0.3)'
              }}
            >
              {/* Shockwave expanding ring on click */}
              {isFired && (
                <span
                  className="absolute inset-0 rounded-2xl animate-ping pointer-events-none"
                  style={{ border: `2px solid ${item.accent}` }}
                />
              )}

              {/* Glowing circuit tracer top line */}
              <div
                className="absolute top-0 inset-x-6 h-0.5 rounded-full transition-opacity duration-300"
                style={{
                  backgroundColor: item.accent,
                  opacity: isHovered ? 1 : 0.4,
                  boxShadow: `0 0 10px ${item.accent}`
                }}
              />

              {/* Hardware Header Row: Telemetry code + Icon */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm"
                  style={{
                    backgroundColor: item.bgLight,
                    border: `1px solid ${item.border}`,
                    color: item.accent
                  }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="text-right">
                  <span className="block text-[9px] font-mono text-cyan-400 font-bold tracking-wider">
                    {item.code}
                  </span>
                  <span className="text-[8px] font-mono text-slate-400">
                    PORTAL {idx + 1}
                  </span>
                </div>
              </div>

              {/* Element Name */}
              <h3
                className="text-sm font-bold transition-colors tracking-tight line-clamp-1"
                style={{ color: item.accent }}
              >
                {item.navLabel}
              </h3>

              {/* ECE Hardware specs line */}
              <p className="text-[10px] text-slate-300/80 font-mono mt-2 line-clamp-2 leading-relaxed">
                {item.specs}
              </p>

              {/* Bottom pins / signal info */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-slate-400">
                <span className="truncate max-w-[120px]">{item.pins}</span>
                <span className="text-cyan-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform font-bold">
                  GO <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
