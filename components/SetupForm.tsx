'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Phone, Calendar, Clock, DollarSign, Building, User, AlertCircle, CheckCircle } from 'lucide-react'
import VapiService from '@/lib/vapi'
import GeminiService from '@/lib/gemini'

interface BusinessDetails {
  businessName: string
  businessType: string
  phoneNumber: string
  email: string
  address: string
  pricing: string
  workingHours: {
    monday: { start: string; end: string; open: boolean }
    tuesday: { start: string; end: string; open: boolean }
    wednesday: { start: string; end: string; open: boolean }
    thursday: { start: string; end: string; open: boolean }
    friday: { start: string; end: string; open: boolean }
    saturday: { start: string; end: string; open: boolean }
    sunday: { start: string; end: string; open: boolean }
  }
  services: string[]
  specialInstructions: string
}

const SetupForm = () => {
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
    businessName: '',
    businessType: '',
    phoneNumber: '',
    email: '',
    address: '',
    pricing: '',
    workingHours: {
      monday: { start: '09:00', end: '17:00', open: true },
      tuesday: { start: '09:00', end: '17:00', open: true },
      wednesday: { start: '09:00', end: '17:00', open: true },
      thursday: { start: '09:00', end: '17:00', open: true },
      friday: { start: '09:00', end: '17:00', open: true },
      saturday: { start: '10:00', end: '15:00', open: false },
      sunday: { start: '10:00', end: '15:00', open: false },
    },
    services: [],
    specialInstructions: '',
  })

  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ]

  const commonServices = [
    'Consultation',
    'Appointment Booking',
    'Price Quotes',
    'Service Information',
    'Emergency Services',
    'Follow-up Calls',
  ]

  const handleInputChange = (field: keyof BusinessDetails, value: any) => {
    setBusinessDetails(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleWorkingHoursChange = (day: string, field: string, value: any) => {
    setBusinessDetails(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day as keyof typeof prev.workingHours],
          [field]: value,
        },
      },
    }))
  }

  const handleServiceToggle = (service: string) => {
    setBusinessDetails(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }))
  }

  const generatePrompt = async () => {
    setIsGenerating(true)
    setError('')
    setSuccess('')
    
    try {
      const geminiService = new GeminiService()
      const result = await geminiService.generatePrompt(businessDetails)
      
      setGeneratedPrompt(result.prompt)
      setSuccess('Prompt generated successfully!')
    } catch (error) {
      console.error('Error generating prompt:', error)
      setError('Failed to generate prompt. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const testAgent = async () => {
    if (!generatedPrompt) {
      setError('Please generate a prompt first')
      return
    }

    setIsTesting(true)
    setError('')
    setSuccess('')
    
    try {
      const vapiService = new VapiService()
      
      // Create a test agent
      const agent = await vapiService.createAgent({
        name: `${businessDetails.businessName} AI Receptionist`,
        prompt: generatedPrompt,
        phoneNumber: businessDetails.phoneNumber,
        businessDetails: {
          name: businessDetails.businessName,
          type: businessDetails.businessType,
          workingHours: businessDetails.workingHours,
          services: businessDetails.services,
          pricing: businessDetails.pricing,
          specialInstructions: businessDetails.specialInstructions,
        },
      })
      
      setSuccess(`Agent created successfully! Agent ID: ${agent.id}`)
    } catch (error) {
      console.error('Error testing agent:', error)
      setError('Failed to create agent. Please try again.')
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Error/Success Messages */}
      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}
      
      {success && (
        <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-green-700">{success}</span>
        </div>
      )}

      {/* Business Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2" />
          Business Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name *
            </label>
            <input
              type="text"
              value={businessDetails.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              className="input-field"
              placeholder="Enter your business name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Type *
            </label>
            <input
              type="text"
              value={businessDetails.businessType}
              onChange={(e) => handleInputChange('businessType', e.target.value)}
              className="input-field"
              placeholder="e.g., Dental Clinic, Law Firm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              value={businessDetails.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              className="input-field"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={businessDetails.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="input-field"
              placeholder="contact@yourbusiness.com"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Address
            </label>
            <input
              type="text"
              value={businessDetails.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="input-field"
              placeholder="123 Main St, City, State 12345"
            />
          </div>
        </div>
      </Card>

      {/* Pricing & Services */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Pricing & Services
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pricing Information
            </label>
            <textarea
              value={businessDetails.pricing}
              onChange={(e) => handleInputChange('pricing', e.target.value)}
              className="input-field"
              rows={3}
              placeholder="Describe your pricing structure, packages, or consultation fees..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Services Offered
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {commonServices.map(service => (
                <label key={service} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={businessDetails.services.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Working Hours */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Working Hours
        </h3>
        
        <div className="space-y-3">
          {days.map(day => {
            const hours = businessDetails.workingHours[day.key as keyof typeof businessDetails.workingHours]
            return (
              <div key={day.key} className="flex items-center space-x-4">
                <div className="w-24">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={hours.open}
                      onChange={(e) => handleWorkingHoursChange(day.key, 'open', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700">{day.label}</span>
                  </label>
                </div>
                
                {hours.open && (
                  <>
                    <input
                      type="time"
                      value={hours.start}
                      onChange={(e) => handleWorkingHoursChange(day.key, 'start', e.target.value)}
                      className="input-field w-32"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="time"
                      value={hours.end}
                      onChange={(e) => handleWorkingHoursChange(day.key, 'end', e.target.value)}
                      className="input-field w-32"
                    />
                  </>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Special Instructions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Special Instructions
        </h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Instructions for AI Receptionist
          </label>
          <textarea
            value={businessDetails.specialInstructions}
            onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
            className="input-field"
            rows={4}
            placeholder="Any special instructions, policies, or information the AI should know..."
          />
        </div>
      </Card>

      {/* Generate Prompt */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate AI Prompt</h3>
        
        <button
          onClick={generatePrompt}
          disabled={isGenerating || !businessDetails.businessName || !businessDetails.businessType}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : 'Generate AI Prompt'}
        </button>
        
        {generatedPrompt && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Generated Prompt
            </label>
            <textarea
              value={generatedPrompt}
              readOnly
              className="input-field"
              rows={10}
            />
            
            <div className="mt-4 flex space-x-4">
              <button
                onClick={testAgent}
                disabled={isTesting}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTesting ? 'Testing...' : 'Test AI Agent'}
              </button>
              
              <button className="btn-primary">
                Save Configuration
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default SetupForm 