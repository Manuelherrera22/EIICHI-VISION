'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';

// Componente de casa japonesa detallada
const JapaneseHouse = () => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.05 : 1);
    }
  });

  return (
    <group ref={meshRef}>
      {/* Base/Fundación */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[4.2, 0.4, 3.2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Paredes principales */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[4, 2.4, 3]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>

      {/* Techo principal */}
      <mesh position={[0, 2.6, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[3.2, 1.8, 4]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>

      {/* Techo secundario */}
      <mesh position={[0, 3.2, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.8, 1.2, 4]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>

      {/* Puerta principal */}
      <mesh 
        position={[0, 0.1, 1.51]} 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.9, 1.8, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Ventanas */}
      <mesh position={[-1.2, 0.8, 1.51]}>
        <boxGeometry args={[0.7, 0.9, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
      </mesh>
      <mesh position={[1.2, 0.8, 1.51]}>
        <boxGeometry args={[0.7, 0.9, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
      </mesh>

      {/* Ventana trasera */}
      <mesh position={[0, 0.8, -1.51]}>
        <boxGeometry args={[1.2, 0.9, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
      </mesh>

      {/* Jardín zen */}
      <mesh position={[0, -0.6, -2.5]}>
        <cylinderGeometry args={[2.5, 2.5, 0.3, 16]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>

      {/* Árbol bonsai */}
      <mesh position={[0, 0.3, -1.8]}>
        <cylinderGeometry args={[0.15, 0.15, 1.2, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 1.2, -1.8]}>
        <sphereGeometry args={[1, 12, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      {/* Piedras del jardín */}
      <mesh position={[-0.8, -0.4, -2.2]}>
        <sphereGeometry args={[0.3, 8, 6]} />
        <meshStandardMaterial color="#708090" />
      </mesh>
      <mesh position={[0.8, -0.4, -2.2]}>
        <sphereGeometry args={[0.25, 8, 6]} />
        <meshStandardMaterial color="#708090" />
      </mesh>

      {/* Lámpara de piedra */}
      <mesh position={[1.5, -0.2, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 1.5, 8]} />
        <meshStandardMaterial color="#696969" />
      </mesh>
      <mesh position={[1.5, 0.8, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.6]} />
        <meshStandardMaterial color="#696969" />
      </mesh>

      {/* Texto flotante */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.6}
        color="#1A365D"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-var.woff2"
      >
        Casa Tradicional Japonesa
      </Text>
    </group>
  );
};

// Componente de controles de UI
const ControlsUI = () => {
  const { camera } = useThree();
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  const resetCamera = () => {
    camera.position.set(8, 5, 8);
    camera.lookAt(0, 0, 0);
  };

  return (
    <Html position={[0, 0, 0]} center>
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border">
        <h3 className="font-serif font-bold text-primary text-sm mb-2">Controles 3D</h3>
        <div className="space-y-1 text-xs text-secondary">
          <p>🖱️ Click + arrastrar: Rotar</p>
          <p>🔍 Scroll: Zoom</p>
          <p>🖱️ Click derecho: Pan</p>
          <button 
            onClick={resetCamera}
            className="mt-2 px-2 py-1 bg-primary text-white text-xs rounded hover:bg-primary/90"
          >
            Reset Vista
          </button>
        </div>
      </div>
    </Html>
  );
};

const Real3DViewer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-muted to-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary font-medium">Cargando experiencia 3D...</p>
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
            <h3 className="text-lg font-serif font-bold text-primary mb-2">Error al cargar 3D</h3>
            <p className="text-secondary">No se pudo cargar la experiencia 3D</p>
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
        onError={() => setHasError(true)}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Iluminación realista */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* Ambiente */}
        <Environment preset="sunset" />

        {/* Casa japonesa */}
        <Suspense fallback={null}>
          <JapaneseHouse />
        </Suspense>

        {/* Controles de órbita */}
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
        <ControlsUI />
      </Canvas>

      {/* Información de la propiedad */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border max-w-sm">
        <h3 className="font-serif font-bold text-primary text-sm mb-2">Casa Tradicional Kusatsu</h3>
        <div className="space-y-1 text-xs text-secondary">
          <p>📍 Ubicación: Kusatsu, Gunma</p>
          <p>🏠 Área: 120 m²</p>
          <p>📅 Año: 1925</p>
          <p>💰 Precio: ¥8,500,000</p>
          <p>🎌 Estilo: Minka tradicional</p>
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

export default Real3DViewer;
