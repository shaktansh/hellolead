// VAPI API Integration for AI Voice Agent
import { config } from './config'

export interface VapiAgent {
  id: string
  name: string
  prompt: string
  phoneNumber: string
  status: 'active' | 'inactive'
  createdAt: string
}

export interface CreateAgentRequest {
  name: string
  prompt: string
  phoneNumber: string
  businessDetails: {
    name: string
    type: string
    workingHours: any
    services: string[]
    pricing: string
    specialInstructions: string
  }
}

class VapiService {
  private apiKey: string
  private baseUrl = 'https://api.vapi.ai'

  constructor() {
    this.apiKey = config.VAPI_API_KEY
    if (!this.apiKey) {
      throw new Error('VAPI_API_KEY is not configured')
    }
  }

  // Create a new AI agent
  async createAgent(data: CreateAgentRequest): Promise<VapiAgent> {
    try {
      const response = await fetch(`${this.baseUrl}/assistant`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          prompt: data.prompt,
          phoneNumber: data.phoneNumber,
          model: {
            provider: config.DEFAULT_MODEL.provider,
            model: config.DEFAULT_MODEL.model,
            temperature: config.DEFAULT_MODEL.temperature,
            systemPrompt: data.prompt,
          },
          voice: {
            provider: config.DEFAULT_VOICE.provider,
            voiceId: config.DEFAULT_VOICE.voiceId,
          },
          firstMessage: "Hello! Thank you for calling. I'm your AI receptionist. How can I help you today?",
          recordingEnabled: true,
          metadata: {
            businessName: data.businessDetails.name,
            businessType: data.businessDetails.type,
            services: data.businessDetails.services,
            pricing: data.businessDetails.pricing,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`VAPI API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating VAPI agent:', error)
      throw error
    }
  }

  // Get all agents for a business
  async getAgents(): Promise<VapiAgent[]> {
    try {
      const response = await fetch(`${this.baseUrl}/assistant`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error(`VAPI API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching VAPI agents:', error)
      throw error
    }
  }

  // Update an existing agent
  async updateAgent(agentId: string, data: Partial<CreateAgentRequest>): Promise<VapiAgent> {
    try {
      const response = await fetch(`${this.baseUrl}/assistant/${agentId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`VAPI API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating VAPI agent:', error)
      throw error
    }
  }

  // Delete an agent
  async deleteAgent(agentId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/assistant/${agentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error(`VAPI API error: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error deleting VAPI agent:', error)
      throw error
    }
  }

  // Get call logs and analytics
  async getCallLogs(agentId?: string): Promise<any[]> {
    try {
      const url = agentId 
        ? `${this.baseUrl}/call?assistantId=${agentId}`
        : `${this.baseUrl}/call`
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error(`VAPI API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching call logs:', error)
      throw error
    }
  }
}

export default VapiService 