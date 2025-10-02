'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Move, 
  RotateCcw, 
  Scale, 
  Palette, 
  Home, 
  Settings, 
  Eye, 
  Save, 
  Undo, 
  Redo,
  Download,
  Share,
  Layers,
  Grid,
  Lightbulb,
  TreePine,
  Waves,
  Mountain,
  Zap,
  Wand2,
  MousePointer,
  Square,
  Circle,
  Triangle,
  Minus,
  Plus,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Copy,
  Trash2,
  Lock,
  Unlock,
  EyeOff,
  Maximize2,
  Minimize2,
  RefreshCw,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface DesignElement {
  id: string;
  type: 'wall' | 'door' | 'window' | 'furniture' | 'decoration';
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scale: number;
  color: string;
  texture: string;
  locked: boolean;
  visible: boolean;
}

interface DesignRoom {
  id: string;
  name: string;
  type: 'living' | 'kitchen' | 'bedroom' | 'bathroom' | 'garden';
  elements: DesignElement[];
  floorPlan: string;
  style: string;
}

const InteractiveDesignTable = () => {
  const [activeRoom, setActiveRoom] = useState<string>('living');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [showGrid, setShowGrid] = useState(true);
  const [history, setHistory] = useState<DesignRoom[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const rooms: DesignRoom[] = [
    {
      id: 'living',
      name: 'Sala de Estar',
      type: 'living',
      elements: [
        {
          id: 'wall1',
          type: 'wall',
          name: 'Pared Norte',
          x: 100,
          y: 100,
          width: 300,
          height: 20,
          rotation: 0,
          scale: 1,
          color: '#f5f5f5',
          texture: 'concrete',
          locked: false,
          visible: true
        },
        {
          id: 'window1',
          type: 'window',
          name: 'Ventana Principal',
          x: 200,
          y: 80,
          width: 80,
          height: 60,
          rotation: 0,
          scale: 1,
          color: '#87ceeb',
          texture: 'glass',
          locked: false,
          visible: true
        }
      ],
      floorPlan: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      style: 'minimalist'
    }
  ];

  const currentRoom = rooms.find(room => room.id === activeRoom);

  const designElements = [
    { type: 'wall', name: 'Pared', icon: Square, color: '#f5f5f5' },
    { type: 'door', name: 'Puerta', icon: Minus, color: '#8b4513' },
    { type: 'window', name: 'Ventana', icon: Square, color: '#87ceeb' },
    { type: 'furniture', name: 'Mueble', icon: Home, color: '#654321' },
    { type: 'decoration', name: 'Decoración', icon: TreePine, color: '#228b22' }
  ];

  const stylePresets = [
    { id: 'minimalist', name: 'Minimalista', color: '#f8fafc', accent: '#64748b' },
    { id: 'wabi-sabi', name: 'Wabi-Sabi', color: '#fef3c7', accent: '#92400e' },
    { id: 'traditional', name: 'Tradicional', color: '#fef2f2', accent: '#dc2626' },
    { id: 'modern', name: 'Moderno', color: '#f0f9ff', accent: '#0284c7' }
  ];

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    if (!currentRoom) return;
    
    const element = currentRoom.elements.find(el => el.id === elementId);
    if (!element || element.locked) return;

    setIsDragging(true);
    setSelectedElement(elementId);
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - element.x,
        y: e.clientY - rect.top - element.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement || !currentRoom) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    // Update element position
    const updatedRoom = {
      ...currentRoom,
      elements: currentRoom.elements.map(el =>
        el.id === selectedElement
          ? { ...el, x: Math.max(0, newX), y: Math.max(0, newY) }
          : el
      )
    };

    // Update room in rooms array
    const updatedRooms = rooms.map(room =>
      room.id === activeRoom ? updatedRoom : room
    );

    // Add to history
    addToHistory(updatedRoom);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const addToHistory = (room: DesignRoom) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(room);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const addElement = (type: string) => {
    if (!currentRoom) return;

    const newElement: DesignElement = {
      id: `${type}_${Date.now()}`,
      type: type as any,
      name: `${type} ${currentRoom.elements.length + 1}`,
      x: 200,
      y: 200,
      width: 100,
      height: 100,
      rotation: 0,
      scale: 1,
      color: designElements.find(el => el.type === type)?.color || '#cccccc',
      texture: 'default',
      locked: false,
      visible: true
    };

    const updatedRoom = {
      ...currentRoom,
      elements: [...currentRoom.elements, newElement]
    };

    addToHistory(updatedRoom);
  };

  const deleteElement = (elementId: string) => {
    if (!currentRoom) return;

    const updatedRoom = {
      ...currentRoom,
      elements: currentRoom.elements.filter(el => el.id !== elementId)
    };

    addToHistory(updatedRoom);
    setSelectedElement(null);
  };

  const toggleElementLock = (elementId: string) => {
    if (!currentRoom) return;

    const updatedRoom = {
      ...currentRoom,
      elements: currentRoom.elements.map(el =>
        el.id === elementId ? { ...el, locked: !el.locked } : el
      )
    };

    addToHistory(updatedRoom);
  };

  const toggleElementVisibility = (elementId: string) => {
    if (!currentRoom) return;

    const updatedRoom = {
      ...currentRoom,
      elements: currentRoom.elements.map(el =>
        el.id === elementId ? { ...el, visible: !el.visible } : el
      )
    };

    addToHistory(updatedRoom);
  };

  const rotateElement = (elementId: string, angle: number) => {
    if (!currentRoom) return;

    const updatedRoom = {
      ...currentRoom,
      elements: currentRoom.elements.map(el =>
        el.id === elementId ? { ...el, rotation: (el.rotation + angle) % 360 } : el
      )
    };

    addToHistory(updatedRoom);
  };

  const scaleElement = (elementId: string, scale: number) => {
    if (!currentRoom) return;

    const updatedRoom = {
      ...currentRoom,
      elements: currentRoom.elements.map(el =>
        el.id === elementId ? { ...el, scale: Math.max(0.1, Math.min(3, el.scale + scale)) } : el
      )
    };

    addToHistory(updatedRoom);
  };

  const selectedElementData = currentRoom?.elements.find(el => el.id === selectedElement);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-white/10 p-3 sm:p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-white">
                  Mesa de Diseño Interactiva
                </h1>
                <p className="text-white/70 text-xs sm:text-sm">
                  Co-diseña tu proyecto en tiempo real
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-xs sm:text-sm">En Vivo</span>
              </div>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] lg:h-[calc(100vh-80px)]">
        {/* Left Sidebar - Tools */}
        <div className="w-full lg:w-80 bg-black/30 backdrop-blur-sm border-b lg:border-b-0 lg:border-r border-white/10 p-3 sm:p-4 overflow-y-auto lg:h-full max-h-64 lg:max-h-none">
          {/* Room Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Habitaciones</h3>
            <div className="space-y-2">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  className={`w-full p-3 rounded-xl text-left transition-colors ${
                    activeRoom === room.id
                      ? 'bg-yellow-400/20 border border-yellow-400/50'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Home className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-white font-medium">{room.name}</p>
                      <p className="text-white/60 text-sm">{room.elements.length} elementos</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Design Elements */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Elementos</h3>
            <div className="grid grid-cols-2 gap-2">
              {designElements.map((element) => (
                <button
                  key={element.type}
                  onClick={() => addElement(element.type)}
                  className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-center"
                >
                  {element.icon && <element.icon className="w-6 h-6 text-white mx-auto mb-2" />}
                  <p className="text-white text-sm">{element.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Style Presets */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Estilos</h3>
            <div className="space-y-2">
              {stylePresets.map((style) => (
                <button
                  key={style.id}
                  className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: style.color }}
                    />
                    <span className="text-white">{style.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Element Properties */}
          {selectedElementData && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Propiedades</h3>
              <div className="bg-white/5 rounded-xl p-4 space-y-4">
                <div>
                  <label className="text-white/70 text-sm">Nombre</label>
                  <input
                    type="text"
                    value={selectedElementData.name}
                    className="w-full mt-1 p-2 bg-white/10 border border-white/20 rounded-lg text-white"
                    onChange={(e) => {
                      // Update element name
                    }}
                  />
                </div>

                <div>
                  <label className="text-white/70 text-sm">Posición</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <input
                      type="number"
                      value={Math.round(selectedElementData.x)}
                      className="p-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                      onChange={(e) => {
                        // Update x position
                      }}
                    />
                    <input
                      type="number"
                      value={Math.round(selectedElementData.y)}
                      className="p-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                      onChange={(e) => {
                        // Update y position
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm">Tamaño</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <input
                      type="number"
                      value={Math.round(selectedElementData.width)}
                      className="p-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                      onChange={(e) => {
                        // Update width
                      }}
                    />
                    <input
                      type="number"
                      value={Math.round(selectedElementData.height)}
                      className="p-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                      onChange={(e) => {
                        // Update height
                      }}
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleElementLock(selectedElementData.id)}
                    className="flex-1 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    {selectedElementData.locked ? <Lock className="w-4 h-4 text-white mx-auto" /> : <Unlock className="w-4 h-4 text-white mx-auto" />}
                  </button>
                  <button
                    onClick={() => toggleElementVisibility(selectedElementData.id)}
                    className="flex-1 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    {selectedElementData.visible ? <Eye className="w-4 h-4 text-white mx-auto" /> : <EyeOff className="w-4 h-4 text-white mx-auto" />}
                  </button>
                  <button
                    onClick={() => deleteElement(selectedElementData.id)}
                    className="flex-1 p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Toolbar */}
          <div className="bg-black/30 backdrop-blur-sm border-b border-white/10 p-2 sm:p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto scrollbar-hide">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={undo}
                    disabled={historyIndex <= 0}
                    className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                  >
                    <Undo className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </button>
                  <button
                    onClick={redo}
                    disabled={historyIndex >= history.length - 1}
                    className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                  >
                    <Redo className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </button>
                </div>

                <div className="w-px h-4 sm:h-6 bg-white/20"></div>

                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => setViewMode('2d')}
                    className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                      viewMode === '2d' ? 'bg-yellow-400/20 text-yellow-400' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('3d')}
                    className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                      viewMode === '3d' ? 'bg-yellow-400/20 text-yellow-400' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="w-px h-4 sm:h-6 bg-white/20"></div>

                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                    showGrid ? 'bg-yellow-400/20 text-yellow-400' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-1 sm:space-x-2">
                <button className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Save className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
                <button className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
                <button className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Share className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 relative overflow-hidden min-h-0">
            <div
              ref={containerRef}
              className="w-full h-full relative bg-gray-100 overflow-auto"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {/* Grid Background */}
              {showGrid && (
                <div className="absolute inset-0 opacity-40">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#000" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
              )}

              {/* Design Elements */}
              {currentRoom?.elements.map((element) => (
                <motion.div
                  key={element.id}
                  className={`absolute cursor-move ${
                    selectedElement === element.id ? 'ring-2 ring-yellow-400' : ''
                  } ${!element.visible ? 'opacity-50' : ''}`}
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    backgroundColor: element.color,
                    transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
                    transformOrigin: 'center'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, element.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-full h-full border border-white/20 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{element.name}</span>
                  </div>

                  {/* Selection Handles */}
                  {selectedElement === element.id && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Corner Handles */}
                      <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Canvas Info */}
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-black/50 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                <div className="text-white text-xs sm:text-sm">
                  <p>Habitación: {currentRoom?.name}</p>
                  <p>Elementos: {currentRoom?.elements.length}</p>
                  <p>Vista: {viewMode.toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Transform Controls */}
        {selectedElementData && (
          <div className="w-full lg:w-80 bg-black/30 backdrop-blur-sm border-t lg:border-t-0 lg:border-l border-white/10 p-3 sm:p-4 lg:h-full max-h-64 lg:max-h-none overflow-y-auto">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Transformar</h3>
            
            <div className="space-y-3 sm:space-y-4">
              {/* Rotation */}
              <div>
                <label className="text-white/70 text-xs sm:text-sm mb-1 sm:mb-2 block">Rotación</label>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => rotateElement(selectedElementData.id, -15)}
                    className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={selectedElementData.rotation}
                    className="flex-1 h-2"
                    onChange={(e) => {
                      // Update rotation
                    }}
                  />
                  <button
                    onClick={() => rotateElement(selectedElementData.id, 15)}
                    className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <RotateCw className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Scale */}
              <div>
                <label className="text-white/70 text-xs sm:text-sm mb-1 sm:mb-2 block">Escala</label>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button
                    onClick={() => scaleElement(selectedElementData.id, -0.1)}
                    className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </button>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={selectedElementData.scale}
                    className="flex-1 h-2"
                    onChange={(e) => {
                      // Update scale
                    }}
                  />
                  <button
                    onClick={() => scaleElement(selectedElementData.id, 0.1)}
                    className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <label className="text-white/70 text-xs sm:text-sm mb-1 sm:mb-2 block">Acciones Rápidas</label>
                <div className="grid grid-cols-2 gap-1 sm:gap-2">
                  <button
                    onClick={() => rotateElement(selectedElementData.id, 90)}
                    className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-xs sm:text-sm"
                  >
                    Rotar 90°
                  </button>
                  <button
                    onClick={() => scaleElement(selectedElementData.id, 0.5)}
                    className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-xs sm:text-sm"
                  >
                    Escala 0.5x
                  </button>
                  <button
                    onClick={() => scaleElement(selectedElementData.id, 1)}
                    className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-xs sm:text-sm"
                  >
                    Escala 1x
                  </button>
                  <button
                    onClick={() => scaleElement(selectedElementData.id, 2)}
                    className="p-1.5 sm:p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white text-xs sm:text-sm"
                  >
                    Escala 2x
                  </button>
                </div>
              </div>

              {/* Color Picker */}
              <div>
                <label className="text-white/70 text-xs sm:text-sm mb-1 sm:mb-2 block">Color</label>
                <div className="grid grid-cols-6 gap-1 sm:gap-2">
                  {['#f5f5f5', '#8b4513', '#87ceeb', '#654321', '#228b22', '#ff6b6b'].map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        // Update color
                      }}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-white/20 hover:border-white/40 transition-colors"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveDesignTable;
