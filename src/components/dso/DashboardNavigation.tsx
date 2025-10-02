'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Bell,
  Brain,
  Download,
  MessageCircle,
  Home,
  TrendingUp,
  Target,
  Shield,
  Users,
  Settings,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  Star,
  Zap,
  Activity,
  Calendar,
  Filter,
  Search,
  RefreshCw,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  color: string;
  isVisible: boolean;
  order: number;
}

interface DashboardNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onToggleSection: (section: string) => void;
  sections: Section[];
}

const DashboardNavigation: React.FC<DashboardNavigationProps> = ({
  activeSection,
  onSectionChange,
  onToggleSection,
  sections
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleSections = filteredSections.filter(section => section.isVisible);
  const hiddenSections = filteredSections.filter(section => !section.isVisible);

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h3 className="text-lg font-bold text-gray-900">Centro de Mando</h3>
              <p className="text-sm text-gray-500">Navegación inteligente</p>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar secciones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      )}

      {/* Sections */}
      <div className="p-4 space-y-2">
        {/* Visible Sections */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Secciones Activas
              </span>
              <span className="text-xs text-gray-400">{visibleSections.length}</span>
            </div>
          )}
          
          {visibleSections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  activeSection === section.id
                    ? `${section.color} text-white shadow-md`
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && (
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">{section.title}</div>
                    <div className={`text-xs ${
                      activeSection === section.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {section.description}
                    </div>
                  </div>
                )}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSection(section.id);
                  }}
                  className={`p-1 rounded transition-colors cursor-pointer ${
                    activeSection === section.id 
                      ? 'hover:bg-white/20' 
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Hidden Sections */}
        {hiddenSections.length > 0 && (
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="flex items-center justify-between mb-2 mt-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Secciones Ocultas
                </span>
                <span className="text-xs text-gray-400">{hiddenSections.length}</span>
              </div>
            )}
            
            {hiddenSections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-500 hover:bg-gray-50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && (
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm">{section.title}</div>
                      <div className="text-xs text-gray-400">{section.description}</div>
                    </div>
                  )}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSection(section.id);
                    }}
                    className="p-1 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <EyeOff className="w-3 h-3" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
              <span>Configuración</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Actualizar Todo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardNavigation;
