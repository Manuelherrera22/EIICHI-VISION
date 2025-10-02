'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Target, Zap, Users, Heart } from 'lucide-react';
import { IVPScore } from '@/types/dso';

interface IVPWidgetProps {
  score: IVPScore;
  title: string;
  subtitle?: string;
  className?: string;
}

const IVPWidget: React.FC<IVPWidgetProps> = ({ 
  score, 
  title, 
  subtitle, 
  className = '' 
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'investment': return <Target className="w-6 h-6" />;
      case 'migration': return <Users className="w-6 h-6" />;
      case 'lifestyle': return <Heart className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'investment': return 'from-green-500 to-emerald-600';
      case 'migration': return 'from-blue-500 to-cyan-600';
      case 'lifestyle': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = () => {
    switch (score.trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excelente progreso hacia tu objetivo';
    if (percentage >= 80) return 'Muy buen avance en tu proyecto';
    if (percentage >= 70) return 'Buen progreso, hay oportunidades de mejora';
    if (percentage >= 60) return 'Progreso sólido, enfócate en las áreas clave';
    if (percentage >= 40) return 'Buen inicio, hay mucho potencial por explorar';
    return 'Comienza tu journey hacia el éxito';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden ${className}`}
    >
      {/* Header con gradiente */}
      <div className={`bg-gradient-to-r ${getCategoryColor(score.category)} p-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getCategoryIcon(score.category)}
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              {subtitle && (
                <p className="text-white/80 text-sm">{subtitle}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getTrendIcon()}
            <span className="text-sm text-white/80">
              Actualizado {score.lastUpdated.toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Score principal */}
        <div className="text-center">
          <div className="text-6xl font-bold mb-2">{score.percentage}%</div>
          <p className="text-white/90 text-lg">{getScoreMessage(score.percentage)}</p>
        </div>
      </div>

      {/* Contenido del widget */}
      <div className="p-6">
        {/* Fortalezas */}
        {score.strengths.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Puntos Fuertes
            </h3>
            <ul className="space-y-2">
              {score.strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2 text-gray-700">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Oportunidades */}
        {score.opportunities.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
              Áreas de Oportunidad para Mejorar tu IVP
            </h3>
            <ul className="space-y-2">
              {score.opportunities.map((opportunity, index) => (
                <li key={index} className="flex items-start space-x-2 text-gray-700">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{opportunity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200"
        >
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              ¿Listo para elevar tu puntuación?
            </p>
            <button className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Explorar Módulos Estratégicos
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IVPWidget;




