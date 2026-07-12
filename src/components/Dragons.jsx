import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// --- Fire Breath Particle System ---
function FireBreath({ active, color = "#ff4400", position = [0, 0, 0] }) {
  const ref = useRef();
  const count = 120;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 2] = Math.random() * 2;
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = 0.03 + Math.random() * 0.04;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!ref.current || !active) return;
    const arr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      if (arr[i * 3 + 2] > 3.5) {
        arr[i * 3 + 2] = 0;
        arr[i * 3] = (Math.random() - 0.5) * 0.3;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <group position={position}>
      <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color={color}
          size={0.1}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

// --- Per-Dragon Scene ---
function DragonScene({ dragon, fireActive }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["transparent"]} />
      <fog attach="fog" args={["#0B0B0B", 6, 14]} />
      <ambientLight intensity={0.3} color="#333" />
      <spotLight
        position={[3, 4, 4]}
        intensity={12}
        color={dragon.lightColor}
        penumbra={0.7}
        castShadow
      />
      <pointLight
        position={[-2, 2, 2]}
        intensity={4}
        color={dragon.accentLight}
      />

      <DragonModel
        position={dragon.position}
        color={dragon.color}
        eyeColor={dragon.eyeColor}
        scale={dragon.scale}
        phaseOffset={dragon.phase}
        fireActive={fireActive}
      />
      <FireBreath
        active={fireActive}
        color={dragon.fireColor}
        position={[
          dragon.position[0],
          dragon.position[1] + 0.24,
          dragon.position[2] + 1.7,
        ]}
      />
    </Canvas>
  );
}

// Dragon data
const dragons = [
  {
    id: "drogon",
    name: "Drogon",
    title: "The Black Terror",
    description:
      "The largest and most powerful of Daenerys's dragons. Named after Khal Drogo, Drogon is a creature of devastating fire and shadow—the shadow of death itself.",
    color: "#1a0a05",
    eyeColor: "#ff2200",
    lightColor: "#ff4400",
    accentLight: "#7A0E18",
    fireColor: "#ff6600",
    gif: "/assets/drogon.gif",
    gifTranslateY: 0,
    gifScale: 1.0,
    position: [0, 0, 0],
    scale: 0.95,
    phase: 0,
  },
  {
    id: "rhaegal",
    name: "Rhaegal",
    title: "The Green Stalker",
    description:
      "Named for Rhaegar Targaryen, Rhaegal embodies the legacy of the Conquerors. His jade scales and golden eyes echo the old glory of Old Valyria reborn in dragonflame.",
    color: "#0a1f0a",
    eyeColor: "#aaff00",
    lightColor: "#44ff44",
    accentLight: "#1a5c24",
    fireColor: "#8bff3b",
    gif: "/assets/rheagal.gif",
    gifTranslateY: 0,
    gifScale: 1.05,
    position: [0, 0, 0],
    scale: 0.9,
    phase: 3.14,
  },
  {
    id: "viserion",
    name: "Viserion",
    title: "The White Death",
    description:
      "Once cream-and-gold, Viserion was slain and resurrected by the Night King. He now breathes blue-white flames cold enough to shatter The Wall itself.",
    color: "#f0f0e8",
    eyeColor: "#44aaff",
    lightColor: "#44aaff",
    accentLight: "#1a3a5c",
    fireColor: "#60d7ff",
    gif: "/assets/viserion.gif",
    gifTranslateY: 0,
    gifScale: 1.0,
    position: [0, 0, 0],
    scale: 0.88,
    phase: 6.28,
  },
];

