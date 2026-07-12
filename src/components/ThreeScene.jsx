import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Procedurally generated stylized Sword mesh
function Sword({ position, rotation, scale = [1, 1, 1], isWildfire }) {
  const meshRef = useRef();

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Blade */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.08, 1.8, 0.015]} />
        <meshStandardMaterial
          color={isWildfire ? "#102515" : "#1a1a1a"}
          metalness={0.95}
          roughness={0.4}
        />
      </mesh>
      {/* Guard */}
      <mesh position={[0, -0.7, 0]} castShadow>
        <boxGeometry args={[0.3, 0.05, 0.05]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.6} />
      </mesh>
      {/* Pommel */}
      <mesh position={[0, -0.95, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#080808" metalness={0.9} roughness={0.7} />
      </mesh>
    </group>
  );
}

// Castle pillar column to create parallax depth
function Column({ position }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <cylinderGeometry args={[0.3, 0.35, 6, 8]} />
      <meshStandardMaterial color="#0b0b0b" roughness={0.95} metalness={0.1} />
    </mesh>
  );
}

// Procedural Iron Throne structure
function StylizedThrone({ isWildfire }) {
  const groupRef = useRef();

  const backrestSwords = useMemo(() => {
    const swords = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const angle = (i / (count - 1) - 0.5) * Math.PI * 0.75;
      const radius = 1.35;
      const x = Math.sin(angle) * radius;
      const y = Math.cos(angle) * (radius * 0.4) + 0.65;
      const z = -Math.cos(angle) * 0.3;
      
      const rotZ = -angle * 0.85;
      const rotY = angle * 0.2;
      const rotX = 0.2 + Math.random() * 0.1;
      const length = 0.95 + Math.random() * 0.4;

      swords.push({
        position: [x, y, z],
        rotation: [rotX, rotY, rotZ],
        scale: [1, length, 1],
        id: `back-${i}`
      });
    }
    return swords;
  }, []);

  const seatSwords = useMemo(() => {
    const swords = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      const angle = (i / (count - 1) - 0.5) * Math.PI * 0.95;
      const radius = 0.85;
      const x = Math.sin(angle) * radius;
      const y = -0.3 + Math.random() * 0.15;
      const z = Math.cos(angle) * radius - 0.2;

      const rotX = 1.1 + Math.random() * 0.2;
      const rotY = angle * 0.6;
      const rotZ = -angle * 0.4;
      const length = 0.6 + Math.random() * 0.35;

      swords.push({
        position: [x, y, z],
        rotation: [rotX, rotY, rotZ],
        scale: [0.85, length, 0.85],
        id: `seat-${i}`
      });
    }
    return swords;
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Stone Pedestal */}
      <mesh position={[0, -0.9, 0.2]} receiveShadow castShadow>
        <cylinderGeometry args={[1.6, 1.8, 0.4, 6]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.98} metalness={0.05} />
      </mesh>
      
      {/* Seat Block */}
      <mesh position={[0, -0.3, 0.1]} receiveShadow castShadow>
        <boxGeometry args={[1.05, 0.6, 0.95]} />
        <meshStandardMaterial color="#121212" roughness={0.92} metalness={0.2} />
      </mesh>

      {backrestSwords.map((s) => (
        <Sword key={s.id} position={s.position} rotation={s.rotation} scale={s.scale} isWildfire={isWildfire} />
      ))}

      {seatSwords.map((s) => (
        <Sword key={s.id} position={s.position} rotation={s.rotation} scale={s.scale} isWildfire={isWildfire} />
      ))}
    </group>
  );
}

// Snow Effect
function SnowEffect({ count = 350 }) {
  const pointsRef = useRef();
  
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = Math.random() * 10 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      sp[i] = 0.008 + Math.random() * 0.018;
    }
    return [pos, sp];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const array = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      array[idx + 1] -= speeds[i];
      array[idx] += Math.sin(state.clock.getElapsedTime() * 0.5 + i) * 0.002;

      if (array[idx + 1] < -4) {
        array[idx + 1] = 7;
        array[idx] = (Math.random() - 0.5) * 15;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.045}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  );
}

