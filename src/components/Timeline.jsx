import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Timeline historical events
const events = [
  {
    year: '281 AC',
    title: 'The Year of the False Spring',
    house: 'House Targaryen',
    description: 'The infamous Tourney at Harrenhal occurs. Rhaegar Targaryen crowns Lyanna Stark as the Queen of Love and Beauty, planting the seeds of rebellion.',
    color: '#7a0e18'
  },
  {
    year: '282 AC',
    title: 'Robert\'s Rebellion',
    house: 'House Baratheon',
    description: 'Robert Baratheon, Eddard Stark, and Jon Arryn raise their banners in rebellion. King\'s Landing is sacked, ending the Targaryen dynasty.',
    color: '#c9a227'
  },
  {
    year: '298 AC',
    title: 'The Hand\'s Demise',
    house: 'House Stark',
    description: 'Eddard Stark is executed for treason in King\'s Landing. Robb Stark is declared King in the North, igniting the War of the Five Kings.',
    color: '#a3a3a3'
  },
  {
    year: '299 AC',
    title: 'Battle of the Blackwater',
    house: 'House Lannister',
    description: 'Stannis Baratheon\'s fleet attacks King\'s Landing, but is decimated by Tyrion Lannister\'s wildfire defense and Tywin Lannister\'s reinforcement army.',
    color: '#7a0e18'
  },
  {
    year: '300 AC',
    title: 'The Red Wedding',
    house: 'House Stark / Frey',
    description: 'Robb and Catelyn Stark are betrayed and murdered at the Twins during a wedding feast, breaking the northern rebellion.',
    color: '#4a050b'
  },
  {
    year: '303 AC',
    title: 'Battle of the Bastards',
    house: 'House Stark / Bolton',
    description: 'Jon Snow and Sansa Stark lead a northern host to retake Winterfell from Ramsay Bolton, restoring Stark rule in the North.',
    color: '#a3a3a3'
  },
  {
    year: '305 AC',
    title: 'The Long Night',
    house: 'The Realm',
    description: 'The living stand against the Army of the Dead at Winterfell. Arya Stark slays the Night King, ending the Great War.',
    color: '#1a3a5c'
  }
];

export default function Timeline() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    const progressLine = progressLineRef.current;
    if (!track || !container || !progressLine) return;

    // Calculate scroll distance
    const trackWidth = track.scrollWidth;
    const windowWidth = window.innerWidth;
    const scrollAmount = trackWidth - windowWidth;

    if (scrollAmount <= 0) return;

    // Pin timeline and translate horizontally on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.5,
        start: 'top top',
        end: () => `+=${scrollAmount}`,
        invalidateOnRefresh: true,
      }
    });

    tl.to(track, {
      x: -scrollAmount,
      ease: 'none'
    });

    // Animate the gold connector line loading
    tl.to(progressLine, {
      scaleX: 1,
      ease: 'none'
    }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} id="timeline" className="relative w-full h-screen bg-gotBackground overflow-hidden border-b border-gotGold/10 flex items-center">
      {/* Title block locked on top left */}
      <div className="absolute top-12 left-6 md:left-12 z-30 select-none">
        <span className="font-cinzel text-xs text-gotGold uppercase tracking-[0.3em] block mb-1">
          Chronicles of Westeros
        </span>
        <h3 className="font-cinzelDeco font-extrabold text-2xl md:text-3xl text-gotIvory tracking-widest">
          TIMELINE OF EVENTS
        </h3>
      </div>

      {/* Horizontal Scrolling Track */}
      <div ref={trackRef} className="flex items-center space-x-12 px-12 md:px-24 whitespace-nowrap h-full relative">
        
        {/* Continuous timeline connector lines (in the background) */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gotGold/15 z-0" />
        
        {/* GSAP animated self-drawing progress line */}
        <div
          ref={progressLineRef}
          className="absolute left-0 w-full top-1/2 -translate-y-1/2 h-[2.5px] bg-gotGold z-0 origin-left scale-x-0"
        />

        {/* Timeline Event Cards */}
        {events.map((evt, idx) => (
          <div
            key={evt.year}
            className="inline-block w-[300px] sm:w-[380px] h-[360px] relative z-10 whitespace-normal flex flex-col justify-between"
          >
            {/* Year Node Circle */}
            <div className="absolute top-1/2 -translate-y-1/2 left-6 w-5 h-5 rounded-full border-2 border-gotGold bg-gotBackground z-20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gotGold" />
            </div>

            {/* Top Half: Year & Title */}
            <div className="pb-16 flex flex-col justify-end h-[180px]">
              <span
                className="font-cinzelDeco font-extrabold text-4xl sm:text-5xl tracking-wider block mb-2"
                style={{ color: evt.color }}
              >
                {evt.year}
              </span>
              <h4 className="font-cinzel font-bold text-lg sm:text-xl text-gotIvory tracking-wide">
                {evt.title}
              </h4>
            </div>

            {/* Bottom Half: Card content details */}
            <div className="pt-12 h-[180px]">
              <div className="glass-panel p-6 border border-gotGold/10 bg-gotCharcoal/30 relative">
                {/* Visual anchor line inside card */}
                <div
                  className="absolute top-0 left-0 w-1 h-full"
                  style={{ backgroundColor: evt.color }}
                />
                
                <span className="text-[10px] uppercase font-cinzel tracking-widest text-gotGold block mb-2">
                  {evt.house}
                </span>
                
                <p className="text-gotIvory/70 text-xs sm:text-sm leading-relaxed">
                  {evt.description}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Decorative timeline coordinates */}
      <div className="absolute bottom-8 right-12 z-30 select-none hidden md:block">
        <span className="font-cinzel text-xs text-gotGold/40 uppercase tracking-widest">
          Scroll vertically to advance time →
        </span>
      </div>
    </div>
  );
}
