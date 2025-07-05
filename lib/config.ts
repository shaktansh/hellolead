// Configuration for API keys and settings
export const config = {
  // VAPI API Key - Get from https://vapi.ai
  VAPI_API_KEY: process.env.VAPI_API_KEY || '',
  
  // Google Gemini API Key - Get from https://makersuite.google.com/app/apikey
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  
  // App settings
  APP_NAME: 'Hello Lead',
  APP_DESCRIPTION: 'AI Receptionist for Business Owners',
  
  // Default voice settings for VAPI
  DEFAULT_VOICE: {
    provider: '11labs',
    voiceId: 'pNInz6obpgDQGcFmaJgB', // Professional female voice
  },
  
  // Default AI model settings
  DEFAULT_MODEL: {
    provider: 'openai',
    model: 'gpt-4',
    temperature: 0.7,
  },
}

// Validate required API keys
export const validateApiKeys = () => {
  const missingKeys = []
  
  if (!config.VAPI_API_KEY) {
    missingKeys.push('VAPI_API_KEY')
  }
  
  if (!config.GEMINI_API_KEY) {
    missingKeys.push('GEMINI_API_KEY')
  }
  
  if (missingKeys.length > 0) {
    console.warn(`Missing API keys: ${missingKeys.join(', ')}`)
    return false
  }
  
  return true
} 