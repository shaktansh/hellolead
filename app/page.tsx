import AnalyticsDashboard from '@/components/AnalyticsDashboard'

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your AI receptionist performance and lead conversion</p>
      </div>
      
      <AnalyticsDashboard />
    </div>
  )
} 