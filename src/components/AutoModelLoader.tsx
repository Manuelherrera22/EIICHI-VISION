'use client';

import React, { useState, useEffect } from 'react';
import GLBModelViewer from './GLBModelViewer';
import { 
  Upload, 
  Download, 
  AlertCircle, 
  CheckCircle, 
  Sparkles,
  Zap,
  Star,
  Crown,
  Eye
} from 'lucide-react';

const AutoModelLoader = () => {
  const [modelUrl, setModelUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showPremium, setShowPremium] = useState(false);

  // URL de tu modelo GLB en Google Drive
  const googleDriveUrl = 'https://drive.google.com/file/d/1BZJgv1QRwttFGINI0-7iFg0YHVWE3JvU/view?usp=sharing';

  // Verificar si hay un modelo en la carpeta custom
  useEffect(() => {
    const checkForCustomModel = async () => {
      try {
        // Intentar cargar el modelo desde la carpeta custom
        const response = await fetch('/models/custom/japanese-house.glb');
        if (response.ok) {
          setModelUrl('/models/custom/japanese-house.glb');
          setShowPremium(true);
          console.log('🏠 ¡Modelo japonés cargado exitosamente!');
        }
      } catch (error) {
        // No hay modelo en la carpeta custom, mostrar opciones de carga
        console.log('No custom model found, showing upload options');
      }
    };

    checkForCustomModel();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.glb') || file.name.toLowerCase().endsWith('.gltf')) {
        const url = URL.createObjectURL(file);
        setModelUrl(url);
        setUploadedFile(file);
        setHasError(false);
        setErrorMessage('');
        setShowPremium(true);
      } else {
        setHasError(true);
        setErrorMessage('Por favor, selecciona un archivo GLB o GLTF válido.');
      }
    }
  };

  const handleDownloadFromDrive = () => {
    window.open(googleDriveUrl, '_blank');
  };

  const handleLoadFromUrl = () => {
    const url = prompt('Ingresa la URL directa de tu modelo GLB/GLTF:');
    if (url) {
      setModelUrl(url);
      setHasError(false);
      setErrorMessage('');
      setShowPremium(true);
    }
  };

  // Si hay un modelo cargado, mostrar el visualizador premium
  if (showPremium && modelUrl) {
    return (
      <div className="space-y-6">
        {/* Header premium */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent/20 to-primary/20 px-6 py-3 rounded-full mb-6 border border-accent/30">
            <Crown size={20} className="text-accent" />
            <span className="text-sm font-medium text-accent">Experiencia Premium Activada</span>
            <Sparkles size={16} className="text-accent animate-pulse" />
          </div>
          
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">
            Visualizador 3D Premium
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Tu casa japonesa con tecnología Three.js de última generación
          </p>
        </div>

        {/* Visualizador premium */}
        <GLBModelViewer modelUrl={modelUrl} />

        {/* Información del modelo */}
        {uploadedFile && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
            <div className="flex items-center space-x-3">
              <CheckCircle size={24} className="text-green-500" />
              <div>
                <h3 className="font-semibold text-green-700">Modelo Cargado Exitosamente</h3>
                <p className="text-sm text-green-600">
                  {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Mostrar opciones de carga si no hay modelo
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
          <Star size={20} className="text-primary" />
          <span className="text-sm font-medium text-primary">Cargar Modelo 3D</span>
        </div>
        
        <h2 className="text-4xl font-serif font-bold text-primary mb-4">
          🏠 Cargar tu Casa Japonesa
        </h2>
        <p className="text-xl text-secondary max-w-3xl mx-auto">
          Sube tu modelo GLB personalizado y disfruta de una experiencia 3D premium con Three.js
        </p>
      </div>

      {/* Opciones de carga premium */}
      <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-3xl shadow-xl border border-blue-100">
        <h3 className="font-serif font-bold text-primary text-2xl mb-6 text-center">
          ✨ Opciones de Carga Premium
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Opción 1: Subir archivo local */}
          <div className="text-center group">
            <label className="cursor-pointer">
              <div className="bg-gradient-to-br from-primary/10 to-primary/20 p-8 rounded-2xl hover:from-primary/20 hover:to-primary/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg border border-primary/20">
                <Upload size={48} className="text-primary mx-auto mb-4 group-hover:animate-bounce" />
                <h4 className="font-bold text-primary text-lg mb-2">Subir Archivo</h4>
                <p className="text-sm text-secondary">Selecciona tu archivo GLB/GLTF local</p>
                <div className="mt-4 text-xs text-primary/70">
                  ⚡ Carga instantánea
                </div>
              </div>
              <input
                type="file"
                accept=".glb,.gltf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Opción 2: Descargar desde Google Drive */}
          <div className="text-center group">
            <button
              onClick={handleDownloadFromDrive}
              className="w-full bg-gradient-to-br from-accent/10 to-accent/20 p-8 rounded-2xl hover:from-accent/20 hover:to-accent/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg border border-accent/20"
            >
              <Download size={48} className="text-accent mx-auto mb-4 group-hover:animate-bounce" />
              <h4 className="font-bold text-accent text-lg mb-2">Google Drive</h4>
              <p className="text-sm text-secondary">Descargar desde tu Drive</p>
              <div className="mt-4 text-xs text-accent/70">
                🔗 Enlace directo
              </div>
            </button>
          </div>

          {/* Opción 3: URL directa */}
          <div className="text-center group">
            <button
              onClick={handleLoadFromUrl}
              className="w-full bg-gradient-to-br from-green-500/10 to-green-500/20 p-8 rounded-2xl hover:from-green-500/20 hover:to-green-500/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg border border-green-500/20"
            >
              <Zap size={48} className="text-green-500 mx-auto mb-4 group-hover:animate-bounce" />
              <h4 className="font-bold text-green-500 text-lg mb-2">URL Directa</h4>
              <p className="text-sm text-secondary">Pegar enlace directo</p>
              <div className="mt-4 text-xs text-green-500/70">
                🌐 Carga remota
              </div>
            </button>
          </div>
        </div>

        {/* Información del archivo cargado */}
        {uploadedFile && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <CheckCircle size={20} className="text-green-500" />
              <span className="text-sm text-green-700 font-semibold">
                Archivo cargado: {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
          </div>
        )}

        {/* Error message */}
        {hasError && (
          <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <AlertCircle size={20} className="text-red-500" />
              <span className="text-sm text-red-700 font-semibold">{errorMessage}</span>
            </div>
          </div>
        )}
      </div>

      {/* Instrucciones premium */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-3xl shadow-lg border border-slate-200">
        <h3 className="font-serif font-bold text-primary text-2xl mb-6 text-center">
          🎯 Casa de Bambú Premium
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-primary mb-4 flex items-center space-x-2">
              <Crown size={20} />
              <span>Modelo Automático Cargado</span>
            </h4>
            <ol className="space-y-2 text-sm text-secondary">
              <li>✅ Tu casa de bambú está lista</li>
              <li>✅ Modelo GLB optimizado cargado</li>
              <li>✅ Efectos visuales premium activos</li>
              <li>✅ Controles avanzados disponibles</li>
            </ol>
          </div>

          <div>
            <h4 className="font-bold text-primary mb-4 flex items-center space-x-2">
              <Sparkles size={20} />
              <span>Características Premium</span>
            </h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li>• Iluminación realista con sombras</li>
              <li>• Efectos de partículas interactivos</li>
              <li>• Controles avanzados de cámara</li>
              <li>• Modo pantalla completa</li>
              <li>• Animaciones suaves y fluidas</li>
              <li>• Compatible con móviles</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
          <h4 className="font-bold text-primary mb-3">🔗 Enlaces Útiles:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <a href={googleDriveUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center space-x-2">
              <Download size={16} />
              <span>Tu modelo en Google Drive</span>
            </a>
            <a href="https://gltf-viewer.donmccurdy.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center space-x-2">
              <Eye size={16} />
              <span>GLTF Viewer Online</span>
            </a>
            <a href="https://threejs.org/examples/#webgl_loader_gltf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center space-x-2">
              <Zap size={16} />
              <span>Three.js Examples</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoModelLoader;
