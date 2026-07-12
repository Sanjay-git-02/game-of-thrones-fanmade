import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Houses from './components/Houses';
import Characters from './components/Characters';
import Dragons from './components/Dragons';
import WesterosMap from './components/WesterosMap';
import Timeline from './components/Timeline';
import Episodes from './components/Episodes';
import Gallery from './components/Gallery';
import Quotes from './components/Quotes';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isWildfire, setIsWildfire] = useState(false);

  const toggleWildfire = () => setIsWildfire(prev => !prev);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const rafFn = (time) => {
      lenis.raf(time);
      requestAnimationFrame(rafFn);
    };
    requestAnimationFrame(rafFn);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Apply wildfire theme class to body for CSS variable overrides
  useEffect(() => {
    if (isWildfire) {
      document.body.classList.add('wildfire-theme');
    } else {
      document.body.classList.remove('wildfire-theme');
    }
  }, [isWildfire]);

  return (
    <div className={`relative min-h-screen bg-gotBackground text-gotIvory font-sans antialiased overflow-x-hidden transition-colors duration-700`}>
      <Navbar isWildfire={isWildfire} />
      <Hero isWildfire={isWildfire} onToggleWildfire={toggleWildfire} />
      <Houses isWildfire={isWildfire} />
      <Characters isWildfire={isWildfire} />
      <Dragons isWildfire={isWildfire} />
      <WesterosMap isWildfire={isWildfire} />
      <Timeline />
      <Episodes isWildfire={isWildfire} />
      <Gallery isWildfire={isWildfire} />
      <Quotes />
      <Footer />
    </div>
  );
}
