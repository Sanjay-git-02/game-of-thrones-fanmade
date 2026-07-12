import React from 'react';
import { motion } from 'framer-motion';
import ThreeScene from './ThreeScene';
import { GiDeathSkull, GiPotionBall } from 'react-icons/gi';

export default function Hero({ isWildfire, onToggleWildfire }) {
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuOptions = [
    { label: 'Enter Westeros', target: '#houses', prefix: '⚔' },
    { label: 'Explore Houses', target: '#houses', prefix: '🛡' },
    { label: 'Character Archive', target: '#characters', prefix: '👤' },
    { label: 'Dragon Showcase', target: '#dragons', prefix: '🐉' },
    { label: 'Interactive 3D Map', target: '#map', prefix: '🗺' },
    { label: 'Chronicle Timeline', target: '#timeline', prefix: '📖' },
  ];

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-gotBackground flex items-center">
      {/* 3D Canvas with Wildfire propagation */}
      <ThreeScene isWildfire={isWildfire} />

      {/* Screen Vignettes */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-gotBackground" />
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-black/80 via-transparent to-black/80 hidden md:block" />

      {/* Wildfire Screen Flash Effect */}
      <motion.div
        key={isWildfire ? 'wildfire-flash' : 'gold-flash'}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`absolute inset-0 z-40 pointer-events-none ${isWildfire ? 'bg-gotWildfire/20' : 'bg-transparent'}`}
      />

      {/* RPG HUD Layout Overlay */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row justify-between items-center md:items-start pt-24 h-full pb-16">
        
        {/* Left Side: Game main menu */}
        <div className="flex flex-col justify-center h-full max-w-lg space-y-8 select-none">
          <div>
            <span className="font-cinzel text-xs text-gotGold uppercase tracking-[0.3em] block mb-2 transition-colors duration-500" style={{ color: isWildfire ? '#00FF66' : '#C9A227' }}>
              RPG FAN CHRONICLES
            </span>
            <h1 className="font-cinzelDeco font-extrabold text-4xl sm:text-5xl md:text-7xl tracking-widest gold-gradient-text leading-tight uppercase">
              GAME OF THRONES
            </h1>
            <p className="font-cinzel text-gotIvory/60 text-xs sm:text-sm tracking-wide italic mt-3">
              "When you play the game of thrones, you win or you die."
            </p>
          </div>

          {/* Unreal Menu styled vertical listings */}
          <div className="flex flex-col space-y-3.5 align-left">
            {menuOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => scrollToSection(opt.target)}
                className="group w-fit text-left flex items-center space-x-3 text-sm tracking-widest font-cinzel text-gotIvory/70 hover:text-gotIvory transition-all duration-300 focus:outline-none"
              >
                <span className="text-gotGold/50 group-hover:text-gotGold transition-colors duration-300" style={{ color: isWildfire ? '#00FF66' : '#C9A227' }}>
                  {opt.prefix}
                </span>
                <span className="group-hover:translate-x-2 transition-transform duration-300 rpg-bracket-left rpg-bracket-right">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Realm status HUD panel */}
        <div className="hidden lg:flex flex-col justify-center h-full">
          <div className="rpg-frame glass-panel p-6 w-80 bg-gotCharcoal/75 space-y-6">
            <div className="border-b border-gotGold/10 pb-3" style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.15)' : 'rgba(201,162,39,0.15)' }}>
              <span className="font-cinzel text-[10px] uppercase tracking-widest text-gotGold block" style={{ color: isWildfire ? '#00FF66' : '#C9A227' }}>
                System Status
              </span>
              <h4 className="font-cinzel font-bold text-lg text-gotIvory">
                REALM CODEX
              </h4>
            </div>

            {/* RPG Status parameters */}
            <div className="space-y-4 text-xs font-cinzel">
              <div className="flex justify-between">
                <span className="text-gotIvory/50">Current Ruler:</span>
                <span className="text-gotIvory font-medium">House Lannister</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gotIvory/50">Active Season:</span>
                <span className="text-gotIvory font-medium flex items-center gap-1">
                  <GiDeathSkull className="text-gotGold" style={{ color: isWildfire ? '#00FF66' : '#C9A227' }} /> Winter
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gotIvory/50">Conflict Stage:</span>
                <span className="text-gotIvory font-medium text-gotGold" style={{ color: isWildfire ? '#00FF66' : '#C9A227' }}>War of 5 Kings</span>
              </div>
              <div className="flex justify-between border-t border-gotGold/10 pt-3" style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.15)' : 'rgba(201,162,39,0.15)' }}>
                <span className="text-gotIvory/50">Wildfire Level:</span>
                <span className="font-bold flex items-center gap-1" style={{ color: isWildfire ? '#00FF66' : '#7A0E18' }}>
                  {isWildfire ? 'CRITICAL' : 'STABLE'}
                </span>
              </div>
            </div>

            {/* Wildfire Ignition Trigger */}
            <button
              onClick={onToggleWildfire}
              className="w-full flex items-center justify-center gap-2 py-2.5 border text-xs tracking-widest font-cinzel uppercase transition-colors duration-500 select-none"
              style={{
                borderColor: isWildfire ? '#00FF66' : '#7A0E18',
                color: isWildfire ? '#00FF66' : '#7A0E18',
                backgroundColor: isWildfire ? 'rgba(0,255,102,0.06)' : 'rgba(122,14,24,0.06)'
              }}
            >
              <GiPotionBall className="text-sm animate-pulse" />
              <span>{isWildfire ? 'Extinguish Wildfire' : 'Ignite Wildfire'}</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={() => scrollToSection('#houses')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer flex flex-col items-center gap-2 group z-30"
        >
          <span className="font-cinzel text-[10px] uppercase tracking-widest text-gotIvory/40 group-hover:text-gotGold transition-colors duration-300" style={{ '--tw-text-opacity': 1, color: isWildfire ? '#00FF66' : 'rgba(245,245,245,0.4)' }}>
            Enter Chronicles
          </span>
          <div className="w-[1px] h-8 bg-gotIvory/20 group-hover:bg-gotGold transition-colors duration-300 relative overflow-hidden" style={{ backgroundColor: isWildfire ? 'rgba(0,255,102,0.2)' : 'rgba(245,245,245,0.2)' }}>
            <motion.div
              animate={{ y: [0, 32, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gotGold"
              style={{ backgroundColor: isWildfire ? '#00FF66' : '#C9A227' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
