// CRM Integration for Komorebi House
// This file handles lead management and CRM integration

export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  country?: string;
  budget?: string;
  interest: string;
  message?: string;
  source: 'website' | 'booking' | 'contact_form';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface BookingLead extends Lead {
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  bookingStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

// Simulate CRM API calls
export class CRMService {
  private static leads: Lead[] = [];
  private static bookingLeads: BookingLead[] = [];

  // Create a new lead
  static async createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> {
    const newLead: Lead = {
      ...leadData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.leads.push(newLead);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Lead created:', newLead);
    return newLead;
  }

  // Create a booking lead
  static async createBookingLead(leadData: Omit<BookingLead, 'id' | 'createdAt' | 'updatedAt'>): Promise<BookingLead> {
    const newBookingLead: BookingLead = {
      ...leadData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.bookingLeads.push(newBookingLead);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Booking lead created:', newBookingLead);
    return newBookingLead;
  }

  // Get all leads
  static async getLeads(): Promise<Lead[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.leads];
  }

  // Get all booking leads
  static async getBookingLeads(): Promise<BookingLead[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.bookingLeads];
  }

  // Update lead status
  static async updateLeadStatus(leadId: string, status: Lead['status'], notes?: string): Promise<Lead | null> {
    const lead = this.leads.find(l => l.id === leadId);
    if (!lead) return null;

    lead.status = status;
    lead.updatedAt = new Date();
    if (notes) lead.notes = notes;

    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Lead updated:', lead);
    return lead;
  }

  // Update booking status
  static async updateBookingStatus(leadId: string, status: BookingLead['bookingStatus']): Promise<BookingLead | null> {
    const bookingLead = this.bookingLeads.find(l => l.id === leadId);
    if (!bookingLead) return null;

    bookingLead.bookingStatus = status;
    bookingLead.updatedAt = new Date();

    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Booking lead updated:', bookingLead);
    return bookingLead;
  }

  // Get lead analytics
  static async getAnalytics(): Promise<{
    totalLeads: number;
    newLeads: number;
    contactedLeads: number;
    qualifiedLeads: number;
    convertedLeads: number;
    totalBookings: number;
    confirmedBookings: number;
    completedBookings: number;
  }> {
    await new Promise(resolve => setTimeout(resolve, 200));

    const totalLeads = this.leads.length;
    const newLeads = this.leads.filter(l => l.status === 'new').length;
    const contactedLeads = this.leads.filter(l => l.status === 'contacted').length;
    const qualifiedLeads = this.leads.filter(l => l.status === 'qualified').length;
    const convertedLeads = this.leads.filter(l => l.status === 'converted').length;

    const totalBookings = this.bookingLeads.length;
    const confirmedBookings = this.bookingLeads.filter(b => b.bookingStatus === 'confirmed').length;
    const completedBookings = this.bookingLeads.filter(b => b.bookingStatus === 'completed').length;

    return {
      totalLeads,
      newLeads,
      contactedLeads,
      qualifiedLeads,
      convertedLeads,
      totalBookings,
      confirmedBookings,
      completedBookings,
    };
  }

  // Export leads to CSV (for admin use)
  static async exportLeads(): Promise<string> {
    const csvHeaders = 'ID,Name,Email,Phone,Country,Budget,Interest,Source,Status,Created At,Updated At,Notes\n';
    const csvRows = this.leads.map(lead => 
      `${lead.id},${lead.name},${lead.email},${lead.phone},${lead.country || ''},${lead.budget || ''},${lead.interest},${lead.source},${lead.status},${lead.createdAt.toISOString()},${lead.updatedAt.toISOString()},${lead.notes || ''}`
    ).join('\n');
    
    return csvHeaders + csvRows;
  }

  // Export booking leads to CSV
  static async exportBookingLeads(): Promise<string> {
    const csvHeaders = 'ID,Name,Email,Phone,Preferred Date,Preferred Time,Timezone,Interest,Booking Status,Created At,Updated At\n';
    const csvRows = this.bookingLeads.map(lead => 
      `${lead.id},${lead.name},${lead.email},${lead.phone},${lead.preferredDate},${lead.preferredTime},${lead.timezone},${lead.interest},${lead.bookingStatus},${lead.createdAt.toISOString()},${lead.updatedAt.toISOString()}`
    ).join('\n');
    
    return csvHeaders + csvRows;
  }

  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Email notification service
export class NotificationService {
  static async sendLeadNotification(lead: Lead): Promise<void> {
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Email notification sent for lead: ${lead.name} (${lead.email})`);
  }

  static async sendBookingNotification(bookingLead: BookingLead): Promise<void> {
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Booking notification sent for: ${bookingLead.name} (${bookingLead.email})`);
  }

  static async sendConfirmationEmail(email: string, type: 'lead' | 'booking'): Promise<void> {
    // Simulate confirmation email
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`Confirmation email sent to: ${email} (${type})`);
  }
}
