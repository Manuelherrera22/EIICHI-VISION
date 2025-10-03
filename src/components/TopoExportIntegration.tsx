'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map,
  MapPin,
  Layers,
  Download,
  Upload,
  Globe,
  Mountain,
  Compass,
  Ruler,
  BarChart3,
  FileText,
  Database,
  Link,
  Settings,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Info,
  Eye,
  EyeOff,
  Plus,
  X,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  Clock,
  User,
  Building,
  Home,
  TreePine,
  Waves,
  Sun,
  Cloud,
  Thermometer,
  Droplets,
  Wind,
  Zap,
  Target,
  TrendingUp,
  Activity,
  Shield,
  Star,
  Heart,
  Share2,
  ExternalLink,
  Maximize2,
  Minimize2,
  Grid,
  List,
  Columns
} from 'lucide-react';

interface TabijiExportData {
  id: string;
  propertyId: string;
  coordinates: {
    latitude: number;
    longitude: number;
    elevation: number;
  };
  topography: {
    slope: number;
    aspect: string;
    elevationRange: {
      min: number;
      max: number;
    };
    terrainType: string;
  };
  environmental: {
    climate: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
  };
  accessibility: {
    roadAccess: boolean;
    publicTransport: string[];
    nearestStation: string;
    distanceToStation: number;
  };
  zoning: {
    landUse: string;
    buildingRestrictions: string[];
    heightLimit: number;
    coverageRatio: number;
  };
  utilities: {
    water: boolean;
    electricity: boolean;
    gas: boolean;
    sewage: boolean;
    internet: boolean;
  };
  risks: {
    floodRisk: 'low' | 'medium' | 'high';
    landslideRisk: 'low' | 'medium' | 'high';
    earthquakeRisk: 'low' | 'medium' | 'high';
    tsunamiRisk: 'low' | 'medium' | 'high';
  };
  analysis: {
    suitabilityScore: number;
    investmentPotential: number;
    developmentCost: number;
    timeline: string;
    recommendations: string[];
  };
  metadata: {
    source: 'topoexport';
    lastUpdated: Date;
    dataQuality: 'high' | 'medium' | 'low';
    coverage: number;
  };
}

interface TabijiExportIntegrationProps {
  isOpen: boolean;
  onClose: () => void;
  onDataImport: (data: TabijiExportData[]) => void;
  propertyId?: string;
  coordinates?: { latitude: number; longitude: number };
}