export default function Dragons({ isWildfire }) {
  const sectionRef = useRef(null);
  const card0Ref = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const [hoveredDragonId, setHoveredDragonId] = useState(null);

  const accentColor = isWildfire ? "#00FF66" : "#C9A227";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card 0: fly in from left
      gsap.fromTo(
        card0Ref.current,
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card0Ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
      // Card 1: fly in from bottom
      gsap.fromTo(
        card1Ref.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: card1Ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
      // Card 2: fly in from right
      gsap.fromTo(
        card2Ref.current,
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.4,
          scrollTrigger: {
            trigger: card2Ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cardRefs = [card0Ref, card1Ref, card2Ref];

  return (
    <section
      ref={sectionRef}
      id="dragons"
      className="relative w-full min-h-screen py-24 bg-gotBackground border-b border-gotGold/10 overflow-hidden"
      style={{
        borderColor: isWildfire
          ? "rgba(0,255,102,0.1)"
          : "rgba(201,162,39,0.1)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full filter blur-[180px] pointer-events-none"
        style={{
          backgroundColor: isWildfire
            ? "rgba(0,255,102,0.04)"
            : "rgba(122,14,24,0.06)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Title */}
        <div className="text-center mb-20 select-none">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-cinzel text-xs uppercase tracking-[0.3em] block mb-3"
            style={{ color: accentColor }}
          >
            Dragons of Valyria
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-cinzelDeco font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-widest text-gotIvory uppercase"
          >
            DRAGON SHOWCASE
          </motion.h3>
          <div
            className="w-24 h-[1px] mx-auto mt-6 relative"
            style={{
              backgroundColor: isWildfire
                ? "rgba(0,255,102,0.4)"
                : "rgba(201,162,39,0.4)",
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45"
              style={{ backgroundColor: accentColor }}
            />
          </div>
          <p className="text-gotIvory/50 text-sm font-cinzel max-w-xl mx-auto mt-6 leading-relaxed">
            Three dragons. Three destinies. Fire is the only answer to iron.
          </p>
        </div>

        {/* Dragon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dragons.map((dragon, idx) => (
            <div
              key={dragon.id}
              ref={cardRefs[idx]}
              tabIndex={0}
              onMouseEnter={() => setHoveredDragonId(dragon.id)}
              onMouseLeave={() => setHoveredDragonId(null)}
              onFocus={() => setHoveredDragonId(dragon.id)}
              onBlur={() => setHoveredDragonId(null)}
              className="group relative h-[520px] flex flex-col overflow-hidden rpg-frame cursor-pointer"
              style={{
                borderColor: isWildfire
                  ? "rgba(0,255,102,0.2)"
                  : "rgba(201,162,39,0.2)",
              }}
            >
              {/* 3D Dragon Canvas */}
              <div className="absolute inset-0 z-0">
                {/* Priority: GIF -> Procedural with fire effect */}
                {dragon.gif ? (
                  <>
                    {/* Full-card GIF background (cover) so it fills both width and height, centered */}
                    {/* persistent background fallback in case <img> is removed */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        zIndex: 0,
                        backgroundImage: `url(${dragon.gif})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        transform: `translateY(${dragon.gifTranslateY || 0}px) scale(${dragon.gifScale || 1})`,
                      }}
                    />
                    <img
                      src={dragon.gif}
                      alt={`${dragon.name} animation`}
                      loading="eager"
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        zIndex: 10,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        transform: `translateY(${dragon.gifTranslateY || 0}px) scale(${dragon.gifScale || 1})`,
                      }}
                      onLoad={() => console.debug("GIF loaded", dragon.gif)}
                      onError={(e) =>
                        console.warn("GIF failed to load", dragon.gif, e)
                      }
                    />
                    {/* Fire canvas above background but below overlays */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{ zIndex: 6 }}
                    >
                      <Canvas
                        camera={{ position: [0, 0, 5], fov: 50 }}
                        gl={{ antialias: true, alpha: true }}
                      >
                        <color attach="background" args={["transparent"]} />
                        <FireBreath
                          active={hoveredDragonId === dragon.id}
                          color={dragon.fireColor}
                          position={[0, 0.24, 0]}
                        />
                      </Canvas>
                    </div>
                  </>
                ) : (
                  <DragonScene
                    dragon={dragon}
                    fireActive={hoveredDragonId === dragon.id}
                  />
                )}
              </div>

              {/* Smoke / Fog Layer */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gotBackground to-transparent" />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(ellipse at center 60%, ${dragon.eyeColor}22, transparent)`,
                  }}
                />
              </div>

              {/* Eye glow sheen line (sword slash reveal) */}
              <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                <div className="absolute -left-[100%] top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out" />
              </div>

              {/* Dragon Info Overlay */}
              <div className="absolute inset-x-0 bottom-0 z-30 p-8 bg-gradient-to-t from-black/95 via-black/70 to-transparent translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <span
                  className="text-[9px] font-cinzel tracking-widest block mb-1"
                  style={{ color: dragon.eyeColor }}
                >
                  House Targaryen · Dragonkin
                </span>
                <h4 className="font-cinzelDeco font-bold text-2xl tracking-wider text-gotIvory mb-1">
                  {dragon.name}
                </h4>
                <p
                  className="font-cinzel text-[10px] uppercase tracking-widest italic mb-3"
                  style={{ color: accentColor }}
                >
                  {dragon.title}
                </p>
                <p className="text-gotIvory/65 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {dragon.description}
                </p>
              </div>

              {/* Default label */}
              <div className="absolute top-6 left-6 z-30 select-none">
                <span
                  className="text-[9px] font-cinzel tracking-[0.3em] uppercase block mb-0.5"
                  style={{ color: accentColor }}
                >
                  Dragon
                </span>
                <h5 className="font-cinzelDeco font-bold text-lg text-gotIvory">
                  {dragon.name}
                </h5>
              </div>

              {/* Corner frames */}
              {[
                "top-3 left-3 border-t border-l",
                "top-3 right-3 border-t border-r",
                "bottom-3 left-3 border-b border-l",
                "bottom-3 right-3 border-b border-r",
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-4 h-4 pointer-events-none ${cls}`}
                  style={{
                    borderColor: isWildfire
                      ? "rgba(0,255,102,0.4)"
                      : "rgba(201,162,39,0.4)",
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Dragon lore footer strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 glass-panel p-6 border text-center"
          style={{
            borderColor: isWildfire
              ? "rgba(0,255,102,0.15)"
              : "rgba(201,162,39,0.15)",
          }}
        >
          <p className="font-cinzel text-gotIvory/60 text-xs sm:text-sm tracking-wider italic max-w-2xl mx-auto">
            "A dragon is not a slave." — Daenerys Targaryen,{" "}
            <span style={{ color: accentColor }}>Mother of Dragons</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
