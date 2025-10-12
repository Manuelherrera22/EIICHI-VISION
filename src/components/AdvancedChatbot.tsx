'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useArquitecto } from '@/contexts/ArquitectoContext';
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
  VolumeX,
  Mic,
  MicOff,
  Paperclip,
  Smile,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  History,
  Search,
  Filter,
  Sparkles,
  Wand2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  suggestions?: string[];
  attachments?: {
    type: 'image' | 'document' | 'link';
    url: string;
    name: string;
  }[];
  metadata?: {
    confidence?: number;
    source?: string;
    actionType?: 'property_search' | 'roi_calculation' | 'market_analysis' | 'general';
    propertyId?: string;
  };
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

interface AdvancedChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

const AdvancedChatbot: React.FC<AdvancedChatbotProps> = ({ 
  isOpen, 
  onToggle, 
  className = '' 
}) => {
  const { t } = useLanguage();
  const { userProfile } = useArquitecto();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [aiModel, setAiModel] = useState<'gpt-4' | 'claude-3' | 'gemini-pro'>('gpt-4');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize chat with welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      type: 'bot',
      content: t('chatbot.welcomeMessage'),
      timestamp: new Date(),
      suggestions: [
        t('chatbot.suggestions.propertySearch'),
        t('chatbot.suggestions.roiCalculation'),
        t('chatbot.suggestions.marketAnalysis'),
        t('chatbot.suggestions.investmentAdvice')
      ],
      metadata: {
        confidence: 1.0,
        source: 'system'
      }
    };
    
    // Si no hay mensajes o solo hay el mensaje de bienvenida, actualizarlo
    if (messages.length === 0 || (messages.length === 1 && messages[0].id === 'welcome')) {
      setMessages([welcomeMessage]);
    } else {
      // Si hay otros mensajes, actualizar solo el mensaje de bienvenida
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === 'welcome' ? welcomeMessage : msg
        )
      );
    }
  }, [t]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'es-ES';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSendMessage = async (content: string = inputValue) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Call AI API
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          userProfile: userProfile,
          model: aiModel,
          conversationHistory: messages.slice(-10) // Last 10 messages for context
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.response,
        timestamp: new Date(),
        suggestions: data.suggestions || [],
        metadata: {
          confidence: data.confidence || 0.8,
          source: data.source || 'ai',
          actionType: data.actionType,
          propertyId: data.propertyId
        }
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: t('chatbot.errorMessage'),
        timestamp: new Date(),
        metadata: {
          confidence: 0.5,
          source: 'error'
        }
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage(suggestion);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const handleRateMessage = (messageId: string, rating: 'up' | 'down') => {
    // Send rating to analytics
    console.log(`Rating message ${messageId}: ${rating}`);
  };

  const clearChat = () => {
    setMessages([]);
    setCurrentSession(null);
  };

  const saveChatSession = () => {
    const session: ChatSession = {
      id: Date.now().toString(),
      title: messages[1]?.content.substring(0, 50) + '...' || t('chatbot.newChat'),
      messages: messages,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['general']
    };
    setChatSessions(prev => [session, ...prev]);
  };

  const loadChatSession = (sessionId: string) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setMessages(session.messages);
      setCurrentSession(sessionId);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'user': return <User size={16} className="text-black" />;
      case 'bot': return <Bot size={16} className="text-black" />;
      case 'system': return <Info size={16} className="text-black" />;
      default: return <MessageCircle size={16} className="text-black" />;
    }
  };

  const getActionIcon = (actionType?: string) => {
    switch (actionType) {
      case 'property_search': return <Home size={16} className="text-black" />;
      case 'roi_calculation': return <DollarSign size={16} className="text-black" />;
      case 'market_analysis': return <TrendingUp size={16} className="text-black" />;
      default: return <Lightbulb size={16} className="text-black" />;
    }
  };

  return (
    <div className={`fixed bottom-20 right-24 z-50 ${className}`}>
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggle}
          className="w-14 h-14 bg-white text-gray-800 border-2 border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        >
          <MessageCircle size={24} />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
            {messages.length > 1 ? messages.length - 1 : 0}
          </div>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`bg-white rounded-2xl shadow-2xl border border-gray-200 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            } flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-black">
                    {t('chatbot.title')}
                  </h3>
                  <p className="text-xs text-black">
                    {t('chatbot.subtitle')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors text-black"
                  title={t('chatbot.history')}
                >
                  <History size={16} className="text-black" />
                </button>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors text-black"
                  title={t('chatbot.settings')}
                >
                  <Settings size={16} className="text-black" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors text-black"
                >
                  {isMinimized ? <ChevronUp size={16} className="text-black" /> : <ChevronDown size={16} className="text-black" />}
                </button>
                <button
                  onClick={onToggle}
                  className="p-1 hover:bg-gray-200 rounded transition-colors text-black"
                >
                  <XCircle size={16} className="text-black" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Settings Panel */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-gray-50 p-3 border-b border-gray-200"
                    >
                      <div className="space-y-3">
                        <div>
                          <label className="text-xs font-medium text-black">
                            {t('chatbot.aiModel')}
                          </label>
                          <select
                            value={aiModel}
                            onChange={(e) => setAiModel(e.target.value as any)}
                            className="w-full mt-1 text-xs border border-gray-300 rounded px-2 py-1 bg-white"
                          >
                            <option value="gpt-4">{t('chatbot.models.gpt4')}</option>
                            <option value="claude-3">{t('chatbot.models.claude3')}</option>
                            <option value="gemini-pro">{t('chatbot.models.geminiPro')}</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-black">
                            {t('chatbot.voiceEnabled')}
                          </span>
                          <button
                            onClick={() => setVoiceEnabled(!voiceEnabled)}
                            className={`w-8 h-4 rounded-full transition-colors ${
                              voiceEnabled ? 'bg-primary' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                              voiceEnabled ? 'translate-x-4' : 'translate-x-0.5'
                            }`} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Chat History Sidebar */}
                <AnimatePresence>
                  {showHistory && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      className="bg-gray-50 border-r border-gray-200 overflow-y-auto"
                    >
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-black">
                            {t('chatbot.chatHistory')}
                          </h4>
                          <button
                            onClick={saveChatSession}
                            className="text-xs text-primary hover:text-primary/80"
                          >
                            {t('chatbot.save')}
                          </button>
                        </div>
                        <div className="space-y-2">
                          {chatSessions.map((session) => (
                            <button
                              key={session.id}
                              onClick={() => loadChatSession(session.id)}
                              className={`w-full text-left p-2 rounded text-xs hover:bg-gray-200 transition-colors ${
                                currentSession === session.id ? 'bg-primary/10 text-primary' : 'text-black'
                              }`}
                            >
                              <div className="font-medium truncate">{session.title}</div>
                              <div className="text-black/70">
                                {session.updatedAt.toLocaleDateString()}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`flex items-start space-x-2 ${
                          message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === 'user' 
                              ? 'bg-blue-100' 
                              : 'bg-green-100'
                          }`}>
                            {getMessageIcon(message.type)}
                          </div>
                          <div className={`rounded-2xl px-4 py-2 ${
                            message.type === 'user'
                              ? 'bg-white text-gray-800 border-2 border-gray-300'
                              : 'bg-gray-100 text-black'
                          }`}>
                            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                            {message.metadata?.actionType && (
                              <div className="flex items-center space-x-1 mt-2 text-xs opacity-75">
                                {getActionIcon(message.metadata.actionType)}
                                <span>{message.metadata.actionType}</span>
                              </div>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs opacity-75">
                                {formatTime(message.timestamp)}
                              </span>
                              {message.type === 'bot' && (
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={() => handleCopyMessage(message.content)}
                                    className="p-1 hover:bg-gray-200 rounded transition-colors text-black"
                                    title={t('chatbot.copy')}
                                  >
                                    <Copy size={12} className="text-black" />
                                  </button>
                                  <button
                                    onClick={() => handleRateMessage(message.id, 'up')}
                                    className="p-1 hover:bg-gray-200 rounded transition-colors text-black"
                                    title={t('chatbot.rateUp')}
                                  >
                                    <ThumbsUp size={12} className="text-black" />
                                  </button>
                                  <button
                                    onClick={() => handleRateMessage(message.id, 'down')}
                                    className="p-1 hover:bg-gray-200 rounded transition-colors text-black"
                                    title={t('chatbot.rateDown')}
                                  >
                                    <ThumbsDown size={12} className="text-black" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Bot size={16} className="text-green-600" />
                        </div>
                        <div className="bg-gray-100 rounded-2xl px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Suggestions */}
                {showSuggestions && messages.length === 1 && (
                  <div className="p-4 border-t border-gray-200">
                    <div className="text-xs font-medium text-black mb-2">
                      {t('chatbot.suggestions.title')}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {messages[0]?.suggestions?.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-gray-100 hover:bg-gray-200 text-black px-3 py-1 rounded-full transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={t('chatbot.inputPlaceholder')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 text-black text-sm"
                        disabled={isTyping}
                      />
                      {voiceEnabled && (
                        <button
                          onClick={handleVoiceInput}
                          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                            isListening 
                              ? 'bg-red-500 text-black' 
                              : 'text-black hover:text-gray-600'
                          }`}
                        >
                          {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isTyping}
                      className="w-10 h-10 bg-white text-gray-800 border-2 border-gray-300 rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedChatbot;

