import SetupForm from '@/components/SetupForm'

export default function SetupPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Setup Your AI Receptionist</h1>
        <p className="text-gray-600 mt-2">Configure your business details and AI agent to handle inbound calls</p>
      </div>
      
      <SetupForm />
    </div>
  )
} 