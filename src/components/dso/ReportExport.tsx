'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  Download,
  FileText,
  FileSpreadsheet,
  Image,
  Calendar,
  Filter,
  Settings,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  User,
  BarChart3,
  PieChart,
  TrendingUp,
  Bell,
  Brain,
  Target,
  DollarSign,
  Home,
  Shield,
  Zap,
  Star,
  Eye,
  EyeOff,
  Share2,
  Mail,
  Printer
} from 'lucide-react';

interface ExportData {
  analysis: any;
  metrics: any[];
  alerts: any[];
  predictions: any[];
  userName: string;
  userEmail: string;
  generatedAt: Date;
}

interface ReportExportProps {
  userId: string;
  analysis: any;
  metrics?: any[];
  alerts?: any[];
  predictions?: any[];
  userName?: string;
  userEmail?: string;
}

const ReportExport: React.FC<ReportExportProps> = ({
  userId,
  analysis,
  metrics = [],
  alerts = [],
  predictions = [],
  userName = "Demo User",
  userEmail = "demo@tabijihouse.com"
}) => {
  const { t } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<'pdf' | 'excel' | 'image'>('pdf');
  const [includeSections, setIncludeSections] = useState({
    overview: true,
    metrics: true,
    alerts: true,
    predictions: true,
    charts: true
  });
  const [exportFormat, setExportFormat] = useState<'detailed' | 'summary' | 'custom'>('detailed');
  const [isGenerating, setIsGenerating] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const exportData: ExportData = {
    analysis,
    metrics,
    alerts,
    predictions,
    userName,
    userEmail,
    generatedAt: new Date()
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Header
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text(t('export.reportTitle'), pageWidth / 2, 20, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generado para: ${userName}`, 20, 35);
      pdf.text(`Email: ${userEmail}`, 20, 42);
      pdf.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, 49);
      
      // Overview Section
      if (includeSections.overview) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(t('export.executiveSummary'), 20, 70);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const overviewText = `
${t('export.profileAnalysis')}:
• ${t('export.profileCompleteness')}: ${analysis.profileCompleteness}%
• ${t('export.successProbability')}: ${analysis.successProbability.overall}%
• ${t('export.riskCategory')}: ${analysis.riskCategory}
• ${t('export.userEngagement')}: ${analysis.engagementLevel}

${t('export.mainMetrics')}:
• ${t('export.investmentReadiness')}: ${analysis.investmentReadiness.score}%
• ${t('export.migrationReadiness')}: ${analysis.migrationReadiness.score}%
• ${t('export.lifestyleAlignment')}: ${analysis.lifestyleAlignment.score}%
        `;
        
        const splitText = pdf.splitTextToSize(overviewText, pageWidth - 40);
        pdf.text(splitText, 20, 80);
      }
      
      // Metrics Section
      if (includeSections.metrics && metrics.length > 0) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(t('export.realtimeMetrics'), 20, 140);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        metrics.forEach((metric, index) => {
          const yPos = 150 + (index * 15);
          pdf.text(`• ${metric.name}: ${metric.value}% (${metric.trend})`, 20, yPos);
        });
      }
      
      // Alerts Section
      if (includeSections.alerts && alerts.length > 0) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(t('export.intelligentAlerts'), 20, 200);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        alerts.slice(0, 5).forEach((alert, index) => {
          const yPos = 210 + (index * 20);
          pdf.text(`• ${alert.title}`, 20, yPos);
          pdf.text(`  ${alert.message}`, 25, yPos + 8);
        });
      }
      
      // Predictions Section
      if (includeSections.predictions && predictions.length > 0) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(t('export.aiPredictions'), 20, 300);
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        predictions.slice(0, 3).forEach((prediction, index) => {
          const yPos = 310 + (index * 25);
          pdf.text(`• ${prediction.title}`, 20, yPos);
          pdf.text(`  Confianza: ${prediction.confidence}%`, 25, yPos + 8);
          pdf.text(`  Recomendación: ${prediction.recommendation}`, 25, yPos + 16);
        });
      }
      
      // Footer
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'italic');
      pdf.text(t('export.generatedBy'), pageWidth / 2, pageHeight - 10, { align: 'center' });
      
      const fileName = `reporte-analisis-${userName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateExcel = () => {
    setIsGenerating(true);
    try {
      const workbook = XLSX.utils.book_new();
      
      // Overview Sheet
      const overviewData = [
        ['Métrica', 'Valor', 'Descripción'],
        ['Profile Completeness', `${analysis.profileCompleteness}%`, 'User profile completion percentage'],
        ['Success Probability', `${analysis.successProbability.overall}%`, 'Overall success probability'],
        ['Categoría de Riesgo', analysis.riskCategory, 'Categorización del perfil de riesgo'],
        ['Nivel de Engagement', analysis.engagementLevel, 'Nivel de participación del usuario'],
        ['IVI', `${analysis.investmentReadiness.score}%`, 'Índice de Viabilidad de Inversión'],
        ['IVM', `${analysis.migrationReadiness.score}%`, 'Índice de Viabilidad Migratoria'],
        ['ISE', `${analysis.lifestyleAlignment.score}%`, 'Índice de Sincronización de Estilo de Vida']
      ];
      
      const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData);
      XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Resumen');
      
      // Metrics Sheet
      if (includeSections.metrics && metrics.length > 0) {
        const metricsData = [
          ['Timestamp', 'Métrica', 'Valor', 'Tendencia', 'Categoría'],
          ...metrics.map(metric => [
            metric.timestamp,
            metric.name || 'Métrica',
            metric.value,
            metric.trend || 'Estable',
            metric.category || 'General'
          ])
        ];
        
        const metricsSheet = XLSX.utils.aoa_to_sheet(metricsData);
        XLSX.utils.book_append_sheet(workbook, metricsSheet, 'Métricas');
      }
      
      // Alerts Sheet
      if (includeSections.alerts && alerts.length > 0) {
        const alertsData = [
          ['ID', 'Tipo', 'Prioridad', 'Título', 'Mensaje', 'Categoría', 'Fecha', 'Leído'],
          ...alerts.map(alert => [
            alert.id,
            alert.type,
            alert.priority,
            alert.title,
            alert.message,
            alert.category,
            alert.timestamp,
            alert.isRead ? 'Sí' : 'No'
          ])
        ];
        
        const alertsSheet = XLSX.utils.aoa_to_sheet(alertsData);
        XLSX.utils.book_append_sheet(workbook, alertsSheet, 'Alertas');
      }
      
      // Predictions Sheet
      if (includeSections.predictions && predictions.length > 0) {
        const predictionsData = [
          ['ID', 'Tipo', 'Título', 'Confianza', 'Probabilidad', 'Impacto', 'Recomendación', 'Fecha Creación'],
          ...predictions.map(prediction => [
            prediction.id,
            prediction.type,
            prediction.title,
            `${prediction.confidence}%`,
            `${prediction.probability}%`,
            prediction.impact,
            prediction.recommendation,
            prediction.createdAt
          ])
        ];
        
        const predictionsSheet = XLSX.utils.aoa_to_sheet(predictionsData);
        XLSX.utils.book_append_sheet(workbook, predictionsSheet, 'Predicciones');
      }
      
      const fileName = `reporte-analisis-${userName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);
      
    } catch (error) {
      console.error('Error generating Excel:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async () => {
    setIsGenerating(true);
    try {
      if (dashboardRef.current) {
        const canvas = await html2canvas(dashboardRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        const imgData = canvas.toDataURL('image/png');
        const fileName = `dashboard-screenshot-${userName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.png`;
        
        // Create download link
        const link = document.createElement('a');
        link.download = fileName;
        link.href = imgData;
        link.click();
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      switch (exportType) {
        case 'pdf':
          await generatePDF();
          break;
        case 'excel':
          generateExcel();
          break;
        case 'image':
          await generateImage();
          break;
      }
    } catch (error) {
      console.error('Error in export:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportTypes = [
    { id: 'pdf', label: 'PDF', icon: FileText, description: t('export.pdfDescription') },
    { id: 'excel', label: 'Excel', icon: FileSpreadsheet, description: t('export.excelDescription') },
    { id: 'image', label: t('export.imageDescription'), icon: Image, description: t('export.imageDescription') }
  ];

  const formatOptions = [
    { id: 'detailed', label: t('export.detailed'), description: t('export.detailedDescription') },
    { id: 'summary', label: t('export.summary'), description: t('export.summaryDescription') },
    { id: 'custom', label: t('export.custom'), description: t('export.customDescription') }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* Header - Responsive */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Download className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">{t('navigation.exportReports')}</h3>
              <p className="text-xs sm:text-sm text-gray-500">{t('export.subtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Export Type Selection - Responsive */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t('export.exportType')}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {exportTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setExportType(type.id as any)}
                  className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                    exportType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                      exportType === type.id ? 'text-blue-600' : 'text-gray-500'
                    }`} />
                    <span className={`font-medium text-sm sm:text-base ${
                      exportType === type.id ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {type.label}
                    </span>
                  </div>
                  <p className={`text-xs sm:text-sm ${
                    exportType === type.id ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {type.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Format Selection - Responsive */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t('export.reportFormat')}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {formatOptions.map((format) => (
              <button
                key={format.id}
                onClick={() => setExportFormat(format.id as any)}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                  exportFormat === format.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${
                    exportFormat === format.id ? 'bg-green-600' : 'bg-gray-400'
                  }`}>
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className={`font-medium text-sm sm:text-base ${
                    exportFormat === format.id ? 'text-green-900' : 'text-gray-900'
                  }`}>
                    {format.label}
                  </span>
                </div>
                <p className={`text-xs sm:text-sm ${
                  exportFormat === format.id ? 'text-green-700' : 'text-gray-600'
                }`}>
                  {format.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Sections Selection - Responsive */}
        {exportFormat === 'custom' && (
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t('export.sectionsToInclude')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {Object.entries(includeSections).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setIncludeSections(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-900 capitalize">
                    {key === 'overview' ? t('export.executiveSummary') :
                     key === 'metrics' ? t('export.realtimeMetrics') :
                     key === 'alerts' ? t('export.intelligentAlerts') :
                     key === 'predictions' ? t('export.aiPredictions') :
                     key === 'charts' ? t('export.chartsVisualizations') : key}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Export Preview - Responsive */}
        <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">{t('export.reportPreview')}</h4>
          <div className="space-y-2 text-xs sm:text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <User className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{t('export.user')} {userName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{t('export.email')} {userEmail}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{t('export.generationDate')} {new Date().toLocaleDateString('es-ES')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{t('export.format')} {exportFormat === 'detailed' ? t('export.detailedFormat') : exportFormat === 'summary' ? t('export.summaryFormat') : t('export.customFormat')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{t('export.type')} {exportType.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Export Button - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200 space-y-3 sm:space-y-0">
          <div className="text-xs sm:text-sm text-gray-500">
            {isGenerating ? t('export.generatingReport') : t('export.readyToExport')}
          </div>
          
          <button
            onClick={handleExport}
            disabled={isGenerating || isExporting}
            className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            ) : (
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
            <span className="font-medium text-sm sm:text-base">
              {isGenerating ? t('export.generating') : `${t('export.exportButton')} ${exportType.toUpperCase()}`}
            </span>
          </button>
        </div>
      </div>

      {/* Hidden dashboard reference for image export */}
      <div ref={dashboardRef} className="hidden">
        {/* This would contain the dashboard content for image export */}
      </div>
    </div>
  );
};

export default ReportExport;
