import React, { useState, useEffect } from 'react';
import { GiQuill } from 'react-icons/gi';

const quotes = [
  {
    text: "Winter is coming.",
    author: "Eddard Stark",
    context: "Lord of Winterfell"
  },
  {
    text: "Fire and Blood.",
    author: "Daenerys Targaryen",
    context: "Mother of Dragons"
  },
  {
    text: "The North remembers, and the mummer's farce is almost done.",
    author: "Wyman Manderly",
    context: "Lord of White Harbor"
  },
  {
    text: "A mind needs books like a sword needs a whetstone, if it is to keep its edge.",
    author: "Tyrion Lannister",
    context: "The Imp"
  },
  {
    text: "Chaos isn't a pit. Chaos is a ladder.",
    author: "Petyr Baelish",
    context: "Master of Coin"
  },
  {
    text: "The man who passes the sentence should swing the sword.",
    author: "Eddard Stark",
    context: "Lord of Winterfell"
  }
];

export default function Quotes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 6000); // switch every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="quotes" className="relative w-full py-24 bg-gotBackground border-b border-gotGold/10 flex items-center justify-center overflow-hidden">
      {/* Background glow shadow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gotGold/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-30 w-full">
        {/* Title */}
        <div className="mb-12">
          <span className="font-cinzel text-xs text-gotGold uppercase tracking-[0.3em] block mb-3">
            Whispers of Westeros
          </span>
          <h3 className="font-cinzelDeco font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-widest text-gotIvory">
            WORDS OF WISDOM
          </h3>
        </div>

        {/* Parchment Quote Card */}
        <div className="parchment-card max-w-2xl mx-auto p-10 sm:p-14 relative border border-[#c3b596] rounded-none overflow-hidden select-none">
          {/* Decorative Corner Seals */}
          <div className="absolute top-4 left-4 text-[#8b7355]/30 text-lg">⚜</div>
          <div className="absolute top-4 right-4 text-[#8b7355]/30 text-lg">⚜</div>
          <div className="absolute bottom-4 left-4 text-[#8b7355]/30 text-lg">⚜</div>
          <div className="absolute bottom-4 right-4 text-[#8b7355]/30 text-lg">⚜</div>

          {/* Autoplay loading indicator bar */}
          <div className="absolute bottom-0 left-0 w-full h-[3.5px] bg-[#d9cdb0]">
            <div
              key={currentIndex}
              className="h-full bg-gotGold origin-left"
              style={{
                animation: 'fillProgress 6000ms linear forwards'
              }}
            />
          </div>

          {/* Quote display layout */}
          <div className="min-h-[160px] flex flex-col justify-between">
            <GiQuill className="text-3xl text-[#8b7355]/40 mx-auto mb-6 rotate-95" />
            
            <div className="flex-grow flex items-center justify-center">
              <p
                key={currentIndex}
                className="text-lg sm:text-2xl font-cinzel leading-relaxed font-semibold italic text-[#2b2216] select-text transition-opacity duration-700"
              >
                "{quotes[currentIndex].text}"
              </p>
            </div>

            <div className="mt-8 border-t border-[#8b7355]/20 pt-4">
              <span className="font-cinzel text-sm sm:text-base font-bold text-[#4a3b2c] block">
                — {quotes[currentIndex].author}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs uppercase tracking-wider text-[#6b5843] block mt-0.5">
                {quotes[currentIndex].context}
              </span>
            </div>
          </div>
        </div>

        {/* Manual Dots Selector Navigation */}
        <div className="flex justify-center space-x-3 mt-8">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rotate-45 border border-gotGold/50 transition-colors duration-300 focus:outline-none ${
                currentIndex === idx ? 'bg-gotGold' : 'bg-transparent hover:bg-gotGold/35'
              }`}
              aria-label={`Go to quote ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Embedded CSS animation for quote timing indicator */}
      <style>{`
        @keyframes fillProgress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
