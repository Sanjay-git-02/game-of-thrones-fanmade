import React from 'react';
import { motion } from 'framer-motion';
import { GiCrossedSwords, GiKing, GiSecretBook, GiPocketBow } from 'react-icons/gi';

// Characters dataset with 3D animation style portrait assets and RPG stats.
const characters = [
  {
    name: 'Jon Snow',
    house: 'House Stark',
    title: 'The White Wolf',
    weapon: 'Longclaw (Valyrian Steel)',
    image: '/assets/jon-snow.jpeg',
    stats: { combat: 92, leadership: 88, intrigue: 30 }
  },
  {
    name: 'Daenerys Targaryen',
    house: 'House Targaryen',
    title: 'Breaker of Chains',
    weapon: 'Drogon (Dragonfire)',
    image: '/assets/daenerys-targaryan.jpeg',
    stats: { combat: 95, leadership: 95, intrigue: 68 }
  },
  {
    name: 'Tyrion Lannister',
    house: 'House Lannister',
    title: 'The Imp',
    weapon: 'Intellect & Cunning',
    image: '/assets/tyrion-lannister.jpeg',
    stats: { combat: 25, leadership: 85, intrigue: 98 }
  },
  {
    name: 'Cersei Lannister',
    house: 'House Lannister',
    title: 'Queen of the Rock',
    weapon: 'Spies & Poison',
    image: '/assets/cersei-lannister.jpeg',
    stats: { combat: 15, leadership: 75, intrigue: 96 }
  },
  {
    name: 'Arya Stark',
    house: 'House Stark',
    title: 'No One',
    weapon: 'Needle & Faces',
    image: '/assets/arya-stark.jpeg',
    stats: { combat: 94, leadership: 40, intrigue: 85 }
  },
  {
    name: 'Jaime Lannister',
    house: 'House Lannister',
    title: 'The Kingslayer',
    weapon: 'Oathkeeper (Valyrian)',
    image: '/assets/jaime-lannister.jpeg',
    stats: { combat: 96, leadership: 82, intrigue: 55 }
  }
];

