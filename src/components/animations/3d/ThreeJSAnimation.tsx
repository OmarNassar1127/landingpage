"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  OrbitControls, 
  Environment, 
  ContactShadows,
  Sparkles,
  Text,
  Center,
  useGLTF
} from "@react-three/drei";
import * as THREE from "three";

// Simplified building block component with more stable animation
function Block({ position, size, color, delay }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [finalPos] = useState(() => new THREE.Vector3(position[0], position[1], position[2]));
  const startPos = new THREE.Vector3(position[0], -5, position[2]);
  
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);
  
  useFrame(() => {
    if (!ref.current || !visible) return;
    
    // Smooth lerp animation to target position
    ref.current.position.lerp(finalPos, 0.05);
    
    // More subtle rotation
    ref.current.rotation.y += 0.001;
  });
  
  return (
    <mesh 
      ref={ref} 
      position={startPos}
      castShadow
      receiveShadow
    >
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={color} 
        metalness={0.2}
        roughness={0.3}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

// Modern Building Construction Animation
function BuildingConstruction() {
  // Define the blocks that will make up our building
  const foundation = [
    { position: [0, 0, 0], size: [8, 0.5, 8], color: "#94a3b8", delay: 0 }
  ];
  
  const firstFloor = [
    { position: [-3, 0.75, -3], size: [1, 1, 1], color: "#60a5fa", delay: 500 },
    { position: [-3, 0.75, -1], size: [1, 1, 1], color: "#60a5fa", delay: 700 },
    { position: [-3, 0.75, 1], size: [1, 1, 1], color: "#60a5fa", delay: 900 },
    { position: [-3, 0.75, 3], size: [1, 1, 1], color: "#60a5fa", delay: 1100 },
    
    { position: [-1, 0.75, -3], size: [1, 1, 1], color: "#818cf8", delay: 1300 },
    { position: [-1, 0.75, 3], size: [1, 1, 1], color: "#818cf8", delay: 1500 },
    
    { position: [1, 0.75, -3], size: [1, 1, 1], color: "#a78bfa", delay: 1700 },
    { position: [1, 0.75, 3], size: [1, 1, 1], color: "#a78bfa", delay: 1900 },
    
    { position: [3, 0.75, -3], size: [1, 1, 1], color: "#c084fc", delay: 2100 },
    { position: [3, 0.75, -1], size: [1, 1, 1], color: "#c084fc", delay: 2300 },
    { position: [3, 0.75, 1], size: [1, 1, 1], color: "#c084fc", delay: 2500 },
    { position: [3, 0.75, 3], size: [1, 1, 1], color: "#c084fc", delay: 2700 },
  ];
  
  const secondFloor = [
    { position: [-2.5, 2, -2.5], size: [2, 1, 2], color: "#38bdf8", delay: 3000 },
    { position: [-2.5, 2, 2.5], size: [2, 1, 2], color: "#38bdf8", delay: 3200 },
    { position: [2.5, 2, -2.5], size: [2, 1, 2], color: "#38bdf8", delay: 3400 },
    { position: [2.5, 2, 2.5], size: [2, 1, 2], color: "#38bdf8", delay: 3600 },
  ];
  
  const thirdFloor = [
    { position: [0, 3.5, 0], size: [4, 2, 4], color: "#a855f7", delay: 4000 }
  ];
  
  const roof = [
    { position: [0, 5.5, 0], size: [5, 0.5, 5], color: "#7c3aed", delay: 4500 }
  ];
  
  const antenna = [
    { position: [0, 7, 0], size: [0.2, 2.5, 0.2], color: "#f97316", delay: 5000 }
  ];
  
  // All building blocks
  const allBlocks = [...foundation, ...firstFloor, ...secondFloor, ...thirdFloor, ...roof, ...antenna];
  
  // Floating NexBuy text
  const textRef = useRef();
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      const t = clock.getElapsedTime();
      textRef.current.position.y = Math.sin(t / 2) * 0.2 + 7.5;
    }
  });
  
  return (
    <group position={[0, -1, 0]}>
      {/* Building blocks */}
      {allBlocks.map((block, index) => (
        <Block 
          key={index} 
          position={block.position} 
          size={block.size} 
          color={block.color} 
          delay={block.delay}
        />
      ))}
      
      {/* Floating text */}
      <group ref={textRef} position={[0, 7.5, 0]}>
        <Center>
          <Text
            font="/fonts/Inter-Bold.woff"
            fontSize={1.2}
            color="#7c3aed"
            anchorX="center"
            anchorY="middle"
          >
            NexBuy
          </Text>
        </Center>
      </group>
      
      {/* Particle effects */}
      <Sparkles 
        count={100}
        scale={12}
        size={1.5}
        speed={0.2}
        opacity={0.7}
        color="#ffffff"
        position={[0, 3, 0]}
      />
      
      {/* Ground shadow */}
      <ContactShadows 
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -0.3, 0]}
        opacity={0.6}
        width={20}
        height={20}
        blur={2}
        far={4}
        color="#000000"
      />
    </group>
  );
}

// Camera and scene setup
function Scene() {
  // Set up camera with better positioning
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(8, 6, 10);
    camera.lookAt(0, 2, 0);
  }, [camera]);
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 15, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1} 
        castShadow 
        shadow-mapSize={2048} 
      />
      <directionalLight 
        position={[-10, 10, -5]} 
        intensity={0.5} 
        color="#8b5cf6"
      />
      
      <BuildingConstruction />
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />
      
      <Environment preset="city" />
    </>
  );
}

// Loading fallback
function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin mb-4"></div>
        <p className="text-sm text-gray-600 animate-pulse">Loading 3D Experience...</p>
      </div>
    </div>
  );
}

export default function ThreeJSAnimation() {
  // Use woff font instead of JSON for better compatibility
  useEffect(() => {
    // Preload font to avoid FOIT (Flash of Invisible Text)
    const font = new FontFace('Inter-Bold', 'url(/fonts/Inter-Bold.woff)');
    font.load().then(() => {
      document.fonts.add(font);
    }).catch(err => {
      console.error('Font loading error:', err);
    });
  }, []);
  
  return (
    <div className="w-full max-w-4xl h-[500px] rounded-xl shadow-xl overflow-hidden mx-auto bg-gradient-to-b from-gray-900/10 to-gray-900/30 backdrop-blur-sm">
      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          dpr={[1, 2]} // Responsive pixel ratio
          camera={{ position: [0, 0, 15], fov: 40 }}
          className="touch-none"
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
