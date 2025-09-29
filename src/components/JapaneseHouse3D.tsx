'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '@/contexts/LanguageContext';

// Componente de la casa japonesa
const JapaneseHouse = ({ position = [0, 0, 0] }: { position?: [number, number, number] }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { t } = useLanguage();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Base de la casa */}
      <mesh position={[0, -0.5, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <boxGeometry args={[4, 1, 3]} />
        <meshStandardMaterial color={hovered ? "#8B4513" : "#654321"} />
      </mesh>

      {/* Paredes principales */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3.8, 2, 2.8]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>

      {/* Techo tradicional japonés */}
      <mesh position={[0, 2.2, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[3, 1.5, 4]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>

      {/* Puerta principal */}
      <mesh position={[0, 0.2, 1.41]}>
        <boxGeometry args={[0.8, 1.6, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Ventanas */}
      <mesh position={[-1, 0.5, 1.41]}>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>
      <mesh position={[1, 0.5, 1.41]}>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>

      {/* Jardín zen */}
      <mesh position={[0, -0.4, -2]}>
        <cylinderGeometry args={[2, 2, 0.2, 8]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>

      {/* Piedras del jardín */}
      <mesh position={[-1.5, -0.3, -1.5]}>
        <sphereGeometry args={[0.3, 8, 6]} />
        <meshStandardMaterial color="#708090" />
      </mesh>
      <mesh position={[1.5, -0.3, -1.5]}>
        <sphereGeometry args={[0.4, 8, 6]} />
        <meshStandardMaterial color="#708090" />
      </mesh>

      {/* Árbol bonsai */}
      <mesh position={[0, 0.2, -1.5]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 1, -1.5]}>
        <sphereGeometry args={[0.8, 8, 6]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      {/* Lámparas tradicionales */}
      <mesh position={[-2, 0.8, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1.5, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[2, 0.8, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1.5, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>

      {/* Texto flotante */}
      <Text
        position={[0, 3, 0]}
        fontSize={0.5}
        color="#1A365D"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff2"
      >
        {t('japanese3d.traditionalJapaneseHouse')}
      </Text>
    </group>
  );
};

// Componente de información flotante
const InfoPanel = ({ position, title, description }: { position: [number, number, number], title: string, description: string }) => {
  return (
    <Html position={position} center>
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border max-w-xs">
        <h3 className="font-serif font-bold text-primary text-sm mb-2">{title}</h3>
        <p className="text-secondary text-xs">{description}</p>
      </div>
    </Html>
  );
};

// Componente principal del viewer 3D
const House3DViewer = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-muted to-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary font-medium">{t('japanese3d.loading3D')}</p>
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
      >
        {/* Iluminación */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />

        {/* Casa japonesa */}
        <JapaneseHouse />

        {/* Paneles de información */}
        <InfoPanel 
          position={[0, 2, 3]} 
          title={t('japanese3d.traditionalArchitecture')} 
          description={t('japanese3d.architectureDescription')}
        />
        
        <InfoPanel 
          position={[-3, 1, 0]} 
          title={t('japanese3d.zenGarden')} 
          description={t('japanese3d.zenGardenDescription')}
        />

        {/* Controles de órbita */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={15}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />

        {/* Ambiente */}
        <Environment preset="sunset" />
      </Canvas>

      {/* Controles de UI */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border">
        <h3 className="font-serif font-bold text-primary text-sm mb-2">{t('japanese3d.controls')}</h3>
        <div className="space-y-1 text-xs text-secondary">
          <p>🖱️ {t('japanese3d.clickDrag')}</p>
          <p>🔍 {t('japanese3d.scrollZoom')}</p>
          <p>🖱️ {t('japanese3d.rightClickPan')}</p>
        </div>
      </div>

      {/* Información de la propiedad */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border max-w-sm">
        <h3 className="font-serif font-bold text-primary text-sm mb-2">{t('japanese3d.traditionalKusatsu')}</h3>
        <div className="space-y-1 text-xs text-secondary">
          <p>📍 {t('japanese3d.location')}</p>
          <p>🏠 {t('japanese3d.area')}</p>
          <p>📅 {t('japanese3d.year')}</p>
          <p>💰 {t('japanese3d.price')}</p>
        </div>
      </div>

      {/* Botón de acción */}
      <div className="absolute bottom-4 right-4">
        <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors font-semibold text-sm shadow-lg">
          {t('japanese3d.viewDetails')}
        </button>
      </div>
    </div>
  );
};

export default House3DViewer;
