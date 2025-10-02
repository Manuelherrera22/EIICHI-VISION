'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Settings,
  MoreVertical,
  Home,
  BarChart3,
  Bell,
  Brain,
  Search,
  Star,
  Download,
  Layout,
  Zap,
  Shield,
  Plus,
  Minus,
  Filter,
  Grid,
  List,
  Columns,
  Map as MapIcon
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

interface SectionGroup {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  sections: Section[];
  isExpanded: boolean;
  isVisible: boolean;
}

interface OrganizedNavigationProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  onToggleSection: (sectionId: string) => void;
  sections: Section[];
}

const OrganizedNavigation: React.FC<OrganizedNavigationProps> = ({
  activeSection,
  onSectionChange,
  onToggleSection,
  sections
}) => {
  const { t } = useLanguage();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['core', 'tools']));
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Organizar secciones en grupos lógicos
  const sectionGroups: SectionGroup[] = [
    {
      id: 'core',
      title: t('dashboard.navigation.mainAnalysis'),
      icon: BarChart3,
      isExpanded: true,
      isVisible: true,
      sections: sections.filter(s => ['overview', 'metrics', 'alerts', 'predictions'].includes(s.id))
    },
    {
      id: 'tools',
      title: t('dashboard.navigation.tools'),
      icon: Settings,
      isExpanded: true,
      isVisible: true,
      sections: sections.filter(s => ['search', 'favorites', 'export'].includes(s.id))
    },
    {
      id: 'advanced',
      title: t('dashboard.navigation.advancedConfig'),
      icon: Shield,
      isExpanded: false,
      isVisible: showAdvanced,
      sections: sections.filter(s => ['customize', 'advanced-ai', 'pwa', 'security'].includes(s.id))
    }
  ];

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
    if (!showAdvanced) {
      setExpandedGroups(prev => new Set([...prev, 'advanced']));
    }
  };

  const getGroupIcon = (groupId: string) => {
    switch (groupId) {
      case 'core': return BarChart3;
      case 'tools': return Settings;
      case 'advanced': return Shield;
      default: return Settings;
    }
  };

  const getGroupColor = (groupId: string) => {
    switch (groupId) {
      case 'core': return 'bg-blue-100 text-blue-700';
      case 'tools': return 'bg-green-100 text-green-700';
      case 'advanced': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">{t('navigation.commandCenter')}</h2>
          <div className="flex items-center space-x-1">
            <button
              onClick={toggleAdvanced}
              className={`p-1.5 rounded-lg transition-colors ${
                showAdvanced ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'
              }`}
              title={showAdvanced ? t('navigation.hideAdvanced') : t('navigation.showAdvanced')}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {t('navigation.organizedByFunctionality')}
        </p>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto">
        {sectionGroups.map((group) => {
          if (!group.isVisible) return null;
          
          const GroupIcon = group.icon;
          const isExpanded = expandedGroups.has(group.id);
          
          return (
            <div key={group.id} className="border-b border-gray-100 last:border-b-0">
              {/* Group Header */}
              <motion.button
                onClick={() => toggleGroup(group.id)}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  group.id === 'advanced' ? 'bg-purple-50' : ''
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getGroupColor(group.id)}`}>
                    <GroupIcon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-sm">{group.title}</div>
                    <div className="text-xs text-gray-500">
                      {group.sections.length} {group.sections.length === 1 ? t('navigation.section') : t('navigation.sections')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    group.sections.filter(s => s.isVisible).length === group.sections.length
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {group.sections.filter(s => s.isVisible).length}/{group.sections.length}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </motion.button>

              {/* Group Sections */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-2 space-y-1">
                      {group.sections.map((section) => {
                        const SectionIcon = section.icon;
                        return (
                          <motion.button
                            key={section.id}
                            onClick={() => onSectionChange(section.id)}
                            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                              activeSection === section.id
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                              activeSection === section.id
                                ? 'bg-white/20'
                                : section.color.replace('bg-', 'bg-').replace('-600', '-100')
                            }`}>
                              <SectionIcon className={`w-3 h-3 ${
                                activeSection === section.id
                                  ? 'text-white'
                                  : section.color.replace('bg-', 'text-').replace('-600', '-600')
                              }`} />
                            </div>
                            
                            <div className="flex-1 text-left">
                              <div className="font-medium text-sm">{section.title}</div>
                              <div className={`text-xs ${
                                activeSection === section.id
                                  ? 'text-white/80'
                                  : 'text-gray-500'
                              }`}>
                                {section.description}
                              </div>
                            </div>
                            
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleSection(section.id);
                              }}
                              className={`p-1 rounded transition-colors ${
                                activeSection === section.id 
                                  ? 'hover:bg-white/20' 
                                  : 'hover:bg-gray-200'
                              }`}
                            >
                              {section.isVisible ? (
                                <Eye className={`w-3 h-3 ${
                                  activeSection === section.id ? 'text-white' : 'text-gray-400'
                                }`} />
                              ) : (
                                <EyeOff className={`w-3 h-3 ${
                                  activeSection === section.id ? 'text-white' : 'text-gray-400'
                                }`} />
                              )}
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{t('navigation.systemActive')}</span>
          </div>
          <div className="mt-1">
            {sections.filter(s => s.isVisible).length} de {sections.length} {t('navigation.visibleSections')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizedNavigation;
