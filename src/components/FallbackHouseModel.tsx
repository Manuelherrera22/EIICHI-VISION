'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FallbackHouseModel = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base/Fundación */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 1, 3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Paredes principales */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 2, 3]} />
        <meshStandardMaterial color="#F5DEB3" />
      </mesh>

      {/* Techo */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <coneGeometry args={[3, 1.5, 4]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>

      {/* Puerta */}
      <mesh position={[0, 0, 1.6]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 1.5, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Ventanas */}
      <mesh position={[-1.2, 0.5, 1.6]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>
      
      <mesh position={[1.2, 0.5, 1.6]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>

      {/* Chimenea */}
      <mesh position={[1.5, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 1, 0.4]} />
        <meshStandardMaterial color="#696969" />
      </mesh>

      {/* Partículas flotantes */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 8,
            Math.random() * 4 + 1,
            (Math.random() - 0.5) * 6
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="gold" transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
};

export default FallbackHouseModel;
