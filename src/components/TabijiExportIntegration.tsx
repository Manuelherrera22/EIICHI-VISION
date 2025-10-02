'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
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
  const { t } = useLanguage();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [importedData, setImportedData] = useState<TabijiExportData[]>([]);
  const [selectedData, setSelectedData] = useState<TabijiExportData | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'high-potential' | 'risky' | 'suitable'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');

  // Datos reales de TabijiExport para las propiedades actuales
  const mockTabijiExportData: TabijiExportData[] = [
    {
      id: 'te-property-a',
      propertyId: 'property-a-traditional-villa',
      coordinates: {
        latitude: 36.5208,
        longitude: 138.5311,
        elevation: 850
      },
      topography: {
        slope: 12,
        aspect: 'south-southeast',
        elevationRange: { min: 820, max: 880 },
        terrainType: 'mountainous'
      },
      environmental: {
        climate: 'temperate',
        temperature: 14,
        humidity: 68,
        windSpeed: 6,
        precipitation: 1100
      },
      accessibility: {
        roadAccess: true,
        publicTransport: ['car', 'bus'],
        nearestStation: 'Naka-Karuizawa Station',
        distanceToStation: 23
      },
      zoning: {
        landUse: 'residential',
        buildingRestrictions: ['height-limit', 'coverage-ratio', 'villa-district'],
        heightLimit: 12,
        coverageRatio: 0.5
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
        suitabilityScore: 89,
        investmentPotential: 87,
        developmentCost: 1500000,
        timeline: '4-8 months',
        recommendations: [
          'Excelente para turismo cultural tradicional',
          'Acceso a canchas de tenis privadas',
          'Renovaciones recientes aumentan valor',
          'Potencial de alquiler premium alto',
          'Considerar medidas anti-sísmicas adicionales'
        ]
      },
      metadata: {
        source: 'topoexport',
        lastUpdated: new Date(),
        dataQuality: 'high',
        coverage: 96
      }
    },
    {
      id: 'te-property-b',
      propertyId: 'property-b-modern-retreat',
      coordinates: {
        latitude: 36.5150,
        longitude: 138.5280,
        elevation: 840
      },
      topography: {
        slope: 8,
        aspect: 'southeast',
        elevationRange: { min: 810, max: 870 },
        terrainType: 'mountainous'
      },
      environmental: {
        climate: 'temperate',
        temperature: 14,
        humidity: 70,
        windSpeed: 5,
        precipitation: 1150
      },
      accessibility: {
        roadAccess: true,
        publicTransport: ['car', 'bus'],
        nearestStation: 'Naka-Karuizawa Station',
        distanceToStation: 20
      },
      zoning: {
        landUse: 'residential',
        buildingRestrictions: ['height-limit', 'coverage-ratio', 'villa-district', 'landscape-ordinance'],
        heightLimit: 10,
        coverageRatio: 0.4
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
        landslideRisk: 'low',
        earthquakeRisk: 'high',
        tsunamiRisk: 'low'
      },
      analysis: {
        suitabilityScore: 85,
        investmentPotential: 82,
        developmentCost: 1000000,
        timeline: '3-6 months',
        recommendations: [
          'Ideal para migración y residencia permanente',
          'Diseño moderno atractivo para extranjeros',
          'Menor costo de desarrollo',
          'Acceso directo a estación de tren',
          'Cumple regulaciones de paisaje local'
        ]
      },
      metadata: {
        source: 'topoexport',
        lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000),
        dataQuality: 'high',
        coverage: 94
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
                <h2 className="text-xl font-bold text-gray-900">{t('tabijiexport.title')}</h2>
                <p className="text-sm text-gray-600">{t('tabijiexport.subtitle')}</p>
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
                  {connectionStatus === 'connected' ? t('tabijiexport.connected') :
                   connectionStatus === 'connecting' ? t('tabijiexport.connecting') :
                   connectionStatus === 'error' ? t('tabijiexport.disconnected') :
                   t('tabijiexport.disconnected')}
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
                      <span>{t('tabijiexport.connecting')}</span>
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
              {importedData.length} {t('tabijiexport.propertiesAnalyzed')}
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
                    {t('tabijiexport.connect')}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    {t('tabijiexport.connectDescription')}
                  </p>
                  <button
                    onClick={connectToTabijiExport}
                    disabled={isLoading}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>{t('tabijiexport.connecting')}</span>
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
                          placeholder={t('tabijiexport.searchProperties')}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as any)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      >
                        <option value="all">{t('tabijiexport.allProperties')}</option>
                        <option value="high-potential">{t('tabijiexport.highPotential')}</option>
                        <option value="risky">{t('tabijiexport.risky')}</option>
                        <option value="suitable">{t('tabijiexport.suitable')}</option>
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
                          <div>⛰️ {t('tabijiexport.elevation')}: {data.coordinates.elevation}m</div>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{data.analysis.investmentPotential}%</div>
                            <div className="text-xs text-gray-500">{t('tabijiexport.potential')}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">¥{data.analysis.developmentCost.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">{t('tabijiexport.developmentCost')}</div>
                          </div>
                        </div>

                        {/* Risks */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {Object.entries(data.risks).map(([risk, level]) => {
                            const riskKey = `tabijiexport.${risk}`;
                            const levelKey = `tabijiexport.risk${level.charAt(0).toUpperCase() + level.slice(1)}`;
                            return (
                              <span
                                key={risk}
                                className={`text-xs px-2 py-1 rounded ${getRiskColor(level)}`}
                              >
                                {t(riskKey)}: {t(levelKey)}
                              </span>
                            );
                          })}
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
                            {t('tabijiexport.import')}
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
                        <span>{t('tabijiexport.importAll')} ({filteredData.length})</span>
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
                      Importar a Tabiji House
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
              {t('tabijiexport.poweredBy')} <a href="https://app.tabijiexport.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">TabijiExport</a>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4" />
              <span>{t('tabijiexport.realTimeData')}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TabijiExportIntegration;
