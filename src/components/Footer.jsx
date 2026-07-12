import React from 'react';
import { FaTwitter, FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa';
import { GiShieldReflect } from 'react-icons/gi';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-gotBackground border-t border-gotGold/10 py-16 overflow-hidden">
      {/* Visual stone-like lighting effect */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-gotCharcoal/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center justify-center space-y-10">
        
        {/* Shield Icon / Top Scroll trigger */}
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full border border-gotGold/35 text-gotGold hover:border-gotGold hover:bg-gotGold/15 flex items-center justify-center transition-all duration-300 group hover:-translate-y-1 focus:outline-none"
          aria-label="Scroll back to top"
        >
          <GiShieldReflect className="text-xl group-hover:scale-115 transition-transform" />
        </button>

        {/* GoT Brand Logo styling */}
        <div className="text-center">
          <span className="font-cinzelDeco font-extrabold text-2xl tracking-widest text-gotGold block">
            WESTEROS
          </span>
          <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-gotIvory/50 block mt-2">
            Chronicles of the Seven Kingdoms
          </span>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-gotIvory/10 hover:border-gotGold text-gotIvory/50 hover:text-gotGold flex items-center justify-center transition-colors duration-300"
            aria-label="Twitter Account Link"
          >
            <FaTwitter className="text-lg" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-gotIvory/10 hover:border-gotGold text-gotIvory/50 hover:text-gotGold flex items-center justify-center transition-colors duration-300"
            aria-label="Instagram Account Link"
          >
            <FaInstagram className="text-lg" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-gotIvory/10 hover:border-gotGold text-gotIvory/50 hover:text-gotGold flex items-center justify-center transition-colors duration-300"
            aria-label="YouTube Channel Link"
          >
            <FaYoutube className="text-lg" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-gotIvory/10 hover:border-gotGold text-gotIvory/50 hover:text-gotGold flex items-center justify-center transition-colors duration-300"
            aria-label="GitHub Repository Link"
          >
            <FaGithub className="text-lg" />
          </a>
        </div>

        {/* Links list */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 font-cinzel text-xs text-gotIvory/60">
          <a href="#home" className="hover:text-gotGold transition-colors">Home</a>
          <a href="#houses" className="hover:text-gotGold transition-colors">Houses</a>
          <a href="#characters" className="hover:text-gotGold transition-colors">Characters</a>
          <a href="#map" className="hover:text-gotGold transition-colors">Kingdom Map</a>
          <a href="#timeline" className="hover:text-gotGold transition-colors">Timeline</a>
          <a href="#gallery" className="hover:text-gotGold transition-colors">Gallery</a>
        </div>

        {/* Credits details */}
        <div className="text-center space-y-2 border-t border-gotGold/10 w-full pt-8 text-[10px] md:text-xs tracking-wider text-gotIvory/45">
          <p>© {new Date().getFullYear()} WESTEROS CHRONICLES. All rights reserved.</p>
          <p>
            An original fan concept inspired by the world of Game of Thrones. Created for educational/demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
