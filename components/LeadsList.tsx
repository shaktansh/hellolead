'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Phone, Mail, Calendar, MapPin, Clock, User, Filter } from 'lucide-react'

interface Lead {
  id: string
  name: string
  phone: string
  email: string
  source: string
  status: 'new' | 'contacted' | 'appointment' | 'converted' | 'lost'
  interest: string
  notes: string
  callDuration: string
  createdAt: string
  lastContacted?: string
}

const LeadsList = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - in real app this would come from API
  const leads: Lead[] = [
    {
      id: '1',
      name: 'John Doe',
      phone: '+1 (555) 123-4567',
      email: 'john.doe@email.com',
      source: 'Direct Call',
      status: 'new',
      interest: 'Dental cleaning appointment',
      notes: 'Called asking about pricing for dental cleaning. Interested in booking next week.',
      callDuration: '3:45',
      createdAt: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      name: 'Sarah Smith',
      phone: '+1 (555) 234-5678',
      email: 'sarah.smith@email.com',
      source: 'Direct Call',
      status: 'appointment',
      interest: 'Consultation for legal services',
      notes: 'Needs consultation for business contract review. Appointment booked for Friday.',
      callDuration: '5:20',
      createdAt: '2024-01-14T14:15:00Z',
      lastContacted: '2024-01-14T14:15:00Z',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      phone: '+1 (555) 345-6789',
      email: 'mike.johnson@email.com',
      source: 'Referral',
      status: 'contacted',
      interest: 'Home renovation quote',
      notes: 'Referred by previous client. Looking for kitchen renovation estimate.',
      callDuration: '4:10',
      createdAt: '2024-01-13T09:45:00Z',
      lastContacted: '2024-01-14T11:00:00Z',
    },
    {
      id: '4',
      name: 'Lisa Brown',
      phone: '+1 (555) 456-7890',
      email: 'lisa.brown@email.com',
      source: 'Direct Call',
      status: 'converted',
      interest: 'Tax preparation services',
      notes: 'Converted to paying client. Tax preparation completed successfully.',
      callDuration: '6:30',
      createdAt: '2024-01-10T16:20:00Z',
      lastContacted: '2024-01-12T10:00:00Z',
    },
  ]

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    appointment: 'bg-green-100 text-green-800',
    converted: 'bg-purple-100 text-purple-800',
    lost: 'bg-red-100 text-red-800',
  }

  const statusLabels = {
    new: 'New Lead',
    contacted: 'Contacted',
    appointment: 'Appointment Booked',
    converted: 'Converted',
    lost: 'Lost',
  }

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === 'all' || lead.status === filter
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.phone.includes(searchTerm) ||
                         lead.interest.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter:</span>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input-field w-40"
            >
              <option value="all">All Leads</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="appointment">Appointment</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </Card>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.map(lead => (
          <Card key={lead.id} className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                    <p className="text-sm text-gray-600">{lead.interest}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[lead.status]}`}>
                    {statusLabels[lead.status]}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{lead.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{lead.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      Call: {lead.callDuration} • {formatDate(lead.createdAt)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Source: {lead.source}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">{lead.notes}</p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 lg:ml-6">
                <button className="btn-primary text-sm">
                  Contact Lead
                </button>
                <button className="btn-secondary text-sm">
                  View Details
                </button>
                {lead.status === 'new' && (
                  <button className="btn-secondary text-sm">
                    Book Appointment
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(statusLabels).map(([status, label]) => {
            const count = leads.filter(lead => lead.status === status).length
            return (
              <div key={status} className="text-center">
                <div className={`text-2xl font-bold ${statusColors[status].split(' ')[1]}`}>
                  {count}
                </div>
                <div className="text-sm text-gray-600">{label}</div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

export default LeadsList 