'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const TestModel = () => {
  const { scene } = useGLTF('/models/custom/japanese-house.glb');
  
  return <primitive object={scene} />;
};

const ModelTest: React.FC = () => {
  return (
    <div className="w-full h-96 bg-gray-100 rounded-lg">
      <Canvas camera={{ position: [5, 5, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <TestModel />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelTest;
