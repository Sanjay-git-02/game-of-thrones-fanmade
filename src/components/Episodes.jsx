import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { GiCrossedSwords, GiFlame, GiCrown } from 'react-icons/gi';

// Legendary GoT episodes
const episodes = [
  {
    season: 'Season 2 · Episode 9',
    title: 'Blackwater',
    director: 'Neil Marshall',
    rating: '9.7',
    tag: 'Battle',
    icon: <GiFlame />,
    image: '/assets/blackwater-episode.jpeg',
    synopsis: 'Stannis Baratheon\'s fleet attacks King\'s Landing by sea. Tyrion Lannister deploys wildfire in the Battle of the Blackwater Bay, saving the city in a blaze of green fire.'
  },
  {
    season: 'Season 3 · Episode 9',
    title: 'The Rains of Castamere',
    director: 'David Nutter',
    rating: '9.9',
    tag: 'Tragedy',
    icon: <GiCrown />,
    image: '/assets/rains-of-castamere.jpeg',
    synopsis: 'Robb and Catelyn Stark attend the Twins for the wedding of Edmure Tully. Walder Frey orchestrates the infamous Red Wedding betrayal, breaking every law of hospitality.'
  },
  {
    season: 'Season 4 · Episode 8',
    title: 'The Mountain and the Viper',
    director: 'Alex Graves',
    rating: '9.7',
    tag: 'Trial',
    icon: <GiCrossedSwords />,
    image: '/assets/mountain-viper.jpeg',
    synopsis: 'Oberyn Martell champions Tyrion in trial by combat against the monstrous Ser Gregor Clegane, "The Mountain", in a duel for the ages that shakes all of King\'s Landing.'
  },
  {
    season: 'Season 5 · Episode 8',
    title: 'Hardhome',
    director: 'Miguel Sapochnik',
    rating: '9.9',
    tag: 'Battle',
    icon: <GiFlame />,
    image: '/assets/hardhome-episode.jpeg',
    synopsis: 'Jon Snow negotiates with the Free Folk at Hardhome. The Night King arrives with his army of the dead in an attack that forces the living to flee in desperate terror.'
  },
  {
    season: 'Season 6 · Episode 9',
    title: 'Battle of the Bastards',
    director: 'Miguel Sapochnik',
    rating: '9.9',
    tag: 'Battle',
    icon: <GiCrossedSwords />,
    image: '/assets/battle-episode.jpeg',
    synopsis: 'Jon Snow faces Ramsay Bolton in an epic cavalry charge battle outside Winterfell, with Sansa and the Knights of the Vale arriving to turn the tide at the last moment.'
  },
  {
    season: 'Season 8 · Episode 3',
    title: 'The Long Night',
    director: 'Miguel Sapochnik',
    rating: '9.3',
    tag: 'Battle',
    icon: <GiFlame />,
    image: '/assets/long-night.jpeg',
    synopsis: 'The Army of the Dead breaches Winterfell. In total darkness, Arya Stark delivers the killing blow to the Night King, ending the Long Night and saving the realm of the living.'
  }
];

export default function Episodes({ isWildfire }) {
  const scrollRef = useRef(null);
  const accentColor = isWildfire ? '#00FF66' : '#C9A227';

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: direction === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section
      id="episodes"
      className="relative w-full py-24 bg-gotBackground border-b border-gotGold/10 overflow-hidden"
      style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.1)' : 'rgba(201,162,39,0.1)' }}
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full filter blur-[130px] pointer-events-none"
        style={{ backgroundColor: isWildfire ? 'rgba(0,255,102,0.03)' : 'rgba(122,14,24,0.05)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-cinzel text-xs uppercase tracking-[0.3em] block mb-3"
              style={{ color: accentColor }}
            >
              Season Archive
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-cinzelDeco font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-widest text-gotIvory uppercase"
            >
              LEGENDARY EPISODES
            </motion.h3>
          </div>
          {/* Navigation controls */}
          <div className="flex space-x-3 mt-6 md:mt-0">
            {[FiChevronLeft, FiChevronRight].map((Icon, i) => (
              <button key={i}
                onClick={() => scroll(i === 0 ? 'left' : 'right')}
                className="w-11 h-11 rounded-full border flex items-center justify-center transition-colors duration-300 focus:outline-none"
                style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.3)' : 'rgba(201,162,39,0.3)', color: accentColor }}
                aria-label={i === 0 ? 'Scroll Left' : 'Scroll Right'}
              >
                <Icon className="text-lg" />
              </button>
            ))}
          </div>
        </div>

        {/* Netflix Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 pb-6 no-scrollbar snap-x snap-mandatory"
        >
          {episodes.map((ep, idx) => (
            <motion.div
              key={ep.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.06 }}
              className="snap-start flex-shrink-0 w-[300px] sm:w-[380px] group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative h-[210px] sm:h-[220px] overflow-hidden rounded-sm">
                <img
                  src={ep.image}
                  alt={ep.title}
                  className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.65] group-hover:scale-105 group-hover:brightness-[0.8] transition-all duration-700 ease-out"
                />
                {/* Default vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-gotBackground/90 to-transparent pointer-events-none" />

                {/* Rating badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/80 border"
                  style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.3)' : 'rgba(201,162,39,0.3)' }}>
                  <span className="text-[9px] font-cinzel tracking-wider" style={{ color: accentColor }}>★ {ep.rating}</span>
                </div>

                {/* Tag badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/80">
                  <span style={{ color: accentColor }} className="text-sm">{ep.icon}</span>
                  <span className="text-[9px] font-cinzel tracking-wider text-gotIvory/70 uppercase">{ep.tag}</span>
                </div>

                {/* Hover synopsis overlay */}
                <div className="absolute inset-0 bg-gotCharcoal/85 backdrop-blur-sm flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
                  <p className="text-gotIvory/85 text-xs sm:text-sm font-cinzel leading-relaxed text-center">
                    {ep.synopsis}
                  </p>
                </div>
              </div>

              {/* Episode Info */}
              <div className="pt-4 px-1 space-y-1.5 border-l-2"
                style={{ borderColor: isWildfire ? 'rgba(0,255,102,0.25)' : 'rgba(201,162,39,0.25)', paddingLeft: '12px' }}>
                <span className="text-[9px] font-cinzel uppercase tracking-widest block" style={{ color: accentColor }}>
                  {ep.season}
                </span>
                <h4 className="font-cinzel font-bold text-base sm:text-lg tracking-wider text-gotIvory group-hover:text-gotGold transition-colors duration-300"
                  style={{ '--tw-text-opacity': 1 }}>
                  {ep.title}
                </h4>
                <span className="text-[9px] font-cinzel text-gotIvory/40 tracking-wider block">
                  Dir. {ep.director}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
