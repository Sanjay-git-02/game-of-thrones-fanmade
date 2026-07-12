import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { GiCrossedSwords, GiTrophy, GiChest } from "react-icons/gi";

// Great Houses dataset with comprehensive RPG statistics, capitals, weapons, and sigils.
const housesData = [
  {
    id: "stark",
    name: "House Stark",
    motto: "Winter is Coming",
    color: "#a3a3a3",
    seat: "Winterfell",
    region: "The North",
    weapon: "Ice (Greatsword)",
    traits: ["Resilient", "Honorable", "Vigilant"],
    stats: { military: 88, diplomacy: 75, wealth: 50, honor: 99 },
    history:
      "Founded by Brandon the Builder in the Age of Heroes, the Starks ruled as Kings in the North for thousands of years. They are guardians of the Wall and first responders to the terrors of the deep cold.",
    sigilSvg: (
      // <svg
      //   viewBox="0 0 100 100"
      //
      // >
      //   <path
      //     d="M50,15 L62,35 L70,33 L78,43 L65,47 L60,58 L45,55 L35,62 L28,52 L36,45 L32,38 L42,35 Z"
      //     className="fill-stone-850/40"
      //   />
      //   <path d="M36,45 C28,40 24,30 24,20 M78,43 C84,52 82,65 72,75 M50,15 L48,25 L40,28 L36,45 M62,35 L60,40 L65,47 M35,62 L42,75 L52,85 L58,85 L65,75 M45,55 L48,65 L55,70 L60,58" />
      //   <circle cx="48" cy="33" r="1.5" className="fill-current" />
      // </svg>
      <img
        className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
        src="/assets/house-stark.jpeg"
        alt=""
      />
    ),
  },
  {
    id: "lannister",
    name: "House Lannister",
    motto: "Hear Me Roar!",
    color: "#C9A227",
    seat: "Casterly Rock",
    region: "The Westerlands",
    weapon: "Brightroar (Valyrian)",
    traits: ["Cunning", "Affluent", "Prideful"],
    stats: { military: 92, diplomacy: 88, wealth: 99, honor: 45 },
    history:
      "Descended from Lann the Clever, the Lannisters ruled as Kings of the Rock before kneeling to Aegon. They control the trade and wealth of the gold-rich Westerlands from a mountain fortress.",
    sigilSvg: (
      // <svg
      //   viewBox="0 0 100 100"
      //   className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
      // >
      //   <path d="M50,15 C60,15 68,22 68,32 C68,38 65,43 60,46 C64,48 67,52 69,57 C72,55 75,54 78,55 C78,48 76,43 78,38 C80,35 83,35 85,38 M30,55 C25,50 20,40 20,30" />
      //   <path d="M40,32 C40,42 45,52 35,62 C28,68 28,75 35,82 C45,78 50,85 58,82 C65,72 65,60 55,52 M46,25 L50,22 L54,25" />
      //   <path d="M38,48 C42,48 45,45 45,42 M56,42 C56,46 52,48 48,48" />
      // </svg>
      <img
        className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
        src="/assets/house-lannister.jpeg"
        alt=""
      />
    ),
  },
  {
    id: "targaryen",
    name: "House Targaryen",
    motto: "Fire and Blood",
    color: "#7a0e18",
    seat: "Dragonstone",
    region: "Crownlands",
    weapon: "Blackfyre (Valyrian)",
    traits: ["Valiant", "Regal", "Dragonlords"],
    stats: { military: 98, diplomacy: 80, wealth: 65, honor: 70 },
    history:
      "Survivors of the Doom of Valyria who united the Seven Kingdoms with dragons, ruling for three centuries. They forged the Iron Throne from the melted swords of their enemies.",
    sigilSvg: (
      // <svg
      //   viewBox="0 0 100 100"
      //   className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
      // >
      //   <path
      //     d="M50,12 C40,15 32,25 32,38 C32,55 45,72 50,88 C55,72 68,55 68,38 C68,25 60,15 50,12 Z"
      //     className="fill-stone-900/40"
      //   />
      //   <path d="M35,32 C28,26 22,28 18,36 C15,42 22,50 30,48 M65,32 C72,26 78,28 82,36 C85,42 78,50 70,48" />
      //   <path d="M42,22 C42,16 45,10 50,10 C55,10 58,16 58,22" />
      //   <path d="M46,45 C40,50 40,60 48,65 M54,45 C60,50 60,60 52,65" />
      // </svg>
      <img
        className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
        src="/assets/house-targaryen.jpeg"
        alt=""
      />
    ),
  },
  {
    id: "baratheon",
    name: "House Baratheon",
    motto: "Ours is the Fury",
    color: "#8f7b3c",
    seat: "Storm's End",
    region: "The Stormlands",
    weapon: "Warhammer",
    traits: ["Furious", "Fierce", "Unyielding"],
    stats: { military: 90, diplomacy: 70, wealth: 72, honor: 85 },
    history:
      "Founded by Orys Baratheon, Aegon's half-brother. They inherited the sigil and motto of the Storm Kings. Robert Baratheon led the rebellion that ended the Targaryen dynasty.",
    sigilSvg: (
      // <svg
      //   viewBox="0 0 100 100"
      //   className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
      // >
      //   <path
      //     d="M50,45 C55,45 60,40 60,32 C60,25 55,22 50,22 C45,22 40,25 40,32 C40,40 45,45 50,45 Z"
      //     className="fill-stone-850/40"
      //   />
      //   <path d="M40,25 C35,20 28,22 24,16 M60,25 C65,20 72,22 76,16" />
      //   <path d="M42,32 C35,32 30,35 28,42 M58,32 C65,32 70,35 72,42" />
      //   <path d="M50,45 L50,65 L44,72 L46,84 L54,84 L56,72 L50,65" />
      //   <path d="M48,22 C48,15 45,12 40,10 M52,22 C52,15 55,12 60,10" />
      // </svg>

      <img
        className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
        src="/assets/house-baratheon.jpeg"
        alt=""
      />
    ),
  },
  {
    id: "greyjoy",
    name: "House Greyjoy",
    motto: "We Do Not Sow",
    color: "#0e5f75",
    seat: "Pyke",
    region: "The Iron Islands",
    weapon: "Red Rain (Valyrian)",
    traits: ["Maritime", "Rebellious", "Raiders"],
    stats: { military: 82, diplomacy: 45, wealth: 45, honor: 40 },
    history:
      "Elected to rule Pyke after the Conqueror ended House Hoare. The Greyjoys command the Iron Fleet, worship the Drowned God, and live by the Old Way of maritime raiding.",
    sigilSvg: (
      // <svg
      //   viewBox="0 0 100 100"
      //   className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
      // >
      //   <path
      //     d="M50,18 C45,18 40,24 40,32 C40,45 50,55 50,68 C50,55 60,45 60,32 C60,24 55,18 50,18 Z"
      //     className="fill-stone-900/40"
      //   />
      //   <path d="M42,36 C35,38 28,45 25,55 C22,65 28,75 32,82" />
      //   <path d="M58,36 C65,38 72,45 75,55 C78,65 72,75 68,82" />
      //   <path d="M46,50 C42,55 38,62 38,72 C38,80 44,85 48,88" />
      //   <path d="M54,50 C58,55 62,62 62,72 C62,80 56,85 52,88" />
      // </svg>
      <img
        className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
        src="/assets/house-greyjoy.jpeg"
        alt=""
      />
    ),
  },
  {
    id: "tyrell",
    name: "House Tyrell",
    motto: "Growing Strong",
    color: "#1a5c24",
    seat: "Highgarden",
    region: "The Reach",
    weapon: "Heartsbane (Valyrian)",
    traits: ["Diplomatic", "Bountiful", "Cultured"],
    stats: { military: 80, diplomacy: 95, wealth: 95, honor: 72 },
    history:
      "Stewards of the ancient Kings of the Reach who surrendered Highgarden to Aegon and were rewarded with dominion over the southwest. They feed the kingdoms.",
    sigilSvg: (
      // <svg
      //   viewBox="0 0 100 100"
      //   className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
      // >
      //   <circle cx="50" cy="50" r="14" className="fill-stone-900/40" />
      //   <path d="M50,22 C42,22 36,30 36,36 C36,44 44,48 50,48 C56,48 64,44 64,36 C64,30 58,22 50,22 Z" />
      //   <path d="M50,78 C42,78 36,70 36,64 C36,56 44,52 50,52 C56,52 64,56 64,64 C64,70 58,78 50,78 Z" />
      //   <path d="M22,50 C22,42 30,36 36,36 C44,36 48,44 48,50 C48,56 44,64 36,64 C30,64 22,58 22,50 Z" />
      //   <path d="M78,50 C78,42 70,36 64,36 C56,36 52,44 52,50 C52,56 56,64 64,64 C70,64 78,58 78,50 Z" />
      // </svg>
      <img
        className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
        src="/assets/house-tyrell.jpeg"
        alt=""
      />
    ),
  },
  {
    id: "martell",
    name: "House Martell",
    motto: "Unbowed, Unbent, Unbroken",
    color: "#8c3d19",
    seat: "Sunspear",
    region: "Dorne",
    weapon: "Oberyn's Spear",
    traits: ["Independent", "Fiery", "Resolute"],
    stats: { military: 85, diplomacy: 70, wealth: 70, honor: 82 },
    history:
      "Forged by the marriage of Mors Martell and warrior Nymeria. They resisted Targaryen conquest for a century, eventually joining the realm through peace.",
    sigilSvg: (
      // <svg
      //   viewBox="0 0 100 100"
      //   className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
      // >
      //   <circle cx="50" cy="50" r="16" className="fill-stone-950/40" />
      //   <line x1="18" y1="82" x2="82" y2="18" />
      //   <path d="M78,22 L84,16 L80,26 Z" />
      //   <path d="M50,22 L50,12 M50,78 L50,88 M22,50 L12,50 M78,50 L88,50 M32,32 L24,24 M68,68 L76,76 M32,68 L24,76 M68,32 L76,24" />
      // </svg>
      <img
        className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
        src="/assets/house-martell.jpeg"
        alt=""
      />
    ),
  },
  {
    id: "arryn",
    name: "House Arryn",
    motto: "As High as Honor",
    color: "#1a3a5c",
    seat: "The Eyrie",
    region: "The Vale",
    weapon: "Falcon Blade",
    traits: ["Isolationist", "Honorable", "Defensive"],
    stats: { military: 84, diplomacy: 60, wealth: 75, honor: 95 },
    history:
      "One of the oldest Andal noble lines. Rulers of the impregnable Vale of Arryn residing in a fortress carved high into the mountain peaks.",
    sigilSvg: (
      // <svg
      //   viewBox="0 0 100 100"
      //   className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
      // >
      //   <path
      //     d="M40,25 C30,30 25,40 25,50 C25,65 35,75 50,75 C60,75 70,68 75,58 C65,65 52,65 42,55 C35,45 35,32 40,25 Z"
      //     className="fill-stone-900/40"
      //   />
      //   <path d="M42,42 C48,40 56,42 62,35 C68,42 75,45 82,45 C75,52 68,52 62,58 C55,52 48,50 42,42 Z" />
      //   <path d="M62,35 L62,58 M52,48 L72,48" />
      //   <circle cx="60" cy="38" r="1.5" className="fill-current" />
      // </svg>
      <img
        className="w-full h-full stroke-current fill-transparent stroke-[1.5]"
        src="/assets/house-arryn.jpeg"
        alt=""
      />
    ),
  },
];

