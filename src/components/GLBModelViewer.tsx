'use client';

import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import FallbackHouseModel from './FallbackHouseModel';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize, 
  Minimize, 
  Sun, 
  Moon, 
  Info, 
  Share2, 
  Heart,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface ModelProps {
  modelUrl: string;
}

const Model: React.FC<ModelProps> = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);
  const meshRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (meshRef.current && scene) {
      // Centrar el modelo
      const box = new THREE.Box3().setFromObject(meshRef.current);
      const center = box.getCenter(new THREE.Vector3());
      meshRef.current.position.sub(center);

      // Escalar el modelo para que se vea bien
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const desiredSize = 3; // Tamaño deseado
      meshRef.current.scale.setScalar(desiredSize / maxDim);

      // Habilitar sombras para todos los meshes
      meshRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Posicionar la cámara para una buena vista
      camera.position.set(5, 3, 5);
      camera.lookAt(0, 0, 0);
    }
  }, [scene, camera]);

  return <primitive object={scene} ref={meshRef} />;
};

interface GLBModelViewerProps {
  modelUrl: string;
}

// Component to handle rotation animation inside Canvas
const RotationController: React.FC<{ isRotating: boolean; controlsRef: React.RefObject<any> }> = ({ isRotating, controlsRef }) => {
  useFrame(() => {
    if (isRotating && controlsRef.current) {
      controlsRef.current.azimuthalAngle += 0.005;
    }
  });
  return null;
};

const GLBModelViewer: React.FC<GLBModelViewerProps> = ({ modelUrl }) => {
  const controlsRef = useRef<any>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDayMode, setIsDayMode] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl overflow-hidden shadow-2xl">
      <Canvas
        shadows
        camera={{ position: [5, 3, 5], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <Suspense fallback={
          <Html center>
            <div className="flex flex-col items-center justify-center text-white/70">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p className="text-lg font-medium">Cargando modelo 3D...</p>
            </div>
          </Html>
        }>
          <Model modelUrl={modelUrl} />
          
          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={2}
            maxDistance={15}
            autoRotate={false}
            autoRotateSpeed={0.5}
            dampingFactor={0.05}
          />
          
          <RotationController isRotating={isRotating} controlsRef={controlsRef} />
          
          <Environment preset={isDayMode ? "sunset" : "night"} background />
          
          {/* Luces */}
          <ambientLight intensity={isDayMode ? 0.6 : 0.2} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={isDayMode ? 1.2 : 0.3}
            castShadow
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-10, 0, -20]} intensity={isDayMode ? 0.8 : 0.2} />
          <pointLight position={[0, -10, 0]} intensity={isDayMode ? 0.5 : 0.1} />

          {/* Plano de suelo para sombras */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <shadowMaterial opacity={0.3} />
          </mesh>

          {/* Partículas flotantes */}
          {Array.from({ length: 50 }).map((_, i) => (
            <mesh key={i} position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20
            ]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color="gold" transparent opacity={0.6} />
            </mesh>
          ))}

        </Suspense>
      </Canvas>

      {/* Controles UI */}
      <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-md rounded-xl shadow-lg flex flex-col space-y-2">
        <button 
          onClick={() => setIsRotating(!isRotating)} 
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-700"
        >
          {isRotating ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button 
          onClick={resetCamera} 
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-700"
        >
          <RotateCcw size={20} />
        </button>
        <button 
          onClick={toggleFullscreen} 
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-700"
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
        <button 
          onClick={() => setIsDayMode(!isDayMode)} 
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-700"
        >
          {isDayMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      {/* Información del modelo */}
      <div className="absolute bottom-4 right-4 p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg text-gray-900 text-right">
        <div className="flex items-center justify-end space-x-2 mb-2">
          <span className="text-xs font-mono bg-blue-500 px-2 py-1 rounded-full">Three.js</span>
          <span className="text-xs font-mono bg-green-500 px-2 py-1 rounded-full">WebGL 2.0</span>
        </div>
        <h3 className="text-lg font-serif font-bold mb-1">Casa de Bambú Premium</h3>
        <p className="text-sm text-white/80">Modelo GLB interactivo</p>
        <div className="flex justify-end space-x-3 mt-3">
          <button className="p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors text-white">
            <Info size={18} />
          </button>
          <button className="p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors text-white">
            <Share2 size={18} />
          </button>
          <button className="p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors text-white">
            <Heart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GLBModelViewer;
