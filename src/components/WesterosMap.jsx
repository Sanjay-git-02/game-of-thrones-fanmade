import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiCastle, GiCrossedSwords } from 'react-icons/gi';

const regions = [
  {
    id: 'north',
    name: 'The North',
    house: 'House Stark',
    capital: 'Winterfell',
    characters: ['Jon Snow', 'Arya Stark', 'Sansa Stark'],
    description: 'Vast cold lands stretching from the Wall south to the Neck. Ancient forests and frozen rivers define this unforgiving territory.',
    path: 'M 170,55 L 330,55 L 375,110 L 390,185 L 340,225 L 290,265 L 225,265 L 205,210 L 185,140 Z',
    dotX: 260, dotY: 160
  },
  {
    id: 'vale',
    name: 'The Vale of Arryn',
    house: 'House Arryn',
    capital: 'The Eyrie',
    characters: ['Robin Arryn', 'Lord Baelish'],
    description: 'A fertile mountain valley surrounded by soaring peaks. The Eyrie sits thousands of feet above, accessible only by narrow mountain roads.',
    path: 'M 290,265 L 370,265 L 420,295 L 440,360 L 375,375 L 345,325 Z',
    dotX: 365, dotY: 315
  },
  {
    id: 'riverlands',
    name: 'The Riverlands',
    house: 'House Tully',
    capital: 'Riverrun',
    characters: ['Edmure Tully', 'Brynden Tully'],
    description: 'A central fertile land criss-crossed by rivers. The strategic heart of Westeros — whoever controls the rivers controls the realm.',
    path: 'M 225,265 L 290,265 L 345,325 L 330,370 L 275,390 L 195,350 Z',
    dotX: 270, dotY: 330
  },
  {
    id: 'westerlands',
    name: 'The Westerlands',
    house: 'House Lannister',
    capital: 'Casterly Rock',
    characters: ['Tyrion Lannister', 'Cersei Lannister'],
    description: 'Rocky highlands honeycombed with gold and silver mines. The source of Lannister wealth and military might for generations.',
    path: 'M 195,350 L 275,390 L 258,440 L 185,440 L 175,395 Z',
    dotX: 220, dotY: 395
  },
  {
    id: 'crownlands',
    name: 'The Crownlands',
    house: 'Iron Throne',
    capital: "King's Landing",
    characters: ['The King', 'The Small Council'],
    description: "Royal lands surrounding Blackwater Bay. King's Landing is the largest city in Westeros — seat of the Iron Throne.",
    path: 'M 330,370 L 375,375 L 400,428 L 315,440 L 300,408 Z',
    dotX: 350, dotY: 408
  },
  {
    id: 'reach',
    name: 'The Reach',
    house: 'House Tyrell',
    capital: 'Highgarden',
    characters: ['Olenna Tyrell', 'Margaery Tyrell'],
    description: 'The most fertile and populous region, breadbasket of Westeros. Lush fields, chivalric knights, and the grandest tournament grounds.',
    path: 'M 185,440 L 315,440 L 305,565 L 168,555 L 145,485 Z',
    dotX: 228, dotY: 495
  },
  {
    id: 'stormlands',
    name: 'The Stormlands',
    house: 'House Baratheon',
    capital: "Storm's End",
    characters: ['Stannis Baratheon', 'Renly Baratheon'],
    description: 'Rocky, heavily forested coastline battered by fierce storms rolling in from the Summer Sea. Home to proud warriors.',
    path: 'M 315,440 L 400,428 L 418,478 L 345,518 L 305,515 Z',
    dotX: 360, dotY: 475
  },
  {
    id: 'dorne',
    name: 'Dorne',
    house: 'House Martell',
    capital: 'Sunspear',
    characters: ['Oberyn Martell', 'Doran Martell'],
    description: 'The southernmost realm, separated by the Red Mountains. A desert land of sand, sun, and fierce independence — never conquered by the dragons.',
    path: 'M 168,555 L 305,565 L 345,518 L 408,568 L 395,630 L 185,630 Z',
    dotX: 286, dotY: 590
  },
  {
    id: 'iron-islands',
    name: 'The Iron Islands',
    house: 'House Greyjoy',
    capital: 'Pyke',
    characters: ['Yara Greyjoy', 'Theon Greyjoy'],
    description: 'Seven barren rocky islands in the Sunset Sea. The Ironborn pray to the Drowned God and live by the ancient Old Way of reaving.',
    path: 'M 108,315 L 135,315 L 148,348 L 122,360 L 102,345 Z',
    dotX: 122, dotY: 335
  }
];

