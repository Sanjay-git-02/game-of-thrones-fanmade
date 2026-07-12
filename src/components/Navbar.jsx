import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GiSwordBrandish, GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseOutline } from 'react-icons/io5';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Houses', href: '#houses' },
  { name: 'Characters', href: '#characters' },
  { name: 'Dragons', href: '#dragons' },
  { name: 'Map', href: '#map' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Episodes', href: '#episodes' },
  { name: 'Gallery', href: '#gallery' },
];

export default function Navbar({ isWildfire }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const accentColor = isWildfire ? '#00FF66' : '#C9A227';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-gotBackground/90 backdrop-blur-md py-3 border-b shadow-lg shadow-black/50'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
        style={{ borderColor: scrolled ? (accentColor + '25') : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <GiSwordBrandish
              className="text-2xl md:text-3xl group-hover:rotate-45 transition-transform duration-500"
              style={{ color: accentColor }}
            />
            <span className="font-cinzelDeco font-bold text-lg md:text-xl tracking-widest transition-colors duration-300 group-hover:text-gotIvory"
              style={{ color: accentColor }}>
              WESTEROS
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative py-2 text-[11px] tracking-wider uppercase font-cinzel text-gotIvory/65 hover:text-gotIvory transition-colors duration-300"
              >
                {link.name}
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 w-full h-[2px]"
                    style={{ backgroundColor: accentColor }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection('#houses')}
              className="relative px-5 py-2 overflow-hidden border font-cinzel text-[11px] uppercase tracking-widest transition-colors duration-500 group"
              style={{ borderColor: accentColor + '60', color: accentColor }}
            >
              <span className="absolute inset-0 w-full h-full origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                style={{ backgroundColor: accentColor }} />
              <span className="relative z-10 group-hover:text-gotBackground transition-colors duration-500">
                Enter Realm
              </span>
            </button>
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden hover:text-gotGold transition-colors duration-300 focus:outline-none"
            style={{ color: isWildfire ? '#00FF66' : '#F5F5F5' }}
            aria-label="Open menu"
          >
            <GiHamburgerMenu className="text-2xl" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-lg flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-gotIvory hover:text-gotGold transition-colors focus:outline-none"
              style={{ color: isWildfire ? '#00FF66' : '#F5F5F5' }}
              aria-label="Close menu"
            >
              <IoCloseOutline className="text-4xl" />
            </button>

            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="font-cinzel text-xl tracking-widest uppercase text-gotIvory hover:text-gotGold transition-colors duration-300"
                  style={{ '--hover-color': accentColor }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
