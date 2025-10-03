'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import * as THREE from 'three';

// Componente para cargar modelos GLTF/GLB
const GLTFModel = ({ url }: { url: string }) => {
  const gltf = useLoader(GLTFLoader, url);
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <primitive 
      object={gltf.scene} 
      ref={meshRef}
      scale={[1, 1, 1]}
      position={[0, 0, 0]}
    />
  );
};

// Componente para cargar modelos FBX
const FBXModel = ({ url }: { url: string }) => {
  const fbx = useLoader(FBXLoader, url);
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <primitive 
      object={fbx} 
      ref={meshRef}
      scale={[1, 1, 1]}
      position={[0, 0, 0]}
    />
  );
};

// Componente para cargar modelos OBJ
const OBJModel = ({ url }: { url: string }) => {
  const obj = useLoader(OBJLoader, url);
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <primitive 
      object={obj} 
      ref={meshRef}
      scale={[1, 1, 1]}
      position={[0, 0, 0]}
    />
  );
};

// Componente principal del cargador de modelos
const ModelLoader = ({ 
  modelUrl, 
  modelType = 'gltf' 
}: { 
  modelUrl: string; 
  modelType?: 'gltf' | 'fbx' | 'obj' 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');
  }, [modelUrl, modelType]);

  const renderModel = () => {
    switch (modelType) {
      case 'gltf':
        return <GLTFModel url={modelUrl} />;
      case 'fbx':
        return <FBXModel url={modelUrl} />;
      case 'obj':
        return <OBJModel url={modelUrl} />;
      default:
        return <GLTFModel url={modelUrl} />;
    }
  };

  if (isLoading) {
    return (
      <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-muted to-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary font-medium">Cargando modelo 3D...</p>
            <p className="text-xs text-secondary mt-2">Formato: {modelType.toUpperCase()}</p>
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-muted to-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-primary mb-2">Error al cargar modelo</h3>
            <p className="text-secondary mb-2">{errorMessage}</p>
            <p className="text-xs text-secondary">Formato: {modelType.toUpperCase()}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-muted to-white rounded-2xl overflow-hidden shadow-2xl">
      <Canvas
        camera={{ position: [8, 5, 8], fov: 50 }}
        style={{ background: 'linear-gradient(135deg, #f7fafc 0%, #ffffff 100%)' }}
        onError={(error) => {
          setHasError(true);
          setErrorMessage('Error al cargar el modelo 3D');
        }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Iluminación */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Ambiente */}
        <Environment preset="sunset" />

        {/* Modelo 3D */}
        <Suspense fallback={null}>
          {renderModel()}
        </Suspense>

        {/* Controles */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
          autoRotate={true}
          autoRotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.05}
        />

        {/* UI de controles */}
        <Html position={[0, 0, 0]} center>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border">
            <h3 className="font-serif font-bold text-primary text-sm mb-2">Controles 3D</h3>
            <div className="space-y-1 text-xs text-secondary">
              <p>🖱️ Click + arrastrar: Rotar</p>
              <p>🔍 Scroll: Zoom</p>
              <p>🖱️ Click derecho: Pan</p>
              <p>📁 Formato: {modelType.toUpperCase()}</p>
            </div>
          </div>
        </Html>
      </Canvas>

      {/* Información del modelo */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border max-w-sm">
        <h3 className="font-serif font-bold text-primary text-sm mb-2">Modelo 3D Cargado</h3>
        <div className="space-y-1 text-xs text-secondary">
          <p>📁 Formato: {modelType.toUpperCase()}</p>
          <p>🔗 URL: {modelUrl.split('/').pop()}</p>
          <p>🎌 Tipo: Casa Japonesa</p>
          <p>⚡ Tecnología: Three.js</p>
        </div>
      </div>

      {/* Botón de acción */}
      <div className="absolute bottom-4 right-4">
        <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors font-semibold text-sm shadow-lg">
          Ver Detalles
        </button>
      </div>

      {/* Indicador de tecnología */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-border">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-secondary font-mono">Three.js</span>
        </div>
      </div>
    </div>
  );
};

export default ModelLoader;