// Animated route lines between key capitals
const routes = [
  { x1: 260, y1: 160, x2: 350, y2: 408, label: 'King\'s Road' },
  { x1: 350, y1: 408, x2: 286, y2: 590, label: 'Kingsway South' },
  { x1: 260, y1: 160, x2: 270, y2: 330, label: 'Kingsroad' },
];

export default function WesterosMap({ isWildfire }) {
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const accentColor = isWildfire ? '#00FF66' : '#C9A227';

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX + 22, y: e.clientY + 18 });
  };

  return (
    <section
      id="map"
      className="relative w-full min-h-screen py-24 bg-gotBackground border-b overflow-hidden"
      style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.1)' : 'rgba(201,162,39,0.1)' }}
    >
      {/* Ambient */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full filter blur-[140px] pointer-events-none"
        style={{ backgroundColor: isWildfire ? 'rgba(0,255,102,0.03)' : 'rgba(201,162,39,0.03)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Title */}
        <div className="text-center mb-16 select-none">
          <motion.span
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="font-cinzel text-xs uppercase tracking-[0.3em] block mb-3"
            style={{ color: accentColor }}
          >
            Geography of Westeros
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="font-cinzelDeco font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-widest text-gotIvory uppercase"
          >
            REALM INTERACTIVE MAP
          </motion.h3>
          <div className="w-24 h-[1px] mx-auto mt-6 relative" style={{ backgroundColor: isWildfire ? 'rgba(0,255,102,0.4)' : 'rgba(201,162,39,0.4)' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45" style={{ backgroundColor: accentColor }} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
          {/* Legend & Stats Panel */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="glass-panel p-6 border space-y-4 rpg-frame"
              style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.15)' : 'rgba(201,162,39,0.15)' }}>
              <h4 className="font-cinzel font-bold text-base tracking-wider" style={{ color: accentColor }}>
                Cartographer's Notes
              </h4>
              <p className="text-gotIvory/60 text-xs font-cinzel leading-relaxed">
                Westeros spans thousands of leagues from the icy Wall in the north to the burning sands of Dorne in the south. Hover over any region to reveal its secrets.
              </p>

              {/* Compass Rose */}
              <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto mt-2" style={{ stroke: accentColor, fill: 'none', strokeWidth: 0.8 }}>
                <circle cx="50" cy="50" r="42" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="28" />
                <line x1="50" y1="8" x2="50" y2="92" />
                <line x1="8" y1="50" x2="92" y2="50" />
                <polygon points="50,8 53,38 50,46" style={{ fill: accentColor, stroke: 'none' }} />
                <polygon points="50,92 47,62 50,54" style={{ fill: accentColor + '88', stroke: 'none' }} />
                <text x="47" y="22" style={{ fill: accentColor, fontSize: '10px', fontFamily: 'Cinzel' }}>N</text>
              </svg>
            </div>

            {/* Hovered region info card (locked panel) */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="glass-panel p-5 border space-y-3 rpg-frame"
                  style={{ borderColor: accentColor + '55' }}
                >
                  <div>
                    <span className="text-[9px] font-cinzel uppercase tracking-widest block" style={{ color: accentColor }}>
                      {hovered.house}
                    </span>
                    <h5 className="font-cinzel font-bold text-lg text-gotIvory">{hovered.name}</h5>
                    <div className="flex items-center gap-1 text-[10px] text-gotIvory/50 font-cinzel mt-0.5">
                      <GiCastle style={{ color: accentColor }} /> {hovered.capital}
                    </div>
                  </div>
                  <p className="text-gotIvory/65 text-xs leading-relaxed border-t pt-3"
                    style={{ borderColor: accentColor + '20' }}>
                    {hovered.description}
                  </p>
                  <div>
                    <span className="text-[9px] font-cinzel uppercase tracking-widest block mb-1.5" style={{ color: accentColor + 'aa' }}>Key Figures</span>
                    <div className="flex flex-wrap gap-1.5">
                      {hovered.characters.map(c => (
                        <span key={c} className="text-[9px] font-cinzel tracking-wider px-2 py-0.5 border bg-gotBackground text-gotIvory"
                          style={{ borderColor: accentColor + '30' }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SVG Map */}
          <div className="w-full lg:w-2/3">
            <div className="relative glass-panel border p-4 rpg-frame shadow-2xl"
              style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.2)' : 'rgba(201,162,39,0.2)' }}>
              {/* Map grid background lines */}
              <div className="absolute inset-0 pointer-events-none opacity-20">
                {[1,2,3,4].map(i => (
                  <React.Fragment key={i}>
                    <div className="absolute inset-y-0 w-[1px] bg-gotGold/15" style={{ left: `${i * 20}%` }} />
                    <div className="absolute inset-x-0 h-[1px] bg-gotGold/15" style={{ top: `${i * 20}%` }} />
                  </React.Fragment>
                ))}
              </div>

              <svg
                viewBox="0 0 500 700"
                className="w-full h-auto cursor-crosshair select-none relative z-10"
                onMouseMove={handleMouseMove}
              >
                {/* Sea texture lines */}
                <path d="M 30,400 Q 80,430 130,415 Q 175,400 210,435" stroke={accentColor + '18'} fill="none" strokeWidth="0.5" />
                <path d="M 390,180 Q 430,220 465,200" stroke={accentColor + '18'} fill="none" strokeWidth="0.5" />

                {/* Animated trade route dashes */}
                {routes.map((r, i) => (
                  <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
                    stroke={accentColor + '28'} strokeWidth="1" strokeDasharray="5 4"
                    style={{ animation: `dashMove${i} 3s linear infinite` }}
                  />
                ))}

                {/* Region Paths */}
                {regions.map((reg) => (
                  <path
                    key={reg.id}
                    d={reg.path}
                    className="transition-all duration-300 cursor-pointer"
                    style={{
                      fill: hovered?.id === reg.id ? (accentColor + '30') : 'rgba(11,11,11,0.5)',
                      stroke: hovered?.id === reg.id ? accentColor : (accentColor + '45'),
                      strokeWidth: hovered?.id === reg.id ? 2 : 1.2
                    }}
                    onMouseEnter={() => setHovered(reg)}
                    onMouseLeave={() => setHovered(null)}
                  />
                ))}

                {/* Capital Markers */}
                {regions.map((reg) => (
                  <g key={`dot-${reg.id}`}>
                    <circle cx={reg.dotX} cy={reg.dotY} r="4" fill={accentColor}
                      style={{ filter: `drop-shadow(0 0 4px ${accentColor})` }}
                      onMouseEnter={() => setHovered(reg)} onMouseLeave={() => setHovered(null)} />
                    <circle cx={reg.dotX} cy={reg.dotY} r="7" fill="none"
                      stroke={accentColor + '55'} strokeWidth="0.8" />
                  </g>
                ))}

                {/* Capital name labels for major cities */}
                <text x="268" y="156" style={{ fill: '#F5F5F5aa', fontSize: '7px', fontFamily: 'Cinzel' }}>WINTERFELL</text>
                <text x="312" y="422" style={{ fill: '#F5F5F5aa', fontSize: '7px', fontFamily: 'Cinzel' }}>KING'S LANDING</text>
                <text x="185" y="504" style={{ fill: '#F5F5F5aa', fontSize: '7px', fontFamily: 'Cinzel' }}>HIGHGARDEN</text>
                <text x="248" y="605" style={{ fill: '#F5F5F5aa', fontSize: '7px', fontFamily: 'Cinzel' }}>SUNSPEAR</text>
              </svg>

              {/* Map label */}
              <div className="absolute bottom-4 right-4 pointer-events-none">
                <span className="font-cinzel text-[9px] uppercase tracking-wider" style={{ color: accentColor + '60' }}>
                  Westeros · Known World
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{ position: 'fixed', left: tooltipPos.x, top: tooltipPos.y, pointerEvents: 'none', zIndex: 9999, borderColor: accentColor }}
            className="w-56 glass-panel border p-3 shadow-xl shadow-black/80"
          >
            <span className="text-[9px] font-cinzel uppercase tracking-widest block" style={{ color: accentColor }}>
              {hovered.house}
            </span>
            <h5 className="font-cinzel font-bold text-sm text-gotIvory">{hovered.name}</h5>
            <div className="flex items-center gap-1 text-[9px] text-gotIvory/50 font-cinzel mt-0.5">
              <GiCastle /> {hovered.capital}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dash animation styles */}
      <style>{`
        @keyframes dashMove0 { to { stroke-dashoffset: -18; } }
        @keyframes dashMove1 { to { stroke-dashoffset: -18; } }
        @keyframes dashMove2 { to { stroke-dashoffset: -18; } }
      `}</style>
    </section>
  );
}
