// Google Gemini API Integration for Intelligent Prompt Generation
export interface BusinessDetails {
  businessName: string
  businessType: string
  phoneNumber: string
  email: string
  address: string
  pricing: string
  workingHours: any
  services: string[]
  specialInstructions: string
}

export interface GeneratedPrompt {
  prompt: string
  suggestions: string[]
  confidence: number
}

class GeminiService {
  private apiKey: string
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  // Generate intelligent prompt based on business details
  async generatePrompt(businessDetails: BusinessDetails): Promise<GeneratedPrompt> {
    try {
      const workingHoursText = Object.entries(businessDetails.workingHours)
        .map(([day, hours]: [string, any]) => {
          const dayName = day.charAt(0).toUpperCase() + day.slice(1)
          return `${dayName}: ${hours.open ? `${hours.start} - ${hours.end}` : 'Closed'}`
        })
        .join('\n')

      const prompt = `You are an AI assistant helping to create a professional receptionist prompt for a business.

Business Details:
- Business Name: ${businessDetails.businessName}
- Business Type: ${businessDetails.businessType}
- Phone: ${businessDetails.phoneNumber}
- Email: ${businessDetails.email}
- Address: ${businessDetails.address}
- Pricing: ${businessDetails.pricing}

Working Hours:
${workingHoursText}

Services Offered: ${businessDetails.services.join(', ')}

Special Instructions: ${businessDetails.specialInstructions}

Please create a comprehensive, professional prompt for an AI receptionist that will:
1. Greet callers warmly and professionally
2. Collect their name and contact information
3. Understand their needs and questions
4. Provide relevant information about services and pricing
5. Book appointments when requested
6. Take detailed messages for follow-up
7. Be polite, helpful, and professional at all times
8. Handle common objections gracefully
9. Always ask for the caller's name and phone number for follow-up purposes

The prompt should be conversational, professional, and specific to this business type. Include specific details about their services and pricing when relevant.

Also provide 3-5 suggestions for improving the prompt based on the business type and services.`

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`)
      }

      const data = await response.json()
      const generatedText = data.candidates[0].content.parts[0].text

      // Parse the response to extract prompt and suggestions
      const lines = generatedText.split('\n')
      const promptText = lines.slice(0, -5).join('\n') // Everything except last 5 lines
      const suggestions = lines.slice(-5).filter((line: string) => line.trim().startsWith('-')).map((line: string) => line.trim().substring(1).trim())

      return {
        prompt: promptText,
        suggestions,
        confidence: 0.9, // High confidence for structured prompts
      }
    } catch (error) {
      console.error('Error generating prompt with Gemini:', error)
      throw error
    }
  }

  // Generate follow-up questions for leads
  async generateFollowUpQuestions(leadInfo: any): Promise<string[]> {
    try {
      const prompt = `Based on this lead information, generate 3-5 follow-up questions that would be helpful for a business to ask:

Lead Information:
- Name: ${leadInfo.name}
- Interest: ${leadInfo.interest}
- Call Duration: ${leadInfo.callDuration}
- Status: ${leadInfo.status}

Generate professional, specific questions that would help qualify this lead and move them toward conversion.`

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 500,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`)
      }

      const data = await response.json()
      const generatedText = data.candidates[0].content.parts[0].text
      
      return generatedText.split('\n').filter((line: string) => line.trim().startsWith('-')).map((line: string) => line.trim().substring(1).trim())
    } catch (error) {
      console.error('Error generating follow-up questions:', error)
      throw error
    }
  }

  // Generate call summary
  async generateCallSummary(callTranscript: string): Promise<string> {
    try {
      const prompt = `Please provide a concise summary of this call transcript, highlighting:
1. Key points discussed
2. Customer needs identified
3. Actions required
4. Follow-up needed

Transcript:
${callTranscript}

Provide a professional, structured summary.`

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 300,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.candidates[0].content.parts[0].text
    } catch (error) {
      console.error('Error generating call summary:', error)
      throw error
    }
  }
}

export default GeminiService 