import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Locations in Westeros with corresponding description, ruling house, and realistic medieval Unsplash IDs.
const locations = [
  {
    name: 'Winterfell',
    region: 'The North',
    house: 'House Stark',
    image: '/assets/winterfell.jpeg',
    description: 'The ancient capital of the North, a sprawling gray stone fortress built over geothermal hot springs that protect it from the biting winter cold.'
  },
  {
    name: 'King\'s Landing',
    region: 'The Crownlands',
    house: 'House Lannister / Targaryen',
    image: '/assets/kings-landing.jpeg',
    description: 'The capital of the Seven Kingdoms, a bustling, red-roofed coastal city housing the Red Keep, the Great Sept of Baelor, and the Iron Throne.'
  },
  {
    name: 'Dragonstone',
    region: 'Blackwater Bay',
    house: 'House Targaryen',
    image: '/assets/dragonstone.jpeg',
    description: 'A volcanic island fortress sculpted in the shape of dragons, forged by the Valyrians using advanced magic and dragonflame.'
  },
  {
    name: 'The Wall',
    region: 'The Far North',
    house: 'The Night\'s Watch',
    image: '/assets/the-wall.jpeg',
    description: 'A colossal, 700-foot-tall barrier of solid ice stretching 300 miles across the northern border, defended by the sworn brothers of the Night\'s Watch.'
  },
  {
    name: 'Oldtown',
    region: 'The Reach',
    house: 'House Hightower',
    image: '/assets/oldtown.jpeg',
    description: 'The oldest city in Westeros, famous for the Citadel where Maesters train, and the Hightower, a colossal beacon guiding sailors in the Whispering Sound.'
  },
  {
    name: 'Sunspear',
    region: 'Dorne',
    house: 'House Martell',
    image: '/assets/sunspear.jpeg',
    description: 'The desert capital of Dorne, built of warm sandstone and clay, centered around the massive Tower of the Sun and the Sandship citadel.'
  }
];

export default function Gallery({ isWildfire }) {
  const scrollRef = useRef(null);
  const accentColor = isWildfire ? '#00FF66' : '#C9A227';

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth * 0.75
          : scrollLeft + clientWidth * 0.75;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // 3D card tilt on mouse move (Awwwards-style parallax hover)
  const handleMouseMove = (e, index) => {
    const card = document.getElementById(`gallery-card-${index}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Normalize values
    const tiltX = (y / (rect.height / 2)) * -10; // max tilt 10deg
    const tiltY = (x / (rect.width / 2)) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (index) => {
    const card = document.getElementById(`gallery-card-${index}`);
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section id="gallery" className="relative w-full py-24 bg-gotBackground border-b border-gotGold/10">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-gotGold/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-30">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-cinzel text-xs text-gotGold uppercase tracking-[0.3em] block mb-3">
              Sightseeing the Realm
            </span>
            <h3 className="font-cinzelDeco font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-widest text-gotIvory">
              LANDSCAPES & SEATS
            </h3>
          </div>
          
          {/* Controls */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-gotGold/30 text-gotGold hover:border-gotGold hover:bg-gotGold/10 flex items-center justify-center transition-colors duration-300 focus:outline-none"
              aria-label="Scroll Left"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-gotGold/30 text-gotGold hover:border-gotGold hover:bg-gotGold/10 flex items-center justify-center transition-colors duration-300 focus:outline-none"
              aria-label="Scroll Right"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>

        {/* Netflix Horizontal Carousel Slider */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 pb-8 pt-4 no-scrollbar snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {locations.map((loc, idx) => (
            <div
              key={loc.name}
              className="snap-start flex-shrink-0 w-[280px] sm:w-[380px] h-[260px] sm:h-[320px]"
            >
              <div
                id={`gallery-card-${idx}`}
                onMouseMove={(e) => handleMouseMove(e, idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
                style={{ transition: 'transform 0.1s ease-out' }}
                className="w-full h-full relative rounded-2xl overflow-hidden shadow-xl shadow-black/50 border border-gotGold/10 cursor-pointer group bg-gotCharcoal"
              >
                {/* Image background */}
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.7] group-hover:scale-[1.05] transition-transform duration-[1200ms] ease-out"
                />

                {/* Default Text Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end z-10 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="text-[10px] font-cinzel uppercase tracking-widest text-gotGold block">
                    {loc.region}
                  </span>
                  <h4 className="font-cinzel font-bold text-xl sm:text-2xl text-gotIvory tracking-wide">
                    {loc.name}
                  </h4>
                </div>

                {/* Glassmorphic Description overlay on hover */}
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gotCharcoal/70 backdrop-blur-md p-6 flex flex-col justify-between border-t border-gotGold/25">
                  <div className="space-y-2">
                    <span className="text-[10px] font-cinzel uppercase tracking-widest text-gotGold">
                      {loc.house}
                    </span>
                    <h4 className="font-cinzel font-bold text-xl text-gotIvory tracking-wide border-b border-gotGold/15 pb-2">
                      {loc.name}
                    </h4>
                    <p className="text-gotIvory/70 text-xs sm:text-sm leading-relaxed pt-2">
                      {loc.description}
                    </p>
                  </div>
                  <span className="text-[10px] font-cinzel uppercase tracking-widest text-gotGold/60">
                    {loc.region}
                  </span>
                </div>

                {/* Inner gold frame detail */}
                <div className="absolute inset-4 border border-gotGold/5 pointer-events-none rounded-xl group-hover:border-gotGold/25 transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
