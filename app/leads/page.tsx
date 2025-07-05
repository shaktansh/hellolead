import LeadsList from '@/components/LeadsList'

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
        <p className="text-gray-600 mt-2">View and manage leads from your AI receptionist</p>
      </div>
      
      <LeadsList />
    </div>
  )
} 