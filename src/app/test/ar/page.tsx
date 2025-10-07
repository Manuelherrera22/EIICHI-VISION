'use client';

import React, { useState } from 'react';
import { TabijiARService } from '@/lib/ar/ar-service';

const ARTestingPage: React.FC = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTestResult = (testName: string, success: boolean, details: any) => {
    setTestResults(prev => [...prev, {
      testName,
      success,
      details,
      timestamp: new Date().toISOString()
    }]);
  };

  // Test 1: Verificar capacidades del dispositivo
  const testDeviceCapabilities = async () => {
    setIsLoading(true);
    try {
      const capabilities = await TabijiARService.checkDeviceCapabilities();
      
      const success = !!capabilities && typeof capabilities.hasCamera === 'boolean';
      
      addTestResult('Device Capabilities Check', success, {
        hasCamera: capabilities.hasCamera,
        hasWebGL: capabilities.hasWebGL,
        hasWebXR: capabilities.hasWebXR,
        hasGyroscope: capabilities.hasGyroscope,
        hasAccelerometer: capabilities.hasAccelerometer,
        isSupported: capabilities.isSupported,
        browser: capabilities.browser,
        deviceType: capabilities.deviceType
      });
      
      return capabilities;
    } catch (error) {
      addTestResult('Device Capabilities Check', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 2: Cargar modelo 3D
  const testLoad3DModel = async () => {
    setIsLoading(true);
    try {
      const model = await TabijiARService.load3DModel('/models/sample-house.glb');
      
      const success = !!model && !!model.scene;
      
      addTestResult('Load 3D Model', success, {
        modelPath: '/models/sample-house.glb',
        hasScene: !!model?.scene,
        hasAnimations: !!model?.animations,
        animationsCount: model?.animations?.length || 0,
        sceneChildren: model?.scene?.children?.length || 0
      });
      
      return model;
    } catch (error) {
      addTestResult('Load 3D Model', false, { 
        error: error.message,
        note: 'Expected to fail if model file does not exist'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 3: Inicializar AR
  const testInitializeAR = async () => {
    setIsLoading(true);
    try {
      const arSession = await TabijiARService.initializeAR();
      
      const success = !!arSession && !!arSession.scene;
      
      addTestResult('Initialize AR', success, {
        hasScene: !!arSession?.scene,
        hasCamera: !!arSession?.camera,
        hasRenderer: !!arSession?.renderer,
        hasControls: !!arSession?.controls,
        sessionId: arSession?.sessionId
      });
      
      return arSession;
    } catch (error) {
      addTestResult('Initialize AR', false, { 
        error: error.message,
        note: 'May fail if camera permissions denied or WebXR not supported'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 4: Configurar iluminación
  const testSetupLighting = async () => {
    setIsLoading(true);
    try {
      const lighting = await TabijiARService.setupLighting();
      
      const success = !!lighting && lighting.length > 0;
      
      addTestResult('Setup Lighting', success, {
        lightsCount: lighting.length,
        lights: lighting.map(light => ({
          type: light.type,
          intensity: light.intensity,
          color: light.color
        }))
      });
      
      return lighting;
    } catch (error) {
      addTestResult('Setup Lighting', false, { error: error.message });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Test 5: Detectar superficie
  const testDetectSurface = async () => {
    setIsLoading(true);
    try {
      const surface = await TabijiARService.detectSurface();
      
      const success = !!surface && typeof surface.isDetected === 'boolean';
      
      addTestResult('Detect Surface', success, {
        isDetected: surface.isDetected,
        confidence: surface.confidence,
        planeType: surface.planeType,
        dimensions: surface.dimensions,
        position: surface.position,
        rotation: surface.rotation
      });
      
      return surface;
    } catch (error) {
      addTestResult('Detect Surface', false, { 
        error: error.message,
        note: 'May fail without proper AR session'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 6: Colocar modelo en AR
  const testPlaceModelInAR = async () => {
    setIsLoading(true);
    try {
      // Primero cargar un modelo
      const model = await testLoad3DModel();
      if (!model) {
        addTestResult('Place Model in AR', false, { error: 'Failed to load model first' });
        return null;
      }

      const placement = await TabijiARService.placeModelInAR(
        model.scene,
        { x: 0, y: 0, z: -2 },
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1 }
      );
      
      const success = !!placement && !!placement.model;
      
      addTestResult('Place Model in AR', success, {
        hasModel: !!placement?.model,
        position: placement?.position,
        rotation: placement?.rotation,
        scale: placement?.scale,
        isPlaced: placement?.isPlaced
      });
      
      return placement;
    } catch (error) {
      addTestResult('Place Model in AR', false, { 
        error: error.message,
        note: 'May fail without proper AR session'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 7: Configurar interacciones
  const testSetupInteractions = async () => {
    setIsLoading(true);
    try {
      const interactions = await TabijiARService.setupInteractions();
      
      const success = !!interactions && interactions.length > 0;
      
      addTestResult('Setup Interactions', success, {
        interactionsCount: interactions.length,
        interactions: interactions.map(interaction => ({
          type: interaction.type,
          isEnabled: interaction.isEnabled,
          target: interaction.target
        }))
      });
      
      return interactions;
    } catch (error) {
      addTestResult('Setup Interactions', false, { error: error.message });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Test 8: Capturar screenshot
  const testCaptureScreenshot = async () => {
    setIsLoading(true);
    try {
      const screenshot = await TabijiARService.captureScreenshot();
      
      const success = !!screenshot && !!screenshot.dataUrl;
      
      addTestResult('Capture Screenshot', success, {
        hasDataUrl: !!screenshot?.dataUrl,
        format: screenshot?.format,
        width: screenshot?.width,
        height: screenshot?.height,
        size: screenshot?.dataUrl?.length || 0
      });
      
      return screenshot;
    } catch (error) {
      addTestResult('Capture Screenshot', false, { 
        error: error.message,
        note: 'May fail without active AR session'
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 9: Exportar modelo
  const testExportModel = async () => {
    setIsLoading(true);
    try {
      // Primero cargar un modelo
      const model = await testLoad3DModel();
      if (!model) {
        addTestResult('Export Model', false, { error: 'Failed to load model first' });
        return null;
      }

      const exportData = await TabijiARService.exportModel(model.scene, 'glb');
      
      const success = !!exportData && !!exportData.data;
      
      addTestResult('Export Model', success, {
        format: exportData?.format,
        hasData: !!exportData?.data,
        dataSize: exportData?.data?.length || 0,
        filename: exportData?.filename
      });
      
      return exportData;
    } catch (error) {
      addTestResult('Export Model', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 10: Limpiar recursos
  const testCleanupResources = async () => {
    setIsLoading(true);
    try {
      await TabijiARService.cleanupResources();
      
      addTestResult('Cleanup Resources', true, {
        note: 'Resources cleaned up successfully'
      });
      
      return true;
    } catch (error) {
      addTestResult('Cleanup Resources', false, { error: error.message });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Ejecutar todos los tests
  const runAllTests = async () => {
    setTestResults([]);
    await testDeviceCapabilities();
    await testLoad3DModel();
    await testInitializeAR();
    await testSetupLighting();
    await testDetectSurface();
    await testPlaceModelInAR();
    await testSetupInteractions();
    await testCaptureScreenshot();
    await testExportModel();
    await testCleanupResources();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">AR Components Testing</h1>
      
      {/* Información sobre AR */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-purple-900 mb-2">About AR System</h2>
        <p className="text-purple-800 mb-2">
          <strong>Features:</strong> 3D Model Loading, Surface Detection, Model Placement, Interactions
        </p>
        <p className="text-purple-800 mb-2">
          <strong>Formats:</strong> GLB, GLTF, FBX, OBJ
        </p>
        <p className="text-purple-800 mb-2">
          <strong>Interactions:</strong> Scale, Rotate, Move, Screenshot, Export
        </p>
        <p className="text-purple-800">
          <strong>Note:</strong> Some tests may fail without proper device capabilities or camera permissions.
        </p>
      </div>
      
      {/* Controles de testing */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Controls</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={runAllTests}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Running Tests...' : 'Run All Tests'}
          </button>
          
          <button
            onClick={testDeviceCapabilities}
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            Test Device Capabilities
          </button>
          
          <button
            onClick={testLoad3DModel}
            disabled={isLoading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            Test Load 3D Model
          </button>
          
          <button
            onClick={testInitializeAR}
            disabled={isLoading}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            Test Initialize AR
          </button>
          
          <button
            onClick={testDetectSurface}
            disabled={isLoading}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 transition-colors"
          >
            Test Detect Surface
          </button>
          
          <button
            onClick={() => setTestResults([])}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Clear Results
          </button>
        </div>
      </div>

      {/* Resultados de testing */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Results</h2>
        
        {testResults.length === 0 ? (
          <p className="text-gray-600">No tests run yet. Click "Run All Tests" to start.</p>
        ) : (
          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  result.success 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-semibold ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.testName}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    result.success 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.success ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  {new Date(result.timestamp).toLocaleString()}
                </div>
                
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                    View Details
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ARTestingPage;

