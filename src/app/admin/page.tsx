'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Users, Calendar, TrendingUp, Download, RefreshCw } from 'lucide-react';
import { CRMService, Lead, BookingLead } from '@/lib/crm';

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookingLeads, setBookingLeads] = useState<BookingLead[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'leads' | 'bookings' | 'analytics'>('analytics');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [leadsData, bookingLeadsData, analyticsData] = await Promise.all([
        CRMService.getLeads(),
        CRMService.getBookingLeads(),
        CRMService.getAnalytics()
      ]);
      
      setLeads(leadsData);
      setBookingLeads(bookingLeadsData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportLeads = async () => {
    try {
      const csv = await CRMService.exportLeads();
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting leads:', error);
    }
  };

  const exportBookings = async () => {
    try {
      const csv = await CRMService.exportBookingLeads();
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting bookings:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-muted via-white to-muted pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex items-center justify-center h-96">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-muted via-white to-muted pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold text-primary mb-2">
              Dashboard de Administración
            </h1>
            <p className="text-secondary">
              Gestiona leads, reservas y analiza el rendimiento de Komorebi House
            </p>
          </div>

          {/* Analytics Cards */}
          {analytics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary">Total Leads</p>
                    <p className="text-2xl font-bold text-primary">{analytics.totalLeads}</p>
                  </div>
                  <Users size={24} className="text-primary" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary">Leads Nuevos</p>
                    <p className="text-2xl font-bold text-primary">{analytics.newLeads}</p>
                  </div>
                  <TrendingUp size={24} className="text-accent" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary">Reservas Totales</p>
                    <p className="text-2xl font-bold text-primary">{analytics.totalBookings}</p>
                  </div>
                  <Calendar size={24} className="text-green-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-secondary">Conversiones</p>
                    <p className="text-2xl font-bold text-primary">{analytics.convertedLeads}</p>
                  </div>
                  <TrendingUp size={24} className="text-green-500" />
                </div>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg border border-border mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'analytics'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-secondary hover:text-primary'
                  }`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'leads'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-secondary hover:text-primary'
                  }`}
                >
                  Leads ({leads.length})
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'bookings'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-secondary hover:text-primary'
                  }`}
                >
                  Reservas ({bookingLeads.length})
                </button>
              </nav>
            </div>

            <div className="p-6">
              {/* Analytics Tab */}
              {activeTab === 'analytics' && analytics && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-muted p-6 rounded-xl">
                      <h3 className="font-semibold text-primary mb-4">Estado de Leads</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-secondary">Nuevos</span>
                          <span className="font-semibold text-blue-600">{analytics.newLeads}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-secondary">Contactados</span>
                          <span className="font-semibold text-yellow-600">{analytics.contactedLeads}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-secondary">Calificados</span>
                          <span className="font-semibold text-green-600">{analytics.qualifiedLeads}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-secondary">Convertidos</span>
                          <span className="font-semibold text-purple-600">{analytics.convertedLeads}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted p-6 rounded-xl">
                      <h3 className="font-semibold text-primary mb-4">Estado de Reservas</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-secondary">Confirmadas</span>
                          <span className="font-semibold text-green-600">{analytics.confirmedBookings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-secondary">Completadas</span>
                          <span className="font-semibold text-blue-600">{analytics.completedBookings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-secondary">Total</span>
                          <span className="font-semibold text-primary">{analytics.totalBookings}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={exportLeads}
                      className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Download size={16} />
                      <span>Exportar Leads</span>
                    </button>
                    <button
                      onClick={exportBookings}
                      className="flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
                    >
                      <Download size={16} />
                      <span>Exportar Reservas</span>
                    </button>
                    <button
                      onClick={loadData}
                      className="flex items-center space-x-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors"
                    >
                      <RefreshCw size={16} />
                      <span>Actualizar</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Leads Tab */}
              {activeTab === 'leads' && (
                <div className="space-y-4">
                  {leads.length === 0 ? (
                    <p className="text-center text-secondary py-8">No hay leads registrados</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-semibold text-primary">Nombre</th>
                            <th className="text-left py-3 px-4 font-semibold text-primary">Email</th>
                            <th className="text-left py-3 px-4 font-semibold text-primary">Teléfono</th>
                            <th className="text-left py-3 px-4 font-semibold text-primary">Interés</th>
                            <th className="text-left py-3 px-4 font-semibold text-primary">Estado</th>
                            <th className="text-left py-3 px-4 font-semibold text-primary">Fecha</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leads.map((lead) => (
                            <tr key={lead.id} className="border-b border-border/50">
                              <td className="py-3 px-4 font-medium text-primary">{lead.name}</td>
                              <td className="py-3 px-4 text-secondary">{lead.email}</td>
                              <td className="py-3 px-4 text-secondary">{lead.phone}</td>
                              <td className="py-3 px-4 text-secondary">{lead.interest}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                  {lead.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-secondary text-sm">
                                {new Date(lead.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div className="space-y-4">
                  {bookingLeads.length === 0 ? (
                    <p className="text-center text-secondary py-8">No hay reservas registradas</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-semibold text-primary">Nombre</th>
                            <th className="text-left py-3 px-4 font-semibold text-primary">Email</th>
                            <th className="text-left py-3 px-4 font-semibold text-primary">Fecha</th>
                            <th className="text-left py-3 px-4 font-semibold text-primary">Hora</th>
                            <th className="text-left py-3 px-4 font-semibold text-primary">Estado</th>
                            <th className="text-left py-3 px-4 font-semibold text-primary">Creado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookingLeads.map((booking) => (
                            <tr key={booking.id} className="border-b border-border/50">
                              <td className="py-3 px-4 font-medium text-primary">{booking.name}</td>
                              <td className="py-3 px-4 text-secondary">{booking.email}</td>
                              <td className="py-3 px-4 text-secondary">{booking.preferredDate}</td>
                              <td className="py-3 px-4 text-secondary">{booking.preferredTime}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(booking.bookingStatus)}`}>
                                  {booking.bookingStatus}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-secondary text-sm">
                                {new Date(booking.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
