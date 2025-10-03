'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Settings, 
  Sun, 
  Moon, 
  Camera,
  Info,
  Download,
  Share2,
  Heart,
  Eye,
  EyeOff,
  Upload,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Zap,
  Star,
  Crown
} from 'lucide-react';

// Componente de casa japonesa simple pero elegante
const SimpleJapaneseHouse = () => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.05 : 1);
      
      // Efecto de flotación sutil
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
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

      {/* Efectos de partículas alrededor del modelo */}
      {hovered && (
        <group>
          {[...Array(15)].map((_, i) => (
            <mesh
              key={i}
              position={[
                Math.sin(i * 0.4) * 3,
                Math.cos(i * 0.3) * 2,
                Math.sin(i * 0.5) * 3
              ]}
            >
              <sphereGeometry args={[0.03, 8, 6]} />
              <meshStandardMaterial 
                color="#FFD700" 
                emissive="#FFD700" 
                emissiveIntensity={0.5}
                transparent
                opacity={0.7}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* Texto flotante */}
      <Text
        position={[0, 4, 0]}
        fontSize={0.6}
        color="#1A365D"
        anchorX="center"
        anchorY="middle"
      >
        Casa Tradicional Japonesa
      </Text>
    </group>
  );
};

// Panel de controles premium
const PremiumControls = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [lightMode, setLightMode] = useState<'day' | 'night'>('day');

  return (
    <Html position={[0, 0, 0]} center>
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-200">
        <h3 className="font-serif font-bold text-primary text-sm mb-3 flex items-center space-x-2">
          <Settings size={16} />
          <span>Controles Premium</span>
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors text-gray-700"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <span className="text-xs text-secondary">Auto-rotación</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLightMode(lightMode === 'day' ? 'night' : 'day')}
              className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors text-gray-700"
            >
              {lightMode === 'day' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <span className="text-xs text-secondary">Iluminación</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors text-gray-700"
            >
              <Info size={14} />
            </button>
            <span className="text-xs text-secondary">Información</span>
          </div>
        </div>
      </div>
    </Html>
  );
};

// Panel de información premium
const PremiumInfo = () => {
  return (
    <Html position={[0, 0, 0]} center>
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 max-w-sm">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="font-serif font-bold text-primary text-sm">Casa de Bambú Premium</h3>
        </div>
        
        <div className="space-y-2 text-xs text-secondary">
          <div className="flex justify-between">
            <span>📍 Ubicación:</span>
            <span className="text-primary font-semibold">Kusatsu, Gunma</span>
          </div>
          <div className="flex justify-between">
            <span>🏠 Área:</span>
            <span className="text-primary font-semibold">120 m²</span>
          </div>
          <div className="flex justify-between">
            <span>📅 Año:</span>
            <span className="text-primary font-semibold">1925</span>
          </div>
          <div className="flex justify-between">
            <span>💰 Precio:</span>
            <span className="text-primary font-semibold">¥8,500,000</span>
          </div>
          <div className="flex justify-between">
            <span>🎌 Estilo:</span>
            <span className="text-primary font-semibold">Minka Tradicional</span>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex space-x-2">
            <button className="flex-1 bg-primary text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors">
              Ver Detalles
            </button>
            <button className="p-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors">
              <Heart size={14} />
            </button>
            <button className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors">
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </Html>
  );
};

// Componente principal del visualizador premium simplificado
const SimplePremiumViewer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="relative h-96 lg:h-[700px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent rounded-full animate-spin" style={{animationDelay: '0.5s'}}></div>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">Cargando Experiencia Premium</h3>
            <p className="text-white/70 mb-4">Preparando tu modelo 3D...</p>
            <div className="w-64 bg-white/20 rounded-full h-2 mx-auto">
              <div className="bg-gradient-to-r from-accent to-primary h-2 rounded-full animate-pulse" style={{width: '85%'}}></div>
            </div>
          </div>
        </div>
        
        {/* Efectos de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-accent/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
      </div>
    );
  }

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'h-96 lg:h-[700px]'} bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl overflow-hidden shadow-2xl`}>
      <Canvas
        camera={{ position: [8, 6, 8], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: true, 
          alpha: true
        }}
      >
        {/* Iluminación premium */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#FFD700" />
        <spotLight 
          position={[0, 15, 0]} 
          intensity={0.5} 
          angle={0.3} 
          penumbra={0.1}
          castShadow
          color="#87CEEB"
        />

        {/* Ambiente premium */}
        <Environment preset="sunset" />

        {/* Casa japonesa */}
        <Suspense fallback={null}>
          <SimpleJapaneseHouse />
        </Suspense>

        {/* Controles premium */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={25}
          autoRotate={true}
          autoRotateSpeed={0.3}
          enableDamping={true}
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 1.8}
        />

        {/* UI Premium */}
        {showControls && <PremiumControls />}
        <PremiumInfo />
      </Canvas>

      {/* Controles de pantalla completa */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-colors"
        >
          <Maximize2 size={16} className="text-white" />
        </button>
        <button
          onClick={() => setShowControls(!showControls)}
          className="p-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-colors"
        >
          {showControls ? <EyeOff size={16} className="text-white" /> : <Eye size={16} className="text-white" />}
        </button>
      </div>

      {/* Indicadores de tecnología */}
      <div className="absolute top-4 right-20 flex space-x-2">
        <div className="px-3 py-1 bg-green-500/20 backdrop-blur-md rounded-full border border-green-500/30">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-300 font-mono">Three.js</span>
          </div>
        </div>
        <div className="px-3 py-1 bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-500/30">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-blue-300 font-mono">WebGL 2.0</span>
          </div>
        </div>
      </div>

      {/* Efectos de partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SimplePremiumViewer;
