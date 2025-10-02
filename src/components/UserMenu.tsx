'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { User, LogOut, Settings, ChevronDown, Home } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function UserMenu() {
  const { t } = useLanguage()
  const { user, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  // Debug: verificar que las traducciones funcionen
  console.log('UserMenu translations:', {
    dashboard: t('user.dropdown.dashboard'),
    profile: t('user.dropdown.myProfile'),
    logout: t('user.dropdown.logout')
  })

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsOpen(false)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/90 backdrop-blur-sm border border-border hover:bg-white text-primary shadow-sm transition-colors"
      >
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-medium hidden sm:block">
          {user.user_metadata?.full_name || user.email?.split('@')[0]}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-border z-20">
            <div className="p-2">
              {/* User Info */}
              <div className="px-3 py-2 border-b border-border">
                <p className="text-sm font-medium text-primary">
                  {user.user_metadata?.full_name || 'Usuario'}
                </p>
                <p className="text-xs text-secondary">
                  {user.email}
                </p>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={() => {
                    setIsOpen(false)
                    window.location.href = '/dashboard'
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-secondary hover:bg-muted hover:text-primary transition-colors"
                >
                  <Home className="w-4 h-4" />
{t('user.dropdown.dashboard')}
                </button>
                
                <button
                  onClick={() => {
                    setIsOpen(false)
                    window.location.href = '/profile'
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-secondary hover:bg-muted hover:text-primary transition-colors"
                >
                  <Settings className="w-4 h-4" />
{t('user.dropdown.myProfile')}
                </button>
                
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-secondary hover:bg-muted hover:text-primary transition-colors"
                >
                  <LogOut className="w-4 h-4" />
{t('user.dropdown.logout')}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