export default function Characters({ isWildfire }) {
  return (
    <section id="characters" className="relative w-full min-h-screen py-24 bg-gotBackground border-b border-gotGold/10 transition-colors duration-800" style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.1)' : 'rgba(201,162,39,0.1)' }}>
      {/* Dynamic background light */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gotGold/5 rounded-full filter blur-[150px] pointer-events-none" style={{ backgroundColor: isWildfire ? 'rgba(0,255,102,0.02)' : 'rgba(201,162,39,0.02)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-30">
        {/* Title */}
        <div className="text-center mb-20 select-none">
          <span className="font-cinzel text-xs uppercase tracking-[0.3em] text-gotGold block mb-3 transition-colors duration-500" style={{ color: isWildfire ? '#00FF66' : '#C9A227' }}>
            Hero Archive
          </span>
          <h3 className="font-cinzelDeco font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-widest text-gotIvory uppercase">
            CHARACTER CODEX
          </h3>
          <div className="w-24 h-[1px] bg-gotGold/40 mx-auto mt-6 relative" style={{ backgroundColor: isWildfire ? 'rgba(0,255,102,0.4)' : 'rgba(201,162,39,0.4)' }}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-gotGold" style={{ backgroundColor: isWildfire ? '#00FF66' : '#C9A227' }} />
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {characters.map((char, idx) => (
            <motion.div
              key={char.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.08 }}
              className="group relative h-[520px] bg-gotCharcoal/30 border rounded-none overflow-hidden flex flex-col justify-end rpg-frame cursor-pointer"
              style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.25)' : 'rgba(201,162,39,0.25)' }}
            >
              {/* Character 3D Portrait background */}
              <div className="absolute inset-0 z-0">
                <img
                  src={char.image}
                  alt={char.name}
                  className="w-full h-full object-cover object-center filter grayscale contrast-[1.15] brightness-[0.7] group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-[0.8] transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gotBackground via-gotBackground/40 to-transparent" />
              </div>

              {/* Shimmering Glint */}
              <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-30deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out" />
              </div>

              {/* RPG Stats Overlay on Hover */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-8 space-y-4 bg-gradient-to-t from-black via-black/85 to-transparent pt-16 translate-y-[135px] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                {/* Header */}
                <div className="space-y-1">
                  <span className="inline-block text-[9px] uppercase font-cinzel tracking-widest text-gotGold border border-gotGold/25 px-2 py-0.5 bg-black/60" style={{ color: isWildfire ? '#00FF66' : '#C9A227', borderColor: isWildfire ? 'rgba(0,255,102,0.25)' : 'rgba(201,162,39,0.25)' }}>
                    {char.house}
                  </span>
                  <h4 className="font-cinzel font-bold text-xl tracking-wider text-gotIvory group-hover:text-gotGold transition-colors duration-300" style={{ '--tw-text-opacity': 1, color: isWildfire ? 'inherit' : '' }}>
                    {char.name}
                  </h4>
                  <p className="font-cinzel text-[10px] uppercase text-gotGold/80 tracking-widest italic" style={{ color: isWildfire ? '#00FF66' : 'rgba(201,162,39,0.8)' }}>
                    {char.title}
                  </p>
                </div>

                {/* Attributes Bars */}
                <div className="space-y-2 border-t border-gotGold/10 pt-4" style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.1)' : 'rgba(201,162,39,0.1)' }}>
                  {/* Combat */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[10px] font-cinzel text-gotIvory/60">
                      <span className="flex items-center gap-1"><GiCrossedSwords /> Combat Rating</span>
                      <span>{char.stats.combat}</span>
                    </div>
                    <div className="w-full h-1 bg-white/20 relative overflow-hidden">
                      <div className="h-full bg-gotGold" style={{ width: `${char.stats.combat}%`, backgroundColor: isWildfire ? '#00FF66' : '#C9A227' }} />
                    </div>
                  </div>

                  {/* Leadership */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[10px] font-cinzel text-gotIvory/60">
                      <span className="flex items-center gap-1"><GiKing /> Leadership</span>
                      <span>{char.stats.leadership}</span>
                    </div>
                    <div className="w-full h-1 bg-white/20 relative overflow-hidden">
                      <div className="h-full bg-gotGold" style={{ width: `${char.stats.leadership}%`, backgroundColor: isWildfire ? '#00FF66' : '#C9A227' }} />
                    </div>
                  </div>

                  {/* Intrigue */}
                  <div className="space-y-0.5">
                    <div className="flex justify-between text-[10px] font-cinzel text-gotIvory/60">
                      <span className="flex items-center gap-1"><GiSecretBook /> Intrigue</span>
                      <span>{char.stats.intrigue}</span>
                    </div>
                    <div className="w-full h-1 bg-white/20 relative overflow-hidden">
                      <div className="h-full bg-gotGold" style={{ width: `${char.stats.intrigue}%`, backgroundColor: isWildfire ? '#00FF66' : '#C9A227' }} />
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-cinzel text-gotIvory/40 flex items-center gap-1 pt-1.5">
                  <GiPocketBow /> Weapon: <span className="text-gotIvory/70">{char.weapon}</span>
                </div>
              </div>

              {/* Default unhovered title showing */}
              <div className="absolute bottom-6 left-8 z-10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none select-none">
                <span className="text-[8px] font-cinzel tracking-widest text-gotGold block" style={{ color: isWildfire ? '#00FF66' : '#C9A227' }}>
                  {char.house}
                </span>
                <h4 className="font-cinzel font-bold text-lg text-gotIvory uppercase">
                  {char.name}
                </h4>
              </div>

              {/* Runic gold corners */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l pointer-events-none" style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.3)' : 'rgba(201,162,39,0.3)' }} />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r pointer-events-none" style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.3)' : 'rgba(201,162,39,0.3)' }} />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l pointer-events-none" style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.3)' : 'rgba(201,162,39,0.3)' }} />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r pointer-events-none" style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.3)' : 'rgba(201,162,39,0.3)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
