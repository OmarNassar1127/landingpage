"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  ContactShadows,
  Float,
  Text3D,
  Center,
  useHelper,
  Bounds,
  Sparkles
} from "@react-three/drei";
import * as THREE from "three";

// Simple building block for better stability
function Block({ position, size, color, delay = 0 }) {
  const meshRef = useRef();
  const [animated, setAnimated] = useState(false);
  
  // Initial position calculation
  const initialY = -10;
  const targetY = position[1];
  
  useEffect(() => {
    // Start animation after delay
    const timer = setTimeout(() => {
      setAnimated(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  useFrame(() => {
    if (meshRef.current && animated) {
      // Simple animation - move up from below
      if (meshRef.current.position.y < targetY) {
        meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
      }
      
      // Very subtle rotation
      meshRef.current.rotation.y += 0.003;
    }
  });
  
  return (
    <mesh
      ref={meshRef}
      position={[position[0], initialY, position[2]]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.4}
        metalness={0.2}
      />
    </mesh>
  );
}

// Building Construction Component
function BuildingConstruction() {
  // Base foundation
  const foundation = [
    { position: [0, 0, 0], size: [6, 0.5, 6], color: "#94a3b8" }
  ];
  
  // First floor blocks
  const firstFloor = [
    { position: [-2, 1, -2], size: [1.8, 1.5, 1.8], color: "#60a5fa", delay: 300 },
    { position: [-2, 1, 2], size: [1.8, 1.5, 1.8], color: "#818cf8", delay: 600 },
    { position: [2, 1, -2], size: [1.8, 1.5, 1.8], color: "#a78bfa", delay: 900 },
    { position: [2, 1, 2], size: [1.8, 1.5, 1.8], color: "#c084fc", delay: 1200 }
  ];
  
  // Second floor
  const secondFloor = [
    { position: [0, 2.5, 0], size: [4, 1, 4], color: "#a855f7", delay: 1500 }
  ];
  
  // Top floor
  const topFloor = [
    { position: [0, 4, 0], size: [3, 1, 3], color: "#7c3aed", delay: 1800 }
  ];
  
  // Roof
  const roof = [
    { position: [0, 5, 0], size: [3.5, 0.3, 3.5], color: "#6d28d9", delay: 2100 }
  ];
  
  // Antenna
  const antenna = [
    { position: [0, 6.5, 0], size: [0.2, 3, 0.2], color: "#f97316", delay: 2400 }
  ];
  
  // Combine all building parts
  const allBlocks = [
    ...foundation,
    ...firstFloor,
    ...secondFloor,
    ...topFloor,
    ...roof,
    ...antenna
  ];
  
  // Logo text reference
  const textRef = useRef();
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      const time = clock.getElapsedTime();
      // Gentle floating animation
      textRef.current.position.y = Math.sin(time * 0.8) * 0.2 + 7.5;
    }
  });
  
  return (
    <group position={[0, 0, 0]}>
      {/* All building blocks */}
      {allBlocks.map((block, i) => (
        <Block 
          key={i}
          position={block.position}
          size={block.size}
          color={block.color}
          delay={block.delay}
        />
      ))}
      
      {/* Floating company name */}
      <Float
        speed={2}
        rotationIntensity={0.2}
        floatIntensity={0.5}
        position={[0, 7.5, 0]}
      >
        <mesh ref={textRef}>
          <Center>
            <meshStandardMaterial 
              color="#7c3aed"
              emissive="#7c3aed"
              emissiveIntensity={0.5}
            />
          </Center>
        </mesh>
      </Float>
      
      {/* Particles effect */}
      <Sparkles
        count={50}
        scale={10}
        size={1}
        speed={0.3}
        position={[0, 3, 0]}
        color="#8b5cf6"
      />
      
      {/* Ground shadow */}
      <ContactShadows
        position={[0, -0.49, 0]}
        scale={20}
        blur={2}
        opacity={0.7}
        far={10}
        color="#000000"
      />
      
      {/* Scene lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize={1024}
      />
      <spotLight
        position={[-5, 8, -5]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#a78bfa"
        castShadow
      />
    </group>
  );
}

// Main component
export default function StableAnimation() {
  return (
    <div className="w-full max-w-4xl h-[450px] rounded-xl shadow-xl overflow-hidden mx-auto bg-gradient-to-b from-gray-900/5 to-gray-900/20 backdrop-blur-sm">
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-t-purple-500 border-purple-200 rounded-full animate-spin"></div>
            <p className="mt-4 text-sm text-gray-500">Loading 3D Experience...</p>
          </div>
        </div>
      }>
        <Canvas
          shadows
          camera={{ position: [10, 8, 10], fov: 40 }}
          dpr={[1, 2]}
          className="touch-none"
        >
          <color attach="background" args={['transparent']} />
          <BuildingConstruction />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.5}
            rotateSpeed={0.5}
          />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  );
}