export default function Houses({ isWildfire }) {
  const [expandedHouse, setExpandedHouse] = useState(null);

  // 3D card tilt handler
  const handleMouseMove = (e, houseId) => {
    const card = document.getElementById(`house-card-${houseId}`);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -10;
    const tiltY = (x / (rect.width / 2)) * 10;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = (houseId) => {
    const card = document.getElementById(`house-card-${houseId}`);
    if (!card) return;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <section
      id="houses"
      className="relative w-full min-h-screen py-24 bg-gotBackground border-b border-gotGold/10 transition-colors duration-800"
      style={{
        borderColor: isWildfire
          ? "rgba(0,255,102,0.1)"
          : "rgba(201,162,39,0.1)",
      }}
    >
      {/* Glow overlays */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gotCrimson/5 rounded-full filter blur-[120px] pointer-events-none"
        style={{
          backgroundColor: isWildfire
            ? "rgba(0,255,102,0.02)"
            : "rgba(122,14,24,0.05)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-30">
        {/* Title */}
        <div className="text-center mb-20 select-none">
          <span
            className="font-cinzel text-xs uppercase tracking-[0.3em] text-gotGold block mb-3 transition-colors duration-500"
            style={{ color: isWildfire ? "#00FF66" : "#C9A227" }}
          >
            Codex of Houses
          </span>
          <h3 className="font-cinzelDeco font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-widest text-gotIvory uppercase">
            THE GREAT HOUSES
          </h3>
          <div
            className="w-24 h-[1px] bg-gotGold/40 mx-auto mt-6 relative"
            style={{
              backgroundColor: isWildfire
                ? "rgba(0,255,102,0.4)"
                : "rgba(201,162,39,0.4)",
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-gotGold"
              style={{ backgroundColor: isWildfire ? "#00FF66" : "#C9A227" }}
            />
          </div>
        </div>

        {/* Houses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {housesData.map((house, idx) => (
            <motion.div
              key={house.id}
              id={`house-card-${house.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.08 }}
              onMouseMove={(e) => handleMouseMove(e, house.id)}
              onMouseLeave={() => handleMouseLeave(house.id)}
              onClick={() => setExpandedHouse(house)}
              style={{
                transition:
                  "transform 0.1s ease-out, border-color 0.5s ease, box-shadow 0.5s ease",
              }}
              className="group relative cursor-pointer glass-panel p-8 rounded-none bg-gotCharcoal/45 hover:bg-gotCharcoal/70 flex flex-col justify-between items-center text-center rpg-frame h-[400px] gold-glow-hover"
            >
              {/* Follow radial highlight */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle 120px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${isWildfire ? "rgba(0,255,102,0.1)" : "rgba(201,162,39,0.1)"}, transparent)`,
                }}
              />

              {/* Sigil Vector */}
              <div
                className="w-24 h-24 flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
                style={{ color: house.color }}
              >
                {house.sigilSvg}
              </div>

              {/* Title & Stats Preview */}
              <div className="space-y-3 mt-6 relative z-10 w-full">
                <span
                  className="font-cinzel text-[9px] uppercase tracking-widest text-gotGold"
                  style={{ color: isWildfire ? "#00FF66" : "#C9A227" }}
                >
                  {house.region}
                </span>
                <h4 className="font-cinzel font-bold text-lg tracking-wider text-gotIvory">
                  {house.name}
                </h4>
                <p className="font-cinzel text-[10px] uppercase tracking-widest italic text-gotIvory/40">
                  "{house.motto}"
                </p>

                {/* Micro RPG stats indicator */}
                <div
                  className="flex justify-center items-center gap-4 text-[10px] text-gotIvory/50 font-cinzel pt-4 border-t border-gotGold/5"
                  style={{
                    borderColor: isWildfire
                      ? "rgba(0,255,102,0.05)"
                      : "rgba(201,162,39,0.05)",
                  }}
                >
                  <div className="flex items-center gap-1">
                    <GiCrossedSwords
                      className="text-gotGold"
                      style={{ color: isWildfire ? "#00FF66" : "#C9A227" }}
                    />{" "}
                    {house.stats.military}
                  </div>
                  <div className="flex items-center gap-1">
                    <GiChest
                      className="text-gotGold"
                      style={{ color: isWildfire ? "#00FF66" : "#C9A227" }}
                    />{" "}
                    {house.stats.wealth}
                  </div>
                </div>
              </div>

              {/* RPG Prompts */}
              <span
                className="text-[9px] font-cinzel tracking-widest text-gotGold/50 group-hover:text-gotGold transition-colors duration-300 rpg-bracket-left rpg-bracket-right uppercase mt-4"
                style={{
                  color: isWildfire ? "#00FF66" : "rgba(201,162,39,0.5)",
                }}
              >
                Inspect Ledger
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Medieval Book/Scroll Detail Overlay */}
      <AnimatePresence>
        {expandedHouse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-12"
          >
            {/* Click outside to close */}
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={() => setExpandedHouse(null)}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-4xl glass-panel bg-gotCharcoal/95 border p-6 sm:p-10 md:p-14 rounded-none shadow-2xl shadow-black/90 flex flex-col md:flex-row gap-8 items-center z-10 rpg-frame"
              style={{ borderColor: isWildfire ? "#00FF66" : "#C9A227" }}
            >
              {/* Close Button */}
              <button
                onClick={() => setExpandedHouse(null)}
                className="absolute top-4 right-4 text-gotIvory/70 hover:text-gotGold transition-colors duration-300 focus:outline-none z-20"
                style={{ color: isWildfire ? "#00FF66" : "inherit" }}
                aria-label="Close details"
              >
                <IoCloseOutline className="text-3xl sm:text-4xl" />
              </button>

              {/* Left Column: Sigil Details */}
              <div
                className="flex flex-col items-center justify-center w-full md:w-2/5 border-b md:border-b-0 md:border-r border-gotGold/10 pb-6 md:pb-0 md:pr-8"
                style={{
                  borderColor: isWildfire
                    ? "rgba(0,255,102,0.1)"
                    : "rgba(201,162,39,0.1)",
                }}
              >
                <div
                  className="w-36 h-36 md:w-48 md:h-48 filter drop-shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]"
                  style={{ color: expandedHouse.color }}
                >
                  {expandedHouse.sigilSvg}
                </div>
                <h2 className="font-cinzelDeco font-extrabold text-2xl tracking-widest mt-6 text-gotIvory text-center">
                  {expandedHouse.name}
                </h2>
                <p
                  className="font-cinzel text-xs uppercase tracking-widest italic mt-2 text-center text-gotGold"
                  style={{ color: isWildfire ? "#00FF66" : "#C9A227" }}
                >
                  "{expandedHouse.motto}"
                </p>

                {/* Traits list */}
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  {expandedHouse.traits.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-cinzel tracking-wider px-2 py-0.5 border border-gotGold/20 bg-gotBackground text-gotIvory"
                      style={{
                        borderColor: isWildfire
                          ? "rgba(0,255,102,0.2)"
                          : "rgba(201,162,39,0.2)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: RPG Character Stats Bars */}
              <div className="w-full md:w-3/5 space-y-6">
                <div
                  className="grid grid-cols-2 gap-4 border-b border-gotGold/10 pb-4"
                  style={{
                    borderColor: isWildfire
                      ? "rgba(0,255,102,0.1)"
                      : "rgba(201,162,39,0.1)",
                  }}
                >
                  <div>
                    <h5
                      className="font-cinzel text-[10px] tracking-wider text-gotGold uppercase"
                      style={{ color: isWildfire ? "#00FF66" : "#C9A227" }}
                    >
                      Seat
                    </h5>
                    <p className="text-gotIvory font-medium text-sm">
                      {expandedHouse.seat}
                    </p>
                  </div>
                  <div>
                    <h5
                      className="font-cinzel text-[10px] tracking-wider text-gotGold uppercase"
                      style={{ color: isWildfire ? "#00FF66" : "#C9A227" }}
                    >
                      Weaponry
                    </h5>
                    <p className="text-gotIvory font-medium text-sm">
                      {expandedHouse.weapon}
                    </p>
                  </div>
                </div>

                {/* Progress bars for stats */}
                <div className="space-y-3">
                  <h5
                    className="font-cinzel text-[10px] tracking-wider text-gotGold uppercase"
                    style={{ color: isWildfire ? "#00FF66" : "#C9A227" }}
                  >
                    Attributes Ledger
                  </h5>

                  {/* Military Stat */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-cinzel">
                      <span className="text-gotIvory/60 flex items-center gap-1">
                        <GiCrossedSwords /> Military Power
                      </span>
                      <span className="text-gotIvory font-bold">
                        {expandedHouse.stats.military}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-black/60 relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${expandedHouse.stats.military}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gotGold"
                        style={{
                          backgroundColor: isWildfire ? "#00FF66" : "#C9A227",
                        }}
                      />
                    </div>
                  </div>

                  {/* Wealth Stat */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-cinzel">
                      <span className="text-gotIvory/60 flex items-center gap-1">
                        <GiChest /> Financial Wealth
                      </span>
                      <span className="text-gotIvory font-bold">
                        {expandedHouse.stats.wealth}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-black/60 relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${expandedHouse.stats.wealth}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gotGold"
                        style={{
                          backgroundColor: isWildfire ? "#00FF66" : "#C9A227",
                        }}
                      />
                    </div>
                  </div>

                  {/* Honor Stat */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-cinzel">
                      <span className="text-gotIvory/60 flex items-center gap-1">
                        <GiTrophy /> Chivalry & Honor
                      </span>
                      <span className="text-gotIvory font-bold">
                        {expandedHouse.stats.honor}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-black/60 relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${expandedHouse.stats.honor}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-gotGold"
                        style={{
                          backgroundColor: isWildfire ? "#00FF66" : "#C9A227",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h5
                    className="font-cinzel text-[10px] tracking-wider text-gotGold uppercase mb-2.5"
                    style={{ color: isWildfire ? "#00FF66" : "#C9A227" }}
                  >
                    History & Lore
                  </h5>
                  <p className="text-gotIvory/70 text-xs leading-relaxed max-h-28 overflow-y-auto pr-2 no-scrollbar">
                    {expandedHouse.history}
                  </p>
                </div>

                <button
                  onClick={() => setExpandedHouse(null)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-gotGold/15 hover:bg-gotGold text-gotGold hover:text-gotBackground tracking-widest font-cinzel text-xs uppercase border border-gotGold/45 transition-colors duration-500"
                  style={{
                    borderColor: isWildfire ? "#00FF66" : "#C9A227",
                    color: isWildfire ? "#00FF66" : "#C9A227",
                  }}
                >
                  Return to Chronicles
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