const TabijiExportIntegration: React.FC<TabijiExportIntegrationProps> = ({
  isOpen,
  onClose,
  onDataImport,
  propertyId,
  coordinates
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [importedData, setImportedData] = useState<TabijiExportData[]>([]);
  const [selectedData, setSelectedData] = useState<TabijiExportData | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'high-potential' | 'risky' | 'suitable'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');

  // Simular datos de TabijiExport
  const mockTabijiExportData: TabijiExportData[] = [
    {
      id: 'te-001',
      propertyId: 'prop-kusatsu-001',
      coordinates: {
        latitude: 36.6208,
        longitude: 138.5911,
        elevation: 1200
      },
      topography: {
        slope: 15,
        aspect: 'south',
        elevationRange: { min: 1150, max: 1250 },
        terrainType: 'mountainous'
      },
      environmental: {
        climate: 'temperate',
        temperature: 12,
        humidity: 65,
        windSpeed: 8,
        precipitation: 1200
      },
      accessibility: {
        roadAccess: true,
        publicTransport: ['bus', 'taxi'],
        nearestStation: 'Kusatsu Onsen',
        distanceToStation: 2.5
      },
      zoning: {
        landUse: 'residential',
        buildingRestrictions: ['height-limit', 'coverage-ratio'],
        heightLimit: 15,
        coverageRatio: 0.6
      },
      utilities: {
        water: true,
        electricity: true,
        gas: true,
        sewage: true,
        internet: true
      },
      risks: {
        floodRisk: 'low',
        landslideRisk: 'medium',
        earthquakeRisk: 'high',
        tsunamiRisk: 'low'
      },
      analysis: {
        suitabilityScore: 85,
        investmentPotential: 78,
        developmentCost: 2500000,
        timeline: '6-12 months',
        recommendations: [
          'Ideal para desarrollo de ryokan tradicional',
          'Excelente acceso a aguas termales',
          'Considerar medidas anti-sísmicas',
          'Potencial turístico alto'
        ]
      },
      metadata: {
        source: 'topoexport',
        lastUpdated: new Date(),
        dataQuality: 'high',
        coverage: 95
      }
    },
    {
      id: 'te-002',
      propertyId: 'prop-gunma-002',
      coordinates: {
        latitude: 36.3911,
        longitude: 139.0608,
        elevation: 200
      },
      topography: {
        slope: 5,
        aspect: 'east',
        elevationRange: { min: 180, max: 220 },
        terrainType: 'flat'
      },
      environmental: {
        climate: 'temperate',
        temperature: 18,
        humidity: 70,
        windSpeed: 5,
        precipitation: 1000
      },
      accessibility: {
        roadAccess: true,
        publicTransport: ['train', 'bus'],
        nearestStation: 'Maebashi',
        distanceToStation: 1.2
      },
      zoning: {
        landUse: 'mixed',
        buildingRestrictions: ['height-limit'],
        heightLimit: 20,
        coverageRatio: 0.8
      },
      utilities: {
        water: true,
        electricity: true,
        gas: true,
        sewage: true,
        internet: true
      },
      risks: {
        floodRisk: 'medium',
        landslideRisk: 'low',
        earthquakeRisk: 'medium',
        tsunamiRisk: 'low'
      },
      analysis: {
        suitabilityScore: 92,
        investmentPotential: 85,
        developmentCost: 1800000,
        timeline: '3-6 months',
        recommendations: [
          'Excelente para desarrollo residencial',
          'Acceso fácil a transporte público',
          'Bajo riesgo de desastres naturales',
          'Potencial comercial alto'
        ]
      },
      metadata: {
        source: 'topoexport',
        lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
        dataQuality: 'high',
        coverage: 98
      }
    }
  ];

  useEffect(() => {
    if (isOpen) {
      // Simular conexión con TopoExport
      setIsLoading(true);
      setConnectionStatus('connecting');
      
      setTimeout(() => {
        setIsConnected(true);
        setConnectionStatus('connected');
        setIsLoading(false);
        setImportedData(mockTabijiExportData);
      }, 2000);
    }
  }, [isOpen]);

  const connectToTabijiExport = async () => {
    setIsLoading(true);
    setConnectionStatus('connecting');
    
    try {
      // Simular API call a TabijiExport
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsConnected(true);
      setConnectionStatus('connected');
      setImportedData(mockTabijiExportData);
    } catch (error) {
      setConnectionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const importData = (data: TabijiExportData) => {
    onDataImport([data]);
    onClose();
  };

  const importAllData = () => {
    onDataImport(importedData);
    onClose();
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredData = importedData.filter(data => {
    const matchesSearch = data.propertyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         data.coordinates.latitude.toString().includes(searchQuery) ||
                         data.coordinates.longitude.toString().includes(searchQuery);
    
    let matchesFilter = true;
    switch (filterType) {
      case 'high-potential':
        matchesFilter = data.analysis.investmentPotential >= 80;
        break;
      case 'risky':
        matchesFilter = Object.values(data.risks).some(risk => risk === 'high');
        break;
      case 'suitable':
        matchesFilter = data.analysis.suitabilityScore >= 85;
        break;
    }
    
    return matchesSearch && matchesFilter;
  });

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Map className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">TabijiExport Integration</h2>
                <p className="text-sm text-gray-600">Análisis topográfico y geoespacial avanzado</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Connection Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-lg ${
                connectionStatus === 'connected' ? 'bg-green-100 text-green-800' :
                connectionStatus === 'connecting' ? 'bg-yellow-100 text-yellow-800' :
                connectionStatus === 'error' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-500' :
                  connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                  connectionStatus === 'error' ? 'bg-red-500' :
                  'bg-gray-500'
                }`}></div>
                <span className="text-sm font-medium">
                  {connectionStatus === 'connected' ? 'Conectado' :
                   connectionStatus === 'connecting' ? 'Conectando...' :
                   connectionStatus === 'error' ? 'Error de conexión' :
                   'Desconectado'}
                </span>
              </div>
              
              {!isConnected && (
                <button
                  onClick={connectToTabijiExport}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Conectando...</span>
                    </>
                  ) : (
                    <>
                      <Link className="w-4 h-4" />
                      <span>{t('tabijiexport.connect')}</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="text-sm text-gray-500">
              {importedData.length} propiedades analizadas
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex">
            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {!isConnected ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
                    <Map className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Conecta con TabijiExport
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    Accede a análisis topográficos avanzados, datos geoespaciales y 
                    evaluaciones de riesgo para propiedades en Japón.
                  </p>
                  <button
                    onClick={connectToTabijiExport}
                    disabled={isLoading}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Conectando...</span>
                      </>
                    ) : (
                      <>
                        <Link className="w-5 h-5" />
                        <span>Iniciar Conexión</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Buscar propiedades..."
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as any)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="all">Todas las propiedades</option>
                        <option value="high-potential">Alto potencial</option>
                        <option value="risky">Con riesgos</option>
                        <option value="suitable">Altamente adecuadas</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('map')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'map' ? 'bg-green-100 text-green-600' : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        <Map className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Data Grid */}
                  <div className={`grid gap-4 ${
                    viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                    viewMode === 'list' ? 'grid-cols-1' :
                    'grid-cols-1'
                  }`}>
                    {filteredData.map((data) => (
                      <motion.div
                        key={data.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => {
                          setSelectedData(data);
                          setShowDetails(true);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-green-600" />
                            <span className="font-semibold text-gray-900">{data.propertyId}</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getSuitabilityColor(data.analysis.suitabilityScore)}`}>
                            {data.analysis.suitabilityScore}% adecuado
                          </span>
                        </div>

                        {/* Coordinates */}
                        <div className="text-sm text-gray-600 mb-3">
                          <div>📍 {data.coordinates.latitude.toFixed(4)}, {data.coordinates.longitude.toFixed(4)}</div>
                          <div>⛰️ Elevación: {data.coordinates.elevation}m</div>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{data.analysis.investmentPotential}%</div>
                            <div className="text-xs text-gray-500">Potencial</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">¥{data.analysis.developmentCost.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">Costo desarrollo</div>
                          </div>
                        </div>

                        {/* Risks */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {Object.entries(data.risks).map(([risk, level]) => (
                            <span
                              key={risk}
                              className={`text-xs px-2 py-1 rounded ${getRiskColor(level)}`}
                            >
                              {risk}: {level}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              importData(data);
                            }}
                            className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Importar
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedData(data);
                              setShowDetails(true);
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Import All Button */}
                  {filteredData.length > 0 && (
                    <div className="text-center pt-4 border-t border-gray-200">
                      <button
                        onClick={importAllData}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
                      >
                        <Download className="w-5 h-5" />
                        <span>Importar Todas las Propiedades ({filteredData.length})</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Details Panel */}
            {showDetails && selectedData && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className="w-96 border-l border-gray-200 p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Detalles Topográficos</h3>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Topography */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                      <Mountain className="w-4 h-4 text-green-600" />
                      <span>Topografía</span>
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pendiente:</span>
                        <span className="font-medium">{selectedData.topography.slope}°</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Orientación:</span>
                        <span className="font-medium">{selectedData.topography.aspect}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tipo de terreno:</span>
                        <span className="font-medium">{selectedData.topography.terrainType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Environmental */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                      <Sun className="w-4 h-4 text-yellow-600" />
                      <span>Ambiental</span>
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Temperatura:</span>
                        <span className="font-medium">{selectedData.environmental.temperature}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Humedad:</span>
                        <span className="font-medium">{selectedData.environmental.humidity}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Precipitación:</span>
                        <span className="font-medium">{selectedData.environmental.precipitation}mm</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-600" />
                      <span>Recomendaciones</span>
                    </h4>
                    <div className="space-y-2">
                      {selectedData.analysis.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => importData(selectedData)}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      {t('tabijiexport.importToTabijiHouse')}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              Powered by <a href="https://app.tabijiexport.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">TabijiExport</a>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>Datos geoespaciales en tiempo real</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TabijiExportIntegration;
