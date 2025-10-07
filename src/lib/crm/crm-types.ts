// Tipos para el sistema CRM de Tabiji House

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  PROPOSAL_SENT = 'proposal_sent',
  NEGOTIATING = 'negotiating',
  CLOSED_WON = 'closed_won',
  CLOSED_LOST = 'closed_lost',
}

export enum ClientType {
  INVESTOR = 'investor',
  MIGRANT = 'migrant',
  ENTREPRENEUR = 'entrepreneur',
  LIFESTYLE = 'lifestyle',
}

export enum ServiceType {
  PROPERTY_PURCHASE = 'property_purchase',
  KUSATSU_PROJECT = 'kusatsu_project',
  CONSULTATION = 'consultation',
  LEGAL_SERVICES = 'legal_services',
  RENOVATION = 'renovation',
  ECV_MEMBERSHIP = 'ecv_membership',
}

export enum CommunicationChannel {
  EMAIL = 'email',
  PHONE = 'phone',
  WHATSAPP = 'whatsapp',
  VIDEO_CALL = 'video_call',
  IN_PERSON = 'in_person',
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  country: string;
  timezone: string;
  preferredLanguage: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  id: string;
  contactId: string;
  contact: Contact;
  status: LeadStatus;
  clientType: ClientType;
  source: string; // marketing channel
  budget: number;
  currency: string;
  preferredProperties: string[];
  timeline: string;
  notes: string;
  assignedTo: string; // user ID
  createdAt: Date;
  updatedAt: Date;
  lastContactDate?: Date;
  nextFollowUpDate?: Date;
}

export interface Client {
  id: string;
  contactId: string;
  contact: Contact;
  clientType: ClientType;
  status: 'active' | 'inactive' | 'suspended';
  services: ServiceType[];
  totalValue: number;
  currency: string;
  propertiesOwned: string[];
  ecvMembership?: {
    active: boolean;
    startDate: Date;
    endDate?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Communication {
  id: string;
  leadId?: string;
  clientId?: string;
  channel: CommunicationChannel;
  direction: 'inbound' | 'outbound';
  subject: string;
  content: string;
  attachments?: string[];
  scheduledFor?: Date;
  completedAt?: Date;
  createdAt: Date;
  createdBy: string; // user ID
}

export interface Task {
  id: string;
  title: string;
  description: string;
  leadId?: string;
  clientId?: string;
  assignedTo: string; // user ID
  dueDate: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  category: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface Opportunity {
  id: string;
  leadId: string;
  lead: Lead;
  propertyId?: string;
  projectId?: string;
  serviceType: ServiceType;
  estimatedValue: number;
  currency: string;
  probability: number; // 0-100%
  expectedCloseDate: Date;
  actualCloseDate?: Date;
  status: 'open' | 'closed_won' | 'closed_lost';
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'sales_manager' | 'sales_rep' | 'consultant' | 'support';
  permissions: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CRMDashboard {
  totalLeads: number;
  totalClients: number;
  totalRevenue: number;
  conversionRate: number;
  averageDealSize: number;
  leadsByStatus: Record<LeadStatus, number>;
  leadsBySource: Record<string, number>;
  leadsByClientType: Record<ClientType, number>;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
  }>;
  topPerformingUsers: Array<{
    userId: string;
    userName: string;
    leads: number;
    clients: number;
    revenue: number;
  }>;
}

// Tipos para filtros y búsqueda
export interface LeadFilters {
  status?: LeadStatus[];
  clientType?: ClientType[];
  source?: string[];
  assignedTo?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  budgetRange?: {
    min: number;
    max: number;
  };
}

export interface ClientFilters {
  clientType?: ClientType[];
  status?: string[];
  services?: ServiceType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface SearchOptions {
  query: string;
  fields: string[];
  limit?: number;
  offset?: number;
}

export default {
  LeadStatus,
  ClientType,
  ServiceType,
  CommunicationChannel,
};

