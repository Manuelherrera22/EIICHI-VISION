'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Environment, Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Play, Pause, RotateCcw, Maximize, Minimize, Home, Eye, EyeOff } from 'lucide-react';

// Componente de casa japonesa más detallada
const DetailedJapaneseHouse = ({ 
  position = [0, 0, 0], 
  onRoomClick 
}: { 
  position?: [number, number, number];
  onRoomClick?: (room: string) => void;
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotación suave automática
      meshRef.current.rotation.y += 0.005;
    }
  });

  const handleRoomClick = (room: string) => {
    setSelectedRoom(room);
    onRoomClick?.(room);
  };

  return (
    <group ref={meshRef} position={position}>
      {/* Base y cimientos */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[6, 0.4, 4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Paredes principales */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[5.8, 2.4, 3.8]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>

      {/* Techo tradicional con curvas */}
      <mesh position={[0, 2.6, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[4.2, 2, 4]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>

      {/* Segundo piso */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[4.8, 1.2, 2.8]} />
        <meshStandardMaterial color="#F0F8FF" />
      </mesh>

      {/* Puerta principal */}
      <mesh 
        position={[0, 0.3, 1.91]} 
        onClick={() => handleRoomClick('entrada')}
        onPointerOver={() => setHoveredRoom('entrada')}
        onPointerOut={() => setHoveredRoom(null)}
      >
        <boxGeometry args={[1, 2, 0.1]} />
        <meshStandardMaterial 
          color={hoveredRoom === 'entrada' ? '#8B4513' : '#654321'} 
          emissive={selectedRoom === 'entrada' ? '#FFD700' : '#000000'}
          emissiveIntensity={selectedRoom === 'entrada' ? 0.2 : 0}
        />
      </mesh>

      {/* Ventanas del primer piso */}
      <mesh position={[-1.5, 0.5, 1.91]}>
        <boxGeometry args={[0.8, 1, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
      </mesh>
      <mesh position={[1.5, 0.5, 1.91]}>
        <boxGeometry args={[0.8, 1, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
      </mesh>

      {/* Ventanas del segundo piso */}
      <mesh position={[-1, 2.2, 1.41]}>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
      </mesh>
      <mesh position={[1, 2.2, 1.41]}>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.8} />
      </mesh>

      {/* Balcón del segundo piso */}
      <mesh position={[0, 1.5, 1.41]}>
        <boxGeometry args={[2, 0.1, 0.5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Jardín zen expandido */}
      <mesh position={[0, -0.6, -3]}>
        <cylinderGeometry args={[3, 3, 0.3, 12]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>

      {/* Piedras del jardín */}
      {[-2, -1, 0, 1, 2].map((x, i) => (
        <mesh key={i} position={[x, -0.4, -2.5]}>
          <sphereGeometry args={[0.2 + Math.random() * 0.2, 8, 6]} />
          <meshStandardMaterial color="#708090" />
        </mesh>
      ))}

      {/* Árboles bonsai */}
      <mesh position={[-2, 0.3, -2]}>
        <cylinderGeometry args={[0.1, 0.1, 1.2, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-2, 1.1, -2]}>
        <sphereGeometry args={[0.9, 8, 6]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      <mesh position={[2, 0.3, -2]}>
        <cylinderGeometry args={[0.1, 0.1, 1.2, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[2, 1.1, -2]}>
        <sphereGeometry args={[0.9, 8, 6]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      {/* Lámparas tradicionales mejoradas */}
      <mesh position={[-3, 1.2, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 2, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[3, 1.2, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 2, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.4} />
      </mesh>

      {/* Puente sobre el jardín */}
      <mesh position={[0, -0.2, -1.5]}>
        <boxGeometry args={[1, 0.1, 2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Texto flotante mejorado */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.6}
        color="#1A365D"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter.woff2"
      >
        Casa Tradicional Japonesa
      </Text>

      {/* Indicadores de habitaciones */}
      {selectedRoom && (
        <Text
          position={[0, 3.5, 0]}
          fontSize={0.4}
          color="#D69E2E"
          anchorX="center"
          anchorY="middle"
        >
          {selectedRoom === 'entrada' ? 'Entrada Principal' : selectedRoom}
        </Text>
      )}
    </group>
  );
};

// Componente de controles avanzados
const AdvancedControls = ({ 
  onPlay, 
  onPause, 
  onReset, 
  onFullscreen, 
  onToggleWireframe,
  isPlaying,
  isFullscreen,
  isWireframe 
}: {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onFullscreen: () => void;
  onToggleWireframe: () => void;
  isPlaying: boolean;
  isFullscreen: boolean;
  isWireframe: boolean;
}) => {
  return (
    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border">
      <div className="flex space-x-2">
        <button
          onClick={isPlaying ? onPause : onPlay}
          className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          title={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        
        <button
          onClick={onReset}
          className="p-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
          title="Resetear vista"
        >
          <RotateCcw size={16} />
        </button>
        
        <button
          onClick={onFullscreen}
          className="p-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>
        
        <button
          onClick={onToggleWireframe}
          className={`p-2 rounded-lg transition-colors ${
            isWireframe 
              ? 'bg-primary text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          title="Alternar wireframe"
        >
          {isWireframe ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
};

// Componente principal del navegador 3D avanzado
const Advanced3DNavigation = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRoomClick = (room: string) => {
    setSelectedRoom(room);
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    // Reset camera position
    setIsPlaying(true);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      canvasRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleToggleWireframe = () => {
    setIsWireframe(!isWireframe);
  };

  if (isLoading) {
    return (
      <div className="relative h-96 lg:h-[700px] bg-gradient-to-br from-muted to-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-serif font-bold text-primary mb-2">Cargando Experiencia 3D</h3>
            <p className="text-secondary">Preparando modelo arquitectónico japonés...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={canvasRef}
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'h-96 lg:h-[700px]'} bg-gradient-to-br from-muted to-white rounded-2xl overflow-hidden shadow-2xl`}
    >
      <Canvas
        camera={{ position: [10, 8, 10], fov: 45 }}
        style={{ background: 'linear-gradient(135deg, #f7fafc 0%, #ffffff 100%)' }}
      >
        {/* Iluminación avanzada */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.8} color="#FFD700" />
        <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} />

        {/* Casa japonesa detallada */}
        <DetailedJapaneseHouse onRoomClick={handleRoomClick} />

        {/* Controles de órbita */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={6}
          maxDistance={20}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          autoRotate={isPlaying}
          autoRotateSpeed={0.5}
        />

        {/* Ambiente */}
        <Environment preset="sunset" />
      </Canvas>

      {/* Controles avanzados */}
      <AdvancedControls
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
        onFullscreen={handleFullscreen}
        onToggleWireframe={handleToggleWireframe}
        isPlaying={isPlaying}
        isFullscreen={isFullscreen}
        isWireframe={isWireframe}
      />

      {/* Información de la habitación seleccionada */}
      {selectedRoom && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border max-w-sm">
          <h3 className="font-serif font-bold text-primary text-sm mb-2">
            {selectedRoom === 'entrada' ? 'Entrada Principal' : selectedRoom}
          </h3>
          <div className="space-y-1 text-xs text-secondary">
            <p>🏠 Área: 25 m²</p>
            <p>🪟 Ventanas: 2</p>
            <p>🚪 Acceso: Principal</p>
            <p>💡 Iluminación: Natural + LED</p>
          </div>
        </div>
      )}

      {/* Información de la propiedad */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border max-w-sm">
        <h3 className="font-serif font-bold text-primary text-sm mb-2">Casa Tradicional Kusatsu</h3>
        <div className="space-y-1 text-xs text-secondary">
          <p>📍 Ubicación: Kusatsu, Gunma</p>
          <p>🏠 Área total: 120 m²</p>
          <p>🏢 Pisos: 2</p>
          <p>🛏️ Habitaciones: 4</p>
          <p>📅 Año construcción: 1925</p>
          <p>💰 Precio: ¥8,500,000</p>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="absolute bottom-4 right-4 space-y-2">
        <button className="block w-full bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors font-semibold text-sm shadow-lg">
          Ver Detalles Completos
        </button>
        <button className="block w-full bg-accent text-white px-6 py-3 rounded-full hover:bg-accent/90 transition-colors font-semibold text-sm shadow-lg">
          Agendar Visita Virtual
        </button>
      </div>

      {/* Instrucciones */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-border">
        <h4 className="font-semibold text-primary text-xs mb-2">Controles 3D</h4>
        <div className="space-y-1 text-xs text-secondary">
          <p>🖱️ Click + arrastrar: Rotar</p>
          <p>🔍 Scroll: Zoom</p>
          <p>🖱️ Click derecho: Pan</p>
          <p>🏠 Click en habitaciones: Info</p>
        </div>
      </div>
    </div>
  );
};

export default Advanced3DNavigation;
