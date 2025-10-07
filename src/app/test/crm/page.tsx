'use client';

import React, { useState } from 'react';
import { TabijiCRMService } from '@/lib/crm/crm-service';
import { LeadStatus, ClientType, ServiceType } from '@/lib/crm/crm-types';

const CRMTestingPage: React.FC = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addTestResult = (testName: string, success: boolean, details: any) => {
    setTestResults(prev => [...prev, {
      testName,
      success,
      details,
      timestamp: new Date().toISOString()
    }]);
  };

  // Test 1: Crear contacto
  const testCreateContact = async () => {
    setIsLoading(true);
    try {
      const contact = await TabijiCRMService.createContact({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@tabijihouse.com',
        phone: '+1-555-0123',
        country: 'United States',
        timezone: 'America/New_York',
        preferredLanguage: 'en'
      });
      
      const success = !!contact.id && !!contact.email;
      
      addTestResult('Create Contact', success, {
        contactId: contact.id,
        email: contact.email,
        name: `${contact.firstName} ${contact.lastName}`,
        country: contact.country
      });
      
      return contact;
    } catch (error) {
      addTestResult('Create Contact', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 2: Crear lead
  const testCreateLead = async () => {
    setIsLoading(true);
    try {
      // Primero crear un contacto
      const contact = await testCreateContact();
      if (!contact) {
        addTestResult('Create Lead', false, { error: 'Failed to create contact first' });
        return null;
      }

      const lead = await TabijiCRMService.createLead({
        status: LeadStatus.NEW,
        clientType: ClientType.INVESTOR,
        source: 'website',
        budget: 500000,
        currency: 'USD',
        preferredProperties: ['property_001', 'property_002'],
        timeline: '3-6 months',
        notes: 'Interested in luxury properties in Kusatsu',
        assignedTo: 'agent_001'
      }, contact);
      
      const success = !!lead.id && !!lead.contactId;
      
      addTestResult('Create Lead', success, {
        leadId: lead.id,
        contactId: lead.contactId,
        status: lead.status,
        clientType: lead.clientType,
        budget: lead.budget
      });
      
      return lead;
    } catch (error) {
      addTestResult('Create Lead', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 3: Convertir lead a cliente
  const testConvertLeadToClient = async () => {
    setIsLoading(true);
    try {
      // Primero crear un lead
      const lead = await testCreateLead();
      if (!lead) {
        addTestResult('Convert Lead to Client', false, { error: 'Failed to create lead first' });
        return null;
      }

      const client = await TabijiCRMService.convertLeadToClient(lead.id, [
        ServiceType.PROPERTY_PURCHASE,
        ServiceType.LEGAL_SERVICES
      ]);
      
      const success = !!client.id && !!client.contactId;
      
      addTestResult('Convert Lead to Client', success, {
        clientId: client.id,
        contactId: client.contactId,
        clientType: client.clientType,
        services: client.services,
        status: client.status
      });
      
      return client;
    } catch (error) {
      addTestResult('Convert Lead to Client', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 4: Crear comunicación
  const testCreateCommunication = async () => {
    setIsLoading(true);
    try {
      // Primero crear un lead
      const lead = await testCreateLead();
      if (!lead) {
        addTestResult('Create Communication', false, { error: 'Failed to create lead first' });
        return null;
      }

      const communication = await TabijiCRMService.createCommunication({
        leadId: lead.id,
        channel: 'email',
        direction: 'outbound',
        subject: 'Welcome to Tabiji House',
        content: 'Thank you for your interest in our services. We will be in touch soon.',
        createdBy: 'agent_001'
      });
      
      const success = !!communication.id && !!communication.leadId;
      
      addTestResult('Create Communication', success, {
        communicationId: communication.id,
        leadId: communication.leadId,
        channel: communication.channel,
        direction: communication.direction,
        subject: communication.subject
      });
      
      return communication;
    } catch (error) {
      addTestResult('Create Communication', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 5: Crear tarea
  const testCreateTask = async () => {
    setIsLoading(true);
    try {
      // Primero crear un lead
      const lead = await testCreateLead();
      if (!lead) {
        addTestResult('Create Task', false, { error: 'Failed to create lead first' });
        return null;
      }

      const task = await TabijiCRMService.createTask({
        title: 'Initial Contact - New Lead',
        description: 'Contact the lead within 24 hours',
        leadId: lead.id,
        assignedTo: lead.assignedTo,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
        priority: 'high',
        category: 'follow_up'
      });
      
      const success = !!task.id && !!task.leadId;
      
      addTestResult('Create Task', success, {
        taskId: task.id,
        leadId: task.leadId,
        title: task.title,
        priority: task.priority,
        dueDate: task.dueDate.toISOString()
      });
      
      return task;
    } catch (error) {
      addTestResult('Create Task', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 6: Activar ECV Membership
  const testActivateECVMembership = async () => {
    setIsLoading(true);
    try {
      // Primero crear un cliente
      const client = await testConvertLeadToClient();
      if (!client) {
        addTestResult('Activate ECV Membership', false, { error: 'Failed to create client first' });
        return null;
      }

      const updatedClient = await TabijiCRMService.activateECVMembership(client.id);
      
      const success = !!updatedClient.ecvMembership?.active;
      
      addTestResult('Activate ECV Membership', success, {
        clientId: updatedClient.id,
        ecvActive: updatedClient.ecvMembership?.active,
        ecvStartDate: updatedClient.ecvMembership?.startDate,
        services: updatedClient.services
      });
      
      return updatedClient;
    } catch (error) {
      addTestResult('Activate ECV Membership', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 7: Obtener dashboard
  const testGetDashboard = async () => {
    setIsLoading(true);
    try {
      const dashboard = await TabijiCRMService.getDashboard();
      
      const success = !!dashboard && typeof dashboard.totalLeads === 'number';
      
      addTestResult('Get Dashboard', success, {
        totalLeads: dashboard.totalLeads,
        totalClients: dashboard.totalClients,
        totalRevenue: dashboard.totalRevenue,
        conversionRate: dashboard.conversionRate
      });
      
      return dashboard;
    } catch (error) {
      addTestResult('Get Dashboard', false, { error: error.message });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Test 8: Trigger workflow
  const testTriggerWorkflow = async () => {
    setIsLoading(true);
    try {
      // Primero crear un lead
      const lead = await testCreateLead();
      if (!lead) {
        addTestResult('Trigger Workflow', false, { error: 'Failed to create lead first' });
        return null;
      }

      await TabijiCRMService.triggerLeadWorkflow(lead.id, 'new_lead');
      
      addTestResult('Trigger Workflow', true, {
        leadId: lead.id,
        trigger: 'new_lead',
        note: 'Workflow triggered successfully'
      });
      
    } catch (error) {
      addTestResult('Trigger Workflow', false, { error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Ejecutar todos los tests
  const runAllTests = async () => {
    setTestResults([]);
    await testCreateContact();
    await testCreateLead();
    await testConvertLeadToClient();
    await testCreateCommunication();
    await testCreateTask();
    await testActivateECVMembership();
    await testGetDashboard();
    await testTriggerWorkflow();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">CRM System Testing</h1>
      
      {/* Controles de testing */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Controls</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={runAllTests}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Running Tests...' : 'Run All Tests'}
          </button>
          
          <button
            onClick={testCreateContact}
            disabled={isLoading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            Test Create Contact
          </button>
          
          <button
            onClick={testCreateLead}
            disabled={isLoading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
          >
            Test Create Lead
          </button>
          
          <button
            onClick={testGetDashboard}
            disabled={isLoading}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 transition-colors"
          >
            Test Dashboard
          </button>
          
          <button
            onClick={() => setTestResults([])}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Clear Results
          </button>
        </div>
      </div>

      {/* Resultados de testing */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Results</h2>
        
        {testResults.length === 0 ? (
          <p className="text-gray-600">No tests run yet. Click "Run All Tests" to start.</p>
        ) : (
          <div className="space-y-4">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  result.success 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-semibold ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.testName}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    result.success 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {result.success ? 'PASS' : 'FAIL'}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  {new Date(result.timestamp).toLocaleString()}
                </div>
                
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                    View Details
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CRMTestingPage;

