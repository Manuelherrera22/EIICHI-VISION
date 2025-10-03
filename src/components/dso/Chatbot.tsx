'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  Settings,
  Trash2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Lightbulb,
  Target,
  DollarSign,
  Home,
  Shield,
  TrendingUp,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  Download,
  Share2,
  Star,
  Bookmark,
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  Clock,
  Zap,
  Brain,
  Eye,
  EyeOff,
  Volume2,
  VolumeX
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  suggestions?: string[];
  attachments?: {
    type: 'property' | 'analysis' | 'prediction' | 'alert';
    data: any;
  }[];
}

interface ChatbotProps {
  userId: string;
  analysis: any;
  userName?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ userId, analysis, userName = "Usuario Demo" }) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mensaje de bienvenida inicial
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        type: 'bot',
        content: t('chatbot.hello', { userName }),
        timestamp: new Date(),
        suggestions: [
          t('chatbot.suggestions.improveIVI'),
          t('chatbot.suggestions.showGunmaOpportunities'),
          t('chatbot.suggestions.recommendProperties'),
          t('chatbot.suggestions.explainRiskAnalysis')
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [userName, messages.length]);

  const generateBotResponse = (userMessage: string): ChatMessage => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Respuestas basadas en palabras clave
    if (lowerMessage.includes('ivi') || lowerMessage.includes('inversión')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `${t('chatbot.currentIVI', { score: analysis.investmentReadiness.score })}

**Análisis detallado:**
• ${t('chatbot.profileShows')}
• Recomiendo considerar propiedades tradicionales japonesas
• El mercado de Gunma ofrece excelentes oportunidades
• Tu nivel de riesgo es ${analysis.riskCategory.toLowerCase()}

**Recomendaciones para mejorar tu IVI:**
1. Diversifica tu portfolio con propiedades de diferentes tipos
2. Considera inversiones en zonas con potencial de crecimiento
3. Mantén un fondo de emergencia del 20% del valor total
4. Monitorea las tendencias del mercado regularmente

¿Te gustaría que profundice en algún aspecto específico?`,
        timestamp: new Date(),
        suggestions: [
          t('chatbot.suggestions.recommendProperties'),
          t('chatbot.suggestions.showSpecificOpportunities'),
          t('chatbot.suggestions.diversifyPortfolio')
        ]
      };
    }
    
    if (lowerMessage.includes('gunma') || lowerMessage.includes('oportunidad')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `**Oportunidades en Gunma** 🏔️

Basado en tu perfil y las tendencias del mercado, estas son las mejores oportunidades:

**1. Kusatsu Onsen Properties** 🛁
• ROI potencial: 15-20%
• Demanda turística creciente
• Propiedades tradicionales disponibles
• Precio promedio: ¥45M

**2. Takasaki Urban Development** 🏙️
• Crecimiento urbano sostenido
• Acceso a Tokyo en 1 hora
• Nuevos proyectos residenciales
• Precio promedio: ¥32M

**3. Minakami Rural Properties** 🌿
• Inversión a largo plazo
• Potencial de desarrollo turístico
• Propiedades con terreno extenso
• Precio promedio: ¥28M

**Mi recomendación:** Considera Kusatsu por su potencial de crecimiento y alineación con tu perfil conservador.`,
        timestamp: new Date(),
        suggestions: [
          t('chatbot.suggestions.showKusatsuProperties'),
          t('chatbot.suggestions.buyingProcess'),
          t('chatbot.suggestions.requiredDocuments')
        ]
      };
    }
    
    if (lowerMessage.includes('riesgo') || lowerMessage.includes('análisis')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `**Análisis de Riesgo Detallado** 🛡️

**Tu perfil de riesgo:** ${analysis.riskCategory}

**Factores de Riesgo Identificados:**
• **Financiero:** Bajo riesgo - Estabilidad demostrada
• **Cultural:** Riesgo moderado - Experiencia limitada en Japón
• **Mercado:** Bajo riesgo - Mercado estable en Gunma
• **Liquidez:** Riesgo bajo - Propiedades con buena demanda

**Recomendaciones de Mitigación:**
1. **Fondo de emergencia:** Mantén 6 meses de gastos
2. **Mentor cultural:** Considera un consultor local
3. **Seguro de propiedad:** Protección completa
4. **Diversificación:** No pongas todos los huevos en una canasta

**Nivel de confianza:** 85% para inversiones en tu rango de riesgo.`,
        timestamp: new Date(),
        suggestions: [
          t('chatbot.suggestions.reduceCulturalRisk'),
          t('chatbot.suggestions.showInsuranceOptions'),
          t('chatbot.suggestions.whatIsCulturalMentor')
        ]
      };
    }
    
    if (lowerMessage.includes('proceso') || lowerMessage.includes('compra') || lowerMessage.includes('documento')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: `**Proceso de Compra en Japón** 📋

**Paso a paso:**

**1. Preparación (1-2 meses)**
• Verificar elegibilidad como extranjero
• Preparar documentos financieros
• Obtener traducciones certificadas
• Abrir cuenta bancaria japonesa

**2. Búsqueda y Evaluación (2-3 meses)**
• Trabajar con agente inmobiliario certificado
• Inspecciones de propiedades
• Evaluación legal y técnica
• Negociación de precios

**3. Compra (1-2 meses)**
• Contrato de compraventa
• Pago de depósito (10%)
• Due diligence final
• Cierre y transferencia

**Documentos Requeridos:**
• Pasaporte válido
• Comprobantes de ingresos
• Estados bancarios
• Certificado de solvencia
• Traducciones certificadas

¿Necesitas ayuda con algún paso específico?`,
        timestamp: new Date(),
        suggestions: [
          t('chatbot.suggestions.findReliableAgent'),
          t('chatbot.suggestions.additionalCosts'),
          t('chatbot.suggestions.openBankAccount')
        ]
      };
    }
    
    // Respuesta por defecto
    return {
      id: Date.now().toString(),
      type: 'bot',
      content: `Entiendo tu pregunta sobre "${userMessage}". 

Basado en tu perfil actual:
• **IVI:** ${analysis.investmentReadiness.score}%
• **IVM:** ${analysis.migrationReadiness.score}%
• **ISE:** ${analysis.lifestyleAlignment.score}%
• **Perfil:** ${analysis.riskCategory}

¿Podrías ser más específico sobre lo que te gustaría saber? Puedo ayudarte con:
• Análisis de propiedades específicas
• Recomendaciones de inversión
• Proceso de compra en Japón
• Tendencias del mercado
• Predicciones de IA

¿En qué área te gustaría profundizar?`,
      timestamp: new Date(),
      suggestions: [
        t('chatbot.suggestions.analyzeProfile'),
        t('chatbot.suggestions.investmentOpportunities'),
        t('chatbot.suggestions.buyingProcess'),
        t('chatbot.suggestions.marketTrends')
      ]
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <>
      {/* Chat Button - Responsive */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center z-50"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>
      )}

      {/* Chat Window - Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 ${
              isMinimized 
                ? 'w-72 sm:w-80 h-16' 
                : 'w-[calc(100vw-2rem)] sm:w-96 h-[calc(100vh-2rem)] sm:h-[600px] max-w-sm sm:max-w-none'
            }`}
          >
            {/* Header - Responsive */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base">{t('chatbot.aiAssistant')}</h3>
                  <p className="text-blue-100 text-xs hidden sm:block">{t('chatbot.investmentSpecialist')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1 text-white hover:text-blue-200 transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" /> : <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />}
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 text-white hover:text-blue-200 transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" /> : <Minimize2 className="w-3 h-3 sm:w-4 sm:h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-white hover:text-blue-200 transition-colors"
                >
                  <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages - Responsive */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 h-[calc(100vh-12rem)] sm:h-[480px]">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[85%] sm:max-w-[80%] ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-black'
                        }`}>
                          {message.type === 'user' ? <User className="w-3 h-3 sm:w-4 sm:h-4" /> : <Bot className="w-3 h-3 sm:w-4 sm:h-4" />}
                        </div>
                        
                        <div className={`rounded-2xl p-2 sm:p-3 ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-black'
                        }`}>
                          <div className="text-xs sm:text-sm whitespace-pre-wrap">{message.content}</div>
                          <div className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-blue-100' : 'text-black/70'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                          
                          {/* Message Actions */}
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => copyMessage(message.content)}
                              className="p-1 hover:bg-white/20 rounded transition-colors"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                            {message.type === 'bot' && (
                              <>
                                <button className="p-1 hover:bg-white/20 rounded transition-colors">
                                  <ThumbsUp className="w-3 h-3" />
                                </button>
                                <button className="p-1 hover:bg-white/20 rounded transition-colors">
                                  <ThumbsDown className="w-3 h-3" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Suggestions - Responsive */}
                  {messages.length > 0 && messages[messages.length - 1].suggestions && (
                    <div className="space-y-2">
                      <p className="text-xs text-black">{t('chatbot.suggestions')}</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full hover:bg-blue-200 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Typing Indicator - Responsive */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl p-2 sm:p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input - Responsive */}
                <div className="p-3 sm:p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder={t('chatbot.writeMessage')}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button
                        onClick={clearChat}
                        className="p-1 text-black hover:text-gray-600 transition-colors"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    
                    <div className="text-xs text-black hidden sm:block">
                      {t('chatbot.poweredByAI')}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