// Embers System
function EmbersEffect({ count = 120, isWildfire }) {
  const pointsRef = useRef();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = -3 + Math.random() * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = 0.012 + Math.random() * 0.022;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    return [pos, vel];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const array = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      array[idx] += velocities[idx];
      array[idx + 1] += velocities[idx + 1];
      array[idx + 2] += velocities[idx + 2];

      if (array[idx + 1] > 5) {
        array[idx + 1] = -3;
        array[idx] = (Math.random() - 0.5) * 6;
        array[idx + 2] = (Math.random() - 0.5) * 6;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color={isWildfire ? "#00ff66" : "#ffa500"}
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Background Moon
function Moon({ isWildfire }) {
  return (
    <mesh position={[0, 1.3, -6.5]}>
      <sphereGeometry args={[2.4, 32, 32]} />
      <meshBasicMaterial
        color={isWildfire ? "#ddffea" : "#ffeedd"}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// Flying Dragon silhouette
function Dragon({ speed = 0.12, offset = 0, scale = 0.15 }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + offset;
    
    const x = Math.sin(t) * 6.5;
    const z = -4.5 + Math.cos(t) * 2.8;
    const y = 1.4 + Math.sin(t * 1.8) * 0.35;

    ref.current.position.set(x, y, z);

    const dx = Math.cos(t) * 6.5 * speed;
    const dz = -Math.sin(t) * 2.8 * speed;
    const angle = Math.atan2(dx, dz);
    ref.current.rotation.y = angle + Math.PI;
    
    const wingLeft = ref.current.getObjectByName('wingL');
    const wingRight = ref.current.getObjectByName('wingR');
    if (wingLeft && wingRight) {
      const flap = Math.sin(t * 9) * 0.45;
      wingLeft.rotation.z = flap;
      wingRight.rotation.z = -flap;
    }
  });

  return (
    <group ref={ref} scale={[scale, scale, scale]}>
      {/* Body */}
      <mesh><boxGeometry args={[0.3, 0.15, 1.8]} /><meshBasicMaterial color="#050505" /></mesh>
      {/* Left Wing */}
      <group name="wingL" position={[-0.15, 0, 0]}>
        <mesh position={[-0.7, 0, 0]}><boxGeometry args={[1.4, 0.04, 0.7]} /><meshBasicMaterial color="#050505" /></mesh>
      </group>
      {/* Right Wing */}
      <group name="wingR" position={[0.15, 0, 0]}>
        <mesh position={[0.7, 0, 0]}><boxGeometry args={[1.4, 0.04, 0.7]} /><meshBasicMaterial color="#050505" /></mesh>
      </group>
      {/* Head */}
      <mesh position={[0, 0.1, 1.0]}><boxGeometry args={[0.25, 0.2, 0.45]} /><meshBasicMaterial color="#050505" /></mesh>
    </group>
  );
}

// 3D Flying Ravens (smaller black meshes)
function Raven({ speed = 0.08, offset = 10 }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + offset;
    
    // Ravens orbit higher/closer
    const x = Math.sin(t * 1.5) * 4.0;
    const z = -3.5 + Math.cos(t * 1.2) * 2.0;
    const y = 2.0 + Math.sin(t * 3.0) * 0.2;

    ref.current.position.set(x, y, z);
    
    const wingL = ref.current.getObjectByName('wingL');
    const wingR = ref.current.getObjectByName('wingR');
    if (wingL && wingR) {
      wingL.rotation.z = Math.sin(t * 22) * 0.6;
      wingR.rotation.z = -Math.sin(t * 22) * 0.6;
    }
  });

  return (
    <group ref={ref} scale={[0.04, 0.04, 0.04]}>
      <mesh><boxGeometry args={[0.2, 0.1, 0.6]} /><meshBasicMaterial color="#000000" /></mesh>
      <group name="wingL" position={[-0.1, 0, 0]}>
        <mesh position={[-0.3, 0, 0]}><boxGeometry args={[0.6, 0.02, 0.25]} /><meshBasicMaterial color="#000000" /></mesh>
      </group>
      <group name="wingR" position={[0.1, 0, 0]}>
        <mesh position={[0.3, 0, 0]}><boxGeometry args={[0.6, 0.02, 0.25]} /><meshBasicMaterial color="#000000" /></mesh>
      </group>
    </group>
  );
}

// Orbiting Camera Controller (AAA menu pan effect)
function SceneController() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.06; // Slow continuous panning
    
    // Slow circular sweep orbit coordinates
    const radius = 4.3;
    const targetX = Math.sin(t) * radius + state.pointer.x * 0.6;
    const targetZ = Math.cos(t) * radius + state.pointer.x * 0.2;
    const targetY = 0.5 + Math.sin(t * 1.5) * 0.08 + state.pointer.y * 0.25;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.025);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.025);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.025);
    
    camera.lookAt(0, 0.45, 0);
  });

  return null;
}

export default function ThreeScene({ isWildfire }) {
  // Theme colors dynamically adjusted
  const theme = useMemo(() => {
    return {
      background: isWildfire ? '#08140B' : '#0B0B0B',
      spotColor: isWildfire ? '#00FF66' : '#C9A227',
      pointColor: isWildfire ? '#00A644' : '#7A0E18',
      ambientColor: isWildfire ? '#0f2414' : '#333333'
    };
  }, [isWildfire]);

  return (
    <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
      <Canvas
        shadows
        camera={{ position: [0, 0.5, 4.3], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={[theme.background]} />
        
        {/* Dynamic fog tint */}
        <fog attach="fog" args={[theme.background, 3.2, 10]} />
        
        {/* Volumetric ambient and spots */}
        <ambientLight intensity={0.25} color={theme.ambientColor} />
        
        {/* Main Throne key light */}
        <spotLight
          position={[2.0, 4.5, 3.2]}
          angle={0.42}
          penumbra={0.9}
          intensity={14.0}
          color={theme.spotColor}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Backlight / Moon light */}
        <directionalLight
          position={[-1.5, 2.5, -6]}
          intensity={6.0}
          color={isWildfire ? "#00FF66" : "#ffeedd"}
          castShadow
        />

        {/* Rim Fire/Wildfire glow from bottom */}
        <pointLight
          position={[0, -0.9, 1.4]}
          intensity={3.5}
          distance={4.5}
          color={theme.pointColor}
        />

        {/* Moon */}
        <Moon isWildfire={isWildfire} />

        {/* Environment Castle Columns */}
        <Column position={[-2.3, 1.2, -2]} />
        <Column position={[2.3, 1.2, -2]} />
        <Column position={[-2.6, 1.2, -4]} />
        <Column position={[2.6, 1.2, -4]} />

        {/* Dragons flying */}
        <Dragon speed={0.11} offset={0} scale={0.15} />
        <Dragon speed={0.14} offset={45} scale={0.11} />

        {/* Ravens flying */}
        <Raven speed={0.07} offset={12} />
        <Raven speed={0.09} offset={30} />

        {/* Stylized Throne */}
        <StylizedThrone isWildfire={isWildfire} />

        {/* Ambient VFX particles */}
        <SnowEffect count={450} />
        <EmbersEffect count={125} isWildfire={isWildfire} />

        {/* Orbit Controller */}
        <SceneController />
      </Canvas>
    </div>
  );
}
