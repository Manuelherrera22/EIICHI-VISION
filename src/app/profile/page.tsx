'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import Layout from '@/components/Layout'
import { User, Mail, Phone, MapPin, Calendar, Save, Edit, X } from 'lucide-react'

export default function ProfilePage() {
  const { user, updatePassword } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    phone: '',
    country: '',
    interests: '',
    budget: '',
    notes: ''
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      document.title = 'Perfil - Tabiji House | Mi Cuenta';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Gestiona tu perfil y configuración en Tabiji House. Actualiza tu información personal y preferencias de inversión.');
      }
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', 'perfil, cuenta, configuración, Tabiji House, información personal');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    setMessage(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setMessage({ type: 'success', text: 'Perfil actualizado exitosamente' })
      setIsEditing(false)
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar el perfil' })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      fullName: user?.user_metadata?.full_name || '',
      phone: '',
      country: '',
      interests: '',
      budget: '',
      notes: ''
    })
    setIsEditing(false)
    setMessage(null)
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-primary">Mi Perfil</h1>
                  <p className="text-secondary mt-2">
                    Gestiona tu información personal y preferencias
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 text-secondary hover:text-primary transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Cancelar
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {loading ? 'Guardando...' : 'Guardar'}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Message */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                <span className="text-sm">{message.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Info */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <h2 className="text-xl font-semibold text-primary mb-6">Información Personal</h2>
                  
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Nombre Completo
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-muted"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <User className="w-5 h-5 text-secondary" />
                          <span className="text-primary">
                            {formData.fullName || 'No especificado'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Email
                      </label>
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Mail className="w-5 h-5 text-secondary" />
                        <span className="text-primary">{user?.email}</span>
                      </div>
                      <p className="text-xs text-secondary mt-1">El email no se puede cambiar</p>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Teléfono
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-muted"
                          placeholder="+1 (555) 123-4567"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <Phone className="w-5 h-5 text-secondary" />
                          <span className="text-primary">
                            {formData.phone || 'No especificado'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        País
                      </label>
                      {isEditing ? (
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-muted"
                        >
                          <option value="">Seleccionar país</option>
                          <option value="US">Estados Unidos</option>
                          <option value="CA">Canadá</option>
                          <option value="MX">México</option>
                          <option value="ES">España</option>
                          <option value="AR">Argentina</option>
                          <option value="BR">Brasil</option>
                          <option value="AU">Australia</option>
                          <option value="AE">Emiratos Árabes Unidos</option>
                          <option value="SA">Arabia Saudita</option>
                          <option value="other">Otro</option>
                        </select>
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                          <MapPin className="w-5 h-5 text-secondary" />
                          <span className="text-primary">
                            {formData.country || 'No especificado'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Investment Preferences */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border mt-6">
                  <h2 className="text-xl font-semibold text-primary mb-6">Preferencias de Inversión</h2>
                  
                  <div className="space-y-6">
                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Presupuesto Estimado
                      </label>
                      {isEditing ? (
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-muted"
                        >
                          <option value="">Seleccionar rango</option>
                          <option value="under-100k">Menos de $100K</option>
                          <option value="100k-300k">$100K - $300K</option>
                          <option value="300k-500k">$300K - $500K</option>
                          <option value="500k-1m">$500K - $1M</option>
                          <option value="over-1m">Más de $1M</option>
                        </select>
                      ) : (
                        <div className="p-3 bg-muted rounded-lg">
                          <span className="text-primary">
                            {formData.budget || 'No especificado'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Interests */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Intereses Específicos
                      </label>
                      {isEditing ? (
                        <textarea
                          name="interests"
                          value={formData.interests}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-muted"
                          placeholder="Describe tus intereses en propiedades japonesas..."
                        />
                      ) : (
                        <div className="p-3 bg-muted rounded-lg">
                          <span className="text-primary">
                            {formData.interests || 'No especificado'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Notas Adicionales
                      </label>
                      {isEditing ? (
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-muted"
                          placeholder="Cualquier información adicional que quieras compartir..."
                        />
                      ) : (
                        <div className="p-3 bg-muted rounded-lg">
                          <span className="text-primary">
                            {formData.notes || 'No especificado'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <h2 className="text-xl font-semibold text-primary mb-6">Información de Cuenta</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="text-sm font-medium text-primary">Miembro desde</p>
                        <p className="text-sm text-secondary">
                          {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-secondary" />
                      <div>
                        <p className="text-sm font-medium text-primary">ID de Usuario</p>
                        <p className="text-sm text-secondary font-mono">
                          {user?.id?.substring(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
                  <h2 className="text-xl font-semibold text-primary mb-6">Seguridad</h2>
                  
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <p className="font-medium text-primary">Cambiar Contraseña</p>
                      <p className="text-sm text-secondary">Actualiza tu contraseña de forma segura</p>
                    </button>
                    
                    <button className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <p className="font-medium text-primary">Autenticación de Dos Factores</p>
                      <p className="text-sm text-secondary">Añade una capa extra de seguridad</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
